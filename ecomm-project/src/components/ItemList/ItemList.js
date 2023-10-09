import React, { useEffect, useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
  const navigateToDelete = (itemId) => {
    navigate(`/item/${itemId}`);
  };
  const navigateToAddItem = () => {
    navigate("/addItem");
  };
  const navigateToUpdate = (itemId) => {
    navigate(`/updateItem/${itemId}`);
  };

  return (
    <div className="ItemList my-4">
      <Container>
        <Button variant="info" className="my-5" onClick={navigateToAddItem}>
          Add Item
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
                  <td className="itemlist-box d-flex justify-content-center align-items-center">
                    <Card.Img
                      variant="top"
                      src={val.img}
                      // width={80}
                      height={62.4}
                      className="itemlist-img"
                    />
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
                      onClick={() => navigateToUpdate(val.itemId)}
                    ></i>{" "}
                    ||{" "}
                    <i
                      className="bi bi-trash3-fill icon-delete-color"
                      onClick={() => navigateToDelete(val.itemId)}
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
