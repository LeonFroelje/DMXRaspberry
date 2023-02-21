use crate::fixture::Fixture;
use dmx_serial::posix::TTYPort;
use serde::{Deserialize, Serialize};
use serde_json;


#[derive(Serialize, Deserialize, Debug, Hash, PartialEq, Eq)]
// Represents a DMX universe.
// A DMX universe consists of 512 channels 
pub struct Universe{     
    name: String,
    fixtures: Vec<Fixture>
}

impl Universe{
    pub fn new(name: String, fixtures: Vec<Fixture>) -> Universe{
        
        Universe{
            name: name,
            fixtures: fixtures
        }
    }

    pub fn add_fixture(&mut self, fixture: Fixture) -> (){
        self.fixtures.push(fixture);
    }

    pub fn remove_fixture(&mut self, index: usize) -> Fixture{
        self.fixtures.remove(index)
    }

    pub fn data(&self) ->  [u8; 512]{
        let mut data = [0x00; 512];
        for fixture in &self.fixtures{
            let start_address = fixture.address();
            let mut i = 0;
            for channel in fixture.channels(){
                data[(start_address + i) as usize] = *channel.data();
                i += 1;
            }
        }
        data        
    }
}


pub struct UniverseState<'a>{
    port: &'a TTYPort,
    channels: &'a [u8; 512]
}

#[cfg(test)]
mod tests{
    use std::collections::BTreeMap;
    use std::fs::{File, read_to_string};
    use std::io::Write;
    use crate::channel::Channel;
    use super::Fixture;
    use super::Universe;
    #[test]
    fn test_data(){
        let mut expected: [u8; 512] = [0x00; 512];

        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, String::from("test1"),
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, String::from("test2"),
             0x00, BTreeMap::new()));
            expected[i as usize] = i.try_into().unwrap();
            expected[(i + 6) as usize] = (i+6).try_into().unwrap();
        }
        let f = Fixture::new(String::from("t1"), channels, String::from("test"),
         String::from("test"), String::from("test"));
        let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"),
         String::from("test"), String::from("test"));
        let fixtures = vec![f, f_2];
        let mut universe = Universe::new(String::from("kek"), fixtures);
        
        assert_eq!(universe.data(), expected)
    }

    #[test]
    fn test_serialize(){
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..7{
            channels.push(Channel::new(i, String::from("test1"),
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, String::from("test2"),
             0x00, BTreeMap::new()));
        }
        let f = Fixture::new(String::from("t1"), channels, String::from("test"),
         String::from("test"), String::from("test"));
        let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"),
         String::from("test"), String::from("test"));
        let fixtures = vec![f, f_2];
        let universe = Universe::new(String::from("kek"), fixtures);

        let s = serde_json::to_string_pretty(&universe).unwrap();
        
        let mut file = File::create("./test.json").unwrap();
        file.write_all(s.as_bytes()).unwrap();
    }

    fn test_deserialize(){
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..7{
            channels.push(Channel::new(i, String::from("test1"),
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, String::from("test2"),
             0x00, BTreeMap::new()));
        }
        let f = Fixture::new(String::from("t1"), channels, String::from("test"),
         String::from("test"), String::from("test"));
        let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"),
         String::from("test"), String::from("test"));
        let fixtures = vec![f, f_2];
        let expected = Universe::new(String::from("kek"), fixtures);

        let s = read_to_string("./test.json").unwrap();
        let universe: Universe = serde_json::from_str(&s).unwrap();

        assert_eq!(universe, expected);
    }
}