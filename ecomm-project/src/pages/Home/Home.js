import React from "react";
import About from "../../components/About/About";
import Testimonial from "../../components/Testimonials/Testimonial";
import FAQ from "../../components/FAQ/FAQ";
import Contact from "../../components/Contact/Contact";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Testimonial />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;
