"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

import { motion } from "framer-motion";
const SideBar = () => {
  const [expandedView, setExpandedView] = useState(false);
  const [searchView, setSearchView] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x: -4 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      className={`${
        expandedView
          ? "w-60 flex  justify-between text-center"
          : "w-18 items-center flex flex-col gap-y-4"
      } bg-neutral-800/40 p-8 text-neutral-400  `}
    >
      <GiHamburgerMenu
        size={25}
        className="cursor-pointer hover:scale-95 transition-transform duration-300 "
        onClick={() => setExpandedView(!expandedView)}
      />
      {expandedView && <FaSearch size={20} />}
    </motion.div>
  );
};

export default SideBar;
