import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";

const Login = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Container fluid className="px-5">
        <h1 className="header">Login</h1>

        <div className="signupform">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="input"
              />
            </InputGroup>

            <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-solid fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="input"
              />
            </InputGroup>

            <div className="textbox">
              <Link to="/signup" className="text">
                Sign up
              </Link>
              <a href="#password" className="text">
                Forget your password?
              </a>
            </div>

            <Button type="submit" className="submit">
              L O G I N
            </Button>
          </Form>
        </div>

        <h5 className="using">Or Sign up using</h5>
        <div className="icons">
          <div className="box">
            <a href="#google" className="icons-btn">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#facebook" className="icons-btn">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#twitter" className="icons-btn">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
