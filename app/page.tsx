"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { pacifico } from "./_utils/fonts";
import Authentication from "./_components/Authentication";

const letters = "Gemini".split("");

const Landing = () => {
  const router = useRouter();
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowAuth(true), 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-800
 flex-col gap-y-12"
    >
      <div className={`flex items-center justify-center text-neutral-300`}>
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

      {showAuth && <Authentication />}
    </div>
  );
};

export default Landing;
