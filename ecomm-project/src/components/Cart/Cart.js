import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./Cart.css";

const Cart = ({ currentUser }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (currentUser) {
      const fetchCartItems = async () => {
        try {
          const db = getFirestore();
          const cartRef = doc(db, "users", currentUser.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists() && isMounted) {
            setItems(cartSnap.data().cart || []);
          }
        } catch (err) {
          console.log("Error fetching the cart items: ", err);
        }
      };
      fetchCartItems();
    }

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="cart--section">
        <h2 className="cart--header container-fluid">Your Items</h2>
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <div key={index} className="cart--item">
              <div className="cart--img--container">
                <img className="cart--img" src={item.img} alt="" />
              </div>
              <p className="cart--item--title">{item.name}</p>
              <p className="cart--item--desc">{item.description}</p>
              <p className="cart--item--price">{item.price}</p>
              <div className="cart--item--btns">
                <a href="#increment" className="cart--item-plus">
                  <i className="fa-solid fa-plus"></i>
                </a>
                <a href="#decrement" className="cart--item-minus">
                  <i className="fa-solid fa-minus"></i>
                </a>
                <a href="#delete" className="cart--item--delete">
                  <i className="fa-solid fa-trash"></i>
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Cart;
