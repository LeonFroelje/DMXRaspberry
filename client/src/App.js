import React from "react";
import ReactDOM from "react-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import './css/App.css';
import Footer from "./components/footer/footer.mjs";
import { AiOutlineHome, AiOutlinePlayCircle, AiOutlineFieldTime, AiOutlineSetting } from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from "react";

function App() {
  const ws_url = "127.0.0.1:8000";

  const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8000/api/ws');
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);  return (
    <div className="App">
      <Outlet/>
      <Footer links={[
          {
            path: "/",
            name: "Home",
            icon: <AiOutlineHome/>
          },
          {
            path: "/program",
            name: "Program",
            icon: <BsCodeSlash/>
          },
          {
            path: "/play",
            name: "Play",
            icon: <AiOutlinePlayCircle/>
          },
          {
            path: "/timecode",
            name: "Timecode",
            icon: <AiOutlineFieldTime/>
          },
          {
            path: "/settings",
            name: "Settings",
            icon: <AiOutlineSetting/>
          }
        ]
      }/>
    </div>
  );
}

export default App;
