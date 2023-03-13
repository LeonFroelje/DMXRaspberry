use crate::{websockets::messages, dmx_api::fixture::Fixture};
use std::time::{ Instant, Duration };
use actix::{ Actor, StreamHandler, ActorContext, Addr, AsyncContext };
use actix_web_actors::ws;
use actix::prelude::*;
use uuid::Uuid;
use crate::websockets::server;
use serde_json::Error;

const HEARTBEAT: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);

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
                Ok(res) => {
                    act.id = res;
                    ctx.text(format!("{}", act.id));
                },
                _ => ctx.stop()  
            }
            fut::ready(())
        })
        .wait(ctx);
    }

    fn stopping(&mut self, _ctx: &mut Self::Context) -> actix::Running {
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

    fn handle_text_message(&self, message_vector: Vec<&str>, ctx: &mut <DataSocket as Actor>::Context){
        match message_vector.len(){
            0 => {
                ctx.text("Empty message received")
            }
            1 => {
                ctx.text("Payload required")
            }
            _ => {}
        }
        // url exists, because the length of the vector is greater than 1
        let url = message_vector[0];
        match url {
            "/fixture/update" => {
                let fixture: Result<Fixture, Error> = serde_json::from_str(message_vector[1]);
                match fixture {
                    Ok(fixture) => {
                        self.server.do_send(messages::FixtureUpdateMessage::new(self.id, fixture))
                    }
                    Err(_) => {
                        ctx.text("Syntax error in Fixture definition")
                    }
                }
            },
            "/fixture/add" => {
                let fixture: Result<Fixture, Error> = serde_json::from_str(message_vector[1]);
                match fixture {
                    Ok(fixture) => {
                        self.server.do_send(messages::FixtureAddMessage::new(self.id, fixture))
                    }
                    Err(_) => {
                        ctx.text("Syntax error in Fixture definition")
                    }
                }
            }
            "/fixture/remove" => {
                let fixture: Result<Fixture, Error> = serde_json::from_str(message_vector[1]);
                match fixture {
                    Ok(fixture) => {
                        self.server.do_send(messages::FixtureRemoveMessage::new(self.id, fixture))
                    }
                    Err(_) => {
                        ctx.text("Syntax error in Fixture definition")
                    }
                }
            }
            _ => {ctx.text("Unknown url")}
        }
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
                let message_vector: Vec<&str> = m.splitn(2, ' ').collect();
                // match for routes
                self.handle_text_message(message_vector, ctx);
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
/*
#[cfg(test)]
mod test{
    use std::fs;
    use std::sync::Arc;
    use std::sync::mpsc;
    use actix::prelude::*;
    use crate::dmx_api::universe::Universe;
    use crate::state::AppState;
    use crate::websockets::server::RtServer;

    use super::DataSocket;

    fn init() -> DataSocket{
        let (tx, _rx) = mpsc::channel();

        // Construct the DMX-universe from a file
        let path = format!("./Universes/Default.json");
        let universe: Universe = match fs::read_to_string(path){
            Ok(string) => serde_json::from_str(&string).unwrap(),
            Err(_) => {panic!("asd")}
    
        };
    
        let app_state = AppState::new(Some(universe), tx);
        let rt_server = RtServer::new(Arc::new(app_state));
        DataSocket::new(rt_server.start())
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
 
}
   */