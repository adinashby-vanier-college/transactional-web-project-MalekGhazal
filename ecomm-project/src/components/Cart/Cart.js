import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import "./Cart.css";
import image from "../../assets/Fashion-7.png";
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);

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

  const updateCartInFirestore = async (updatedCart) => {
    try {
      const db = getFirestore();
      const cartRef = doc(db, "users", currentUser.uid);
      await updateDoc(cartRef, { cart: updatedCart });
    } catch (err) {
      console.log("Error updating the cart in Firestore: ", err);
    }
  };

  const handleIncrement = async (index) => {
    const newItems = [...items];
    newItems[index].quantity += 1;

    setItems(newItems);
    await updateCartInFirestore(newItems);
  };

  const handleDecrement = async (index) => {
    const newItems = [...items];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
    } else {
      newItems.splice(index, 1);
    }

    setItems(newItems);
    await updateCartInFirestore(newItems);
  };

  const handleDelete = async (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);

    setItems(newItems);
    await updateCartInFirestore(newItems);
  };

  const cartTotal = () => {
    return items
      .map((item) => {
        const priceString = item.price.replace(/[^0-9.]/g, "");
        return parseFloat(priceString * item.quantity);
      })
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);
  };

  const numberOfItems = () => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  };

  const checkout = async () => {
    try {
      const cartData = items.map((item) => ({
        name: item.name,
        price: item.price.replace(/[^0-9.]/g, ""),
        quantity: item.quantity,
      }));

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cartData }),
        }
      );

      if (!response.ok) {
        throw new Error(`Server responded with a ${response.status} status.`);
      }

      const { sessionId } = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("There was an issue with the checkout:", error.message);
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="cart--section">
        <h2 className="cart--header container-fluid">Your Items</h2>
        {items.length === 0 ? (
          <div className="container">
            <h4 className="text-center text-white">Your cart is empty.</h4>
            <img className="w-10 img-fluid" src={image} alt="" />
          </div>
        ) : (
          items.map((item, index) => (
            <div key={index} className="cart--item">
              <img className="cart--img" src={item.img} alt="" />
              <div className="cart--item--details">
                <p className="cart--item--title">{item.name}</p>
                <p className="cart--item--desc">{item.description}</p>
                <p className="cart--item--price">{item.price}</p>
                <div className="cart--item--btns">
                  <div className="cart--item--icons--circle text-center">
                    <a
                      href="#increment"
                      className="cart--item-plus"
                      onClick={(e) => {
                        e.preventDefault();
                        handleIncrement(index);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </a>
                  </div>
                  <div className="cart--item--icons--circle text-center">
                    <a
                      href="#decrement"
                      className="cart--item-minus"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDecrement(index);
                      }}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </a>
                  </div>
                  <div className="cart--item--icons--circle text-center">
                    <a
                      href="#delete"
                      className="cart--item--delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(index);
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </a>
                  </div>
                </div>
                <div className="product--quantity mt-3">
                  Quantity: {item.quantity}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart--checkout container">
        <p className="total--price mb-0">Total: $ {cartTotal()}</p>
        <p className="number--of--items mb-0">
          No. of items: {numberOfItems()}
        </p>
        <button onClick={checkout} className="checkout--btn">
          Checkout
        </button>
      </div>
    </>
  );
};

export default Cart;
