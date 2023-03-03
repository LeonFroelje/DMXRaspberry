import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeRoute from './Routes/HomeRoute.js';
import Settings from "./Routes/Settings.mjs";
import Play from "./Routes/Play.mjs";
import Program from "./Routes/Program.mjs";
import Timecode from "./Routes/Timecode.mjs";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App/>}>
        <Route path='' element={<HomeRoute/>}/>
        <Route path='play' element={<Play/>}/>
        <Route path='program' element={<Program/>}/>
        <Route path='timecode' element={<Timecode/>}/>
        <Route path='settings' element={<Settings/>}/>
      </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
