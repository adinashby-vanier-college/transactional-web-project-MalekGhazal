import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./ProductDetails.css";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

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

  return (
    <div className="container mt-5 pt-5">
      <div
        className="card mx-auto mb-3 product-details-card"
        style={{ marginRight: "540px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={product.img}
              className="img-fluid h-100"
              alt="the product img"
            />
          </div>
          <div className="col-md-8">
            <div className="m-5">
              <h1 className="display-4 product-title">{product.name}</h1>
              <h2 className="">{product.price}</h2>
              <h4 className="mt-5">{product.description}</h4>
            </div>
            <h3 className="ms-5 mb-0">Sizes</h3>
            <div className="form-check form-check-inline ms-5 mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" for="inlineRadio1">
                S
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" for="inlineRadio2">
                M
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
              />
              <label className="form-check-label" for="inlineRadio3">
                L
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
              />
              <label className="form-check-label" for="inlineRadio3">
                XL
              </label>
            </div>
            <h4 className="m-5">In Stock: {product.inStock}</h4>
            <div className="m-5 pt-5 col-md-8">
              <a
                onClick={() => handleAddToCart(product)}
                href="#addtocart"
                className="btn btn-primary px-4 me-3 add--to-cart-btn"
              >
                ADD TO CART <i className="ms-2 fa-solid fa-cart-shopping"></i>
              </a>
              <a
                href="#like"
                className="add-to-wishlist-btn btn btn-primary px-4"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
