use crate::config::ServerConfig;
use crate::dmx_api::universe::Universe;
use crate::websockets::server::RtServer;

use std::fs::{read_to_string, self};

use actix::prelude::*;

use actix_web::{ HttpServer, App, web };
use actix_web::middleware::Logger;
use db::create_mongo_client;
use env_logger::Env;
use actix_files::Files;
use actix_cors::Cors;

use actors::websockets;
use actors::dmx::dmxactor::DmxActor;

use mongodb::{self, Database, Collection};
use mongodb::bson::oid::ObjectId;
use log::info;
use routes::websocket;
use routes::api;

mod config;
mod actors;
mod dmx_api;
mod routes;
mod db;

const HOST: &str = "0.0.0.0";
const PORT: u16 = 4000;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db_collections = vec![String::from("fixtures"), String::from("universes"), String::from("programs"), String::from("scenes"),];
    env_logger::init_from_env(Env::default().default_filter_or("info"));
    let bind = format!("{HOST}:{PORT}");
    // Read config
    let cnf = match read_config(){
        None => {
            info!("Config file couldn't be read");
            return Err(std::io::Error::new(std::io::ErrorKind::Other, ""));
        }
        Some(c) => c
    };
    let default_port = cnf.port().clone();
    let default_universe = cnf.default_universe().clone();
    // connect to db
    // let client = create_mongo_client().await;
    // let db = client.database("dmxraspberry");
    // let collections = db.list_collection_names(None)
    //     .await
    //     .unwrap();
    // let missing_collections = db_collections.iter()
    //     .filter(|s| !collections.contains(s));
    // // create missing collections
    // for collection in missing_collections{
    //     log::info!("{}", collection);
    //     match db.create_collection(collection, None).await{
    //         Ok(_) => {},
    //         Err(e) => panic!("{}", e)
    //     };
    //     if collection == "universes"{
    //         let universes: Collection<Universe> = db.collection(&collection);
    //         let universe: Universe = serde_json::from_str(&fs::read_to_string(format!("./Universes/{default_universe}.json")).unwrap()).unwrap();
    //         universes.insert_one(universe, None).await.unwrap();
    //     }
    // }
    // Server used for websocket communication and providing an interface between the routes
    // and the DMX runtime
    let rt_server = RtServer::new().start();

    // Default actor for the Dmx runtime. Actor sends the actual data to the desired Serial port
    // and thus the fixtures
    let default_dmx_actor = match DmxActor::new(default_port, default_universe, rt_server.clone()){
        Ok(actor) => actor,
        Err(e) => {
            info!("{e}");
            return Err(std::io::Error::new(std::io::ErrorKind::Other, "Error initializing the default DMX actor"));
        }
    };
    // Async execution for starting the default dmx actor
    let execution = async {
        default_dmx_actor.start();
    };
    // Create new runtime and start the default dmx actor on it
    let dmx_runtime = Arbiter::new();
    dmx_runtime.spawn(execution);

    // Http api
    HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().send_wildcard();
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(rt_server.clone()))
            // .app_data(web::Data::new(db.clone()))
            .service(
                web::scope("/api")
                .service(web::resource("/ws").route(web::get().to(websocket::create_socket)))
                .service(web::resource("/index").route(web::get().to(api::index)))
                .service(web::resource("/fixtures/update").route(web::post().to(api::fixture_update)))
                .wrap(Logger::default())
                .wrap(Logger::new("%a %{User-Agent}i"))
            )
            .service(Files::new("/", cnf.react_build_path()).index_file("index.html"))
        })
    .bind(&bind)?
    .run()
    .await
}

fn read_config() -> Option<ServerConfig>{
    // unwrap because config file should always be there by default
    let cnf_file = match read_to_string("./config.json"){
        Ok(str) => str,
        Err(e) => {
            info!("{e}");
            return None;
        }
    };
    Some(serde_json::from_str(&cnf_file).unwrap())
}