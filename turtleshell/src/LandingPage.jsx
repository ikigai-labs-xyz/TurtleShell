import "./App.css";
import React from "react";
import Navbar from "./landingpage/Navbar";
import Hero from "./landingpage/Hero";
import PoA from "./landingpage/PoA";
import Sponsors from "./landingpage/Sponsors";
import Footer from "./landingpage/Footer";
import Requirements from "./landingpage/Requirements";

const LandingPage = () => (
  <>
    <Navbar />
    <Hero />
    <PoA />
    <Requirements />
    <Sponsors />
    <Footer />
  </>
);

export default LandingPage;
