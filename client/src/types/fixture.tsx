import Channel from "./channel";

type Fixture = {
    name: string,
    id: string,
    active_mode: Array<Channel>,
    manufacturer: string,
    model: string,
    fixture_type: string,
}



export default Fixture;