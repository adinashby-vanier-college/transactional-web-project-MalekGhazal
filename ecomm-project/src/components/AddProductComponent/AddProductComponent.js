import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "./AddProductComponent.css";
import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

//S3 config
const config = {
  bucketName: "ecomm-20231010",
  dirName: "product",
  region: "ca-central-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY,
  },
};

const client = new S3Client(config);

function AddProductComponent() {
  let id = useParams().id;
  const [isAdd, setIsAdd] = useState(true);

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
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadImgPath, setUploadImgPath] = useState("");

  useEffect(() => {
    if (id > 0) {
      setIsAdd(false); //Update
      Axios.get("http://localhost:4200/product/" + id).then((response) => {
        setProductId(response.data._id);
        setProductName(response.data.name);
        setProductDescription(response.data.description);
        setProductCategory(response.data.category);
        setProductPrice(response.data.price);
        setInStock(response.data.inStock);
        setUploadImgPath(response.data.img);
      });
    } else {
      setIsAdd(true); //Add
      Axios.get("http://localhost:4200/product/")
        .then((response) => {
          let pid = Math.floor(Math.random() * 10000000000000);
          let idArray = [];
          response.data.forEach((product) => {
            idArray.push(product._id);
          });
          while (idArray.includes(pid)) {
            pid = Math.floor(Math.random() * 10000000000000);
          }

          setProductId(pid);
        })
        .catch((error) => {
          // Handle errors
          alert(error);
        });
    }
  }, [id]);

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .min(2, "Item name must be at least 2 characters")
      .max(100, "Item name must not exceed 100 characters")
      .matches(
        /^[a-zA-Z0-9 ./,_()-]*$/,
        "Item name must only contain uppercase, lowercase, digits, spaces, and: ./,_()-"
      )
      .required("Item name is required"),
    productDescription: Yup.string()
      .min(2, "Item description must be at least 2 characters")
      .max(100, "Item description must not exceed 100 characters")
      .required("Item description is required"),
    productCategory: Yup.string()
      .min(2, "Item description must be at least 2 characters")
      .max(100, "Item description must not exceed 100 characters")
      .required("Item description is required"),
    productPrice: Yup.number()
      .positive("Product price must be greater than 0")
      .required("Product price is required")
      .test(
        "is-decimal",
        "New price must have up to two decimal places",
        (value) => {
          // Check if the value is a valid decimal with up to two decimal places
          return /^\d+(\.\d{0,2})?$/.test(value);
        }
      ),
    inStock: Yup.number()
      .positive("Product price must be greater than 0")
      .required("Product price is required"),
  });

  const addProduct = () => {
    let newFileName = "";
    let fullFileName = "";

    //Validate img file based on add/edit operation
    //Add Product
    if (
      isAdd &&
      (uploadImg === null ||
        uploadImg === undefined ||
        uploadImg.size > 5000000)
    ) {
      alert("Please upload an image or the image size is too large.");
      return;
    }
    //Update Product
    if (!isAdd) {
      if (uploadImg && uploadImg.size > 5000000) {
        alert("Uploaded image size is too large.");
        return;
      }
    }

    //Change file name
    if (uploadImg) {
      newFileName = `${productId}.${uploadImg.name.split(".").pop()}`;
      fullFileName = `https://${config.bucketName}.s3.${config.region}.amazonaws.com/${config.dirName}/${newFileName}`;
    }

    validationSchema
      .validate(
        {
          productName,
          productDescription,
          productCategory,
          productPrice,
          inStock,
          // uploadImg,
        },
        { abortEarly: false } // Collect all validation errors, not just the first one
      )
      .then(() => {
        if (uploadImg) {
          const imgFile = new File([uploadImg], newFileName, {
            type: uploadImg.type,
          });

          deleteProductImg(); //Delete old img
          // Upload image to S3
          const params = {
            Bucket: config.bucketName,
            Key: "product/" + newFileName,
            Body: imgFile,
          };

          client
            .send(new PutObjectCommand(params))
            .then((data) => {
              console.log("Image uploaded successfully:", data);
              saveToDatabase(fullFileName);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        } else {
          //Save to database
          saveToDatabase(uploadImgPath);
        }
      })
      .catch((validationErrors) => {
        // Validation failed; handle the errors
        alert("Validation error:" + validationErrors);
      });
  };
  const saveToDatabase = (filePath) => {
    if (isAdd) {
      //Add product
      Axios.post("http://localhost:4200/product/", {
        _id: productId,
        name: productName,
        description: productDescription,
        category: productCategory,
        price: parseFloat(productPrice),
        inStock,
        img: filePath,
      })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          }
          alert("Sucessfully added!");
          navigateToItemList();
        })
        .catch((error) => {
          // Handle errors
          alert(error);
        });
    } else {
      //Update product
      Axios.put(`http://localhost:4200/product/${productId}`, {
        _id: productId,
        name: productName,
        description: productDescription,
        category: productCategory,
        price: parseFloat(productPrice),
        inStock,
        img: filePath,
      })
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          }
          alert("Sucessfully updated!");
          navigateToItemList();
        })
        .catch((error) => {
          // Handle errors
          alert(error);
        });
    }
  };

  const deleteProductImg = () => {
    if (uploadImgPath.includes("amazonaws.com")) {
      const parts = uploadImgPath.split(".com/");
      const fileName = parts.pop();

      const params = {
        Bucket: config.bucketName,
        Key: fileName, // Specify the path to the file you want to delete
      };

      client
        .send(new DeleteObjectCommand(params))
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
    // else {
    //Delete img link from database
    //automatically override when save product
    //}
  };

  return (
    <div className="form my-4">
      <Container>
        <h1 className="add-product-title">
          {isAdd ? "Add Product" : "Update Product"}
        </h1>
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
                name="uploadImg"
                accept=".jpg, .png, .jpeg"
                multiple={false}
                // value={uploadImgPath.name}
                onChange={(e) => setUploadImg(e.target.files[0])}
              />
              <Form.Text className="text-muted">
                Required, image format is jpg, png.
              </Form.Text>
            </Form.Group>

            <Button className="submit-product-btn" onClick={addProduct}>
              Save
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
export default AddProductComponent;
