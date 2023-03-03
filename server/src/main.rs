use crate::universe::Universe;
use crate::config::ServerConfig;
use crate::lobby::Lobby;

use dmx::{ self, DmxTransmitter };
use dmx_serial::posix::TTYPort;

use std::fs::read_to_string;
use std::sync::mpsc::{ self, TryRecvError, Receiver };
use std::{thread, env, fs, time};

use spin_sleep::{ SpinSleeper, SpinStrategy, sleep };
use std::time::{ Duration, Instant };

use actix::{ AsyncContext, Handler, Actor, Addr, Running, StreamHandler, WrapFuture, ActorFuture, ContextFutureSpawner, fut, ActorContext };
use actix_web::http::StatusCode;
use actix_web::{ HttpServer, App, web, Responder, HttpResponse };
use actix_web_actors::ws;
use actix_web_actors::ws::Message::Text;
use uuid::Uuid;

mod universe;
mod fixture;
mod channel;
mod config;
mod lobby;
mod websockets;

// 44Hz in nanoseconds
const BASE: u64 = 10;
const SLEEP_DURATION: u64 = 1 / 44 * BASE.pow(9);
const NATIVE_ACCURACY_NS: u32 = 100_000;
const HOST: &str = "0.0.0.0";
const PORT: u16 = 8000;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let mut cnf = read_config();
    let bind = format!("{HOST}:{PORT}");
    // Open the port used to send the DMX signals
    let dmx_port = dmx::open_serial(cnf.port()).unwrap();

    // Transmitter and receiver for the actual DMX data that's going to be
    // passed between threads. The single receiver sits in a seperate thread
    // in which it periodically queries whether there's any new data to be written
    // to the configured TTYPort
    let (tx, rx) = mpsc::channel();

    // Construct the DMX-universe from a file
    let mut universe = create_universe(cnf.default_universe());
    let data = universe.data();

    spawn_dmx_thread(rx, data, dmx_port);
    for d in 0..255{
        let data = [d as u8; 512];
        tx.send(data).unwrap();
        sleep(Duration::from_secs(1));
    }
    HttpServer::new(|| {
        App::new()
            //.service(factory)
        })
    .bind(&bind)?
    .run()
    .await
}


fn read_config() -> ServerConfig{
    // unwrap because config file should always be there by default
    serde_json::from_str(&read_to_string("./config.json").unwrap()).unwrap()
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
            // dmx_port.send_dmx_packet(&data).unwrap();
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