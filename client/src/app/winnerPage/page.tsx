"use client";
// import yay from "./assets/yay.wav";
import Confetti from "react-confetti";
import { useState } from "react";
import Youloose from "../loserPage/youloose";

export default function Winner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative bg-slate-400">
      <Confetti width={window.outerWidth} />
      <div className="w-full bg-slate-400 py-">
        <h1 className="text-9xl justify-center tracking-tighter font-bold pt-12 font-outline-2 top-24 text-center text-stone-300">
          RainyWords
        </h1>
      </div>
      <div className="py-16 relative">
        <h1 className="text-8xl py-20 px-9 left-20 absolute justify-center z-50 font-bold top-28 text-center text-black">
          You Win !
        </h1>
        <Youloose />
      </div>
      <div className="flex w-3/4 gap-10 flex-row py-10 items-center justify-center pt-1 pb-16">
        <button
          className="px-6 py-4 w-4/5 text-black text-3xl hover:bg-amber-400 font-bold bg-stone-300 rounded-1xl border-4 border-black"
          type="button"
        >
          Exit to Menu
        </button>
        <button
          className="px-6 py-4 w-4/5 text-black text-3xl hover:bg-amber-400 font-bold bg-stone-300 rounded-1xl border-4 border-black"
          type="button"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
