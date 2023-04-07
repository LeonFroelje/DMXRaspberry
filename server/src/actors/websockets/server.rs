use std::collections::HashMap;
use actix::prelude::*;
use uuid::Uuid;
use crate::{websockets::messages, actors::dmx::dmxactor::DmxActor};

use super::messages::{Connect, ServerMessage, NewDmxActor};

#[derive(Debug, Clone)]
pub struct RtServer{
    sessions: HashMap<Uuid, Recipient<messages::ServerMessage>>,
    // every session is mapped to a DmxActor which contains the Universe state 
    default_dmx_actor: Option<Addr<DmxActor>>,
}

impl RtServer{
    pub fn new() -> RtServer {
        RtServer {
            sessions: HashMap::new(),
            default_dmx_actor: None,
            }
    }

    pub fn broadcast(&self, message: messages::ServerMessage, skip_id: Option<Uuid>){
        match skip_id{
            Some(skip_id) => {
                for(id, addr) in self.sessions.iter(){
                    if *id != skip_id{
                        addr.do_send(message.clone());
                    }
                }
            }
            None => {
                for addr in self.sessions.values(){
                    addr.do_send(message.clone());
                }
            }
        }        
    }
}

impl Actor for RtServer{
    type Context = Context<Self>;
    fn started(&mut self, _ctx: &mut Self::Context) {
        
    }
    fn stopped(&mut self, _ctx: &mut Self::Context) {
        
    }
}

impl Handler<messages::Connect> for RtServer{
    type Result = MessageResult<Connect>;

    fn handle(&mut self, msg: messages::Connect, _ctx: &mut Self::Context) -> Self::Result {
        // 
        //self.broadcast("New user", None);
        // create session id and map it to the address of the client
        let id = Uuid::new_v4();
        let addr = msg.addr;
        // if there is a default dmx actor
        match &self.default_dmx_actor{
            Some(dmx_actor) => {
                // fetch the current universe state from that actor
                dmx_actor.do_send(messages::ActorSendUniverse(id.clone()));
            }
            // if there is no default dmx actor
            None => {
                // send an error message
                let kind = messages::ServerMessageKind::Error;
                let content = "No dmx actor available";
                let msg = messages::ServerMessage::new(kind, content);
                addr.do_send(msg);
            }
        }

        self.sessions.insert(id, addr);
        // map websocket to a dmx port and universe        
        // Get the app state and send it back to the client
        // send back id
        MessageResult(id)
    }
}

impl Handler<messages::Disconnect> for RtServer {
    type Result = ();

    fn handle(&mut self, msg: messages::Disconnect, _ctx: &mut Self::Context) -> Self::Result {
        self.sessions.remove(&msg.id);

    }
}
/*
impl Handler<messages::ClientMessage> for RtServer {
    type Result = ();

    fn handle(&mut self, msg: messages::ClientMessage, _: &mut Context<Self>) {
        self.broadcast(msg.msg.as_str(), Some(msg.id));
    }
}*/

impl Handler<messages::FixtureUpdateMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureUpdateMessage, _ctx: &mut Self::Context) -> Self::Result {
        log::info!("hier");
        match &self.default_dmx_actor{
            // if there is a default dmx actor
            Some(dmx_actor) => {
                // update the fixture in the dmx actor   
                let fixture = &msg.fixture;
                // broadcast the update message to the other clients
                let kind = messages::ServerMessageKind::FixtureUpdate;
                let broadcast_message = ServerMessage::new(kind, &serde_json::to_string(fixture).unwrap());
                match msg.id{
                    Some(skip_id) => self.broadcast(broadcast_message, Some(skip_id)),
                    None => self.broadcast(broadcast_message, None)
                }
                
                dmx_actor.do_send(msg);


            }
            // if there is no default dmx actor
            None => {
                // Panicing is the wanted behaviour here, because if the id provided by the message 
                // doesn't equal any stored id then we have lost the ability to send messages to this
                // client
                let client = self.sessions.get(&(msg.id.unwrap())).unwrap();
                let kind = messages::ServerMessageKind::Error;
                let error_message = "No default dmx actor selected";
                client.do_send(ServerMessage::new(kind, error_message));
                log::error!("No default dmx actor selected");
            }
        };
    }
}

impl Handler<messages::FixtureAddMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureAddMessage, _ctx: &mut Self::Context) -> Self::Result {
        match &self.default_dmx_actor{
            Some(dmx_actor) => {
                let skip_id = msg.id;
                let fixture = &msg.fixture;
                // broadcast the update message to the other clients
                let kind = messages::ServerMessageKind::FixtureAdd;
                let broadcast_message = ServerMessage::new(kind, &serde_json::to_string(&fixture).unwrap());
                self.broadcast(broadcast_message, Some(skip_id));
                dmx_actor.do_send(msg);
            }

            None => {
                let client = self.sessions.get(&msg.id).unwrap();
                let kind = messages::ServerMessageKind::Error;
                let error_message = "No default dmx actor selected";
                client.do_send(ServerMessage::new(kind, error_message));
                log::error!("No default dmx actor selected");
            }
        }
    }
}

impl Handler<messages::FixtureRemoveMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureRemoveMessage, _ctx: &mut Self::Context) -> Self::Result {
        match &self.default_dmx_actor{
            Some(dmx_actor) => {
                let skip_id = msg.id;
                let fixture = &msg.fixture;
                // broadcast the update message to the other clients
                let kind = messages::ServerMessageKind::FixtureRemove;
                let broadcast_message = ServerMessage::new(kind, &serde_json::to_string(&fixture).unwrap());
                self.broadcast(broadcast_message, Some(skip_id));
                dmx_actor.do_send(msg);
            }

            None => {
                let client = self.sessions.get(&msg.id).unwrap();
                let kind = messages::ServerMessageKind::Error;
                let error_message = "No default dmx actor selected";
                client.do_send(ServerMessage::new(kind, error_message));
                log::error!("No default dmx actor selected");
            }
        }
    }
}

impl Handler<messages::NewDmxActor> for RtServer{
    type Result = MessageResult<NewDmxActor>;

    fn handle(&mut self, msg: messages::NewDmxActor, _ctx: &mut Self::Context) -> Self::Result {
        let id = Uuid::new_v4();
        let addr = msg.addr;

        self.default_dmx_actor = Some(addr);
        MessageResult(id)   
    }
}

impl Handler<messages::SendUniverse> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::SendUniverse, _ctx: &mut Self::Context) -> Self::Result {
        let kind = messages::ServerMessageKind::Universe;
        let content = serde_json::to_string(&msg.universe).unwrap();
        log::info!("{content}");
        let message = ServerMessage::new(kind, &content);
        // match msg.id{
        //     Some(id) => {
                let client = self.sessions.get(&msg.id).unwrap();
                client.do_send(message.clone());
            // }
            // None => {
                self.broadcast(message, None);
            // }
        // }
    }
}


impl Handler<messages::DefaultActor> for RtServer{
    type Result = Result<Addr<DmxActor>, ()>;

    fn handle(&mut self, _msg: messages::DefaultActor, _ctx: &mut Self::Context) -> Self::Result {
        match &self.default_dmx_actor {
            Some(actor) => Ok(actor.clone()),
            None => Err(())
        }
        // Ok(self.default_dmx_actor)
    }
}