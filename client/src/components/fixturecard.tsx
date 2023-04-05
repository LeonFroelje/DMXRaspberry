import { Box, Card, Slider, Switch, Typography } from "@mui/material";
import Fixture from "../types/fixture";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import useUniverseState from "@/store";
import { ChangeEvent } from "react";


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
    if (universeState.fixtures === undefined) {
        return <></>
    }
    const fixture = props.fixture;
    const intensityChannel = findIntensityChannel(fixture);

    const handleChange = (event: Event, newValue: number | number[]) => {
        let f = updateIntensity(fixture, newValue as number);
        universeState.updateFixture({
            ...fixture,
        })
    }

    const handleFixtureToggle = (e: ChangeEvent<HTMLInputElement>) => {
        // universeState.toggleFixtureState(!e.target.checked, e.target.id.split("-")[1]);
        // send request to server to toggle the fixture state
        // at fixture index i of universe

    }
    return (
        <Card id={`fixture-${fixture.id}-card`} sx=
            {{
                display: "flex",
                flexDirection: "column",
                padding: "0.5rem 2rem 0.5rem 1rem",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <LightbulbIcon />
                    <Typography component="h3">
                        {fixture.name}
                    </Typography>
                </Box>
                <Switch checked={fixture.channels.filter(c => { c.data > 0 }).length > 0} id={`fixture-${fixture.id}-switch`} onChange={handleFixtureToggle}></Switch>
            </Box>
            {(intensityChannel !== undefined)
                ? <Slider
                    aria-label="Intensity"
                    value={universeState.fixtures[props.index].channels[intensityChannel].data}
                    onChange={handleChange}
                    sx={{
                        boxSizing: "border-box"
                    }}
                />
                : <></>
            }
        </Card>
    )
}