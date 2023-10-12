import React from "react";
import image1 from "../../assets/cart-fail-1.png";
import image2 from "../../assets/cart-fail-2.png";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  let navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <div className="container mt-5 align-items-center d-flex flex-column">
      <h1 className="text-center pb-2">Payment Failed!</h1>
      <p className="text-center primary-baige-color">Please try again.</p>
      <div className="d-flex">
        <img className="mx-auto mt-5 img-fluid" src={image1} alt="" />
        <img className="mx-auto mt-5 img-fluid" src={image2} alt="" />
      </div>
    </div>
  );
};

export default PaymentCancelled;
