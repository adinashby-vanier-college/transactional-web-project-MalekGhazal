import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us-section");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-transparent">
        <Container fluid className="px-5">
          <Navbar.Brand
            as={Link}
            to="/"
            className="secondary-baige-color"
            style={{ fontSize: "44px" }}
          >
            EBRA
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav">
            <i
              class="fa-solid fa-bars secondary-baige-color"
              style={{ fontSize: "30px" }}
            ></i>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav" className="text-center">
            <Nav className="me-auto mx-auto">
              <Nav.Link
                as={Link}
                to="/"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="#about"
                onClick={scrollToAboutUs}
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="#contact"
                onClick={scrollToContact}
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Contact
              </Nav.Link>
            </Nav>
            <a href="#cart">
              <i
                className="fa-solid fa-cart-shopping secondary-baige-color mx-3"
                style={{ fontSize: "24px" }}
              ></i>
            </a>
            <Nav.Link
              as={Link}
              to="/login"
              className="login-btn"
              style={{ fontSize: "20px" }}
            >
              LOGIN
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
