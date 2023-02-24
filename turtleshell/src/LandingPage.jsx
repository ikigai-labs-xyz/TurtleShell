import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PoA from "./components/PoA";
import Sponsors from "./components/Sponsors";
import Footer from "./components/Footer";
import Requirements from "./Components/Requirements";

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
