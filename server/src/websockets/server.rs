use std::{
    collections::{HashMap}, sync::Mutex
};
use actix::prelude::*;
use rand::{rngs::ThreadRng, Rng};
use uuid::Uuid;
use crate::websockets::messages;
use crate::state::AppState;

use super::messages::{Connect, ServerMessage};

#[derive(Debug)]
pub struct RtServer{
    sessions: HashMap<Uuid, Recipient<messages::ServerMessage>>,
    app_state: Mutex<AppState>
}

impl RtServer{
    pub fn new(app_state: Mutex<AppState>) -> RtServer {
        RtServer {
            sessions: HashMap::new(),
            app_state,
        }
    }

    pub fn broadcast(&self, message: &str, skip_id: Option<Uuid>){
        match skip_id{
            Some(skip_id) => {
                for(id, addr) in self.sessions.iter(){
                    if *id != skip_id{
                        addr.do_send(messages::ServerMessage(message.to_owned()));
                    }
                }
            }
            None => {
                for addr in self.sessions.values(){
                    addr.do_send(messages::ServerMessage(message.to_owned()));
                }
            }
        }        
    }
}

impl Actor for RtServer{
    type Context = Context<Self>;
}

impl Handler<messages::Connect> for RtServer{
    type Result = MessageResult<Connect>;

    fn handle(&mut self, msg: messages::Connect, ctx: &mut Self::Context) -> Self::Result {
        // 
        //self.broadcast("New user", None);
        // create session id and map it to the address of the client
        let id = Uuid::new_v4();
        let addr = msg.addr;

        let app_state_msg = &*(self.app_state.lock().unwrap());
        addr.do_send(messages::ServerMessage(serde_json::to_string(app_state_msg).unwrap()));

        self.sessions.insert(id, addr);

        // Get the app state and send it back to the client
        // send back id
        MessageResult(id)
    }
}

impl Handler<messages::Disconnect> for RtServer {
    type Result = ();

    fn handle(&mut self, msg: messages::Disconnect, ctx: &mut Self::Context) -> Self::Result {
        self.sessions.remove(&msg.id);

    }
}

impl Handler<messages::ClientMessage> for RtServer {
    type Result = ();

    fn handle(&mut self, msg: messages::ClientMessage, _: &mut Context<Self>) {
        self.broadcast(msg.msg.as_str(), Some(msg.id));
    }
}

impl Handler<messages::FixtureUpdateMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureUpdateMessage, ctx: &mut Self::Context) -> Self::Result {
        let state = self.app_state.get_mut().unwrap();
        let message = serde_json::to_string(&msg.fixture).unwrap();
        let skip_id = msg.id;
        let fixture = msg.fixture;
        let universe = state.universe();
        
        match universe.update_fixture(fixture){
            // If fixture has been updated, broadcast the updated fixture to all the other connections except the one
            // that has sent the update message
            Ok(_) => self.broadcast(&message, Some(skip_id)),
            // Else, send the Error back to the client
            Err(f) => {
                let addr = self.sessions.get(&skip_id).unwrap();
                addr.do_send(ServerMessage(f.0));
            }
        };
    }
}