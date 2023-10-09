import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { auth } from "../../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "../Cart/CartContext";
import "./Header.css";
import { getDoc, getFirestore, doc } from "@firebase/firestore";

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [navExpanded, setNavExpanded] = useState(false);
  const [username, setUsername] = useState(null);
  const auth = getAuth();
  const cart = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const closeNav = () => {
    setNavExpanded(false);
  };

  useEffect(() => {
    if (currentUser) {
      const fetchUsername = async () => {
        const db = getFirestore();
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }
      };
      fetchUsername();
    }
  }, [currentUser]);

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
      <Navbar
        expand="lg"
        className="bg-body-transparent"
        expanded={navExpanded}
        onToggle={(expanded) => setNavExpanded(expanded)}
      >
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
              className="fa-solid fa-bars secondary-baige-color"
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
                onClick={closeNav}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
                onClick={closeNav}
              >
                Products
              </Nav.Link>
              <Nav.Link
                href="#about"
                onClick={(e) => {
                  scrollToAboutUs();
                  closeNav();
                }}
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                href="#contact"
                onClick={(e) => {
                  scrollToContact();
                  closeNav();
                }}
                className="secondary-baige-color"
                style={{ fontSize: "22px", marginRight: "20px" }}
              >
                Contact
              </Nav.Link>
            </Nav>

            <Nav.Link
              as={Link}
              to={currentUser ? "/cart" : "/login"}
              onClick={closeNav}
              className="nav--icons"
            >
              <i
                className="fa-solid fa-cart-shopping secondary-baige-color mx-3 cart--icon"
                style={{ fontSize: "24px" }}
              >
                {cart.length > 0 && (
                  <span className="cart-count">{cart.length}</span>
                )}
              </i>
            </Nav.Link>

            {currentUser ? (
              <>
                <div className="welcome--username">
                  <h5 className="my-auto">Welcome {username}</h5>
                </div>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="login-btn"
                  style={{ fontSize: "20px" }}
                  onClick={async () => {
                    try {
                      await signOut(auth);
                      window.location.reload();
                      console.log("User signed out");
                    } catch (error) {
                      console.error("Error signing out:", error);
                    }
                  }}
                >
                  LOGOUT
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="login-btn"
                style={{ fontSize: "20px" }}
              >
                LOGIN
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
