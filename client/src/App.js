import React, { useEffect } from "react";
import {
  Outlet,
} from "react-router-dom";
import './css/App.css';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction' ;
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import PlayCircleFilledWhiteOutlined from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import HourglassEmptyOutlined from "@mui/icons-material/HourglassEmptyOutlined";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Divider, Paper } from "@mui/material";

function App() {
  const ws_url = "127.0.0.1:8000";

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/api/ws');
  const [messageHistory, setMessageHistory] = useState([]);

  //const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [value, setValue] = useState(0);
  /*
  useEffect(() => {
    if(lastMessage != null){
      
    }
  })
  */
  return (
    <Paper sx={{width: "100%", height: "100%"}}>
      <Stack sx={{justifyContent: "space-between", height: "100%"}}>
        <Outlet/>
        <Box>
          <Divider/>
          <BottomNavigation
            sx={{
              maxWidth: "100%"
            }}
            
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction component={Link} to="/" sx={{minWidth: "auto"}} label="Home" icon={<HomeOutlined/>} />
            <BottomNavigationAction component={Link} to="/program" sx={{minWidth: "auto"}} label="Program" icon={<CodeOutlinedIcon />} />
            <BottomNavigationAction component={Link} to="/Play" sx={{minWidth: "auto"}} label="Play" icon={<PlayCircleFilledWhiteOutlined />} />
            <BottomNavigationAction component={Link} to="/timecode" sx={{minWidth: "auto"}} label="Timecode" icon={<HourglassEmptyOutlined />} />
            <BottomNavigationAction component={Link} to="/settings" sx={{minWidth: "auto"}} label="Settings" icon={<SettingsOutlined />} />
          </BottomNavigation>
        </Box>
      </Stack>
    </Paper>
  );
}

export default App;
