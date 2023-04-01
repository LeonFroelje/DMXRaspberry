type Channel = {
    address: number,
    data: number,
    // The channel type, default value and capabilities wouldn't be strictly necessary, but they are 
    // useful in order to display additional information in the GUI
    channel_type: string,
    default_value: number,
    capabilities: Map<string, string>
}

export default Channel