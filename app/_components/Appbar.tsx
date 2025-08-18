"use client";
import { useTheme } from "next-themes";
import React from "react";
import { pacifico } from "../_utils/fonts";
import { BsStars } from "react-icons/bs";

const Appbar = () => {
  const theme = useTheme();
  return (
    <div className="py-4 px-4  w-full">
      <div className="flex gap-1 items-center ">
        <BsStars size={20} />
        <h1 className={`${pacifico.className} text-3xl`}>Gemini</h1>
      </div>
    </div>
  );
};

export default Appbar;
