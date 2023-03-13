use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone, Copy, PartialEq, Eq)]
pub enum Program{
    Cyclical(),
    Timecode(),
    Random(),
}