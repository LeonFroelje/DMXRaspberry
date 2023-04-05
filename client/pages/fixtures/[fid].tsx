import { AppBar, Box, Card, CardContent, CardHeader, Divider, IconButton, Slider, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import useUniverseState from "@/store";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";


export default function FixturePage(){
    const router = useRouter();
    const { fid } = router.query;
    const universeState = useUniverseState();
    let fixture = universeState.fixtures?.find((fixture) => {
        return fixture.id === fid
    });
    console.log(fixture);
    return(
        <Stack sx={{ width: "100%", minHeight: "100%" }} rowGap="1rem">
            <AppBar component="nav" sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0rem 0.5rem",
                opacity: "90%"
                }} position="sticky">
                <Typography variant="h5" component="div">
                    {fixture?.name}
                </Typography>
                <Toolbar>
                    <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {

                    }}
                    >
                    <MoreVertOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Card>
                <CardHeader titleTypographyProps={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1"
                }} title={"Szenen"} action={
                    <IconButton>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                }/>
                <CardContent>
                    TODO: Szenen für einzelne Lampen bzw. Gruppen von Lampen einrichten
                </CardContent>
            </Card>
            <Stack direction={"row"} gap={"2rem"} height={"40vh"} justifyContent={"space-between"} padding={"0rem 1rem 1rem 1rem"}
            overflow={"auto"}>
                {fixture?.channels.map((channel, index) => {
                    return (
                    <>
                        <Stack key={channel.address} direction={"column"} alignItems={"center"}>
                            <Typography variant="caption">{channel.address}</Typography>
                            <Box height={"80%"} marginBottom={"1rem"}>
                                <Slider
                                    sx={{
                                        '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                    id={index.toString()}
                                    orientation="vertical" defaultValue={channel.default_value}
                                    aria-label={channel.channel_type} valueLabelDisplay="auto"
                                    onChange={(event: Event, newValue: number | number[]) => {
                                        if(fixture){
                                            fixture.channels[index].data = newValue as number;
                                            universeState.updateFixture(fixture);
                                            axios.post("/api/fixtures/update", fixture)
                                                .then(res => res.data)
                                                .catch(err => err)
                                        }
                                    }}>
                                </Slider>
                            </Box>
                            <Typography variant="caption">{channel.channel_type}</Typography>
                        </Stack>
                        <Divider orientation="vertical"/>
                    </>
                    )
                })}
            </Stack>
        </Stack>
      )
}