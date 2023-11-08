"use client";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

export default function WaitingPage() {
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("resetClient", () => {
      window.location.href = "/";
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-slate-400 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-stone-300 text-8xl font-normal p-10 tracking-tighter font-outline-4 outline-black">
          Rainy Words
        </h1>

        <div className="w-32 h-32 border-t-2 border-r-4  border-l-4 border-gray-800 rounded-full pt-10 animate-spin mx-auto"></div>

        <h1 className="text-4xl font-normal p-3 outline-black mt-6">
          Waiting for Components
        </h1>
      </div>
    </div>
  );
}
