import axios from "axios";
import React from "react";
import { useMutation } from "react-query";

function DeleteProduct() {
  const { isLoading, data, mutate } = useMutation({
    mutationKey: "addProduct",
    mutationFn: () => {
      return axios.delete("https://fakestoreapi.com/products/8");
    },
  });

  if (isLoading) {
    return <div>...Deleting product</div>;
  }

  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          mutate();
        }}
      >
        Delete Product
      </button>
      {data?.data.title}
    </div>
  );
}

export default DeleteProduct;
