use std::{
    collections::{HashMap}, sync::{Arc}, fs::{self, read_to_string}
};
use actix::prelude::*;
use uuid::Uuid;
use crate::{websockets::messages, actors::dmx::dmxactor::DmxActor, dmx_api::universe::Universe};
use crate::state::AppState;

use super::messages::{Connect, ServerMessage};

#[derive(Debug, Clone)]
pub struct RtServer{
    sessions: HashMap<Uuid, Recipient<messages::ServerMessage>>,
    // every session is mapped to a DmxActor which contains the Universe state 
    default_dmx_actor: Option<Addr<DmxActor>>,
    session_dmxactor_mapping: HashMap<Uuid, Option<Addr<DmxActor>>>, 
    app_state: Arc<AppState>
}

impl RtServer{
    pub fn new(app_state: Arc<AppState>, default_dmx_actor: Option<Addr<DmxActor>>) -> RtServer {
        RtServer {
            sessions: HashMap::new(),
            default_dmx_actor,
            session_dmxactor_mapping: HashMap::new(),
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
    fn started(&mut self, ctx: &mut Self::Context) {
        
    }
    fn stopped(&mut self, ctx: &mut Self::Context) {
        
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

        let app_state_msg = &(*self.app_state);
        addr.do_send(messages::ServerMessage(serde_json::to_string(app_state_msg).unwrap()));

        self.sessions.insert(id, addr);
        // map websocket to a dmx port and universe
        match &self.default_dmx_actor {
            Some(dmx_actor) => {self.session_dmxactor_mapping.insert(id, Some(dmx_actor.clone()));}
            None => ()
        }
        
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

impl Handler<messages::ClientMessage> for RtServer {
    type Result = ();

    fn handle(&mut self, msg: messages::ClientMessage, _: &mut Context<Self>) {
        self.broadcast(msg.msg.as_str(), Some(msg.id));
    }
}

impl Handler<messages::FixtureUpdateMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureUpdateMessage, _ctx: &mut Self::Context) -> Self::Result {
        let state = Arc::get_mut(&mut self.app_state).unwrap();
        let message = serde_json::to_string(&msg.fixture).unwrap();
        let skip_id = msg.id;
        let fixture = msg.fixture;
        let universe = state.universe.get_mut().unwrap();
        match universe{
            Some(universe) => {
                match universe.update_fixture(fixture){
                    // If fixture has been updated, broadcast the updated fixture to all the other connections except the one
                    // that has sent the update message and update the dmx data
                    Ok(_) => {
                        state.tx.lock().unwrap().send(universe.data()).unwrap();
                        self.broadcast(&message, Some(skip_id));
                    },
                    // Else, send the Error back to the client
                    Err(f) => {
                        let addr = self.sessions.get(&skip_id).unwrap();
                        addr.do_send(ServerMessage(f.0));
                    }
                };
        
            }
            // Panic is ok here, the user shouldn't be able to update a fixture if there is no universe
            None => {
                self.sessions.get(&msg.id).unwrap().do_send(ServerMessage(String::from("No Universe selected!")));
            }
        }
    }
}

impl Handler<messages::FixtureAddMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureAddMessage, _ctx: &mut Self::Context) -> Self::Result {
        let state = Arc::get_mut(&mut self.app_state).unwrap();
        let message = serde_json::to_string(&msg.fixture).unwrap();
        let skip_id = msg.id;
        let fixture = msg.fixture;
        let universe = state.universe.get_mut().unwrap();
        match universe{
            Some(universe) => {
                universe.add_fixture(fixture);
                self.broadcast(&message, Some(skip_id))
            }
            None => {
                self.sessions.get(&msg.id).unwrap().do_send(ServerMessage(String::from("No Universe selected!")));
            }
        }
    }
}

impl Handler<messages::FixtureRemoveMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::FixtureRemoveMessage, _ctx: &mut Self::Context) -> Self::Result {
        let state = Arc::get_mut(&mut self.app_state).unwrap();
        let message = serde_json::to_string(&msg.fixture).unwrap();
        let skip_id = msg.id;
        let fixture = msg.fixture;
        let universe = state.universe.get_mut().unwrap();
        match universe{
            Some(universe) => {
                let fixture_index = match universe.index_of(&fixture){
                    Some(index) => index,
                    None => {
                        self.sessions.get(&msg.id).unwrap().do_send(ServerMessage(String::from("Fixture doesn't exist!")));
                        return()
                    }
                };
                universe.remove_fixture(fixture_index);
                self.broadcast(&message, Some(skip_id))
            }
            None => {
                self.sessions.get(&msg.id).unwrap().do_send(ServerMessage(String::from("No Universe selected!")));
            }
        }
    }
}

impl Handler<messages::SetDefaultActorMessage> for RtServer{
    type Result = ();

    fn handle(&mut self, msg: messages::SetDefaultActorMessage, _ctx: &mut Self::Context) -> Self::Result {
        self.default_dmx_actor = Some(msg.0);
    }
}