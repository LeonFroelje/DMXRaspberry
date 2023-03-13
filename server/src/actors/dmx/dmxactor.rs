use dmx;
use dmx::DmxTransmitter;
use dmx_serial::posix::TTYPort;
//use std::fmt::Error;
use std::{time::Duration, fs};
use actix::prelude::*;

use dmx_serial::Error;
use crate::{dmx_api::universe::{Universe, self}, actors::websockets::{server::RtServer, messages}};

const DMX_INTERVAL: u64 = 50_000_000;

pub struct DmxActor{
    port: TTYPort,
    universe: Universe,
    server: Addr<RtServer>
}


impl DmxActor{
    pub fn new(port_path: String, universe: String, server: Addr<RtServer>) -> Result<Self, Error>{
        let port = dmx::open_serial(&port_path)?;
        let universe = serde_json::from_str(&fs::read_to_string(format!("./Universes/{universe}.json"))?).unwrap();
        Ok(Self {
            port,
            universe,
            server
        })
    }
}

impl Actor for DmxActor {
    type Context = Context<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        ctx.run_interval(Duration::from_nanos(DMX_INTERVAL), |act, ctx| {
            act.port.send_dmx_packet(&act.universe.data()).unwrap()
        });
        self.server.do_send(messages::SetDefaultActorMessage(ctx.address()));
    }
}