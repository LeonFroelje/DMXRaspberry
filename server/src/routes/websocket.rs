use std::time::{ Duration };
use actix_web::{web::{self}, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;

use crate::websockets::datasocket::DataSocket;

pub async fn echo_ws(req: HttpRequest, stream: web::Payload) -> Result<HttpResponse, Error> {
    println!("Request received");
    ws::start(DataSocket::new(), &req, stream)
}