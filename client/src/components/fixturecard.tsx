import { Box, Card, CardActionArea, CardActions, CardHeader, Slider, Switch, Typography } from "@mui/material";
import Fixture from "../types/fixture";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import useUniverseState from "@/store";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";


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

export default function FixtureCard(props: {
    fixture: Fixture,
    index: number
}) {
    const universeState = useUniverseState();
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
        axios.post("/api/fixtures/update", fixture)
        .then(res => res.data)
        .catch(err => err)
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
                        aria-label="Intensity"
                        value={value}
                        onChangeCommitted={() => {
                            // TODO: implement function that reduces the average value
                        }} onChange={(event, newValue) => {
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
                        aria-label="Intensity"
                        value={value}
                        onChangeCommitted={handleChange} onChange={(event, newValue) => {
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