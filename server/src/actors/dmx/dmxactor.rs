use dmx;
use dmx::DmxTransmitter;
use dmx_serial::posix::TTYPort;
use uuid::Uuid;
//use std::fmt::Error;
use std::{time::Duration, fs};
use actix::prelude::*;

use dmx_serial::Error;
use crate::{dmx_api::universe::{Universe}, actors::websockets::{server::RtServer, messages}};

const DMX_INTERVAL: u64 = 50_000_000;

pub struct DmxActor{
    port: TTYPort,
    universe: Universe,
    server: Addr<RtServer>
}


impl DmxActor{
    pub fn new(port_path: String, universe: String, server: Addr<RtServer>) -> Result<Self, Error>{
        let p = format!("/dev/{port_path}");
        let port = dmx::open_serial(&p)?;
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
        ctx.run_interval(Duration::from_nanos(DMX_INTERVAL), |act, _ctx| {
            act.port.send_dmx_packet(&act.universe.data()).unwrap()
        });
        self.server.do_send(messages::NewDmxActor{
            addr: ctx.address()
        })
    }
}

impl Handler<messages::GetUniverse> for DmxActor{
    type Result = ();

    fn handle(&mut self, msg: messages::GetUniverse, ctx: &mut Self::Context) -> Self::Result {
        self.server.do_send(messages::SendUniverse::new(msg.0, self.universe.clone()));
    }
}

/*impl Handler<messages::GetUniverseMode> for DmxActor{

}*/

impl Handler<messages::FixtureAddMessage> for DmxActor{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureAddMessage, ctx: &mut Self::Context) -> Self::Result {
        let f = msg.fixture;
        self.universe.add_fixture(f);
    }
}


impl Handler<messages::FixtureUpdateMessage> for DmxActor{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureUpdateMessage, ctx: &mut Self::Context) -> Self::Result {
        let f = msg.fixture;
        self.universe.update_fixture(f).unwrap();
    }
}

impl Handler<messages::FixtureRemoveMessage> for DmxActor{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureRemoveMessage, ctx: &mut Self::Context) -> Self::Result {
        let f = msg.fixture;
        let i = self.universe.index_of(&f).unwrap();
        self.universe.remove_fixture(i as usize);

    }
}
