use crate::config::ServerConfig;
use crate::websockets::server::RtServer;

use std::fs::read_to_string;

use actix::prelude::*;

use actix_web::{ HttpServer, App, web, Responder, HttpResponse };
use actix_web::middleware::Logger;
use env_logger::Env;
use actix_files::Files;

use actors::websockets;
use actors::dmx::dmxactor::DmxActor;

use routes::websocket;

mod config;
mod actors;
mod dmx_api;
mod routes;

const HOST: &str = "0.0.0.0";
const PORT: u16 = 8000;


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let bind = format!("{HOST}:{PORT}");
    // Read config
    let cnf = read_config();
    let default_port = cnf.port().clone();
    let default_universe = cnf.default_universe().clone();
    // Server used for websocket communication and providing an interface between the routes
    // and the DMX runtime
    let rt_server = RtServer::new().start();

    // Default actor for the Dmx runtime. Actor sends the actual data to the desired Serial port
    // and thus the fixtures
    println!("{default_port}");
    let default_dmx_actor = DmxActor::new(default_port, default_universe, rt_server.clone()).unwrap();
    // Async execution for starting the default dmx actor
    let execution = async {
        default_dmx_actor.start();
    };
    // Create new runtime and start the default dmx actor on it
    let dmx_runtime = Arbiter::new();
    dmx_runtime.spawn(execution);

    // Http api
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(rt_server.clone()))
            .service(
                web::scope("/api")
                .service(web::resource("/ws").route(web::get().to(websocket::create_socket)))
                .service(web::resource("/lel").route(web::get().to(lel)))
                .wrap(Logger::default())
                .wrap(Logger::new("%a %{User-Agent}i"))
            )
            .service(Files::new("/", cnf.react_build_path()).index_file("index.html"))
        })
    .bind(&bind)?
    .run()
    .await
}

async fn lel() -> impl Responder{
    HttpResponse::Ok().body("lel")
}

fn read_config() -> ServerConfig{
    // unwrap because config file should always be there by default
    let cnf_file = match read_to_string("./config.json"){
        
    };
    serde_json::from_str(&cnf_file).unwrap()
}