import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

function AllProduct() {
  const { isLoading, data } = useQuery({
    queryKey: "products",
    queryFn: () => {
      return axios.get("https://fakestoreapi.com/products");
    },
  });

  if (isLoading) {
    return <div>...isLoading</div>;
  }
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  return (
    <div>
      {data.data.map((product) => (
        <Link
          key={product.id}
          to={`/fakeapi/products/${product.id}`}
          style={{ display: "flex" }}
        >
          {product.title}
        </Link>
      ))}
    </div>
  );
}

export default AllProduct;
