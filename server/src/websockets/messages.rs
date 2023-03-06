use actix::Message;
use actix::prelude::Recipient;
use uuid::Uuid;

#[derive(Message)]
#[rtype(result = "()")]
pub struct ServerMessage(pub String);

#[derive(Message)]
#[rtype(result = "()")]
pub struct WsMessage{
    pub message: String,
}

#[derive(Message)]
#[rtype(usize)]
pub struct Connect{
    pub addr: Recipient<WsMessage>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect{
    pub id: usize
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct ClientMessage {
    /// Id of the client session
    pub id: usize,
    /// Peer message
    pub msg: String,
}