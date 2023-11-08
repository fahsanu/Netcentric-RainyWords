"use client";

import React, { useState, useEffect } from "react";
import Cloud from "./components/cloud";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { io } from "socket.io-client";
import { socket } from '../sockets/socket'

export default function GamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(true); // Start the game right away
  const [countdown, setCountdown] = useState(20); // 2 minutes
  const [gameOver, setGameOver] = useState(false);
  const [words, setWords] = useState([]);
  const [run, setRun] = useState(true);

  const [fallingWords, setFallingWords] = useState<string[][]>([[], [], []]);

 
  const [all, setAll] = useState<[
    {name: string, score: number},
    {name: string, score: number}
  ]>([
    {name: '', score:0},
    {name:'', score:0}
  ])
  const [player, setPlayer] = useState('')
  const [enemy, setEnemy] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [enemyScore, setEnemyScore] = useState(0)

  useEffect(() => {
    // let isRun = false;
    fetch(`http://172.20.10.12:4000/words/${mode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setWords(data))
      .catch((error) => console.log("Getting error", error));

    // return () => {
    //   isRun = true;
    // };
  }, []);

  //get data from socket
  useEffect(() => {
    socket.emit('sendData', mode)
    socket.on('getPlayer', (player) => {
      setPlayer(player.name)
      // setPlayerScore(player.score)
    })
    socket.on('getEnemy', (enemy) => {
      setEnemy(enemy.name)
      // setEnemyScore(enemy.score)
    })
  }, [])

  //reset game
  useEffect(() => {

    socket.on('resetClient', () => {
      window.location.href = '/';
    });

    return () => {
      socket.off('resetClient'); 
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      socket.emit("");
      const gameInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown((prevCountdown) => prevCountdown - 1);
        } else {
          setIsPlaying(false); // Stop the game when time runs out
          clearInterval(gameInterval);
          setGameOver(true); // Display game over pop-up
        }
      }, 1000);

      return () => clearInterval(gameInterval);
    }
  }, [isPlaying, countdown]);

  useEffect(() => {
    if (isPlaying) {
      const wordInterval = setInterval(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        // console.log(words)
        // console.log(randomWord)
        const wordIndex = Math.floor(Math.random() * 3);
        setFallingWords((prevWords) => {
          const newWords = [...prevWords];
          newWords[wordIndex] = [...prevWords[wordIndex], randomWord];
          return newWords;
        });
      }, 1000);

      return () => clearInterval(wordInterval);
    }
  }, [isPlaying, words]);

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
        socket.emit('updateScore', mode)
      }
    });

    useEffect(() => {
      socket.on('sendUpdate', (player, otherPlayer) => {
        setPlayerScore(player.score);
        setEnemyScore(otherPlayer.score);
        console.log('player', player.score); // Log player's score
        console.log('enemy', otherPlayer.score); // Log other player's score
      });
    }, [setPlayerScore, setEnemyScore]);
    
    const stopGame = () => {
      setIsPlaying(false);
      setGameOver(true);
    };

    if (countdown === 0) {
      stopGame(); // Stop the game if the countdown is 0
    }
  };

  return (
    <div className="w-full h-full pb-24 min-h-screen justify-center relative bg-slate-400 dark:bg-slate-600">
      <div className="w-screen flex justify-center">
        <h1 className="absolute text-center text-stone-300 font-normal text-8xl pt-5 tracking-tighter font-outline-4 outline-black">
          Rainy Words
        </h1>
        <div className="pt-10 pb-2">
          <Cloud />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative block px-4 h-[55vh] overflow-hidden w-10/12 bg-slate-500 dark:bg-slate-700 border-4 border-black pt-4">
          <div className="flex justify-between">
            <h1 className="text-stone-300 text-3xl top-2 left-5">
              {player} : {playerScore}
            </h1>
            <h1 className="text-stone-300 text-3xl top-2">
              Time: {countdown} sec
            </h1>
            <h1 className="text-stone-300 text-3xl top-2 right-5">
              {enemy} : {enemyScore}
            </h1>
          </div>

          <div className="grid grid-cols-3">
            {fallingWords.map((column, index) => (
              <div
                key={index}
                className="flex-col relative top-4 flex gap-8 items-center"
              >
                <div>
                  {column.map((word, wordIndex) => (
                    <motion.div
                      key={wordIndex}
                      initial={{ y: -100 * (wordIndex + 1) }}
                      animate={{ y: 1000 }}
                      exit={{ opacity: 0, y: 1000 }}
                      transition={{ duration: 40 }}
                      className="relative text-lg font-semibold text-stone-300"
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {gameOver && (
            <div className="text-8xl text-stone-300 text-center item-center">
              <h2>Time's Up!</h2>
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="relative -top-10">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="text-center block w-96 p-4 text-black border-4 border-cyan-900 rounded-lg bg-zinc-300 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type Rainy Words Here..."
            disabled={!isPlaying || countdown === 0}
          />
        </div>

        <div className="w-3/4 bg-stone-300 py-12 border-black rounded-lg border-4">
          <h1 className="flex justify-center text-2xl text-black pb-5">
            How to play
          </h1>
          <p className="flex text-center justify-center text-black text-lg">
            Your task is to type words appearing on the screen before they have
            fallen down.
          </p>
          <p className="flex text-center justify-center text-black text-lg">
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
