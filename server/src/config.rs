use std::default;

use serde::{ Deserialize, Serialize };

#[derive(Deserialize, Serialize, Clone)]
pub struct ServerConfig{
    default_universe: String,
    default_port: String,
    react_build_path: String
}

impl ServerConfig {
    pub fn port(&self) -> &String{
        &self.default_port
    }

    pub fn port_mut(&mut self) -> &mut String{
        &mut self.default_port
    }

    pub fn default_universe(&self) -> &String{
        &self.default_universe
    }

    pub fn default_universe_mut(&mut self) -> &mut String{
        &mut self.default_universe
    }

    pub fn react_build_path(&self) -> &String{
        &self.react_build_path
    }
}
