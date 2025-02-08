import React from "react";

function Dropdown({ userOptions, callback }) {
  return (
    <select
      className="cursor-pointer border px-4 py-2 rounded-[8px] bg-green-400 text-[18px] text-white font-bold"
      onChange={(e) => callback(e.target.value)}
    >
      {userOptions.map((m, i) => (
        <option key={i}>{m}</option>
      ))}
    </select>
  );
}

export default Dropdown;
