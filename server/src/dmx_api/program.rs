use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Program{
    Cyclical(),
    Timecode(),
    Random(),
}