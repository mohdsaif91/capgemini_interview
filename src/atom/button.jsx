import React from "react";

function Button({ text, callback, type }) {
  return (
    <button
      type="button"
      className={`text-white cursor-pointer focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ${
        type === "buy" ? "bg-green-700" : "bg-blue-700"
      }`}
      onClick={() => callback()}
    >
      {text}
    </button>
  );
}

export default Button;
