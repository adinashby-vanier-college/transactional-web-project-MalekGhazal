import React from "react";
import "./Footer.css";
import { FormattedMessage } from "react-intl";

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
              <h4>
                <FormattedMessage id="footer_location" />
              </h4>
              <ul className="list-unstyled">
                <li>Canada</li>
                <li>
                  <FormattedMessage id="footer_quebec" />
                </li>
                <li>
                  <FormattedMessage id="footer_montreal" />
                </li>

                <li>J8X 5V9</li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>
                <FormattedMessage id="footer_company" />
              </h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#about-us-section" className="footer--link">
                    <FormattedMessage id="header_aboutUs" />
                  </a>
                </li>
                <li>
                  <a href="#contact-section" className="footer--link">
                    <FormattedMessage id="header_contact" />
                  </a>
                </li>
                <li>
                  <a href="#ourTeam" className="footer--link">
                    <FormattedMessage id="footer_ourTeam" />
                  </a>
                </li>
                <li>
                  <a href="#careers" className="footer--link">
                    <FormattedMessage id="footer_carrers" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>
                <FormattedMessage id="footer_policies" />
              </h4>
              <ul className="list-unstyled">
                <li>
                  <a href="/privacy-policy" className="footer--link">
                    <FormattedMessage id="footer_privacyPolicy" />
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="footer--link">
                    <FormattedMessage id="footer_terms_conditions" />
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" className="footer--link">
                    <FormattedMessage id="footer_refundPolicy" />
                  </a>
                </li>
                <li>
                  <a href="/cookies-policy" className="footer--link">
                    <FormattedMessage id="footer_cookies" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-6">
              <h4>
                <FormattedMessage id="footer_socialMedia" />
              </h4>
              <ul className="list-unstyled">
                <li>
                  <a href="#instagram" className="footer--link">
                    <FormattedMessage id="footer_instagram" />
                  </a>
                </li>
                <li>
                  <a href="#facebook" className="footer--link">
                    <FormattedMessage id="footer_facebook" />
                  </a>
                </li>
                <li>
                  <a href="#twitter" className="footer--link">
                    <FormattedMessage id="footer_twitter" />
                  </a>
                </li>
                <li>
                  <a href="#tiktok" className="footer--link">
                    <FormattedMessage id="footer_tikTok" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="text-center">
              &copy;{new Date().getFullYear()}{" "}
              <FormattedMessage id="footer_copyright" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
