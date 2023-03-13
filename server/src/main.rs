use crate::config::ServerConfig;
use crate::dmx_api::{ universe::Universe };
use crate::state::AppState;
use crate::websockets::server::RtServer;

use dmx;
use dmx::DmxTransmitter;
use dmx_serial::posix::TTYPort;

use std::fs::read_to_string;
use std::sync::Arc;
use std::sync::mpsc::{ self, TryRecvError, Receiver };
use std::{thread, fs };

use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::{ Duration };

use actix::prelude::*;

use actix_web::{ HttpServer, App, web, Responder, HttpResponse };
use actix_web::middleware::Logger;
use env_logger::Env;
use actix_files::Files;

use actors::websockets;
use actors::dmx::dmxactor::DmxActor;

use routes::websocket;

mod state;
mod config;
mod actors;
mod dmx_api;
mod routes;

const SLEEP_DURATION: u64 = 50_000_000;
const NATIVE_ACCURACY_NS: u32 = 100_000;
const HOST: &str = "0.0.0.0";
const PORT: u16 = 8000;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let cnf = read_config();
    let bind = format!("{HOST}:{PORT}");
    let default_port = cnf.port().clone();
    let default_universe = cnf.default_universe().clone();
    // Open the port used to send the DMX signals

    let dmx_port = open_dmx_port(cnf.port());
    // Transmitter and receiver for the actual DMX data that's going to be
    // passed between threads. The single receiver sits in a seperate thread
    // in which it periodically queries whether there's any new data to be written
    // to the configured TTYPort
    let (tx, rx) = mpsc::channel();

    // Construct the DMX-universe from a file
    let universe = create_universe(cnf.default_universe());
    let data = match &universe{
        Some(universe) => universe.data(),
        None => [0; 512],
    };

    let rt_server = RtServer::new().start();
    let default_dmx_actor = DmxActor::new(default_port, default_universe, rt_server.clone()).unwrap();
    let execution = async {
        default_dmx_actor.start();
    };
    let dmx_runtime = Arbiter::new();
    dmx_runtime.spawn(execution);

    // TODO: Replace DMX Thread with an actix actor that is responsible for sending the data over the port
    // Maybe benchmark which implementation is faster
    // Or even better yet, spin up a new Arbiter to for the DMX runtime and refactor the Universe & all
    // to Actors that execute on it. There wouldn't really be the need for any global app state other than the 
    // websocket server then, because the server could simply store the addresses to the
    // Unvierse actors in a HashMap and send the data this way.
    spawn_dmx_thread(rx, data, dmx_port);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(rt_server.clone()))
            .service(
                web::scope("/api")
                .service(web::resource("/ws").route(web::get().to(websocket::create_socket)))
                .service(web::resource("/lel").route(web::get().to(lel)))
                .wrap(Logger::default())
                .wrap(Logger::new("%a %{User-Agent}i"))
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
            //port.send_dmx_packet(&data).unwrap();
            // Sleep to limit loop to frequency of 44Hz
            spin_sleeper.sleep(duration);
        }
    });
}

fn create_universe(universe_name: &String) -> Option<Universe>{
    let path = format!("./Universes/{universe_name}.json");
    match fs::read_to_string(path){
        Ok(string) => Some(serde_json::from_str(&string).unwrap()),
        Err(_) => None

    }
 }

fn open_dmx_port(port_name: &String) -> TTYPort{
    let path = format!("/dev/{port_name}");
    dmx::open_serial(&path).unwrap()
}
