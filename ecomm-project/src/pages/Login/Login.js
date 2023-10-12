import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (result.user) {
          const userRef = doc(db, "users", result.user.uid);
          const userSnapshot = await getDoc(userRef);

          if (!userSnapshot.exists()) {
            await setDoc(userRef, {
              uid: result.user.uid,
              username: result.user.displayName,
              email: result.user.email,
              cart: [],
              wishlist: [],
            });
          }
          navigate("/");
        }
      } catch (error) {
        console.error("Error after returning from redirect auth:", error);
      }
    };

    checkRedirectResult();
  }, [auth, db, navigate]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // The result will be handled by getRedirectResult() in the useEffect above.
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container fluid className="px-5">
      <h1 className="login-header">Login</h1>
      <div className="signupform">
        <Form onSubmit={handleEmailLogin}>
          <InputGroup className="group">
            <InputGroup.Text id="basic-addon1" className="icon">
              <i className="fa-solid fa-user"></i>
            </InputGroup.Text>
            <Form.Control
              className="input"
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
              className="input"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      <div className="icons">
        <Button className="google-btn" onClick={handleGoogleSignIn}>
          <i className="fa-brands fa-google"></i>
        </Button>
      </div>
    </Container>
  );
};

export default Login;
