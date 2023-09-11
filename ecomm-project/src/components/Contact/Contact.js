import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div id="contact-section" className="container py-4">
        <h1 className="header text-center pb-3">Get in touch!</h1>
        <form id="contactForm">
          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="name">
              Name
            </label>
            <input required className="form-control" id="name" type="text" />
          </div>

          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="emailAddress">
              Email Address
            </label>
            <input
              required
              className="form-control"
              id="emailAddress"
              type="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="message">
              Message
            </label>
            <textarea
              required
              className="form-control"
              id="message"
              type="text"
              style={{ height: "10rem" }}
            ></textarea>
          </div>

          <div className="d-grid">
            <a className="fancy" href="#submit">
              <span className="top-key"></span>
              <span className="text">Submit</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
