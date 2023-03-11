import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

function AddProduct() {
  const { isLoading, data, mutate } = useMutation();
  const product = {
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  };

  if (isLoading) {
    return <div>...Adding product</div>;
  }

  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          mutate(product);
        }}
      >
        Create Todo
      </button>
      {data?.data.title}
    </div>
  );
}

export default AddProduct;
