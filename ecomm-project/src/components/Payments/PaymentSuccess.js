import React, { useEffect } from "react";
import image1 from "../../assets/cart-ok.png";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const PaymentSuccess = () => {
  let navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();

    setTimeout(() => {
      navigate("/");
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mt-5 align-items-center d-flex flex-column">
      <h1 className="text-center pb-2 secondary-baige-color">
        Payment Received!
      </h1>
      <p className="text-center primary-baige-color">
        Thank you for your purchase!
      </p>
      <img className="mx-auto mt-5 img-fluid" src={image1} alt="" />
    </div>
  );
};

export default PaymentSuccess;
