import React from "react";
import Accordion from "react-bootstrap/Accordion";

const FAQ = () => {
  return (
    <>
      <h1 className="header text-center pt-0">FAQ</h1>
      <div className="about-border mb-5"></div>

      <Accordion defaultActiveKey="0" className="container faq">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is your return policy?</Accordion.Header>
          <Accordion.Body>
            We offer a hassle-free return policy for clothing items. If you're
            not completely satisfied with your purchase, you can return it
            within 30 days for a full refund or exchange. Please make sure the
            items are in their original condition with tags attached.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            How do I determine my size when ordering online?
          </Accordion.Header>
          <Accordion.Body>
            To find the perfect size, we recommend checking our detailed size
            chart, which can be found on the product page. Measure yourself and
            compare your measurements to the chart to select the most suitable
            size for your body type.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            Are your products ethically sourced and environmentally friendly?
          </Accordion.Header>
          <Accordion.Body>
            Yes, we are committed to ethical and sustainable practices. Our
            products are sourced from responsible suppliers, and we prioritize
            eco-friendly materials and production processes whenever possible.
            We believe in fashion that cares for both people and the planet.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            Can I track my order after it's been shipped?
          </Accordion.Header>
          <Accordion.Body>
            Absolutely! Once your order is shipped, you will receive a tracking
            number via email. You can use this tracking number to monitor the
            status and location of your package until it arrives at your
            doorstep. We value transparency in the delivery process.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default FAQ;
