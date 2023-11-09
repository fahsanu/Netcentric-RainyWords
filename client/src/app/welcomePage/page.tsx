"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { io } from "socket.io-client";
import { useUser } from "../UserInput/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { socket } from "../sockets/socket";
import Player from "./player";

const WelcomePage: React.FC = () => {
  const router = useRouter();

  const [active, setActive] = React.useState<number | null>(null);
  const [mode, setMode] = useState<string>("");
  const [wating, setWaiting] = useState(false);
  const [connected, setConnected] = useState(true);
  const track = "./bgsound.mp3";

  //reset game
  useEffect(() => {
    socket.on("resetClient", () => {
      window.location.href = "/";
    });

    return () => {
      socket.off("resetClient");
    };
  }, []);

  const handleModeSelection = (selectedMode: string) => {
    setMode(selectedMode);
  };
  const handleClick = (buttonId: number, mode: string) => {
    setActive(buttonId);
    console.log(mode);
  };

  useEffect(() => {
    localStorage.setItem("mode", mode);
    const selectedMode = localStorage.getItem("mode");
  }, [mode]);

  const { username } = useUser();

  //consider waiting page
  const handleWaitingPage = () => {
    if (connected) {
      setConnected(false);
      setWaiting(true);
      console.log("Socket connected:", connected);
    }
  };

  //start countdown
  if (wating) {
    return (
      <div className="w-full min-h-screen bg-slate-400 dark:bg-slate-600 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-stone-300 text-8xl font-normal p-10 tracking-tighter font-outline-4 outline-black pb-20">
            RainyWords
          </h1>

          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-36 h-36 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>

          <h1 className="text-4xl font-normal p-3 outline-black mt-6 pt-10">
            Waiting for Components
          </h1>
        </div>
      </div>
    );
  }

  socket.on("startGame", (mode) => {
    router.push(`/beginningPage?mode=${mode}`);
  });

  //main return
  return (
    <div className="w-full h-full min-h-screen relative bg-slate-400 dark:bg-slate-600">
      <div className="absolute text-white text-left left-8 top-5">
        <Player track={track} />
      </div>
      <div className="flex flex-wrap items-center justify-center">
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Rainy
        </h1>
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Words
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-2/3 border-2 border-black bg-slate-500 dark:bg-slate-700">
          <h1 className="text-center text-stone-300 font-outline-4 text-7xl py-20">
            Welcome, {username}
          </h1>
        </div>
        <div className="flex flex-wrap item-center justify-center py-10 space-x-10">
          <Button
            onClick={() => {
              socket.emit("joinRoom", "easy", { username });
              handleClick(1, "easy");
              handleModeSelection("easy");
            }}
            isActive={active === 1}
            mode="easy"
          >
            Easy
          </Button>
          <Button
            onClick={() => {
              socket.emit("joinRoom", "medium", { username });
              handleClick(2, "medium");
              handleModeSelection("medium");
            }}
            isActive={active === 2}
            mode="medium"
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              socket.emit("joinRoom", "hard", { username });
              handleClick(3, "hard");
              handleModeSelection("hard");
            }}
            isActive={active === 3}
            mode="hard"
          >
            Hard
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center pt-1 pb-10">
          <button
            className="px-20 py-4 text-black text-4xl font-bold bg-stone-300 border-4 border-black hover:bg-amber-300"
            type="button"
            onClick={handleWaitingPage}
          >
            START
          </button>
        </div>
      </div>
      <footer className="w-full fixed bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left bottom-0">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          <p className="text-neutral-800 dark:text-neutral-200 mx-2">
            © 2023 Copyright : Netcentric Project AY1/2023
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
