use actix_web::{web::{Payload, Data}, Error, HttpRequest, HttpResponse};
use actix::Addr;


pub async fn create_socket(req: HttpRequest, stream: Payload, srv: Data<Addr<RtServer>>) -> Result<HttpResponse, Error> {
    
}