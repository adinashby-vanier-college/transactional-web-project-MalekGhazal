import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorite, setShowFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [notification, setNotification] = useState(null);
  const isMounted = useRef(true);
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocData = await getDoc(userDocRef);
        if (userDocData.exists()) {
          setCurrentUser({ ...user, ...userDocData.data() });
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth, db]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const userDocRef = doc(db, "users", currentUser.uid);
    const userDocData = await getDoc(userDocRef);

    if (userDocData.exists()) {
      const cartItems = userDocData.data().cart || [];
      let updatedCartItems = [];

      // Check if product already exists in cart
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item._id === product._id
      );

      if (existingCartItemIndex > -1) {
        // If product exists, update its quantity
        const existingCartItem = cartItems[existingCartItemIndex];
        existingCartItem.quantity += 1;
        updatedCartItems = [...cartItems];
      } else {
        // If product doesn't exist, add it with quantity = 1
        const productWithQuantity = { ...product, quantity: 1 };
        updatedCartItems = [...cartItems, productWithQuantity];
      }

      // Update the cart in Firestore
      await setDoc(userDocRef, { cart: updatedCartItems }, { merge: true });

      showNotification("Added to cart successfully!");
    }
  };

  const handleWishlist = async (product) => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const userDoc = doc(db, "users", currentUser.uid);

    const isProductInWishlist = currentUser.wishlist?.some(
      (wish) => wish._id === product._id
    );

    if (isProductInWishlist) {
      await setDoc(
        userDoc,
        { wishlist: arrayRemove(product) },
        { merge: true }
      );
      setCurrentUser((prevUser) => ({
        ...prevUser,
        wishlist: prevUser.wishlist.filter((wish) => wish._id !== product._id),
      }));
      showNotification("Removed from wishlist successfully!");
    } else {
      await setDoc(userDoc, { wishlist: arrayUnion(product) }, { merge: true });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        wishlist: [...prevUser.wishlist, product],
      }));
      showNotification("Added to wishlist successfully!");
    }
  };

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

  const filteredProducts = currentItems
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) =>
        !showFavorite ||
        currentUser?.wishlist?.some((wish) => wish._id === item._id)
    );

  return (
    <>
      {notification && <div className="notification-popup">{notification}</div>}
      <h1 className="header text-center pb-5 collections--header">
        Collection
      </h1>
      <div className="InputContainer mx-auto">
        <input
          placeholder="Search.."
          id="input"
          className="input"
          name="text"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <a
          href="#favorite-filter"
          className="favorite-icon"
          onClick={(e) => {
            e.preventDefault();
            setShowFavorite(!showFavorite);
          }}
        >
          <i className="fa-solid fa-heart"></i>
        </a>
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
              <a
                href="#like"
                className="fav-icon"
                onClick={() => handleWishlist(product)}
              >
                <i
                  className={
                    currentUser?.wishlist?.some(
                      (wish) => wish._id === product._id
                    )
                      ? "fa-solid fa-heart"
                      : "fa-regular fa-heart"
                  }
                ></i>
              </a>
              <div className="half_circle"></div>
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
                    onClick={() => handleAddToCart(product)}
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
