use std::sync::mpsc::{ self, TryRecvError, Receiver };
use std::{thread, fs };

use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::{ Duration };
use dmx;
use dmx_serial::posix::TTYPort;


const SLEEP_DURATION: u64 = 50_000_000;
const NATIVE_ACCURACY_NS: u32 = 100_000;

pub struct DmxThread{
    receiver: Receiver<[u8; 512]>,
    data: [u8; 512],
    port: dmx_serial::posix::TTYPort
}

impl DmxThread{
    pub fn new(rx: Receiver<[u8; 512]>, port: String) -> Self{
        DmxThread{
            receiver: rx,
            data: [0; 512],
            port: dmx::open_serial(&port).unwrap()
        }
    }

    pub fn spawn(&self ){
        thread::spawn(move || -> () {
            let spin_sleeper = SpinSleeper::new(NATIVE_ACCURACY_NS)
                .with_spin_strategy(SpinStrategy::SpinLoopHint);
            // DMX has a maximum frequency of 44Hz
            let duration = Duration::from_nanos(SLEEP_DURATION);
            loop{
                // Check for new data and update if required
                self.data = match self.receiver.try_recv(){
                    Ok(new_data) => new_data,
                    Err(err) => match err {
                        TryRecvError::Empty => data,
                        TryRecvError::Disconnected => {
                            break;
                        }
                    }
                };
                // Send the current data to the dmx port
                self.port.send_dmx_packet(&data).unwrap();
                // Sleep to limit loop to frequency of 44Hz
                spin_sleeper.sleep(duration);
            }
        });
    }
}