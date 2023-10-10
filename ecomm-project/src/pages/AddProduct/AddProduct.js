import React from "react";
import AddProductComponent from "../../components/AddProductComponent/AddProductComponent";
import { useParams } from "react-router-dom";

const AddProduct = () => {
  let { id } = useParams();
  return (
    <div>
      <AddProductComponent />
    </div>
  );
};

export default AddProduct;
