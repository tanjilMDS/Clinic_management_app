import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import RoutingPaths from './Utils/RoutingPaths'
export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutingPaths.Homepage} element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
