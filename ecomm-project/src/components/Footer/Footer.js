import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="main-footer">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#96B6C5"
          fillOpacity="1"
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
                  <a href="#about-us-section" className="footer--link">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact-section" className="footer--link">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#ourTeam" className="footer--link">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#careers" className="footer--link">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Policies</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/privacy-policy" className="footer--link">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="footer--link">
                    Terms & Coditions
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" className="footer--link">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/cookies-policy" className="footer--link">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>Social Media</h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#instagram" className="footer--link">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#facebook" className="footer--link">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#twitter" className="footer--link">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#tiktok" className="footer--link">
                    TikTok
                  </a>
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
