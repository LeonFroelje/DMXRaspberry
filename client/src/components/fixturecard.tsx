import { Box, Card, CardActionArea, CardActions, CardHeader, Slider, Switch, Typography } from "@mui/material";
import Fixture from "../types/fixture";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import useUniverseState from "@/store";
import { ChangeEvent } from "react";
import Link from "next/link";
import axios from "axios";


const findIntensityChannel = (fixture: Fixture) => {
    return fixture.channels.findIndex(channel => {
        return channel.channel_type === "Intensity"
    })
}

const fixtureHasOnlyIntensity = (fixture: Fixture) => {
    if (fixture.channels.filter(channel => {
        return channel.channel_type.includes("ntensity")
    }).length === fixture.channels.length) {
        return true;
    }
    return false
}

const updateIntensity = (fixture: Fixture, value: number) => {
    const index = findIntensityChannel(fixture);
    fixture.channels[index].data = value;
    return fixture
}

export default function FixtureCard(props: {
    fixture: Fixture,
    index: number
}) {
    const universeState = useUniverseState();
    let fixture = props.fixture;
    const intensityChannel = findIntensityChannel(fixture);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let f = updateIntensity(fixture, newValue as number);
        universeState.updateFixture({
            ...fixture,
        })
        axios.post("/api/fixtures/update", fixture)
        .then(res => res.data)
        .catch(err => err)
    }
    const handleFixtureToggle = (e: ChangeEvent<HTMLInputElement>) => {
        // universeState.toggleFixtureState(!e.target.checked, e.target.id.split("-")[1]);
        // send request to server to toggle the fixture state
        // at fixture index i of universe

    }
    if(intensityChannel < 0){
        return (
            <Card id={`fixture-${fixture.id}-card`}>
                <CardHeader avatar={
                    <Link color={"#000"} href={`/fixtures/${fixture.id}`}>
                        <LightbulbIcon/>
                    </Link>} action = 
                    {<Switch checked={fixture.channels.filter(c => { c.data > 0 }).length > 0}
                    id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle}
                    />}
                    title={<Link color={"#000"} href={`/fixtures/${fixture.id}`}>{fixture.name}</Link>}
                    subheader={
                        <Link color={"#000"} href={`/fixtures/${fixture.id}`}>
                            {fixture.kind}
                        </Link>}
                />
            </Card>

        )
    }
    return (
        <Card id={`fixture-${fixture.id}-card`}>
            <CardHeader avatar={
                <Link color={"#000"} href={`/fixtures/${fixture.id}`}>
                    <LightbulbIcon/>
                </Link>} action = 
                {<Switch checked={fixture.channels.filter(c => { c.data > 0 }).length > 0}
                id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle}
                />}
                title={<Link color={"#000"} href={`/fixtures/${fixture.id}`}>{fixture.name}</Link>}
                subheader={
                    <Link color={"#000"} href={`/fixtures/${fixture.id}`}>
                        {fixture.kind}
                    </Link>}
            />
            <CardActions sx={{padding: "0rem 1rem 0.5rem"}}>
                {<Slider
                    aria-label="Intensity"
                    value={universeState.fixtures[props.index].channels[intensityChannel].data}
                    onChange={handleChange} 
                    sx={{
                        boxSizing: "border-box",
                    }}
                />
                }
            </CardActions>
        </Card>
    )
}