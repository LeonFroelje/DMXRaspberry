use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone, Copy)]
pub enum Program{
    Cyclical(),
    Timecode(),
    Random(),
}