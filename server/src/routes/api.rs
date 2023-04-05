use actix_web::{web::{Payload, Data}, Error, HttpRequest, HttpResponse, http::StatusCode};
use actix::Addr;
use crate::actors::websockets::messages;

use crate::actors::websockets::server::RtServer;


pub async fn index(req: HttpRequest, stream: Payload, srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    let universe = srv.send(messages::DefaultActor::new())
        .await
        .unwrap()
        .unwrap()
        .send(messages::GetUniverse())
        .await
        .unwrap()
        .unwrap();
    Ok(HttpResponse::Ok().json(universe))
}