use dmx::{self, DmxTransmitter};
use dmx_serial::SerialPort;
use dmx_serial::posix::TTYPort;
use std::collections::{ HashMap, BTreeMap};
use std::sync::mpsc::{self, TryRecvError};
use std::{thread, time};
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
    // Open default universe


    // Trans
    let (tx, rx) = mpsc::channel();


    let mut dmx_port = dmx::open_serial("/dev/ttyAMA0").unwrap();

    let mut expected: [u8; 512] = [0x00; 512];

    let mut channels: Vec<Channel> =  Vec::new();
    let mut channels_2: Vec<Channel> = Vec::new();
    for i in 1..6{
        channels.push(Channel::new(i, String::from("test1"), 0x00, BTreeMap::new()));
        channels_2.push(Channel::new(i + 6, String::from("test2"), 0x00, BTreeMap::new()));
        expected[i as usize] = i.try_into().unwrap();
        expected[(i + 6) as usize] = (i+6).try_into().unwrap();
    }
    let f = Fixture::new(String::from("t1"), channels, String::from("test"),
     String::from("test"), String::from("test"));
    let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"),
     String::from("test"), String::from("test"));
    let fixtures = vec![f, f_2];
    let mut universe = Universe::new(String::from("kek"), fixtures);

    let mut data = universe.data();

    let mut output_enabled = true;
    thread::spawn(move || -> () {
        let spin_sleeper = SpinSleeper::new(NATIVE_ACCURACY_NS)
            .with_spin_strategy(SpinStrategy::SpinLoopHint);
        // DMX has a maximum frequency of 44Hz
        let duration = Duration::from_nanos(SLEEP_DURATION);
        while(output_enabled){
            data = match rx.try_recv(){
                Ok(new_data) => new_data,
                Err(err) => match err {
                    TryRecvError::Empty => data,
                    TryRecvError::Disconnected => {
                        output_enabled = false;
                        data
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
