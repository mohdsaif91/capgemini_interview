import React, { useEffect, useState } from "react";
import Button from "../atom/button";
import CardList from "../components/card_list";

function Home() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.products);
        setProduct(res.products);
      })
      .catch((err) => {});
  };

  return (
    <div className="py-4 px-6 ">
      <div className="pb-4 border-b-2">
        {error !== "" && (
          <div className="flex items-center flex-col justify-center h-screen">
            <div className="text-3xl text-center  font-bold">
              ...Something went wrong
            </div>
            <Button text="Try again" callback={() => getProducts()} />
          </div>
        )}
      </div>
      <CardList arr={product} />
    </div>
  );
}

export default Home;
