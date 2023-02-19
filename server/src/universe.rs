use crate::fixture::Fixture;

pub struct Universe{    
    port: dmx_serial::SystemPort,
    fixtures: Vec<Fixture>
}

impl Universe{
    pub fn new(port: SystemPort, fixtures: Vec<Fixture>) -> Universe{
        Universe{
            port: port,
            fixtures: fixtures
        }
    }

    pub fn add_fixture(&mut self, fixture: Fixture) -> (){
        self.fixtures.push(fixture);
    }

    pub fn remove_fixture(&mut self, index: usize) Fixture{
        self.fixtures.remove(index)
    }

    pub fn send(&self) -> {

    }
}