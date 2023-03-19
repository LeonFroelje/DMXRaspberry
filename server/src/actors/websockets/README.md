# Websockets

There are two different actors that are responsible for managing the websocket connections.

## Datasocket
The first actor is the Datasocket. The datasocket is what the clients actually connect to. 
Thus, the datasocket is the actor that actually transmits the messages to the client and 
receives the clients messages. The datasocket then decides how to handle the message.
If it receives a text message, it deserializes the Json content of the message and
forwards a message to the websocket server corresponding to the action that the client
message wanted to happen.

## Websocket server
The Websocket server manages the Datasockets. Whenever a client connects, a datasocket is created
which then sends a Connect message to the websocket server. When the server receives such a
message, it adds the Datasocket address to the internal Mapping of Datasocket UUIDs and Datasocket addresses.
When the server receives a message corresponding to some action that manipulates the server state or
the state of some DMX Universe, it then broadcasts the updated state to all the other
Datasockets, thus keeping the app state in sync on all connections. Because the websocket server
has to handle messages that cause some action to be performed altering the universe state, it also
has to know the addresses of all the DMX actors.