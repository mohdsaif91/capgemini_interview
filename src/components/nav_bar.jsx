import React from "react";

import UserImage from "../assets/user.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between align-middle bg-amber-200 p-4">
      <h1 class="text-3xl text-center font-bold">Welcome to Retial Store</h1>
      <div className="flex items-center justify-center bg-gray-400 rounded-2xl p-2">
        <img
          onClick={() => navigate("/account")}
          src={UserImage}
          className="h-[30px] w-[30px] cursor-pointer "
          alt="account image"
        />
      </div>
    </div>
  );
}

export default NavBar;
