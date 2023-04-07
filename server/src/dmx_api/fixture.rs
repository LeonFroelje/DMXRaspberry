use std::collections::HashMap;

use crate::dmx_api::channel::Channel;
use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize, Debug, Eq, Clone)]
pub struct Fixture{
    id: u64,
    name: String,
    modes: Vec<Vec<Channel>>,
    active_mode: Vec<Channel>,
    // channels: Vec<Channel>,
    manufacturer: String,
    model: String,
    fixture_type: FixtureType,
}

impl Fixture {
    pub fn new(name: String, id: u64, modes: Vec<Vec<Channel>>, active_mode: Option<Vec<Channel>>, 
        channels: Vec<Channel>, manufacturer: String, model: String, fixture_type: FixtureType) -> Fixture {
        match active_mode{
            Some(active_mode) => Fixture{
                id: id,
                name: name,
                modes: modes,
                active_mode: active_mode,
                // channels: channels,
                manufacturer: manufacturer,
                model: model,
                fixture_type: fixture_type
            },
            None => {
                let active_mode = modes.get(0).unwrap().clone();
                Fixture{
                    name: name,
                    id: id,
                    modes: modes,
                    active_mode: active_mode,
                    // channels: channels,
                    manufacturer: manufacturer,
                    model: model,
                    fixture_type: fixture_type
                }
            }
    
    
        }
    }

    pub fn address(&self) -> &u16{
        self.active_mode.get(0).unwrap().address()
    }


    pub fn modes(&self) -> &Vec<Vec<Channel>>{
        &self.modes
    }

    pub fn channels(&self) -> &Vec<Channel>{
        &self.active_mode
    }

    pub fn set_channel(&mut self, channel_nr: usize, data: u8) -> Result<(), &str>{
        match self.active_mode.get_mut(channel_nr){
            Some(channel) => {
                channel.set_data(data);
                Ok(())
            },
            None => Err("Channel number out of bounds")
        }
    }

    pub fn update_channels(&mut self, channels: Vec<Channel>){
        self.active_mode = channels;
    }
    
    pub fn id(&self) -> u64{
        self.id
    }
}

impl PartialEq for Fixture{
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}


#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Clone)]
pub enum FixtureType{
    ColorChanger,
    Dimmer,
    Effect,
    Fan,
    Flower,
    Hazer,
    Laser,
    MovingHead,
    Other,
    Scanner,
    Smoke,
    Strobe,
    LedBarStrahlen,
    LedBarPixel
}

#[cfg(test)]
mod tests{
    use super::Fixture;
    use super::Channel;
    use crate::dmx_api::channel::ChannelType;
    use std::collections::BTreeMap;
    use std::collections::HashMap;

    #[test]
    pub fn test_set_channel(){
        let mut channels: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, ChannelType::Intensity,
             0x00, BTreeMap::new()));
        }
        let mut fixture = Fixture::new(String::from("t1"), 1, vec![channels.clone()], None, channels, String::from("test"),
         String::from("test"), crate::dmx_api::fixture::FixtureType::ColorChanger);
        fixture.set_channel(0, 0x11).unwrap();
        assert_eq!(fixture.channels().get(0).unwrap().data(), &0x11);
    }
    /*
    #[test]
    pub fn test_serialize(){
        let expected = String::from("{\"name\":\"t1\",\"_id\":\"424ca5a2-2a0c-4ddb-8249-9e1a6937390d\",\"channels\":[{\"address\":1,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":2,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":3,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":4,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}},{\"address\":5,\"data\":0,\"channel_type\":{\"Intensity\":[]},\"default_value\":0,\"capabilities\":{}}],\"manufacturer\":\"test\",\"model\":\"test\",\"kind\":\"test\"}");

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