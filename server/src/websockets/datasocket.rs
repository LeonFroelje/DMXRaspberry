use crate::websockets::messages;
use uuid::Uuid;
use spin_sleep::{ SpinSleeper, SpinStrategy };
use std::time::{ Instant, Duration };
use actix::{ Actor, StreamHandler, ActorContext };
use actix_web_actors::ws;


const HEARTBEAT: Duration = Duration::from_secs(5);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(10);
const NATIVE_ACCURACY_NS: u32 = 100_000;

#[derive(Debug)]
pub struct DataSocket{
    id: Uuid,
    hb: Instant
}

impl Actor for DataSocket{
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        self.hb(ctx);
    }
}

impl DataSocket{
    pub fn new() -> Self{
        Self{ id: Uuid::new_v4(), hb: Instant::now()}
    }

    fn uuid(&self) -> Uuid{
        self.id
    }

    fn hb(&self, ctx: &mut <Self as Actor>::Context) {
        let spin_sleeper = SpinSleeper::new(NATIVE_ACCURACY_NS)
            .with_spin_strategy(SpinStrategy::SpinLoopHint);
        // DMX has a maximum frequency of 44Hz
        
        loop {
            // check client heartbeats
            if Instant::now().duration_since(self.hb) > CLIENT_TIMEOUT {
                // heartbeat timed out
                // stop actor
                ctx.stop();

                // don't try to send a ping
                return;
            }

            ctx.ping(b"");
            spin_sleeper.sleep(HEARTBEAT);
        };
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for DataSocket{
    fn handle(&mut self, item: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        /*match item{
            Ok() -> 
        }*/
    }
}

impl PartialEq for DataSocket{
    fn eq(&self, other: &Self) -> bool {
        return self.uuid() == other.uuid()
    }
    fn ne(&self, other: &Self) -> bool {
        return self.uuid() != other.uuid()
    }
}

#[cfg(test)]
mod test{
    use super::DataSocket;
    use super::Instant;

    fn init() -> DataSocket{
        DataSocket::new()
    }

    #[test]
    pub fn test_eq(){
        let d1 = init();
        let d2 = DataSocket{ id: d1.uuid(), hb: Instant::now()};

        assert_eq!(d1, d2)
    }

    #[test]
    pub fn test_neq(){
        let d1 = DataSocket::new();
        let d2 = DataSocket::new();

        assert_ne!(d1, d2)
    }
}