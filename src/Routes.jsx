import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import RoutingPaths from "./Utils/RoutingPaths";
import Homepage from "./Components/Homepage/Homepage";
import Admin from "./Components/Admin/Admin";
import ManageDoctors from "./Components/Admin/Doctors/ManageDoctors";
import ManagePatients from "./Components/Admin/Patients/ManagePatients";
import Appointments from "./Components/Admin/Appointments/Appointments";
export default function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={RoutingPaths.Login} element={<Login />} />
        <Route exact path={RoutingPaths.Homepage} element={<Homepage />} />
        <Route exact path={RoutingPaths.Admin} element={<Admin />} />
        <Route exact path={RoutingPaths.ManageDoctors} element={<ManageDoctors />} />
        <Route exact path={RoutingPaths.ManagePatients} element={<ManagePatients />} />
        <Route exact path={RoutingPaths.Appointments} element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}
