import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Product.css";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;
//Dummy data
let description =
  "These are some really great pants, I wear them all the time even in bed";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      const options = {
        method: "GET",
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
        params: {
          country: "us",
          lang: "en",
          currentpage: "" + Math.floor(Math.random() * (12 + 1)),
          pagesize: "30",
          categories: "men_all",
        },
        headers: {
          "X-RapidAPI-Key": api_key,
          "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then((response) => {
          setProducts(response.data.results);
          //use it only when you need to fetch many product records by HM api to database.
          //saveProducts(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      isMounted.current = false;
    }
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Save products to database when refresh the product page every time!
  const saveProducts = (products) => {
    const newArray = products.map((product) => ({
      _id: product.pk,
      name: product.name,
      img: product.galleryImages[0].baseUrl,
      price: product.price.formattedValue,
      category: product.categoryName,
      description:
        "These are some really great pants, I wear them all the time even in bed",
      inStock: Math.floor(Math.random() * 200),
    }));

    console.log(newArray);

    fetch("http://localhost:4200/product/insertMany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer YourAccessToken",
      },
      body: JSON.stringify(newArray),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error("Fetch error:", error);
      });

    return newArray;
  };
  return (
    <>
      <h1 className="header text-center pb-5">Collection</h1>
      <div class="InputContainer mx-auto">
        <input
          placeholder="Search.."
          id="input"
          class="input"
          name="text"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row p-5">
        {filteredProducts.map((product, index) => (
          <Card key={index} className="p-4 custom-card text-center">
            <div className="d-flex justify-content-center align-items-center">
              <Card.Img
                variant="top"
                src={product.galleryImages[0].baseUrl}
                className="product-img"
              />
            </div>
            <a href="#like" className="fav-icon">
              <i class="fa-regular fa-heart"></i>
            </a>
            <div class="half_circle"></div>
            <Card.Body className="card-body">
              <Card.Title className="card-title">{product.name}</Card.Title>
              <Card.Text className="card-price">
                {product.price.formattedValue}
              </Card.Text>
              <Card.Text className="custom-card-text">{description}</Card.Text>
              <div>
                <Button
                  className="add-to-cart-btn"
                  style={{ fontSize: "20px" }}
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Product;
