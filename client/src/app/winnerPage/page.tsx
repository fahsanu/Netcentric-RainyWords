"use client";
// import yay from "./assets/yay.wav";
import Confetti from "react-confetti";
import { useState } from "react";
import Youloose from "../loserPage/youloose";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { socket } from "../sockets/socket";
import React from "react";

export default function Winner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  socket.emit('remove', mode)

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative bg-slate-400 dark:bg-slate-600">
      <Confetti width={window.outerWidth} />
      <div className="w-full bg-slate-400 dark:bg-slate-600">
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
          <Link href="leaderPage">Leaderboard</Link>
        </button>
        <button
          className="px-6 py-4 w-4/5 text-black text-3xl hover:bg-amber-400 font-bold bg-stone-300 rounded-1xl border-4 border-black"
          type="button"
        >
          <Link href="/">Play Again</Link>
        </button>
      </div>
      <footer className="w-full fixed bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left bottom-0">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          <Link
            className="text-neutral-800 dark:text-neutral-200 mx-2"
            href="/aboutus"
          >
            © 2023 Copyright : Netcentric Project AY1/2023
          </Link>
        </div>
      </footer>
    </div>
  );
}
