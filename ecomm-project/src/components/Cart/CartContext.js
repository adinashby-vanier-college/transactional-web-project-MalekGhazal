import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  const numberOfItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const unsubscribeFirestore = onSnapshot(
          userDoc,
          (doc) => {
            setCart(doc.data()?.cart || []);
          },
          (error) => {
            console.error("Error fetching cart:", error);
          }
        );
        return () => unsubscribeFirestore();
      }
    });
    return () => unsubscribeAuth();
  }, [auth, db]);

  const clearCart = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      try {
        await updateDoc(userDoc, {
          cart: [],
        });
      } catch (error) {
        console.error("Error clearing the cart:", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, numberOfItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
