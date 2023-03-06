use std::sync::mpsc::Sender;
use std::sync::Mutex;
use actix_web::App;
use serde::ser::{Serializer, SerializeStruct};
use serde::{Deserialize, Serialize};

use crate::dmx_api::fixture::Fixture;
use crate::dmx_api::{ universe::Universe, program::Program };
/// The app state consists of the mode the app is currently in and the DMX universe
/// the app operates in at the current moment. 
#[derive(Debug)]
pub struct AppState{
    mode: Mutex<Mode>,
    universe: Mutex<Universe>,
    tx: Sender<[u8; 512]>
}

impl Serialize for AppState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        // 3 is the number of fields in the struct.
        let mut state = serializer.serialize_struct("AppState", 2)?;
        state.serialize_field("mode", &self.mode)?;
        state.serialize_field("universe", &self.universe)?;
        state.end()
    }
}

/// The app can either be in programming mode or in play mode. In each of those
/// modes the app uses or manipulates some programmable data structure such as
/// a cyclical program or some timecode program. The distinction of the two modes
/// is necessary in order to prevent different users from attempting to create
/// a new program while another one is running and thus producing unwanted output
/// to the fixtures.
#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum Mode{
    Programming(Option<Program>),
    Play(Program),
}

impl AppState{
    pub fn new(universe: Universe, tx: Sender<[u8; 512]>) -> AppState{
        AppState{
            mode: Mutex::new(Mode::Programming(None)),
            universe: Mutex::new(universe),
            tx
        }
    }
    
    pub fn universe(&self) -> &Mutex<Universe>{
        &self.universe
    }

    /*pub fn universe_mut(&mut self) -> &mut Universe{
        &mut self.universe
    }*/
}