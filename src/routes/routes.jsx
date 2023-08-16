import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mapa } from "../components/mapa";
/* import { LandingPage } from '../components/landingpage'; */

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Mapa />} />
        {/* <Route path="/mapa" element={<Mapa />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
