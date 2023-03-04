use serde_big_array::BigArray;

use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Scene{
    name: String,
    universe: String,
    #[serde(with = "BigArray")]
    data: [u8; 512]
}