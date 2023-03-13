use actix_web::{web::{Payload, Data}, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use actix::Addr;
use crate::websockets::server::RtServer;

use crate::websockets::datasocket::DataSocket;

pub async fn create_socket(req: HttpRequest, stream: Payload, srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    log::info!("Websocket request received");
    let ws_conn = ws::start(DataSocket::new(srv.get_ref().clone()), &req, stream);
    log::info!("{:?}", ws_conn);
    ws_conn
}