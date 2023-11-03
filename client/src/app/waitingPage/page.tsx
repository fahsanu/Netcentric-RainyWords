import React from "react";
import Link from "next/link";
import { io } from "socket.io-client";

export default function WaitingPage() {
  const socket = io("http://localhost:4000/waitingPage", {
    transports: ["websocket"],
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-400">
      <h1 className="text-9xl font-bold pt-20 tracking-tighter pb-32 font-outline-2 top-28 text-center text-stone-300">
        RainyWords
      </h1>
      <div className="w-40 h-40 rounded-full border-t-4 border-r-4 border-b-4 border-gray-800 animate-spin"></div>
      <h1 className="text-4xl pt-20 font-bold mb-6">Waiting for Components</h1>
      <Link href="/welcomePage">ENTER</Link>
    </div>
  );
}
