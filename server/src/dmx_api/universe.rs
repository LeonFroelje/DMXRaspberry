use crate::dmx_api::fixture::Fixture;
use serde::{Deserialize, Serialize};

use super::program::Program;



#[derive(Serialize, Deserialize, Debug, PartialEq, Eq, Clone)]
// Represents a DMX universe.
// A DMX universe consists of 512 channels 
pub struct Universe{  
    id: u64,   
    name: String,
    mode: Mode,
    fixtures: Vec<Fixture>
}

impl Universe{
    pub fn new(id: u64, name: String, fixtures: Vec<Fixture>) -> Universe{
        // Maybe add a lookup table for the channels which maps the channel number to 
        // the corresponding fixture channel reference
        // If done that way it's going to be more efficient.
        Universe{
            id: id,
            name: name,
            mode: Mode::Programming(None),
            fixtures: fixtures
        }
    }

    pub fn name(&self) -> &String{
        &self.name
    }

    pub fn set_name(&mut self, new_name: String) -> (){
        self.name = new_name;
    }

    pub fn fixtures(&self) -> &Vec<Fixture>{
        &self.fixtures
    }

    pub fn fixtures_mut(&mut self) -> &mut Vec<Fixture>{
        &mut self.fixtures
    }

    pub fn add_fixture(&mut self, fixture: Fixture) -> (){
        self.fixtures.push(fixture);
    }

    pub fn remove_fixture(&mut self, index: usize) -> Fixture{
        self.fixtures.remove(index)
    }

    fn search_fixture_mut(&mut self, fixture: &Fixture) -> Option<&mut Fixture>{
        for f in self.fixtures.iter_mut(){
            if f == fixture{
                return Some(f);
            }
        }
        None
    }

    pub fn update_fixture(&mut self, fixture: Fixture) -> Result<(), FixtureNotFoundError>{
        let f = match self.search_fixture_mut(&fixture){
            Some(f) => f,
            None => {
                return Err(FixtureNotFoundError(String::from(format!("Fixture {:?} not found", fixture))));
            }
        };
        let c = fixture.channels().to_vec();
        f.update_channels(c);
        Ok(())
        
    }

    pub fn index_of(&self, fixture: &Fixture) -> Option<usize>{
        self.fixtures.iter()
        .position(|f| f == fixture)
    }


    pub fn data(&self) ->  [u8; 512]{
        let mut data = [0x00; 512];
        for fixture in &self.fixtures{
            let start_address = fixture.address();
            let mut i = 0;
            for channel in fixture.channels(){
                data[(start_address + i - 1) as usize] = *channel.data();
                i += 1;
            }
        }
        data        
    }
}

/// The app can either be in programming mode or in play mode. In each of those
/// modes the app uses or manipulates some programmable data structure such as
/// a cyclical program or some timecode program. The distinction of the two modes
/// is necessary in order to prevent different users from attempting to create
/// a new program while another one is running and thus producing unwanted output
/// to the fixtures.
#[derive(Debug, Deserialize, Serialize, Clone, Copy, PartialEq, Eq)]
pub enum Mode{
    Programming(Option<Program>),
    Playing(Program),
}

#[derive(Debug)]
pub struct FixtureNotFoundError(pub String);


#[cfg(test)]
mod tests{
    use std::collections::{BTreeMap, HashMap};
    use std::fs::{File, read_to_string};
    use std::io::Write;
    use crate::dmx_api::channel::{ Channel, ChannelType };
    use super::Fixture;
    use super::Universe;

    fn init() -> Universe{
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..7{
            channels.push(Channel::new(i, ChannelType::Intensity,
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, ChannelType::Intensity,
             0x00, BTreeMap::new()));
        }
        let fixture = Fixture::new(String::from("t1"), 1, vec![channels.clone()], None, channels, String::from("test"),
         String::from("test"), crate::dmx_api::fixture::FixtureType::ColorChanger);
         let fixture_2 = Fixture::new(String::from("t1"), 2, vec![channels_2.clone()], None, channels_2, String::from("test"),
         String::from("test"), crate::dmx_api::fixture::FixtureType::ColorChanger);
        let fixtures = vec![fixture, fixture_2];
        Universe::new(1, String::from("kek"), fixtures)
    }

    #[test]
    fn test_data(){
        let mut expected: [u8; 512] = [0x00; 512];

        for i in 1..7{
            expected[i as usize] = i.try_into().unwrap();
            expected[(i + 5) as usize] = (i+5).try_into().unwrap();
        }

        let mut universe = init();
        {
        let f_1 = universe.fixtures_mut().get_mut(0).unwrap();

        for i in 0..6{
            f_1.set_channel(i as usize, i as u8).unwrap();
        }
        }

        let f_2 = universe.fixtures_mut().get_mut(1).unwrap();

        for i in 0..6{
            f_2.set_channel(i as usize, (i+6) as u8).unwrap();
        }

        assert_eq!(universe.data(), expected)
    }

    #[test]
    fn test_serialize(){
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..7{
            channels.push(Channel::new(i, ChannelType::Intensity,
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, ChannelType::Intensity,
             0x00, BTreeMap::new()));
        }
        let mut fixture = Fixture::new(String::from("t1"), 2,
        vec![channels.clone()], None, channels,
         String::from("test"),
         String::from("test"), crate::dmx_api::fixture::FixtureType::ColorChanger);
         let mut fixture_2 = Fixture::new(String::from("t1"), 2,
         vec![channels_2.clone()], None,
          channels_2, String::from("test"),
         String::from("test"), crate::dmx_api::fixture::FixtureType::ColorChanger);
        let fixtures = vec![fixture, fixture_2];
        let universe = Universe::new(1, String::from("kek"), fixtures);

        let s = serde_json::to_string_pretty(&universe).unwrap();
        
        let mut file = File::create("./test.json").unwrap();
        file.write_all(s.as_bytes()).unwrap();
    }
/*
    #[test]
    fn test_deserialize(){
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..7{
            channels.push(Channel::new(i, ChannelType::Intensity(),
             0x00, BTreeMap::new()));
            channels_2.push(Channel::new(i + 6, ChannelType::Intensity(),
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
*/
    fn test_index_of(){
        
    }
}