use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
/// Represents a single DMX channel
/// Implements
pub struct Channel{
    /// A channel at its core is represented by the address its given and the data it holds 
    address: u16,
    data: u8,
    // The channel type, default value and capabilities wouldn't be strictly necessary, but they are 
    // useful in order to display additional information in the GUI
    channel_type: String,
    default_value: u8,
    capabilities: HashMap<String, String>

}

impl Channel{
    pub fn new(address: u16, data: u8, channel_type: String, default_value: u8, capabilities: HashMap<String, String>) -> Channel{

        Channel{
            address: address,
            data: data,
            channel_type: channel_type,
            default_value: default_value,
            // unwrap is OK in this case, because I expect a mistake in the channel config to be detected during configuration in the GUI
            capabilities: Channel::check_capabilities(capabilities).unwrap()
        }
    }

    pub fn address(&self) -> &u16{
        &self.address
    }

    pub fn data(&self) -> &u8{
        &self.data
    }

    pub fn channel_type(&self) -> &String{
        &self.channel_type
    }
    
    pub fn default_value(&self) -> &u8{
        &self.default_value
    }
    
    pub fn capabilities(&self) -> &HashMap<String, String>{
        &self.capabilities
    }

    pub fn set_data(&mut self, data: u8){
        self.data = data;
    }
    //TODO: implement check whether all possible data values (0..255) are mapped 
    fn check_capabilities(capabilities: HashMap<String, String>) -> Result<HashMap<String, String>, String>{
        Ok(HashMap::new())
    }
}

#[cfg(test)]
mod tests{
    use std::collections::HashMap;

    use super::Channel;

    #[test]
    pub fn test_set_data(){
        let mut c = Channel::new(1, 0x00, String::from("test"), 0x00, HashMap::new());
        c.set_data(0x11);
        assert_eq!(c.data(), &0x11);
    }

    #[test]
    pub fn test_serialize(){
        let expected = String::from("{\"address\":1,\"data\":0,\"channel_type\":\"test\",\"default_value\":0,\"capabilities\":{}}");
        let c = Channel::new(1, 0x00, String::from("test"), 0x00, HashMap::new());
        let j = serde_json::to_string(&c).unwrap();
        assert_eq!(expected, j);
    }

    #[test]
    pub fn test_deserialize(){
        let expected = Channel::new(1, 0x00, String::from("test"), 0x00, HashMap::new());
        let c: Channel = serde_json::from_str("{\"address\":1,\"data\":0,\"channel_type\":\"test\",\"default_value\":0,\"capabilities\":{}}").unwrap();

        assert_eq!(c.address(), expected.address());
        assert_eq!(c.capabilities(), expected.capabilities());
        assert_eq!(c.data(), expected.data());
        assert_eq!(c.channel_type(), expected.channel_type());
        assert_eq!(c.default_value(), expected.default_value());
    }
}