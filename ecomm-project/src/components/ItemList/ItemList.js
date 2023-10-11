import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Table, Button } from "react-bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import "./ItemList.css";
import Card from "react-bootstrap/Card";

function ItemListComponent() {
  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:4200/product/")
      .then((response) => {
        setItemList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigateToDetail = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const navigateToDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // The user clicked "OK" (Yes), perform the delete action here
      Axios.delete(`http://localhost:4200/product/${productId}`).then(
        (response) => {
          window.location.reload();
        } // refresh the page
      );
    } else {
      // The user clicked "Cancel" (No) or closed the dialog
      // You can handle the cancel action here or do nothing
    }
  };
  const navigateToAddItem = () => {
    navigate(`/admin/addProduct`);
  };
  const navigateToUpdate = (itemId) => {
    navigate(`/admin/updateProduct/${itemId}`);
  };

  return (
    <div className="ItemList my-4">
      <Container>
        <Button className="my-5 addItem-btn" onClick={navigateToAddItem}>
          Add Product
        </Button>
        <Row className="justify-content-md-center">
          <Table bordered hover>
            <thead>
              <tr>
                <th>img</th>
                <th>id</th>
                <th>name</th>
                <th>price</th>
                <th>category</th>
                <th>description</th>
                <th>inStock</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <td className="operations">Operations</td>
              </tr>
            </thead>
            <tbody>
              {itemList.map((val, index) => (
                <tr key={index}>
                  <td className="td-box">
                    <div className="image-container ">
                      <img
                        src={val.img}
                        alt={val.name}
                        className=" itemlist-img"
                      />
                    </div>
                  </td>
                  <td>{val._id}</td>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.category}</td>
                  <td>{val.description}</td>
                  <td>{val.inStock}</td>
                  <td>{val.createdAt}</td>
                  <td>{val.updatedAt}</td>

                  <td className="justify-content-md-center">
                    <i
                      className="bi bi-pencil-square icon-edit-color"
                      onClick={() => navigateToUpdate(val._id)}
                    ></i>{" "}
                    ||{" "}
                    <i
                      className="bi bi-trash3-fill icon-delete-color"
                      onClick={() => navigateToDelete(val._id)}
                    ></i>{" "}
                    {/* ||{" "}
                    <i
                      className="bi bi-bag-heart-fill"
                      onClick={() => navigateToDetail(val.itemId)}
                    ></i> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </div>
  );
}

export default ItemListComponent;
