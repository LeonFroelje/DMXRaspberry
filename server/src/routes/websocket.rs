use actix_web::{web::{Payload, Data}, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use actix::Addr;
use crate::dmx_api::fixture::Fixture;
use serde_json;
use crate::websockets::messages;
use crate::websockets::server::RtServer;

use crate::websockets::datasocket::DataSocket;

pub async fn echo_ws(req: HttpRequest, stream: Payload, srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    println!("Request received");
    ws::start(DataSocket::new(srv.get_ref().to_owned()), &req, stream)
}
/*
pub fn handle_ws_text<T>(v: Vec<&str>) -> Result<T, WsHandlingError>
where
    T: Message + Send{
    let url = v[0];
    match url {
        "/fixture" => {
            match v.len(){
                1 => {
                    Err(WsHandlingError::RuntimeError("Fixture required!"))
                }
                2 => {
                    let fixture: Result<Fixture, Error> = serde_json::from_str(v[1]);
                    match fixture {
                        Ok(fixture) => {
                            Ok(messages::FixtureUpdateMessage::new(self.id, fixture))
                        }
                        Err(_) => {

                        }
                    }
                }
            }
        },

        _ => Err(WsHandlingError::UrlNotFoundError)
    }
}
*/
pub enum WsHandlingError{
    UrlNotFoundError,
    RuntimeError(String),
}