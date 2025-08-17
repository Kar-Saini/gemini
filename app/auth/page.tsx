"use client";

import React, { ChangeEvent, useState } from "react";
import { cookie } from "../_utils/fonts";
import { debouncedSearch } from "../_utils/helper";
import toast from "react-hot-toast";
import { number } from "zod";

type Country = {
  name: { common: string };
  code?: { root?: string; suffixes?: string[] };
};

const Authentication = () => {
  const [countryName, setCountryName] = useState("");
  const [code, setCode] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [countryDetails, setCountryDetails] = useState<Country[]>([]);

  async function handleCountryNameChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setCountryName(value);
    if (value.length > 1) {
      const res = await debouncedSearch(value);
      setCountryDetails(res || []);
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

  return (
    <div className="flex justify-center items-center h-screen bg-neutral-950">
      <div className="border-2 border-neutral-800 p-8 md:p-12 rounded-2xl flex flex-col gap-y-6 bg-neutral-900 w-[90%] max-w-md shadow-lg">
        <h1
          className={`${cookie.className} text-4xl md:text-5xl pb-2 border-b border-neutral-700 text-neutral-100`}
        >
          Welcome to Gemini
        </h1>

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
            code != "" && "hover:bg-amber-600 hover:cursor-pointer"
          } transition-colors py-2 rounded-md text-neutral-900 font-semibold `}
          onClick={() => {
            if (code === "") toast.error("Select country");
            else {
              if (phoneNum === "") toast.error("Enter number to receive OTP");
            }
          }}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

function SelectCountryCode({
  country,
  onSelect,
}: {
  country: Country;
  onSelect: () => void;
}) {
  const dialCode =
    (country.code?.root || "") + (country.code?.suffixes?.[0] || "");
  console.log(country);
  return (
    <div
      className="flex justify-between items-center px-3 py-2 hover:bg-neutral-700 cursor-pointer transition-colors"
      onClick={onSelect}
    >
      <p className="text-neutral-100">{country.name.common}</p>
      <p className="text-neutral-400">{dialCode}</p>
    </div>
  );
}

export default Authentication;
