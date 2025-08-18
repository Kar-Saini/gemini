"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setUsernameInStore } from "../_store/slices/chatsSlices";

export default function OTPComponent({
  otpSent,
  setOtpSent,
}: {
  otpSent: boolean;
  setOtpSent: (sent: boolean) => void;
}) {
  const router = useRouter();
  const DIGITS = 4;
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameExist, setUsernamExist] = useState(true);
  const [enteredUserName, setEnteredUsername] = useState("");
  const [inpArr, setInpArr] = useState<string[]>(new Array(DIGITS).fill(""));
  const inpRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inpRef.current[0]?.focus();
  }, []);

  function handleOtpVerification() {
    setLoading(true);
    const verify = inpArr.join("") === "1234";
    setTimeout(() => {
      if (verify) {
        toast.success("OTP verifird");
        setOtpVerified(true);
        setTimeout(() => {
          toast.success("Navigating...", {
            position: "bottom-right",
          });
        }, 1000);
        const username = localStorage.getItem("gemini-user-name") as string;
        if (!username) setUsernamExist(false);
      } else {
        toast.error("Incorrect OTP");
        setInpArr(new Array(DIGITS).fill(""));
        inpRef.current[0]?.focus();
      }
      setLoading(false);
    }, 3000);
  }
  function handleNameEnter() {
    setLoading(true);
    localStorage.setItem("gemini-user-name", enteredUserName);
    setUsernamExist(true);
    setLoading(false);
  }

  useEffect(() => {
    if (otpVerified && usernameExist) {
      setTimeout(() => {
        router.push("/app");
      }, 2000);
    }
  }, [otpVerified, router, usernameExist]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, idx: number) {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;
    const newArr = [...inpArr];
    newArr[idx] = val;
    setInpArr(newArr);
    if (val && idx < DIGITS - 1) {
      inpRef.current[idx + 1]?.focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent, idx: number) {
    if (e.key === "Backspace") {
      if (inpArr[idx] !== "") {
        const newArr = [...inpArr];
        newArr[idx] = "";
        setInpArr(newArr);
      } else if (idx > 0) {
        inpRef.current[idx - 1]?.focus();
      }
    }
  }

  return (
    <div className=" flex flex-col gap-y-4 relative">
      {!otpVerified && (
        <>
          <div className="flex gap-2 items-center">
            <IoMdArrowRoundBack
              size={30}
              className="hover:cursor-pointer hover:scale-105 duration-300 transition-transform"
              onClick={() => setOtpSent(false)}
            />

            <p className="text-sm font-medium text-neutral-300">
              Enter the OTP Below
            </p>
          </div>
          <div className="flex justify-center gap-6">
            {Array(DIGITS)
              .fill(1)
              .map((_, idx) => (
                <input
                  key={idx}
                  className="text-neutral-200 border-2 border-neutral-400 w-12 h-12 text-center outline-none rounded-sm focus:border-amber-400"
                  ref={(ele) => (inpRef.current[idx] = ele)}
                  onChange={(e) => handleInputChange(e, idx)}
                  value={inpArr[idx]}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  maxLength={1}
                />
              ))}
          </div>
          <p className="text-xs text-right text-neutral-500">
            1234 being the correct OTP
          </p>
          <button
            className="bg-amber-500 transition-colors py-2 rounded-md text-neutral-900 font-semibold hover:cursor-pointer h-10"
            onClick={handleOtpVerification}
          >
            {loading ? (
              <AiOutlineLoading className="animate-spin text-center w-full size-6" />
            ) : (
              "Verify"
            )}
          </button>
        </>
      )}
      {otpVerified && !usernameExist && (
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex gap-2 flex-col  gap-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-neutral-300"
            >
              Enter your name
            </label>
            <input
              type="text"
              id="phone"
              className="rounded-md flex-1 px-3 py-2 text-sm outline-none bg-neutral-800 text-neutral-100"
              placeholder="Number"
              value={enteredUserName}
              onChange={(e) => setEnteredUsername(e.target.value)}
            />
          </div>
          <button
            className="bg-amber-500 transition-colors py-2 rounded-md text-neutral-900 font-semibold hover:cursor-pointer h-10"
            onClick={handleNameEnter}
          >
            {loading ? (
              <AiOutlineLoading className="animate-spin text-center w-full size-6" />
            ) : (
              "Prooceed"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
