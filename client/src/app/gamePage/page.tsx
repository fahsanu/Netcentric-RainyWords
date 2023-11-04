"use client";

import React, { useState, useEffect } from "react";
import Cloud from "./components/cloud";
import { motion } from "framer-motion";

const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const [fallingWords, setFallingWords] = useState<string[][]>([[], [], []]);

  useEffect(() => {
    if (isPlaying) {
      const wordInterval = setInterval(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const wordIndex = Math.floor(Math.random() * 3);
        setFallingWords((prevWords) => {
          const newWords = [...prevWords];
          newWords[wordIndex] = [...prevWords[wordIndex], randomWord];
          return newWords;
        });
      }, 500);

      return () => clearInterval(wordInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (fallingWords.length > 0) {
      const gameInterval = setInterval(() => {
        const wordIndex = Math.floor(Math.random() * 3);
        setFallingWords((prevWords) => {
          const newWords = [...prevWords];
          newWords[wordIndex] = prevWords[wordIndex].slice(1);
          return newWords;
        });
      }, 5000);

      return () => clearInterval(gameInterval);
    }
  }, [fallingWords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setInput(inputText);

    // check for similar words
    fallingWords.forEach((singularFallingWords, index) => {
      if (singularFallingWords.includes(inputText)) {
        setFallingWords((prevWords) => {
          const newWords = [...prevWords];
          newWords[index] = prevWords[index].filter(
            (word) => word !== inputText
          );
          return newWords;
        });
        setInput("");
        setScore(score + 1);
      }
    });
  };

  const startGame = () => {
    setFallingWords([[], [], []]);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full pb-24 min-h-screen justify-center relative bg-slate-400">
      <div className="w-screen flex justify-center">
        <h1 className="absolute text-center text-stone-300 font-normal text-8xl pt-5 tracking-tighter font-outline-4 outline-black">
          Rainy Words
        </h1>

        <div className="pt-10 pb-2">
          <Cloud />
        </div>
      </div>
      <button
        onClick={startGame}
        className={`${
          isPlaying ? "bg-red-500" : "bg-green-500"
        } px-4 py-2 text-white rounded-md justify-center`}
      >
        {isPlaying ? "End Game" : "Start Game"}
      </button>

      <div className="flex flex-col items-center justify-center">
        <div className="relative block px-4 h-[45vh] overflow-hidden w-10/12 bg-slate-500 border-4 border-black pt-4">
          <div className="flex justify-between">
            <h1 className="text-stone-300 text-3xl top-2 left-5">
              Name : {score}
            </h1>
            <h1 className="text-stone-300 text-3xl top-2 right-5">Name : #</h1>
          </div>

          <div className="grid grid-cols-3">
            <div className="flex-col relative top-4 flex gap-8 items-center">
              <motion.div
                initial={{
                  y: -200,
                }}
                animate={{
                  y: 1000,
                }}
                transition={{
                  duration: 10,
                }}
                className="relative text-lg font-semibold text-white"
              >
                WORD
              </motion.div>

              {fallingWords[0].map((word, index) => (
                <div
                  key={index}
                  className="relative text-lg font-semibold text-white"
                >
                  {word}
                </div>
              ))}
            </div>

            <div className="flex-col relative flex gap-8 items-center">
              {fallingWords[1].map((word, index) => (
                <div
                  key={index}
                  className="relative text-lg font-semibold text-white"
                >
                  {word}
                </div>
              ))}
            </div>

            <div className="flex-col relative top-6 flex gap-8 items-center">
              {fallingWords[2].map((word, index) => (
                <div
                  key={index}
                  className="relative text-lg font-semibold text-white"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INPUT */}

        <div className="relative -top-10">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="text-center block w-96 p-4 text-black border-4 border-cyan-900 rounded-lg bg-zinc-300 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type Rainy Words Here..."
            disabled={!isPlaying}
          />
        </div>

        <div className="w-3/4 bg-stone-300 py-12 border-black rounded-lg border-4">
          <h1 className="flex justify-center text-2xl text-black">
            How to play
          </h1>
          <p className="flex justify-center text-black text-lg">
            Your task is to type words appearing on the screen before they have
            fallen down.
          </p>
          <p className="flex justify-center text-black text-lg">
            Type the word and press Enter. Each correctly typed word or syllable
            gives you points.
          </p>
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
}
function setInputValue(value: string) {
  throw new Error("Function not implemented.");
}

function getWord() {
  throw new Error("Function not implemented.");
}
