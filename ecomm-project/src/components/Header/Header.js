import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-transparent">
        <Container fluid className="px-5">
          <Navbar.Brand
            href="#"
            className="secondary-baige-color"
            style={{ fontSize: "44px" }}
          >
            Ecomm
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
                href="#action1"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="#"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="#"
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
            <Button className="login-btn" style={{ fontSize: "20px" }}>
              LOGIN
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
