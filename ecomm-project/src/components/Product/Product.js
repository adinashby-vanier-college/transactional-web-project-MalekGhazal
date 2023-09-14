import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Product.css";

const api_key = process.env.API_KEY;
//Dummy data
let imageurl =
  "https://images.pexels.com/photos/2897533/pexels-photo-2897533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
let name = "Pants";
let description =
  "These are some really great pants, I wear them all the time even in bed";
let price = "50.00$";

function Product() {
  return (
    <div className="container pt-5">
      <Card className="p-4 custom-card">
        <div className="d-flex justify-content-center align-items-center">
          <Card.Img variant="top" src={imageurl} className="product-img" />
        </div>
        <Card.Body className="card-body">
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Text className="card-price">{price}</Card.Text>
          <Card.Text className="card-text">{description}</Card.Text>
          <div className="text-center mt-3">
            <Button className="add-to-cart-btn" style={{ fontSize: "20px" }}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;
