use actix::Message;
use actix::prelude::Recipient;
use crate::dmx_api::fixture::{Fixture};
use uuid::Uuid;

#[derive(Message)]
#[rtype(result = "()")]
pub struct ServerMessage(pub String);

#[derive(Message)]
#[rtype(Uuid)]
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

pub struct FixtureAddMessage{
    pub id: Uuid,
    pub fixture: Fixture,
}

pub struct FixtureRemoveMessage{
    pub id: Uuid,
    pub fixture: Fixture
}

