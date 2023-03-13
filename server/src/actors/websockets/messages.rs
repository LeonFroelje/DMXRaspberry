use actix::{Message, Addr};
use actix::prelude::Recipient;
use serde::Serialize;
use crate::{dmx_api::fixture::{Fixture}, actors::dmx::dmxactor::DmxActor};
use uuid::Uuid;
use crate::dmx_api::universe::Universe;

#[derive(Serialize, Clone)]
pub enum ServerMessageKind{
    Error,
    Universe,
    FixtureUpdate,
    FixtureAdd,
    FixtureRemove,
}

#[derive(Message, Serialize, Clone)]
#[rtype(result = "()")]
pub struct ServerMessage{
    pub kind: ServerMessageKind,
    pub msg: String
}

impl ServerMessage{
    pub fn new(kind: ServerMessageKind, msg: &str) -> Self{
        Self{
            kind,
            msg: String::from(msg)
        }
    }
}


#[derive(Message)]
#[rtype(result = "Uuid")]
pub struct Connect{
    pub addr: Recipient<ServerMessage>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect{
    pub id: Uuid
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct ClientMessage {
    /// Id of the client session
    pub id: Uuid,
    /// Peer message
    pub msg: String,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct FixtureUpdateMessage{
    pub id: Uuid,
    pub fixture: Fixture
}

impl FixtureUpdateMessage{
    pub fn new(id: Uuid, fixture: Fixture) -> Self{
        Self { id: id, fixture: fixture }
    }
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct FixtureAddMessage{
    pub id: Uuid,
    pub fixture: Fixture,
}

impl FixtureAddMessage{
    pub fn new(id: Uuid, fixture: Fixture) -> Self{
        Self { id: id, fixture: fixture }
    }
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct FixtureRemoveMessage{
    pub id: Uuid,
    pub fixture: Fixture
}

impl FixtureRemoveMessage{
    pub fn new(id: Uuid, fixture: Fixture) -> Self{
        Self { id: id, fixture: fixture }
    }
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct SetDefaultActorMessage(pub Addr<DmxActor>);


#[derive(Message)]
#[rtype(Uuid)]
pub struct NewDmxActor{
    pub addr: Addr<DmxActor>
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct GetUniverse(pub Option<Uuid>);


#[derive(Message)]
#[rtype(result = "()")]
pub struct SendUniverse{
    pub id: Option<Uuid>,
    pub universe: Universe
}

impl SendUniverse{
    pub fn new(id: Option<Uuid>, universe: Universe) -> Self{
        Self { id, universe }
    }
}