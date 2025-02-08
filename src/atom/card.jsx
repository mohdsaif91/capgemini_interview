import React from "react";
import Button from "./button";

function Card({ data }) {
  console.log(data, " <>?");

  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
      <img
        src={data.thumbnail}
        className="h-[200px] w-[300px]"
        alt="card-image"
      />
      <h5>{data.title}</h5>
      <div className="bg-blend-hard-light flex justify-between">
        <Button type="cart" text="Add to cart"></Button>
        <Button type="buy" text="Buy"></Button>
      </div>
    </div>
  );
}

export default Card;
