use crate::fixture::Fixture;
use dmx::DmxTransmitter;
use dmx_serial::SystemPort;
use serde_json;



// Represents a DMX universe.
// A DMX universe consists of 512 channels 
pub struct Universe{     
    port: SystemPort,
    fixtures: Vec<Fixture>
}

impl Universe{
    pub fn new(port: &str, fixtures: Vec<Fixture>) -> Universe{
        
        Universe{
            port: dmx::open_serial(port).unwrap(),
            fixtures: fixtures
        }
    }

    pub fn add_fixture(&mut self, fixture: Fixture) -> (){
        self.fixtures.push(fixture);
    }

    pub fn remove_fixture(&mut self, index: usize) -> Fixture{
        self.fixtures.remove(index)
    }

    pub fn send(&mut self) ->  Result<[u8; 512], dmx_serial::Error>{
        let mut data = [0x00; 512];
        for fixture in &self.fixtures{
            let start_address = fixture.address();
            let mut i = 0;
            for channel in fixture.channels(){
                data[(start_address + i) as usize] = *channel.data();
                i += 1;
            }
        }
        
        match self.port.send_dmx_packet(&data){
            Ok(_) => Ok(data),
            Err(e) => Err(e)
        }
    }

    pub fn to_json(&self) -> String{
        let f = (&self.fixtures).iter()
            .map(|fixture| -> String {serde_json::to_string(fixture).unwrap()})
            .reduce(|fixture, e| -> String {fixture + ",\n" + &e}).unwrap();
        let start = String::from("{Universe: [");
        let stop = String::from("]}");

        start + &f + &stop
    }
}

#[cfg(test)]
mod tests{
    use std::collections::HashMap;
    use std::fs::File;
    use std::io::Write;
    use crate::channel::Channel;
    use super::Fixture;
    use super::Universe;
    #[test]
    #[ignore]
    fn test_send(){
        let mut expected: [u8; 512] = [0x00; 512];

        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, i.try_into().unwrap(), String::from("test1"), 0x00, HashMap::new()));
            channels_2.push(Channel::new(i + 6, (i + 6).try_into().unwrap(), String::from("test2"), 0x00, HashMap::new()));
            expected[i as usize] = i.try_into().unwrap();
            expected[(i + 6) as usize] = (i+6).try_into().unwrap();
        }
        let f = Fixture::new(String::from("t1"), channels, String::from("test"), String::from("test"), String::from("test"));
        let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"), String::from("test"), String::from("test"));
        let fixtures = vec![f, f_2];
        let mut universe = Universe::new("/dev/ttyAMA0", fixtures);
        
        assert_eq!(universe.send().unwrap(), expected)
    }

    #[test]
    fn test_to_json(){
        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, i.try_into().unwrap(), String::from("test1"), 0x00, HashMap::new()));
            channels_2.push(Channel::new(i + 6, (i + 6).try_into().unwrap(), String::from("test2"), 0x00, HashMap::new()));
        }
        let f = Fixture::new(String::from("t1"), channels, String::from("test"), String::from("test"), String::from("test"));
        let f_2 = Fixture::new(String::from("t2"), channels_2, String::from("test"), String::from("test"), String::from("test"));
        let fixtures = vec![f, f_2];
        let universe = Universe::new("/dev/ttyAMA0", fixtures);

        let s = universe.to_json();
        
        let mut file = File::create("./test.json").unwrap();
        file.write_all(s.as_bytes());
    }
}