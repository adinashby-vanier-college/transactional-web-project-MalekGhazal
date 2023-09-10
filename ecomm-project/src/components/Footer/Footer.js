import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#96B6C5"
          fill-opacity="1"
          d="M0,160L80,138.7C160,117,320,75,480,90.7C640,107,800,181,960,202.7C1120,224,1280,192,1360,176L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <h4>Location</h4>
              <ul className="list-unstyled">
                <li>Canada</li>
                <li>Quebec</li>
                <li>Montreal</li>
                <li>J8X 5V9</li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Company</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
                <li>
                  <a href="/">Our Team</a>
                </li>
                <li>
                  <a href="/">Careers</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Policies</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/">Refund Policy</a>
                </li>
                <li>
                  <a href="/">Cookies</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Social Media</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/">Instagram</a>
                </li>
                <li>
                  <a href="/">Facebook</a>
                </li>
                <li>
                  <a href="/">Twitter</a>
                </li>
                <li>
                  <a href="/">TikTok</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-center">
              &copy;{new Date().getFullYear()} Fashion Ecomm Website - All
              Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
