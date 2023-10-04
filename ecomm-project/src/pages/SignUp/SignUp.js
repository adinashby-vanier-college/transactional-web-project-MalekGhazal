import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./SignUp.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("Succesfully created user");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <Container fluid className="px-5">
        <h1 className="login-header">Sign Up</h1>

        <div className="signupform">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-sharp fa-solid fa-envelopes-bulk"></i>
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            {/* <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-solid fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="input"
              />
            </InputGroup> */}

            <div className="textbox text">
              Already have an account?
              <Link to="/login" className="text">
                Login here
              </Link>
            </div>

            <Button type="submit" className="submit">
              S I G N &nbsp; U P
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

export default SignUp;
