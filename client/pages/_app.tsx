import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction' ;
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PlayCircleFilledWhiteOutlined from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import HourglassEmptyOutlined from "@mui/icons-material/HourglassEmptyOutlined";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { NextLinkComposed } from '@/src/Link';
import { Divider, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios';
import useSWR, { Fetcher } from 'swr'
import useUniverseState from '@/store';

// type IndexResponse

const fetcher = (path: string) => axios.get(`/${path}`).then(res => res.data);

export default function App({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState(0);
  const { data, error } = useSWR('api/index', fetcher)
  const universeState = useUniverseState();
  if(error){
    return <div>Error beim laden der Daten</div>
  }
  if(!data){
    return <div>Lädt...</div>
  }
  console.log(typeof(data));
  console.log(typeof(data.fixtures));
  console.log(data);
  if(universeState.fixtures !== data.fixtures){
    universeState.setFixtures(data.fixtures);
  }
  if(universeState.mode !== data.mode){
    universeState.setMode(data.mode);
  }
  if (universeState.name !== data.name){
    universeState.setName(data.name);
  }
  
  return (
    <Paper sx={{width: "100%", height: "100%"}}>
      <Stack sx={{justifyContent: "space-between", height: "100%"}}>
        <Box paddingBottom={'60px'}>
          <Component {...pageProps}/>
        </Box>
        <Box>
          <Divider/>
          <BottomNavigation
            sx={{
              width: "100%",
              position: "fixed",
              bottom: 0,
            }}
            
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction component={NextLinkComposed} to="/" sx={{minWidth: "auto"}} label="Home" icon={<HomeOutlined/>} />
            <BottomNavigationAction component={NextLinkComposed} to="/program" sx={{minWidth: "auto"}} label="Program" icon={<CodeOutlinedIcon />} />
            <BottomNavigationAction component={NextLinkComposed} to="/play" sx={{minWidth: "auto"}} label="Play" icon={<PlayCircleFilledWhiteOutlined />} />
            <BottomNavigationAction component={NextLinkComposed} to="/timecode" sx={{minWidth: "auto"}} label="Timecode" icon={<HourglassEmptyOutlined />} />
            <BottomNavigationAction component={NextLinkComposed} to="/settings" sx={{minWidth: "auto"}} label="Settings" icon={<SettingsOutlined />} />
          </BottomNavigation>
        </Box>
      </Stack>
    </Paper>  )
}