import React from "react";

import {
  EarthCanvas,
  BallCanvas,
  ComputersCanvas,
  StarsCanvas,
} from "./canvas";

import Hero from "./Hero";
import Navbar from "./Navbar";
import About from "./About";
import Tech from "./Tech";
import Experience from "./Experience";
import Works from "./Works";
import Feedbacks from "./Feedbacks";
import Contact from "./Contact";
import Footer from "./Footer";
import CanvasLoader from "./Loader";

/*
|--------------------------------------------------------------------------
| Premium Component Barrel
|--------------------------------------------------------------------------
| Centralized exports for all portfolio sections and 3D experiences.
| Keeping this file clean makes it easier to scale the portfolio later.
*/

export {
  // Layout
  Navbar,
  Footer,

  // Main sections
  Hero,
  About,
  Tech,
  Experience,
  Works,
  Feedbacks,
  Contact,

  // 3D experiences
  EarthCanvas,
  BallCanvas,
  ComputersCanvas,
  StarsCanvas,

  // Shared UI
  CanvasLoader,
};