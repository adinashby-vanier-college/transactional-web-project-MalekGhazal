import React from "react";
import { FormattedMessage } from "react-intl";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <section id="contact-section" className="container py-4">
        <h1 className="header text-center pb-3">
          <FormattedMessage id="contact_title" />
        </h1>
        <div className="about-border mt-0"></div>

        <form id="contactForm">
          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="name">
              <FormattedMessage id="contact_name" />
            </label>
            <input required className="form-control" id="name" type="text" />
          </div>

          <div className="mb-3">
            <label className="form-label custom-label" htmlFor="emailAddress">
              <FormattedMessage id="contact_email" />
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
              <FormattedMessage id="contact_message" />
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
              <span className="text">
                <FormattedMessage id="contact_submit" />
              </span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </a>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contact;
