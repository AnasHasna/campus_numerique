import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

function UpdateProduct() {
  const { isLoading, data, mutate } = useMutation({
    mutationKey: "addProduct",
    mutationFn: (product) => {
      return axios.put("https://fakestoreapi.com/products/7", product);
    },
  });
  const product = {
    title: "test product",
    price: 13.5,
    description: "lorem ipsum set",
    image: "https://i.pravatar.cc",
    category: "electronic",
  };

  if (isLoading) {
    return <div>...Update product</div>;
  }

  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          mutate(product);
        }}
      >
        Update Product
      </button>
      {data?.data.title}
    </div>
  );
}

export default UpdateProduct;
