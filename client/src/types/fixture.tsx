import Channel from "./channel";

type Fixture = {
    name: string,
    id: string,
    channels: Array<Channel>,
    manufacturer: string,
    model: string,
    kind: string,
}

export default Fixture;