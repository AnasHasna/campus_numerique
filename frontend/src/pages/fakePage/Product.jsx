import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function Product() {
  const params = useParams();
  const { id } = params;

  const { isLoading, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      return axios.get(`https://fakestoreapi.com/products/${id}`);
    },
  });
  if (isLoading) {
    return <div>...isLoading</div>;
  }

  return (
    <div style={{ display: "flex" }}>
      {data.data.title} {data.data.price}
    </div>
  );
}

export default Product;
