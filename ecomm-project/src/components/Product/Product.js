import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "./Pagination";
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      fetch(`http://18.118.196.11/product`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log("Error fetching data:" + err);
        });

      isMounted.current = false;
    }
  }, []);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = products.slice(firstItemIndex, lastItemIndex);

  const filteredProducts = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="header text-center pb-5 collections--header">
        Collection
      </h1>
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
      <div className="container-fluid">
        <div className="row p-5">
          {filteredProducts.map((product, index) => (
            <Card key={index} className="p-4 custom-card text-center">
              <div className="d-flex justify-content-center align-items-center">
                <Card.Img
                  variant="top"
                  src={product.img}
                  className="product-img"
                />
              </div>
              <a href="#like" className="fav-icon">
                <i class="fa-regular fa-heart"></i>
              </a>
              <div class="half_circle"></div>
              <Card.Body className="card-body">
                <Card.Title className="card-title">{product.name}</Card.Title>
                <Card.Text className="card-price">{product.price}</Card.Text>
                <Card.Text className="custom-card-text">
                  {product.description}
                </Card.Text>
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
      </div>
      <div>
        <Pagination
          totalItems={products.length}
          productsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default Product;
