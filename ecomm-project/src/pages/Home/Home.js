import React from "react";
import Button from "react-bootstrap/Button";
import snowman from "./snowman.png";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row h-100">
          <div className="col secondary-baige-color align-items-center">
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
          <div
            className="col"
            style={{ width: "50%", background: "transparent" }}
          >
            <img
              src={snowman}
              alt="decorative snowman"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                backgroundColor: "transparent",
              }}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
