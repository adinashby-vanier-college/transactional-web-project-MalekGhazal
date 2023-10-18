import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Container, Row, Table, Button } from "react-bootstrap";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
import "./ItemList.css";
import Pagination from "../Product/Pagination";
import "../Product/Pagination.css";

function ItemListComponent() {
  const [itemList, setItemList] = useState([]);

  const navigate = useNavigate();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/product/`)
      .then((response) => {
        setItemList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const navigateToDetail = (itemId) => {
  //   navigate(`/item/${itemId}`);
  // };

  const navigateToDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // The user clicked "OK" (Yes), perform the delete action here
      Axios.delete(
        `${process.env.REACT_APP_BASE_URL}/product/${productId}`
      ).then(
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
    navigate(`/admin/addProduct/0`);
  };
  const navigateToUpdate = (itemId) => {
    navigate(`/admin/addProduct/${itemId}`);
  };

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = itemList.slice(firstItemIndex, lastItemIndex);

  const filteredItemList = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // .filter(
  //   (item) =>!showFavorite ||
  //     currentUser?.wishlist?.some((wish) => wish._id === item._id)
  // );

  return (
    <div className="ItemList my-4">
      <h1 className="header text-center">Admin Panel</h1>
      <Container className="ItemList--section">
        <Button className="my-2 addItem-btn" onClick={navigateToAddItem}>
          Add Product
        </Button>
        <div className="InputContainer mx-auto my-3">
          <input
            placeholder="Search by name "
            id="input"
            className="input"
            name="text"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
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
              {filteredItemList.map((val, index) => (
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
                  <td>
                    {val.price.startsWith("$ ") ? val.price : "$  " + val.price}
                  </td>
                  <td>{val.category}</td>
                  <td>{val.description}</td>
                  <td>{val.inStock}</td>
                  <td>{val.createdAt}</td>
                  <td>{val.updatedAt}</td>

                  <td className="justify-content-md-center">
                    <i
                      // className="bi bi-pencil-square icon-edit-color"
                      className="fa-regular fa-pen-to-square icon-edit-color"
                      onClick={() => navigateToUpdate(val._id)}
                    ></i>{" "}
                    ||{" "}
                    <i
                      // className="bi bi-trash3-fill icon-delete-color"
                      className="fa-solid fa-trash icon-delete-color"
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
        <div className="itemList-pages">
          <Pagination
            totalItems={itemList.length}
            productsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </Container>
    </div>
  );
}

export default ItemListComponent;
