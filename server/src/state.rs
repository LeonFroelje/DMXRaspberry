use std::sync::Mutex;
use std::sync::mpsc::Sender;
use serde::ser::{Serializer, SerializeStruct};
use serde::{Deserialize, Serialize};

use crate::dmx_api::{ universe::Universe, program::Program };
/// The app state consists of the mode the app is currently in and the DMX universe
/// the app operates in at the current moment. 
#[derive(Debug)]
pub struct AppState{
    pub mode: Mutex<Mode>,
    pub universe: Mutex<Option<Universe>>,
    pub tx: Mutex<Sender<[u8; 512]>>
}

impl Serialize for AppState {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        // 3 is the number of fields in the struct.
        let mut state = serializer.serialize_struct("AppState", 2)?;
        let mode: Mode = *self.mode.lock().unwrap();
        let universe = &*self.universe.lock().unwrap();
        state.serialize_field("mode", &mode)?;
        state.serialize_field("universe", universe)?;
        state.end()
    }
}

/// The app can either be in programming mode or in play mode. In each of those
/// modes the app uses or manipulates some programmable data structure such as
/// a cyclical program or some timecode program. The distinction of the two modes
/// is necessary in order to prevent different users from attempting to create
/// a new program while another one is running and thus producing unwanted output
/// to the fixtures.
#[derive(Debug, Deserialize, Serialize, Clone, Copy)]
pub enum Mode{
    Programming(Option<Program>),
    Play(Program),
}

impl AppState{
    pub fn new(universe: Option<Universe>, tx: Sender<[u8; 512]>) -> AppState{
        AppState{
            mode: Mutex::new(Mode::Programming(None)),
            universe: Mutex::new(universe),
            tx: Mutex::new(tx),
        }
    }
}