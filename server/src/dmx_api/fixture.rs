use std::collections::HashMap;

use crate::dmx_api::channel::Channel;
use uuid::Uuid;
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug, Hash, Eq, Clone)]
pub struct Fixture{
    name: String,
    id: Uuid,
    channels: Vec<Channel>,
    manufacturer: String,
    model: String,
    kind: String,
}

impl Fixture {
    pub fn new(name: String, channels: Vec<Channel>, manufacturer: String, model: String,
         kind: String) -> Fixture {
        Fixture{
            name: name,
            id: Uuid::new_v4(),
            channels: channels,
            manufacturer: manufacturer,
            model: model,
            kind: kind
        }
    }

    pub fn address(&self) -> &u16{
        self.channels.get(0).unwrap().address()
    }


    pub fn channels(&self) -> &Vec<Channel>{
        &self.channels
    }

    pub fn set_channel(&mut self, channel_nr: usize, data: u8) -> Result<(), &str>{
        match self.channels.get_mut(channel_nr){
            Some(channel) => {
                channel.set_data(data);
                Ok(())
            },
            None => Err("Channel number out of bounds")
        }
    }

    pub fn update_channels(&mut self, channels: Vec<Channel>){
        self.channels = channels;
    }
    
    pub fn id(&self) -> Uuid{
        self.id
    }
}

impl PartialEq for Fixture{
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

#[cfg(test)]
mod tests{
    use super::Fixture;
    use super::Channel;
    use crate::dmx_api::channel::ChannelType;
    use std::collections::BTreeMap;

    #[test]
    pub fn test_set_channel(){
        let mut channels: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, ChannelType::Intensity,
             0x00, BTreeMap::new()));
        }
        let mut fixture = Fixture::new(String::from("t1"), channels, String::from("test"),
         String::from("test"), String::from("test"));
        fixture.set_channel(0, 0x11).unwrap();
        assert_eq!(fixture.channels().get(0).unwrap().data(), &0x11);
    }
    /*
    #[test]
    pub fn test_serialize(){
        let expected = String::from("{\"name\":\"t1\",\"id\":\"424ca5a2-2a0c-4ddb-8249-9e1a6937390d\",\"channels\":[{\"address\":1,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":2,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":3,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":4,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":5,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}}],\"manufacturer\":\"test\",\"model\":\"test\",\"kind\":\"test\"}");

        let mut channels: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, ChannelType::Intensity(),
             0x00, BTreeMap::new()));
        }
        let fixture = Fixture::new(String::from("t1"), channels, String::from("test"),
         String::from("test"), String::from("test"));

        let t = serde_json::to_string(&fixture).unwrap();
        assert_eq!(expected, t);
    }*/
}