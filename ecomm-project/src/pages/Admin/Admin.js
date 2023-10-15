/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ItemListComponent from "../../components/ItemList/ItemList";
import Home from "../Home/Home";
import {
  getFirestore,
  doc,
  // setDoc,
  getDoc,
  // arrayUnion,
  // arrayRemove,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";
const db = getFirestore();
const auth = getAuth();

function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocData = await getDoc(userDocRef);
        if (userDocData.exists()) {
          setCurrentUser({ ...user, ...userDocData.data() });

          // Check if user is an admin. This is a temporary solution.Usually we should add role field for user in the database
          const emailArray = ["ecomm@gmail.com"];

          console.log(user);
          if (emailArray.includes(user["email"])) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }

          //Usually we would check if the user is an admin or not by checking the user's role in the database
          // if (userDocData && userDocData["role"] === "admin") {
          //   // User is an admin, allow access to ItemListComponent
          //   setIsAdmin(true);
          // } else {
          //   // User is not an admin, prevent access and redirect to Login
          //   setIsAdmin(false);
          // }
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return isAdmin ? <ItemListComponent /> : <Home />;
}

export default Admin;
