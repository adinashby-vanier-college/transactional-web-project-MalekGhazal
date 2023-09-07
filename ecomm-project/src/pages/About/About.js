import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./About.module.css";

const About = () => {
  return (
    <div>
      <Container fluid className="px-5">
        <h1 className={styles.header}>About Ecomm</h1>
        <p className={styles.description}>
          Welcome to our cutting-edge e-commerce platform, where shopping meets
          innovation. At Ecomm, we've redefined the online shopping experience.
          Explore a vast collection of products carefully curated to suit your
          every need, from fashion to electronics, home decor, and more. With
          our user-friendly interface, seamless navigation, and secure checkout
          process, shopping has never been this effortless. Enjoy exclusive
          deals, personalized recommendations, and top-notch customer service
          that makes your satisfaction our priority. Discover the future of
          online shopping at Ecomm, where convenience, quality, and style
          converge, providing you with nothing but the best.
        </p>
      </Container>
    </div>
  );
};

export default About;
