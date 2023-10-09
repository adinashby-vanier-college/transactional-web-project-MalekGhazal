import React from "react";
import { Navigate } from "react-router-dom";

const Wishlist = ({ currentUser }) => {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <div>Wishlist</div>;
};

export default Wishlist;
