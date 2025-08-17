"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { pacifico } from "./_utils/fonts";

const letters = "gemini".split("");

const Landing = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => router.push("/auth"), 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className={` flex items-center justify-center`}>
        <motion.span
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 360 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <BsStars size={50} />
        </motion.span>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 1 }}
            className={`text-8xl font-extrabold ${pacifico.className} tracking-tighter`}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default Landing;
