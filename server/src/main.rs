use dmx::{self, DmxTransmitter};
use std::{thread, time};
mod universe;
mod fixture;
mod channel;
use crate::universe::Universe;


fn main() {
    let mut dmx_port = dmx::open_serial("/dev/ttyAMA0").unwrap();

    // a typical 4-channel device, expecting RGBV values. this will set a
    // fairly bright yellow.
    let data = &[0xff; 512];
 
    loop {
        dmx_port.send_dmx_packet(data).unwrap();
 
        // repeat about every 51 ms. for more accurate frame timings,
        // consider using the ticktock crate.
        thread::sleep(time::Duration::new(0, 50_000_000));
    }
}
