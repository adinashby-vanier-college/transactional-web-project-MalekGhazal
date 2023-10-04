import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleSubmit = (event) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //go to home page
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <Container fluid className="px-5">
        <h1 className="login-header">Login</h1>

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

        <h5 className="using">Log in or Sign up using</h5>
        <div className="icons">
          <div className="box">
            <a
              href="#google"
              className="icons-btn"
              onClick={handleGoogleSignIn}
            >
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
