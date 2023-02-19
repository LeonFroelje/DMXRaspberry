/// Represents a single DMX channel
pub struct Channel{
    /// A channel is represented by the address its given and the data it holds 
    address: u16,
    data: u8
}

impl Channel{
    pub fn new(address: u16, data: u8) -> Channel{
        Channel{
            address: address,
            data: data
        }
    }

    pub fn get_address(&self) -> u16{
        self.address
    }

    pub fn get_data(&self) -> u8{
        self.data
    }

    pub fn set_data(&self, data: u8){
        &self.data = data;
    }
}