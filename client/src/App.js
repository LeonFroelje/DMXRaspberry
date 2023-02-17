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
import { AiFillHome } from "react-icons/ai";


function App() {
  return (
    <div className="App">
      <Outlet/>
      <Footer links={[
          {
            path: "/",
            name: "Home",
            icon: <AiFillHome/>
          },
          {
            path: "/program",
            name: "Program",
            icon: <AiFillHome/>
          },
          {
            path: "/play",
            name: "Play",
            icon: <AiFillHome/>
          },
          {
            path: "/timecode",
            name: "Timecode",
            icon: <AiFillHome/>
          },
          {
            path: "/settings",
            name: "Settings",
            icon: <AiFillHome/>
          }
        ]
      }/>
    </div>
  );
}

export default App;
