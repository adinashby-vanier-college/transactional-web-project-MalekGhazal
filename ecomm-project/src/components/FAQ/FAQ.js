import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { FormattedMessage } from "react-intl";

const FAQ = () => {
  return (
    <>
      <h1 className="header text-center pt-0">FAQ</h1>
      <div className="about-border mb-5"></div>

      <Accordion defaultActiveKey="0" className="container faq">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FormattedMessage id="faq_question1" />
          </Accordion.Header>
          <Accordion.Body>
            <FormattedMessage id="faq_answer1" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <FormattedMessage id="faq_question2" />
          </Accordion.Header>
          <Accordion.Body>
            <FormattedMessage id="faq_answer2" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <FormattedMessage id="faq_question3" />
          </Accordion.Header>
          <Accordion.Body>
            <FormattedMessage id="faq_answer3" />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <FormattedMessage id="faq_question4" />
          </Accordion.Header>
          <Accordion.Body>
            <FormattedMessage id="faq_answer4" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FAQ;
