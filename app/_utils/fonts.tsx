import { Cookie, Dancing_Script, Lobster, Pacifico } from "next/font/google";

export const pacifico = Pacifico({ subsets: ["cyrillic"], weight: ["400"] });
export const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const lobster = Lobster({
  subsets: ["latin"],
  weight: ["400"],
});

export const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
});
