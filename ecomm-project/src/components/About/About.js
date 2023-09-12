import React from "react";
import "./About.css";
import image1 from "../../assets/Fashion-1.png";
import image2 from "../../assets/Fashion-5.png";
import image3 from "../../assets/Fashion-4.png";

const About = () => {
  return (
    <div id="about-us-section" className="container">
      <h1 className="header text-center">About Ebra</h1>
      <div className="about-border"></div>

      {/* First section */}
      <div className="row align-items-center">
        <div className="col-md-4 order-1 order-md-0 d-flex justify-content-center">
          <img src={image1} alt="about-us-1" className="img-fluid" />
        </div>
        <div className="col-md-8 order-2 order-md-1">
          <p className="description">
            At Ebra, we're redefining modern elegance. Our designs seamlessly
            blend contemporary aesthetics with timeless grace, ensuring you step
            into every occasion with confidence and style. From chic urban wear
            to sophisticated evening attire, our collections are curated to
            resonate with the modern fashion enthusiast who values simplicity,
            versatility, and a touch of luxury. Discover a world where fashion
            meets innovation, and every piece tells a story of refined taste.
          </p>
        </div>
      </div>

      {/* Second section */}
      <div className="row align-items-center">
        <div className="col-md-8 order-2 order-md-0">
          <p className="description">
            Simplicity is at the core of everything we do. Ebra believes that
            true beauty lies in the details, and we strive to make every detail
            count. Our designs celebrate the art of simplicity, where clean
            lines, understated palettes, and impeccable tailoring take center
            stage. We create fashion that is not only visually appealing but
            also comfortable to wear, enhancing your daily life with a sense of
            ease and sophistication. Embrace the elegance of simplicity with
            Ebra.
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
            At Ebra, we understand that fashion is not just about clothing; it's
            about storytelling. Our brand is built on the idea of creating
            timeless pieces that become an integral part of your life's journey.
            With a commitment to quality craftsmanship and sustainable
            practices, we ensure that each garment you choose carries a piece of
            our dedication to your satisfaction. Join us in crafting stories,
            making memories, and celebrating life's moments with fashion that
            transcends trends and stands the test of time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
