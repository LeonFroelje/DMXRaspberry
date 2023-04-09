import { Box, Card, CardActionArea, CardActions, CardHeader, Slider, Switch, Typography } from "@mui/material";
import Fixture from "../types/fixture";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import useUniverseState from "@/store";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import useWebSocket from "react-use-websocket";
import WebsocketMessage from "../types/websocketmessage";


const findIntensityChannel = (fixture: Fixture) => {
    return fixture.active_mode.findIndex(channel => {
        return channel.channel_type === "Intensity"
    })
}

const fixtureHasOnlyIntensity = (fixture: Fixture) => {
    if (fixture.active_mode.filter(channel => {
        return channel.channel_type.includes("ntensity")
    }).length === fixture.active_mode.length) {
        return true;
    }
    return false
}

const updateIntensity = (fixture: Fixture, value: number) => {
    const index = findIntensityChannel(fixture);
    fixture.active_mode[index].data = value;
    return fixture
}

const updateAll = (fixture: Fixture, value: number) => {
    for(let i = 0; i < fixture.active_mode.length; i++){
        const channel = fixture.active_mode[i];
        fixture.active_mode[i].data = channel.data > 0 
         ? channel.data - 1:
         channel.data;
    }
    return fixture
}

export default function FixtureCard(props: {
    fixture: Fixture,
    index: number
}) {
    const universeState = useUniverseState();
    const websocket = useWebSocket("ws://192.168.178.150:4000/api/ws", {
        share: true
    });
    let fixture = props.fixture;
    const intensityChannel = findIntensityChannel(fixture);
    const initial_value = intensityChannel >= 0 
        ? fixture.active_mode[intensityChannel].data
        : () => {
            let f = fixture.active_mode.reduce((prev, curr, index) => {
                return {
                    address: index,
                    data: prev.data + curr.data,
                    channel_type: "",
                    default_value: -1,
                    capabilities: new Map,
                }
            })
            return f.data / f.address
        };
    const [value, setValue] = useState(initial_value);

    const handleChange = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
        let f = updateIntensity(fixture, value as number);
        universeState.updateFixture({
            ...f,
        })
        let msg: WebsocketMessage = {
            url: "/fixtures/update",
            text: JSON.stringify(f)
        }
        try{
            websocket.sendJsonMessage(msg);
        }
        catch{
            console.log("Kein Websocket")
        }
}

    // const handleChangeNoIntensity = (event, value) => {
    //     fixture.active_mode.forEach(channel => {
    //         if(channel.data - value > 0){
    //             channel.data --;
    //         }
    //     })
    // }
    const handleFixtureToggle = (e: ChangeEvent<HTMLInputElement>) => {
        // universeState.toggleFixtureState(!e.target.checked, e.target.id.split("-")[1]);
        // send request to server to toggle the fixture state
        // at fixture index i of universe


    }
    if(intensityChannel < 0){
        return (
            <Link color={"#000"} href={`/fixtures/${fixture.id}`}>
            <Card id={`fixture-${fixture.id}-card`} >
                <CardHeader avatar={
                        <LightbulbIcon/>
                    } action = 
                    {<Switch checked={fixture.active_mode.filter(c => { c.data > 0 }).length > 0}
                    id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle}
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                    />}
                    title={fixture.name}
                    subheader={`${fixture.active_mode.length}-channels, ${fixture.fixture_type}`}
                />
                <CardActions sx={{padding: "0.5rem 1rem 0.5rem"}}>
                    {<Slider
                        min={0}
                        max={255}
                        aria-label="Intensity"
                        value={value}
                         onChange={(event, newValue) => {
                            let f = updateAll(fixture, newValue as number);
                            universeState.updateFixture({
                                ...f,
                            })
                            let msg: WebsocketMessage = {
                                url: "/fixtures/update",
                                text: JSON.stringify(f)
                            }
                            try{
                                websocket.sendJsonMessage(msg);
                            }
                            catch{
                                console.log("Kein Websocket")
                            }
                            setValue(newValue as number);
                            }}
                        onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                        }}
                        sx={{
                            boxSizing: "border-box",
                        }}
                    />
                    }
                </CardActions>
            </Card>
            </Link>

        )
    }
    return (
        <Link href={`/fixtures/${fixture.id}`}>
            <Card id={`fixture-${fixture.id}-card`}>
                <CardHeader avatar={
                    
                        <LightbulbIcon/>
                    } action = 
                    {<Switch checked={fixture.active_mode.filter(c => { c.data > 0 }).length > 0}
                    id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle} onClick={event => {
                        event.stopPropagation();
                        event.preventDefault();                    
                    }}
                    />}
                    title={fixture.name}
                    subheader={fixture.fixture_type}
                />
                <CardActions sx={{padding: "0.5rem 1rem 0.5rem"}}>
                    {<Slider
                        min={0}
                        max={255}
                        aria-label="Intensity"
                        value={value}
                        onChange={(event, newValue) => {
                            let f = updateIntensity(fixture, value as number);
                            universeState.updateFixture({
                                ...f,
                            })
                            let msg: WebsocketMessage = {
                                url: "/fixtures/update",
                                text: JSON.stringify(f)
                            }
                            try{
                                websocket.sendJsonMessage(msg);
                            }
                            catch{
                                console.log("Kein Websocket")
                            }                    
                            setValue(newValue as number);
                        }}
                        onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                        }}
                        sx={{
                            boxSizing: "border-box",
                        }}
                    />
                    }
                </CardActions>
            </Card>
        </Link>
    )
}