import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./ProductDetails.css";

const ProductDetail = (props) => {
  const [product, setProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const { productId } = useParams();

  const isMounted = useRef(true);
  const db = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const productIdToFind = productId;

    if (isMounted.current) {
      fetch(`http://18.118.196.11/product/${productIdToFind}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP Error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((product) => {
          if (isMounted) {
            setProduct(product);
          }
        })
        .catch((err) => {
          console.log("Error fetching product data: " + err);
        });

      isMounted.current = false;
    }
  }, [productId]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

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

  return (
    <div className="container mt-5 mb-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-6">
              <div className="images p-3">
                <div className="text-center p-4">
                  {" "}
                  <img
                    id="main-image"
                    src={product.img}
                    width={250}
                    alt="this product"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="product p-4">
                <div className="mt-4 mb-3">
                  <span className="text-uppercase text-muted brand">
                    {product.category}
                  </span>
                  <h1 className="text-uppercase">{product.name}</h1>
                  <div className="price d-flex flex-row align-items-center">
                    <h3 className="act-price">{product.price}</h3>
                  </div>
                </div>
                <p className="about">{product.description}</p>
                <div className="sizes mt-5">
                  <h5 className="text-uppercase">Size</h5>
                  <label className="radio p-2">
                    <input
                      type="radio"
                      name="size"
                      defaultValue="S"
                      defaultChecked=""
                    />{" "}
                    <span>S</span>{" "}
                  </label>{" "}
                  <label className="radio p-2">
                    {" "}
                    <input type="radio" name="size" defaultValue="M" />{" "}
                    <span>M</span>{" "}
                  </label>{" "}
                  <label className="radio p-2">
                    {" "}
                    <input type="radio" name="size" defaultValue="L" />{" "}
                    <span>L</span>{" "}
                  </label>{" "}
                  <label className="radio p-2">
                    {" "}
                    <input type="radio" name="size" defaultValue="XL" />{" "}
                    <span>XL</span>{" "}
                  </label>{" "}
                  <label className="radio p-2">
                    {" "}
                    <input type="radio" name="size" defaultValue="XXL" />{" "}
                    <span>XXL</span>{" "}
                  </label>
                </div>
                <div className="cart mt-4 align-items-center">
                  {" "}
                  <button
                    className="btn text-uppercase mr-2 px-4 prod-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
