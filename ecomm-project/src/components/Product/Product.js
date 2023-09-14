import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Product.css";
import axios from "axios";

const apiKey = process.env.API_KEY;

const api_key = process.env.API_KEY;
//Dummy data
let description =
  "These are some really great pants, I wear them all the time even in bed";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
      params: {
        country: "us",
        lang: "en",
        currentpage: "0",
        pagesize: "30",
        categories: "men_all",
      },
      headers: {
        "X-RapidAPI-Key": "583815c838mshabe56640802fee0p121003jsnace8528c9895", // Include your API key here
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        setProducts(response.data.results);
        console.log(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container pt-5">
      {products.map((product, index) => (
        <Card key={index} className="p-4 custom-card">
          <div className="d-flex justify-content-center align-items-center">
            <Card.Img
              variant="top"
              src={product.images[0].baseUrl}
              className="product-img"
            />
          </div>
          <Card.Body className="card-body">
            <Card.Title className="card-title">{product.name}</Card.Title>
            <Card.Text className="card-price">
              {product.price.formattedValue}
            </Card.Text>
            <Card.Text className="card-text">{description}</Card.Text>
            <div className="text-center mt-3">
              <Button className="add-to-cart-btn" style={{ fontSize: "20px" }}>
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Product;
