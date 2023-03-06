use crate::{websockets::messages, routes, dmx_api::fixture::Fixture};
use std::time::{ Instant, Duration };
use actix::{ Actor, StreamHandler, ActorContext, Addr, AsyncContext };
use actix_web_actors::ws;
use actix::prelude::*;
use uuid::Uuid;
use crate::websockets::server;
use serde_json::Error;

const HEARTBEAT: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);
const NATIVE_ACCURACY_NS: u32 = 100_000;

#[derive(Debug)]
pub struct DataSocket{
    pub id: Uuid,
    // Real time server
    pub server: Addr<server::RtServer>,
    // Heartbeat
    hb: Instant
}

impl Actor for DataSocket{
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.hb(ctx);
        let addr = ctx.address();
        self.server.send(messages::Connect{
            addr: addr.recipient()
        }).into_actor(self)
        .then(|res, act, ctx| {
            match res{
                Ok(res) => act.id = res,
                _ => ctx.stop()  
            }
            fut::ready(())
        })
        .wait(ctx);
    }

    fn stopping(&mut self, ctx: &mut Self::Context) -> actix::Running {
        self.server.do_send(messages::Disconnect { id: self.id });
        Running::Stop
    }
}

impl DataSocket{
    fn hb(&self, ctx: &mut ws::WebsocketContext<Self>) {
        ctx.run_interval(HEARTBEAT, |act, ctx| {
            // check client heartbeats
            if Instant::now().duration_since(act.hb) > CLIENT_TIMEOUT {
                // heartbeat timed out
                println!("Websocket Client heartbeat failed, disconnecting!");

                // notify chat server
                act.server.do_send(messages::Disconnect { id: act.id });

                // stop actor
                ctx.stop();

                // don't try to send a ping
                return;
            }

            ctx.ping(b"");
        });
    }

    pub fn new(srv: Addr<server::RtServer>) -> Self{
        Self { id: Uuid::new_v4(), server: srv, hb: Instant::now() }
    }
}

// Forward messages from the Real time server to the client
impl Handler<messages::ServerMessage> for DataSocket {
    type Result = ();

    fn handle(&mut self, msg: messages::ServerMessage, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for DataSocket{
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        let msg = match msg{
            Err(_) => {
                ctx.stop();
                return;
            }
            Ok(msg) => msg, 
        };

        match msg {
            ws::Message::Ping(msg) => {
                self.hb = Instant::now();
                ctx.pong(&msg);
            }

            ws::Message::Pong(_) => {
                self.hb = Instant::now();
            }

            ws::Message::Text(text) =>  {
                let m = text.trim();
                let v: Vec<&str> = m.splitn(2, ' ').collect();
                // match for routes
                match v.get(0) {
                    Some(url) => {
                        match *url {
                            "/fixture/update" => {
                                match v.len(){
                                    1 => {
                                        ctx.text("Fixture required!")
                                    }
                                    2 => {
                                        let fixture: Result<Fixture, Error> = serde_json::from_str(v[1]);
                                        match fixture {
                                            Ok(fixture) => {
                                                self.server.do_send(messages::FixtureUpdateMessage::new(self.id, fixture))
                                            }
                                            Err(_) => {
                                                ctx.text("Fixture not found")
                                            }
                                        }
                                    }
                                    _ => {}
                                }
                            },
                            "/fixture/add" => {

                            }
                            "/fixture/remove" => {

                            }
                            _ => {ctx.text("Unknown command")}
                        }
                    }
                    None => {ctx.text("Empty message")}
                }
        }

            ws::Message::Binary(_) => println!("Unexpected Binary"),

            ws::Message::Close(reason) => {
                ctx.close(reason);
                ctx.stop();
            }

            ws::Message::Continuation(_) => {
                ctx.stop()
            }

            ws::Message::Nop => {
                ()
            }
        }

    }
}

impl PartialEq for DataSocket{
    fn eq(&self, other: &Self) -> bool {
        return self.id == other.id
    }
    fn ne(&self, other: &Self) -> bool {
        return self.id != other.id
    }
}
/*#[cfg(test)]
mod test{
    use super::DataSocket;
    use super::Instant;

    fn init() -> DataSocket{
        DataSocket::new()
    }

    #[test]
    pub fn test_eq(){
        let d1 = init();
        let d2 = DataSocket{ id: d1.uuid(), hb: Instant::now()};

        assert_eq!(d1, d2)
    }

    #[test]
    pub fn test_neq(){
        let d1 = DataSocket::new();
        let d2 = DataSocket::new();

        assert_ne!(d1, d2)
    }
}*/