use actix::{Message, Addr};
use actix::prelude::Recipient;
use actix_web::rt;
use crate::{dmx_api::fixture::{Fixture}, actors::dmx::dmxactor::DmxActor};
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
