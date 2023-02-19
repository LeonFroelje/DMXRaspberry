use crate::fixture::Fixture;

use dmx::DmxTransmitter;
use dmx_serial::SystemPort;


pub struct Universe{     
    port: SystemPort,
    fixtures: Vec<Fixture>
}

impl<'a> Universe{
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
            let start_address = fixture.get_address();
            let mut i = 0;
            for channel in fixture.get_channels(){
                data[(start_address + i) as usize] = channel.get_data();
                i += 1;
            }
        }
        
        match self.port.send_dmx_packet(&data){
            Ok(_) => Ok(data),
            Err(e) => Err(e)
        }
    }
}

#[cfg(test)]
mod tests{
    use crate::channel::Channel;
    use crate::fixture::Fixture;
    use super::Universe;
    #[test]
    fn test_send(){
        let mut expected: [u8; 512] = [0x00; 512];

        let mut channels: Vec<Channel> =  Vec::new();
        let mut channels_2: Vec<Channel> = Vec::new();
        for i in 1..6{
            channels.push(Channel::new(i, i.try_into().unwrap()));
            channels_2.push(Channel::new(i + 6, (i + 6).try_into().unwrap()));
            expected[i as usize] = i.try_into().unwrap();
            expected[(i + 6) as usize] = (i+6).try_into().unwrap();
        }
        let f = Fixture::new(channels);
        let f_2 = Fixture::new(channels_2);
        let fixtures = vec![f, f_2];
        let mut universe = Universe::new("/dev/ttyAMA0", fixtures);
        
        assert_eq!(universe.send().unwrap(), expected)
    }
}