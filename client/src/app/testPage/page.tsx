"use client";
import React, { useState, useEffect } from "react";

const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

const FallingWordsGame: React.FC = () => {
  const [fallingWords, setFallingWords] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const wordInterval = setInterval(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setFallingWords((prevWords) => [...prevWords, randomWord]);
      }, 1000);

      return () => clearInterval(wordInterval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (fallingWords.length > 0) {
      const gameInterval = setInterval(() => {
        setFallingWords((prevWords) => prevWords.slice(1));
      }, 5000);

      return () => clearInterval(gameInterval);
    }
  }, [fallingWords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setInput(inputText);

    if (fallingWords.includes(inputText)) {
      setFallingWords((prevWords) =>
        prevWords.filter((word) => word !== inputText)
      );
      setInput("");
      setScore(score + 1);
    }
  };

  const startGame = () => {
    setFallingWords([]);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="text-center mt-4">
      <h1 className="text-4xl font-bold mb-4">Falling Words Game</h1>
      <div className="mb-4">
        <button
          onClick={startGame}
          className={`${
            isPlaying ? "bg-red-500" : "bg-green-500"
          } px-4 py-2 text-white rounded-md`}
        >
          {isPlaying ? "End Game" : "Start Game"}
        </button>
      </div>
      <div className="mb-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border border-gray-400 p-2 rounded-md w-40"
          disabled={!isPlaying}
          placeholder="Type the words"
        />
      </div>
      <div className="text-2xl mb-4">Score: {score}</div>
      <div className="relative h-40">
        {fallingWords.map((word, index) => (
          <div
            key={index}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 text-lg font-semibold text-black"
            style={{ top: `${index * 40}px` }}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FallingWordsGame;
