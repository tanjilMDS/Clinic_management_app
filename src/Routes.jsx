import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import RoutingPaths from "./Utils/RoutingPaths";
import Homepage from "./Components/Homepage/Homepage";
export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutingPaths.Login} element={<Login />} />
        <Route exact path={RoutingPaths.Homepage} element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
