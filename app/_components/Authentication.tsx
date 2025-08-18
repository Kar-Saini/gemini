"use client";

import React, { ChangeEvent, useState } from "react";
import { debouncedSearch } from "../_utils/helper";
import toast from "react-hot-toast";
import SelectCountryCode from "./SelectCountryCode";
import { Country } from "../_utils/type";
import OTPComponent from "./OTPComponent";
import { AiOutlineLoading } from "react-icons/ai";
import { motion } from "framer-motion";

const Authentication = () => {
  const [countryName, setCountryName] = useState("");
  const [code, setCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [countryDetails, setCountryDetails] = useState<Country[]>([]);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCountryNameChange(e: ChangeEvent<HTMLInputElement>) {
    setCode("");
    const value = e.target.value;
    setCountryName(value);
    if (value.length > 1) {
      const res = await debouncedSearch(value);
      if (res) setCountryDetails(res as Country[]);
    } else {
      setCountryDetails([]);
    }
  }

  function handleSelectCountry(country: Country) {
    const dialCode =
      (country.code?.root || "") + (country.code?.suffixes?.[0] || "");
    setCode(dialCode);
    setCountryName(country.name.common);
    setCountryDetails([]);
  }
  function handleSendOtpClick() {
    if (code === "") {
      toast.error("Select country");
      return;
    }
    if (phoneNum === "") {
      toast.error("Enter number to receive OTP");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("OTP Sent");
      setOtpSent(true);
      setLoading(false);
    }, 3000);
  }

  return (
    <div className=" flex items-center justify-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="flex justify-center items-center h-[90%]"
      >
        <div className="border-2 border-neutral-800 px-8 py-6 md:p-8 rounded-2xl flex flex-col gap-y-5 bg-neutral-900 w-lg shadow-lg">
          {!otpSent && (
            <>
              <div className="w-full flex flex-col gap-2 relative">
                <label
                  htmlFor="country"
                  className="text-sm font-medium text-neutral-300"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className="w-full rounded-md px-3 py-2 text-sm outline-none bg-neutral-800 text-neutral-100 focus:ring-2 focus:ring-amber-400"
                  placeholder="Enter country"
                  value={countryName}
                  onChange={handleCountryNameChange}
                />

                {countryDetails.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-neutral-800 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
                    {countryDetails.map((country) => (
                      <SelectCountryCode
                        key={country.name.common}
                        country={country}
                        onSelect={() => handleSelectCountry(country)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-neutral-300"
                >
                  Phone No.
                </label>
                <div className="flex gap-2">
                  <p
                    id="dial-code"
                    className="rounded-md w-20 px-3 py-2 text-sm outline-none bg-neutral-800 text-neutral-100"
                  >
                    {code || "##"}
                  </p>
                  <input
                    type="text"
                    id="phone"
                    className="rounded-md flex-1 px-3 py-2 text-sm outline-none bg-neutral-800 text-neutral-100"
                    placeholder="Number"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={`bg-amber-500 ${
                  code !== "" && phoneNum != ""
                    ? "hover:bg-amber-600 hover:cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                } transition-colors flex justify-center items-center h-10 rounded-md text-neutral-900 font-semibold`}
                onClick={handleSendOtpClick}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading className="animate-spin size-5" />
                ) : (
                  "Send OTP"
                )}
              </button>
            </>
          )}
          {otpSent && (
            <OTPComponent otpSent={otpSent} setOtpSent={setOtpSent} />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Authentication;
