"use client";

import React from "react";
import Threemek from "./treemek";

export default function Leader() {
  const handlePlayClick = () => {
    alert("Play button clicked");
  };

  const handleExitClick = () => {
    alert("Exit button clicked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative bg-slate-400">
      <div className="w-full bg-slate-400">
        <h1 className="text-8xl w-full tracking-tighter top-3 absolute z-50 justify-center pt-8 font-bold font-outline-2 text-center text-stone-300">
          RainyWords
        </h1>
      </div>
      <div className="py-24 pt-[-10px] relative">
        <button
          className="text-5xl left-20 py-12 px-20 absolute justify-right z-50 font-bold top-40 text-black"
          onClick={handlePlayClick}
        >
          Play
        </button>
        <h2 className="text-5xl w-full absolute z-30 font-bold top-64 text-center text-black">
          Leaderboard
        </h2>
        <div className="absolute z-50" style={{ right: 0, top: "28px" }}>
          <button
            className="text-5xl right-20 py-12 px-20 absolute justify-right z-50 font-bold top-32 text-black"
            onClick={handleExitClick}
          >
            Exit
          </button>
        </div>
        <Threemek />
        <div className="bg-slate-500 border-4 border-black relative px-24 py-20 w-full justify-center grid grid-cols-[0.5fr_3fr_1fr] gap-6 top-[-28px] z-0">
          {/* Boxes for row 1 */}
          <div className="w-full h-30">
            <h1 className="text-8xl pb-4 font-bold font-outline-2 text-right text-stone-300">
              1
            </h1>
          </div>
          {/* Boxes for row 2 */}
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 1
          </div>
          {/* Boxes for row 3 */}
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 2
          </div>
          {/* Boxes for row 4 */}
          <div className="w-full pb-4 h-30">
            <h1 className="text-8xl font-bold font-outline-2 text-right text-stone-300">
              2
            </h1>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 3
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 4
          </div>
          {/* Boxes for row 5 */}
          <div className="w-full pb-4 h-30">
            <h1 className="text-8xl font-bold font-outline-2  pt-1 text-right text-stone-300">
              3
            </h1>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 5
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            Box 6
          </div>
        </div>
      </div>
    </div>
  );
}
