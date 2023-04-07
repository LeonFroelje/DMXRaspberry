use mongodb::{ Client, options::ClientOptions };

pub async fn create_mongo_client() -> mongodb::Client {
    let client_options = ClientOptions::parse("mongodb://localhost:27017").await.unwrap();
    let client = Client::with_options(client_options).unwrap();
    client
}

