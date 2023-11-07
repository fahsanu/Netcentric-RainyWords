"use client";
import React, { useEffect, useState } from "react";
import Button from "./button";
import { io } from "socket.io-client";
import { useUser } from "../UserInput/UserContext";
import { useRouter } from "next/navigation";

const WelcomePage: React.FC = () => {
  const router = useRouter();

  const [active, setActive] = React.useState<number | null>(null);
  const [mode, setMode] = useState<string>("");
  const [wating, setWaiting] = useState(false);
  const [connected, setConnected] = useState(true);

  const socket = io('http://172.20.10.12:4000', { transports : ['websocket'] }); 

  //reset game
  useEffect(() => {

    socket.on('resetClient', () => {
      window.location.href = '/';
    });

    return () => {
      socket.disconnect(); 
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-400">
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          RainyWords
        </h1>
        <div className="w-40 h-40 rounded-full border-t-4 border-r-4 border-b-4 border-gray-800 animate-spin"></div>
        <h1 className="text-4xl pt-20 font-bold mb-6">
          Waiting for Components
        </h1>
      </div>
    );
  }

  socket.on('startGame',(mode) => {
    router.push(`/beginningPage?mode=${mode}`)
  })

  //main return
  return (
    <div className="w-full h-full min-h-screen relative bg-slate-400">
      <div className="flex flex-wrap items-center justify-center">
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Rainy
        </h1>
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Words
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-2/3 border-2 border-black bg-slate-500">
          <h1 className="text-center text-stone-300 font-outline-4 text-7xl py-20">
            Welcome, {username}
          </h1>
        </div>
        <div className="flex flex-wrap item-center justify-center py-10 space-x-10">
          <Button
            onClick={() => {
              socket.emit('joinRoom', 'easy', {username});
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
              socket.emit('joinRoom', 'medium', {username});
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
              socket.emit('joinRoom', 'hard', {username});
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
          © 2023 Copyright :
          <a
            className="text-neutral-800 dark:text-neutral-200 mx-2"
            href="https://tailwind-elements.com/"
          >
            Netcentric Project AY1/2023
          </a>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
