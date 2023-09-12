import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
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
        <h1 className={styles.header}>Login</h1>

        <div className={styles.signupform}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <InputGroup className={styles.group}>
              <InputGroup.Text id="basic-addon1" className={styles.icon}>
                <i className="fa-solid fa-user"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                className={styles.input}
              />
            </InputGroup>

            <InputGroup className={styles.group}>
              <InputGroup.Text id="basic-addon1" className={styles.icon}>
                <i className="fa-solid fa-lock"></i>
              </InputGroup.Text>
              <Form.Control
                aria-label="Username"
                aria-describedby="basic-addon1"
                className={styles.input}
              />
            </InputGroup>

            <div className={styles.textbox}>
              <Link to="/signup" className={styles.text}>
                Sign up
              </Link>
              <a href="#password" className={styles.text}>
                Forget your password?
              </a>
            </div>

            <Button type="submit" className={styles.submit}>
              L O G I N
            </Button>
          </Form>
        </div>

        <h5 className={styles.using}>Or Sign up using</h5>
        <div className={styles.icons}>
          <div className={styles.box}>
            <i className="fa-brands fa-google"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
