use std::{
    collections::{HashMap}, sync::Mutex
};
use actix::prelude::*;
use uuid::Uuid;
use crate::websockets::messages;
use crate::state::AppState;

#[derive(Debug)]
pub struct RtServer{
    sessions: HashMap<usize, Recipient<messages::ServerMessage>>,
    app_state: Mutex<AppState>
}

impl RtServer{
    pub fn new(app_state: Mutex<AppState>) -> RtServer {
        RtServer {
            sessions: HashMap::new(),
            app_state,
        }
    }

    pub fn broadcast(&self, message: &str, skip_id: Option<usize>){
        match skip_id{
            Some(skip_id) => {
                for(id, addr) in self.sessions.iter(){
                    if *id != skip_id{
                        addr.do_send(messages::ServerMessage(message.to_owned()));
                    }
                }
            }
            None => {
                for(id, addr) in self.sessions.iter(){
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

}

impl Handler<messages::Disconnect> for RtServer {
    
}