"use client";
import { Country } from "../_utils/type";

export default function SelectCountryCode({
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
