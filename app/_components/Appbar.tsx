"use client";
import React from "react";
import { pacifico } from "../_utils/fonts";
import { BsStars } from "react-icons/bs";

const Appbar = () => {
  return (
    <div className="py-4 px-4 flex w-full justify-between items-center">
      <div className="flex gap-1 items-center ">
        <BsStars size={20} />
        <h1 className={`${pacifico.className} text-3xl`}>Gemini</h1>
      </div>
      =
    </div>
  );
};

export default Appbar;
