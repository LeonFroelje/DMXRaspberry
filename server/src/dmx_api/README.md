# DMX API
The DMX API consists of a few different structs that are useful for managing the
DMX state of our server.

## Channel
The channel struct represents a single address of the DMX Universe. it contains some
additional information about the channel, such as the data that is being sent to the 
address, the type of the channel, the default value and the capabilities of the
channel.

## Fixture
As the name suggests, the fixture struct represents a single fixture contained in the
DMX Universe. A fixture consists of a name, a unique id generated at initialization, the
channels of the fixture, some metadata such as the manufacturer and the model and the
kind of fixture i.e. if it is a Moving head or a spot.

## Universe
The Universe is the wrapper struct for the fixtures. A universe contains fixtures,
and fixtures contain channels. Thus the universe holds the information about all
of the 512 channels holding the data for each of the 512 dmx addresses. Moreover,
a universe can be in one of two modes:
- Programming: If a universe is in programming mode, there is currently a program being created by one of the clients.
- Play: If a universe is in play mode, there is currently a program being played on it.
The modes are mutually exclusive, because if there is a client creating a new program, the client
would expect to instantly see the fixtures light up in the desired color when changing a channel value. If there
was a program playing at the same time, it might play a new scene at the same time thus causing the fixtures
to light up in a new color. 

## Scene
A scene represents a specific configuration of a universe at any given time. If you like the state of the fixtures,
you can safe it as a scene and then open it at any given time.
## Program
A Program is a collection of scenes that can be played in sequential order. 

