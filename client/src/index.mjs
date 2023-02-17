import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeRoute from './Routes/HomeRoute.mjs';
import Settings from "./Routes/Settings.mjs";
import Play from "./Routes/Play.mjs";
import Program from "./Routes/Program.mjs";
import Timecode from "./Routes/Timecode.mjs";
//import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
