use crate::config::ServerConfig;
use crate::dmx_api::{ channel::Channel, fixture::Fixture, universe::Universe };

use dmx;
use dmx_serial::posix::TTYPort;

use std::fs::read_to_string;
use std::sync::mpsc::{ self, TryRecvError, Receiver };
use std::{thread, fs };

use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::{ Duration };

use actix_web::{ HttpServer, App, web, Responder, HttpResponse };

use actix_files::Files;

use routes::websocket;

mod config;
mod websockets;
mod dmx_api;
mod routes;

const SLEEP_DURATION: u64 = 50_000_000;
const NATIVE_ACCURACY_NS: u32 = 100_000;
const HOST: &str = "0.0.0.0";
const PORT: u16 = 8000;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let cnf = read_config();
    let bind = format!("{HOST}:{PORT}");
    // Open the port used to send the DMX signals
    println!("{}", cnf.port());
    let dmx_port = open_dmx_port(cnf.port());

    // Transmitter and receiver for the actual DMX data that's going to be
    // passed between threads. The single receiver sits in a seperate thread
    // in which it periodically queries whether there's any new data to be written
    // to the configured TTYPort
    let (tx, rx) = mpsc::channel();

    // Construct the DMX-universe from a file
    let mut universe = create_universe(cnf.default_universe());
    let data = universe.data();

    spawn_dmx_thread(rx, data, dmx_port);
    println!("hier");
    for d in 0..256{
        let data = [d as u8; 512];
        tx.send(data).unwrap();
    }
    HttpServer::new(move || {
        App::new()
            .service(
                web::scope("/api")
                .service(web::resource("/ws").route(web::get().to(websocket::echo_ws)))
                .service(web::resource("/lel").route(web::get().to(lel)))
            )
            .service(Files::new("/", cnf.react_build_path()).index_file("index.html"))            
        })
    .bind(&bind)?
    .run()
    .await
}

async fn lel() -> impl Responder{
    HttpResponse::Ok().body("lel")
}

fn read_config() -> ServerConfig{
    // unwrap because config file should always be there by default
    serde_json::from_str(&read_to_string("./dev_config.json").unwrap()).unwrap()
}


/// Spawn the thread used to send the DMX data to the port. This thread 
/// sends and checks for new data with a frequency of 44Hz. New data is
/// passed via channel messages to the receiver.
fn spawn_dmx_thread(rx: Receiver<[u8; 512]>, mut data: [u8; 512], mut port: TTYPort){
        thread::spawn(move || -> () {
        let spin_sleeper = SpinSleeper::new(NATIVE_ACCURACY_NS)
            .with_spin_strategy(SpinStrategy::SpinLoopHint);
        // DMX has a maximum frequency of 44Hz
        let duration = Duration::from_nanos(SLEEP_DURATION);
        loop{
            // Check for new data and update if required
            data = match rx.try_recv(){
                Ok(new_data) => new_data,
                Err(err) => match err {
                    TryRecvError::Empty => data,
                    TryRecvError::Disconnected => {
                        break;
                    }
                }
            };
            // Send the current data to the dmx port
            // port.send_dmx_packet(&data).unwrap();
            // Sleep to limit loop to frequency of 44Hz
            spin_sleeper.sleep(duration);
        }
    });
}

fn create_universe(universe_name: &String) -> Universe{
    let path = format!("./Universes/{universe_name}.json");
    println!("{path}");
    let s = fs::read_to_string(path).unwrap();
    serde_json::from_str(&s).unwrap() 
}

fn open_dmx_port(port_name: &String) -> TTYPort{
    let path = format!("/dev/{port_name}");
    dmx::open_serial(&path).unwrap()
}
