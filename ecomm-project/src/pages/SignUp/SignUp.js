import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./SignUp.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signOut(auth);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        try {
          await setDoc(doc(db, "users", user.uid), {
            username: username,
            email: email,
            cart: [],
            wishlist: [],
          });
          console.log("Succesfully created user and saved in Firestore");
        } catch (error) {
          console.error("Error storing user data in Firestore: ", error);
        }
        // Redirect to Login Page
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
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
                aria-label="Username"
                placeholder="Username"
                aria-describedby="basic-addon1"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="group">
              <InputGroup.Text id="basic-addon1" className="icon">
                <i className="fa-solid fa-envelopes-bulk"></i>
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
                <i className="fa-sharp fa-solid fa-lock"></i>
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
      </Container>
    </>
  );
};

export default SignUp;
