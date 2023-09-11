import React from "react";
import "./Testimonials.css";

const Testimonial = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F0E8"
          fill-opacity="1"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,106.7C1120,107,1280,181,1360,218.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <div style={{ backgroundColor: "#F1F0E8" }}>
        <h1 className="testimonials text-center pb-5">Testimonials</h1>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F0E8"
          fill-opacity="1"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,106.7C1120,107,1280,181,1360,218.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Testimonial;
