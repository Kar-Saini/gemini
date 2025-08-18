"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [expandedView, setExpandedView] = useState(false);
  const chats = useSelector((store: any) => store.chats.chats); // add proper type later
  console.log(chats);

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`${
        expandedView ? "w-60" : "w-[72px]"
      } bg-neutral-800/40 py-5 flex flex-col items-center gap-y-4 text-neutral-100 transition-all duration-300`}
    >
      <GiHamburgerMenu
        size={25}
        className="cursor-pointer hover:scale-95 transition-transform duration-300"
        onClick={() => setExpandedView(!expandedView)}
      />

      {expandedView && chats.length > 0 && (
        <div className="w-full space-y-2">
          {chats.map((chat: any) => (
            <ChatDescriptionComponent
              chatname={chat.name}
              id={chat.id}
              timeStamp={chat.timeStamp}
              key={chat.id}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

function ChatDescriptionComponent({
  chatname,
  timeStamp,
  id,
}: {
  chatname: string;
  timeStamp: string;
  id: string;
}) {
  return (
    <div className="flex flex-col items-start w-full bg-neutral-800 px-4 py-1 rounded-xl hover:bg-neutral-700 transition">
      <p className="font-medium">{chatname}</p>
      <p className="text-[10px] text-neutral-400 w-full text-end">
        {timeStamp}
      </p>
    </div>
  );
}

export default SideBar;
