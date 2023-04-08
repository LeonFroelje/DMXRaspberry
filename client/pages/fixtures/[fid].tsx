import { AppBar, Box, Card, CardContent, CardHeader, Divider, IconButton, Slider, Stack, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router"
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import useUniverseState from "@/store";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from "axios";
import { SyntheticEvent } from "react";
import WebsocketMessage from "@/src/types/websocketmessage";
import useWebSocket from "react-use-websocket";


export default function FixturePage(){
    const router = useRouter();
    const { fid } = router.query;
    const universeState = useUniverseState();
    const websocket = useWebSocket("ws://192.168.178.150:4000/api/ws", {
        share: true
    });
    let fixture = universeState.fixtures?.find((fixture) => {
        return fixture.id == fid
    });
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
            <Stack direction={"row"} gap={"2rem"} height={"50vh"} justifyContent={"space-between"} padding={"0rem 1rem 6re 1rem"}
            overflow={"auto"}>
                {fixture?.active_mode.map((channel, index) => {
                    return (
                    <>
                        <Stack key={channel.address} direction={"column"} alignItems={"center"}>
                            <Typography variant="caption">{channel.address}</Typography>
                            <Box height={"75%"} marginBottom={"1rem"} marginTop={"1rem"}>
                                <Slider
                                    sx={{
                                        '& input[type="range"]': {
                                        WebkitAppearance: 'slider-vertical',
                                        },
                                    }}
                                    id={index.toString()}
                                    orientation="vertical" defaultValue={channel.data}
                                    aria-label={channel.channel_type} valueLabelDisplay="auto"
                                    onChangeCommitted={(event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
                                        if(fixture){
                                            fixture.active_mode[index].data = value as number;
                                            universeState.updateFixture(fixture);
                                            let msg: WebsocketMessage = {
                                                url: "/fixture/update",
                                                text: JSON.stringify(fixture)
                                            }
                                            console.log(msg.text);
                                            try{
                                                websocket.sendMessage(`{\"url\":\"${msg.url}\",\"text\":${msg.text}}`);
                                            }
                                            catch{
                                                console.log("Kein Websocket")
                                            }
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