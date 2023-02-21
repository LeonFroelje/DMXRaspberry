use dmx::{self, DmxTransmitter};
use std::sync::mpsc::{self, TryRecvError};
use std::{thread, env, fs};
mod universe;
mod fixture;
mod channel;
use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::Duration;
use crate::universe::Universe;
use crate::fixture::Fixture;
use crate::channel::Channel;

// 44Hz in nanoseconds
const BASE: u64 = 10;
const SLEEP_DURATION: u64 = 1 / 44 * BASE.pow(9);

const NATIVE_ACCURACY_NS: u32 = 100_000;
fn main() {
    // Open the port used to send the DMX signals
    let mut dmx_port = dmx::open_serial(&env::var("DMX_PORT").unwrap()).unwrap();

    // Transmitter and receiver for the actual DMX data that's going to be
    // passed between threads. The single receiver sits in a seperate thread
    // in which it periodically queries whether there's any new data to be written
    // to the configured TTYPort
    let (tx, rx) = mpsc::channel();

    // Construct the DMX-universe from a file
    let s = fs::read_to_string("./Universe.json").unwrap();
    let mut universe:Universe = serde_json::from_str(&s).unwrap(); 
    let mut data = universe.data();

    // Spawn the thread used to send the DMX data to the port. This thread 
    // sends and checks for new data with a frequency of 44Hz. New data is
    // passed via channel messages to the receiver.
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
            dmx_port.send_dmx_packet(&data).unwrap();
            // Sleep to limit loop to frequency of 44Hz
            spin_sleeper.sleep(duration);
        }
    });
    loop {
    }
}
