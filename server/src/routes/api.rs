use actix_web::{web::{Data, self}, Error, HttpResponse, };
use actix::Addr;
use crate::{actors::{websockets::messages, dmx::dmxactor::DmxActor}, dmx_api::{fixture::Fixture, universe::{Universe}}};
use crate::actors::websockets::server::RtServer;

async fn get_universe(srv: Data<Addr<RtServer>>) -> Universe{
        get_default_actor(srv)
        .await
        .send(messages::GetUniverse())
        .await
        .unwrap()
        .unwrap()
}

async fn get_default_actor(srv: Data<Addr<RtServer>>) -> Addr<DmxActor>{
    srv.send(messages::DefaultActor::new())
        .await
        .unwrap()
        .unwrap()
}


pub async fn index(srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    let universe = get_universe(srv).await;
    Ok(HttpResponse::Ok().json(universe))
}

pub async fn fixture_update(fixture: web::Json<Fixture>, srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    let fixture = fixture.0;
    srv.do_send(messages::FixtureUpdateMessage::new(None, fixture));
    Ok(HttpResponse::Ok().json(""))
}