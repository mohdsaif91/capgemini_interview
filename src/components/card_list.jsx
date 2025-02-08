import React from "react";
import Card from "../atom/card";

function CardList({ arr }) {
  console.log(Array.isArray(arr) && arr.length > 0);

  return (
    <div className="flex flex-wrap gap-4 mt-4 px-6">
      {Array.isArray(arr) && arr.length > 0 ? (
        arr.map((m, i) => <Card key={i} data={m} />)
      ) : (
        <div className="flex items-center justify-center text-2xl">
          No Data!
        </div>
      )}
    </div>
  );
}

export default CardList;
