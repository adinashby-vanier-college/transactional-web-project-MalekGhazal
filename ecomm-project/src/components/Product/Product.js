import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Dummy data
let imageurl =
  "https://images.pexels.com/photos/2897533/pexels-photo-2897533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
let name = "Pants";
let description =
  "These are some really great pants, I wear them all the time even in bed";
let price = "50$";

function Product() {
  return (
    <Card
      className="bg-body-transparent p-4"
      style={{
        minWidth: "150px",
        backgroundColor: "transparent",
        border: "none",
        maxWidth: "300px",
      }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <Card.Img
          variant="top"
          src={imageurl}
          style={{
            borderRadius: "100%",
            maxHeight: "250px",
            maxWidth: "250px",
            objectFit: "cover",
          }}
        />
      </div>
      <Card.Body className="secondary-baige-color">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{price}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <div className="text-center mt-3">
          <Button className="login-btn" style={{ fontSize: "20px" }}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Product;
