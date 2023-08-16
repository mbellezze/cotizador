import React from "react";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { Rutas } from './routes/routes';


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {

  return (
      <Rutas />
  );
};

export default App;
