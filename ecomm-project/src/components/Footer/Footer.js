import React from "react";

const Footer = () => {
  return (
    <footer className="bg-body-transparent secondary-baige-color p-4 fixed-bottom pb-2 pl-6">
      <div className="d-flex align-items-center">
        <div className="d-flex justify-content-start align-items-center pl-3 fs-4">
          <a
            href="#instagram"
            className="text-white mr-3"
            style={{ paddingLeft: 20 }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#facebook"
            className="text-white mr-3"
            style={{ paddingLeft: 20 }}
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#twitter"
            className="text-white mr-3"
            style={{ paddingLeft: 20 }}
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="flex-grow-1">
          <p className="text-center mb-0 fs-6">
            In Style and On Trend &copy; 2023 Ecomm. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
