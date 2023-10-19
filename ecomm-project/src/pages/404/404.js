import React from "react";
import image from "../../assets/Fashion-8.png";

const NotFound = () => {
  return (
    <div>
      <h1 className="header text-center">404 Not Found</h1>
      <div>
        <img src={image} alt="404_image" className="img-fluid" />
      </div>
    </div>
  );
};

export default NotFound;
