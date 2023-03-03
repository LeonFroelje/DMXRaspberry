use std::default;

use serde::{ Deserialize, Serialize };

#[derive(Deserialize, Serialize)]
pub struct ServerConfig{
    defaultUniverse: String,
    defaultPort: String
}

impl ServerConfig {
    pub fn port(&self) -> &String{
        &self.defaultPort
    }

    pub fn port_mut(&mut self) -> &mut String{
        &mut self.defaultPort
    }

    pub fn default_universe(&self) -> &String{
        &self.defaultUniverse
    }

    pub fn default_universe_mut(&mut self) -> &mut String{
        &mut self.defaultUniverse
    }
}
