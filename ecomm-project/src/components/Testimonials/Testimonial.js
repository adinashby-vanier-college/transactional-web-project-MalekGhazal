import React from "react";
import "./Testimonials.css";
import { FormattedMessage } from "react-intl";
import image1 from "../../assets/test-1.jpg";
import image2 from "../../assets/test-2.jpg";
import image3 from "../../assets/test-3.jpg";
import image4 from "../../assets/test-4.jpg";

const Testimonial = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F0E8"
          fillOpacity="1"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,106.7C1120,107,1280,181,1360,218.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <div style={{ backgroundColor: "#F1F0E8" }}>
        <h1 className="title text-center pb-5">
          <FormattedMessage id="testimonials_title" />
        </h1>
        <div className="border"></div>

        <div className="row m-0 container mx-auto">
          <div className="col-lg-3 pb-3">
            <div className="item text-center overflow-hidden">
              <img src={image1} alt="" />
              <div className="name">John Doe</div>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>

              <p>
                <span>"</span>
                <FormattedMessage id="testimonials_joe" />
                <span>"</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 pb-3">
            {" "}
            <div className="item text-center overflow-hidden">
              <img src={image3} alt="" />
              <div className="name">Emily Smith</div>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>

              <p>
                <span>"</span>
                <FormattedMessage id="testimonials_emily" />
                <span>"</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 pb-3">
            {" "}
            <div className="item text-center overflow-hidden">
              <img src={image2} alt="" />
              <div className="name">Michael Johnson</div>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-regular fa-star"></i>
              </div>

              <p>
                <span>"</span>
                <FormattedMessage id="testimonials_michael" />
                <span>"</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 pb-3">
            {" "}
            <div className="item text-center overflow-hidden">
              <img src={image4} alt="" />
              <div className="name">Sophia Davis</div>
              <div className="stars">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>

              <p>
                <span>"</span>
                <FormattedMessage id="testimonials_sophia" />
                <span>"</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F0E8"
          fillOpacity="1"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,106.7C1120,107,1280,181,1360,218.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </>
  );
};

export default Testimonial;
