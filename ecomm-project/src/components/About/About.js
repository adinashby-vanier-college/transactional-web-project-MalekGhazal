import React from "react";
import "./About.css";
import { FormattedMessage } from "react-intl";
import image1 from "../../assets/Fashion-1.png";
import image2 from "../../assets/Fashion-5.png";
import image3 from "../../assets/Fashion-4.png";

const About = () => {
  return (
    <section id="about-us-section" className="container">
      <h1 className="header text-center">
        <FormattedMessage id="about_ebra" />
      </h1>
      <div className="about-border"></div>

      {/* First section */}
      <div className="row align-items-center">
        <div className="col-md-4 order-1 order-md-0 d-flex justify-content-center">
          <img src={image1} alt="about-us-1" className="img-fluid" />
        </div>
        <div className="col-md-8 order-2 order-md-1">
          <p className="description">
            <FormattedMessage id="about_desc" />
          </p>
        </div>
      </div>

      {/* Second section */}
      <div className="row align-items-center">
        <div className="col-md-8 order-2 order-md-0">
          <p className="description">
            <FormattedMessage id="about_desc2" />
          </p>
        </div>
        <div className="col-md-4 order-1 order-md-1">
          <img src={image2} alt="" className="img-fluid" />
        </div>
      </div>

      {/* Third section */}
      <div className="row align-items-center">
        <div className="col-md-4 order-1 order-md-0">
          <img src={image3} alt="" className="img-fluid" />
        </div>
        <div className="col-md-8 order-2 order-md-1">
          <p className="description">
            <FormattedMessage id="about_desc3" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
