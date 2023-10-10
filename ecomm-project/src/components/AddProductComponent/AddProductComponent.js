import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import "./AddProductComponent.css";
export default AddProductComponent;

// function generateId() {
//   let id = Math.floor(Math.random() * 1000000000);
//   const idArray = [];
//   Axios.get("http://localhost:4200/product/").then((response) => {
//     idArray = response.data.map((item) => item._id);
//   });
//   while (!idArray.includes(id)) {
//     id = Math.floor(Math.random() * 1000000000);
//   }

//   return id;
// }

function AddProductComponent({ id }) {
  const navigate = useNavigate();
  const navigateToItemList = () => {
    navigate("/admin");
  };

  const [productId, setProductId] = useState(id);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [inStock, setInStock] = useState(0);
  const [uploadImgPath, setUploadImgPath] = useState("");

  // const id = generateId();
  // setProductId(id);

  const validationSchema = Yup.object().shape({
    // productId: Yup.string()
    //   .email("Invalid email format")
    //   .required("Seller email is required"),
    // productName: Yup.string()
    //   .min(2, "Item name must be at least 2 characters")
    //   .max(100, "Item name must not exceed 100 characters")
    //   .matches(
    //     /^[a-zA-Z0-9 ./,_()-]*$/,
    //     "Item name must only contain uppercase, lowercase, digits, spaces, and: ./,_()-"
    //   )
    //   .required("Item name is required"),
    // productDescription: Yup.string()
    //   .min(2, "Item description must be at least 2 characters")
    //   .max(100, "Item description must not exceed 10,000 characters")
    //   .required("Item description is required"),
    // productPrice: Yup.number()
    //   .positive("Product price must be greater than 0")
    //   .required("Product price is required")
    //   .test(
    //     "is-decimal",
    //     "New price must have up to two decimal places",
    //     (value) => {
    //       // Check if the value is a valid decimal with up to two decimal places
    //       return /^\d+(\.\d{0,2})?$/.test(value);
    //     }
    //   ),
    // inStock: Yup.number()
    //   .positive("Product price must be greater than 0")
    //   .required("Product price is required"),
  });

  const addProduct = () => {
    // validationSchema
    //   .validate(
    //     {
    //       productId,
    //       productName,
    //       productDescription,
    //       productPrice,
    //       inStock,
    //     },
    //     { abortEarly: false } // Collect all validation errors, not just the first one
    //   )
    //   .then(() => {
    //     // Validation passed; you can make the Axios POST request here
    //     Axios.post(
    //       "http://localhost:3001/items",
    //       {
    //         productId,
    //         productName,
    //         productDescription,
    //         productPrice: parseFloat(productPrice),
    //         inStock,
    //       },
    //       {
    //         headers: {
    //           accessToken: localStorage.getItem("accessToken"),
    //         },
    //       }
    //     )
    //       .then((response) => {
    //         if (response.data.error) {
    //           alert(response.data.error);
    //         }
    //         // Handle the response if needed
    //         console.log(response.data);
    //         alert("Sucessfully added!");
    //         navigateToItemList();
    //       })
    //       .catch((error) => {
    //         // Handle errors
    //         alert(error);
    //       });
    //   })
    //   .catch((validationErrors) => {
    //     // Validation failed; handle the errors
    //     alert(validationErrors.errors);
    //   });
  };

  return (
    <div className="form my-4">
      <Container>
        <h1 className="add-product-title">Add Product</h1>
        <Row className="form-row">
          <Form>
            <Form.Group className="mb-3" controlId="formProductId">
              <Form.Label className="text-left">Product Id:</Form.Label>
              <Form.Control
                type="text"
                name="productId"
                disabled={true}
                value={productId}
              />
              <Form.Text className="text-muted">
                Generated automatically.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter Product Name"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, 2-100 characters, only uppercase, lowercase, digits,
                spaces and: ./,_()-.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
              <Form.Label>Product Description:</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter Product Description"
                name="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, 2-100 characters.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductCategory">
              <Form.Label>Product Category:</Form.Label>
              <Form.Control
                type="text"
                // placeholder="Enter Product Category"
                name="productCategory"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, 2-100 characters.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Product Price:</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={1000000.0}
                step="any"
                // placeholder="Enter Product Price"
                name="productPrice"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, must higher than 0.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInStock">
              <Form.Label>In Stock:</Form.Label>
              <Form.Control
                type="number"
                // placeholder="Enter In Stock"
                name="inStock"
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, must higher than 0.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUploadImg">
              <Form.Label>Upload Image:</Form.Label>
              <Form.Control
                type="file"
                // placeholder="Enter In Stock"
                name="uploadImgPath"
                // value={initialPrice}
                onChange={(e) => setUploadImgPath(e.target.value)}
              />
              <Form.Text className="text-muted">
                Required, image format is jpg, png.
              </Form.Text>
            </Form.Group>

            <Button className="submit-product-btn" onClick={addProduct}>
              Submit
            </Button>
            <Button
              className="mx-5 cancel-product-btn"
              variant="warning"
              onClick={navigateToItemList}
            >
              Cancel
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
}
