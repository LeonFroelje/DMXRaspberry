use dmx::{self, DmxTransmitter};
use std::sync::mpsc::{self, TryRecvError};
use std::{thread, time};
mod universe;
mod fixture;
mod channel;
use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::Duration;
use crate::universe::Universe;


fn main() {
    // Open default universe


    // Trans
    let (tx, rx) = mpsc::channel();


    let mut dmx_port = dmx::open_serial("/dev/ttyAMA0").unwrap();

    // a typical 4-channel device, expecting RGBV values. this will set a
    // fairly bright yellow.
    let mut data = &[0xff; 512];
    let mut output_enabled = true;
    thread::spawn(move || -> () {
        let spin_sleeper = SpinSleeper::new(100_000)
            .with_spin_strategy(SpinStrategy::SpinLoopHint);
        let duration = Duration::from_nanos(22727273);
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
            dmx_port.send_dmx_packet(data);
            spin_sleeper.sleep(duration);
        }
    });
    loop {
    }
}
