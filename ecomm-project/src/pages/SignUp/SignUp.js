import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styles from "./SignUp.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const SignUp = () => {
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
        <h1 className={styles.header}>Sign Up</h1>

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
                <i className="fa-sharp fa-solid fa-envelopes-bulk"></i>
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

            <Button type="submit" className={styles.submit}>
              S I G N &nbsp; U P
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

export default SignUp;
