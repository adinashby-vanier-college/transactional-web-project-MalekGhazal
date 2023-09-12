import React from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import HeroImage from "../../assets/Fashion-6.png";
import "./Hero.css";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-4 secondary-baige-color align-items-center custom-centered-div">
            <h1 style={{ fontSize: "52px", marginTop: "20vh" }}>
              Elevate Your Style
            </h1>
            <h2 className="font-italic" style={{ fontSize: "32px" }}>
              Where Fashion Dreams Come True
            </h2>
            <Button className="login-btn p-2 mt-3" style={{ fontSize: "26px" }}>
              Explore Now
            </Button>
          </div>
          <div className="col-lg-8">
            <Image src={HeroImage} fluid />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
