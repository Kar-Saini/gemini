"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoImagesOutline, IoSend } from "react-icons/io5";
import { generateId, generateRandomNumberOfWords } from "../_utils/helper";
import { PromptResponseType } from "../_utils/type";
import { RiChatNewLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "@/app/_store/slices/chatsSlices";
import toast from "react-hot-toast";
import { MdContentCopy } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { pacifico } from "../_utils/fonts";

const App = () => {
  const [saveChat, setSaveChat] = useState(false);
  const [chatName, setChatName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [promptResponse, setPromptResponse] = useState<PromptResponseType[]>(
    []
  );
  const [prompt, setPrompt] = useState<string>("");
  const dispatch = useDispatch();
  const inpRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const selectedChatId = useSelector((store) => store.chats.selectedChatId);
  const [selectedChatDetails, setSelectedChatDetails] = useState<{
    timeStamp: string;
    name: string;
  } | null>(null);

  const chats = useSelector((store) => store.chats.chats);
  useEffect(() => {
    if (selectedChatId != "") {
      console.log(selectedChatId);
      const chat = chats.find((chat) => chat.id === selectedChatId);
      toast.success("Loading chat...");
      setPromptResponse(chat.promptAndResponses);
      setSelectedChatDetails({ name: chat.name, timeStamp: chat.timeStamp });
    }
  }, [selectedChatId, chats]);

  useEffect(() => {
    inpRef.current?.focus();
    if (scrollRef) scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [promptResponse]);

  function handlePromptSend() {
    if (prompt === "" || loading) return;
    setLoading(true);
    const id = generateId();
    const promptTimeStamp = new Date().toLocaleTimeString();
    setPromptResponse((prev) => {
      const newPromptResponse: PromptResponseType = {
        id,
        userPrompt: { prompt, timeStamp: promptTimeStamp },
      };
      return [...prev, newPromptResponse];
    });
    setPrompt("");
    setTimeout(() => {
      const response = generateRandomNumberOfWords().join(" ");
      const responseTimeStamp = new Date().toLocaleTimeString();
      const geminiResponse = { response, timeStamp: responseTimeStamp };
      setPromptResponse((prev) => {
        return prev.map((entry) => {
          if (entry.id === id) return { ...entry, geminiResponse };
          else return entry;
        });
      });
      setLoading(false);
    }, Math.ceil(Math.random() * 10 * 1000));
  }

  function handleEnterPress(e: KeyboardEvent) {
    if (e.key === "Enter") handlePromptSend();
  }

  function handleSaveChat() {
    const id = generateId();
    dispatch(
      addChat({
        id,
        timeStamp: promptResponse[0]?.userPrompt.timeStamp,
        name: chatName,
        promptAndResponses: promptResponse,
      })
    );
    setPromptResponse([]);
    setChatName("");
    toast.success("Chat saved. ID: " + id);
    setSaveChat(false);
  }
  function handleDiscardChat() {
    setPromptResponse([]);
    setChatName("");
    toast.success("Chat Discarded");
    setSaveChat(false);
  }

  return (
    <div className="relative w-full h-full">
      <div className="w-full flex flex-col-reverse justify-start items-stretch h-full py-4 ">
        <div className="max-w-3xl w-full mx-auto flex flex-col-reverse h-full justify-between ">
          <div className="flex flex-col gap-y-2">
            {promptResponse.length > 0 && !loading && (
              <div className="flex justify-end gap-4 text-sm text-neutral-400 ">
                <div
                  className="flex items-center gap-1 hover:cursor-pointer hover:text-neutral-500"
                  onClick={() => setSaveChat(true)}
                >
                  <RiChatNewLine />
                  <p>New</p>
                </div>
              </div>
            )}
            <div className="flex flex-col w-full px-6 py-4 gap-6 border border-neutral-600 mx-auto rounded-3xl bg-neutral-900 ">
              <input
                ref={inpRef}
                type="text"
                placeholder="Ask Gemini"
                className="w-full bg-transparent outline-none text-neutral-200 placeholder-neutral-500 text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => handleEnterPress(e)}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-6 text-neutral-400">
                  <GoPlus
                    size={20}
                    className="hover:cursor-pointer hover:text-neutral-200"
                  />
                  <IoImagesOutline
                    size={20}
                    className="hover:cursor-pointer hover:text-neutral-200"
                  />
                </div>
                {prompt && (
                  <IoSend
                    size={20}
                    className="hover:cursor-pointer text-amber-400 hover:text-amber-500 transition-colors"
                    onClick={handlePromptSend}
                  />
                )}
              </div>
            </div>
          </div>
          {promptResponse.length === 0 && (
            <h1 className={`${pacifico.className} text-5xl text-center`}>
              Welocme {localStorage.getItem("gemini-user-name")}
            </h1>
          )}
          <div className="flex custom-scrollbar max-h-96 overflow-y-auto p-2 flex-col">
            {promptResponse.map((entry) => (
              <div key={entry.id} className="flex flex-col gap-y-2 py-1">
                <UserPrompt
                  prompt={entry.userPrompt.prompt}
                  timeStamp={entry.userPrompt.timeStamp}
                />
                {entry.geminiResponse ? (
                  <GeminiResponse
                    response={entry.geminiResponse.response}
                    timeStamp={entry.geminiResponse.timeStamp}
                  />
                ) : (
                  <p className="text-neutral-500 text-sm">
                    Gemini is typing...
                  </p>
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          {selectedChatId !== "" && (
            <div className=" flex justify-between">
              <div className="flex flex-col ">
                <h2 className="font-bold text-neutral-300">
                  Chat Name: {selectedChatDetails?.name}
                </h2>
                <p className="text-xs text-neutral-500">
                  {selectedChatId}, {selectedChatDetails?.timeStamp}
                </p>
              </div>
              <MdDeleteOutline
                size={25}
                className="hover:text-neutral-400 hover:scale-95 hover:cursor-pointer"
                onClick={() => {
                  dispatch(deleteChat(selectedChatId));
                  setPromptResponse([]);
                }}
              />
            </div>
          )}
        </div>
      </div>
      {saveChat && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="relative rounded-2xl shadow-lg p-4 w-[400px] z-10 bg-neutral-800 ">
            <button
              onClick={() => setSaveChat(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2">Save Chat</h2>

            <p className="mb-4 text-sm text-neutral-400">
              Chat Time : {promptResponse[0]?.userPrompt.timeStamp}
            </p>

            <input
              type="text"
              placeholder="Chat Name"
              className="w-full rounded-lg py-2 mb-4 outline-none border-2 border-neutral-700 text-center"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <div className="flex gap-4 text-sm">
              <button
                className="w-full text-white py-2 px-4 rounded-lg bg-neutral-700 hover:cursor-pointer"
                onClick={handleSaveChat}
              >
                Save Chat
              </button>
              <button
                className="w-full text-white  py-2 px-4 rounded-lg bg-neutral-700 hover:cursor-pointer"
                onClick={handleDiscardChat}
              >
                Discard Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function UserPrompt({
  timeStamp,
  prompt,
}: {
  timeStamp: string;
  prompt: string;
}) {
  return (
    <div className="flex flex-col items-end w-full gap-y-1">
      <p className="bg-neutral-800 p-3 rounded-tl-2xl rounded-bl-2xl rounded-br-2xl">
        {prompt}
      </p>
      <p className="text-xs text-neutral-500">{timeStamp}</p>
    </div>
  );
}

function GeminiResponse({
  timeStamp,
  response,
}: {
  timeStamp: string;
  response: string;
}) {
  const handleCopy = async (response: string) => {
    try {
      await navigator.clipboard.writeText(response);
      toast.success("Copied ", { position: "bottom-right" });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <div className="flex flex-col items-start w-full gap-y-1">
      <p className="text-xs text-neutral-500">{timeStamp}</p>
      <p className="text-neutral-300 flex flex-wrap">
        {response.split(" ").map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="mr-1 inline-block"
          >
            {word}
          </motion.span>
        ))}
        <span
          className="flex justify-end text-end w-full hover:cursor-pointer text-neutral-400"
          onClick={() => handleCopy(response)}
        >
          <MdContentCopy size={15} />
        </span>
      </p>
    </div>
  );
}
export default App;
