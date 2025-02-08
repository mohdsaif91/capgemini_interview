import React from "react";
import { getRewardPoints } from "../util/utils";

function Table({ data }) {
  return (
    <table className="w-full border-collapse pb-5 border-b-1">
      <thead>
        <tr>
          <th className="text-[20px] text-left">Purchase Date</th>
          <th className="text-[20px] text-left">Product Name</th>
          <th className="text-[20px] text-left">Image</th>
          <th className="text-[20px] text-left">Price (USD)</th>
          <th className="text-[20px] text-left">Category</th>
          <th className="text-[20px] text-left">Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {data.products.map((product, idx) => (
          <tr key={`${idx}`}>
            {idx === 0 && (
              <td className="text-[18px]" rowSpan={data.products.length}>
                {data.purchase_date}
              </td>
            )}
            <td className="text-[18px]">{product.product_name}</td>
            <td className="text-[18px]">
              <img src={product.image} alt={product.product_name} width="100" />
            </td>
            <td className="text-[18px]">${product.price_in_dollars}</td>
            <td className="text-[18px]">{product.product_category}</td>
            <td className="text-[18px] font-bold text-blue-500">
              {getRewardPoints(product.price_in_dollars)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
