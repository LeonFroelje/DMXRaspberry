use crate::channel::Channel;

pub struct Fixture{
    channels: Vec<Channel>    
}

impl Fixture{
    pub fn new(channels: Vec<Channel>) -> Fixture {
        Fixture{
            channels: channels
        }
    }

    pub fn get_address(&self) -> u16{
        self.channels.get(0).unwrap().get_address()
    }

    pub fn get_channels(&self) -> &Vec<Channel>{
        &self.channels
    }
}