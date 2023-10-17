'use client'
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "./UserInput/UserContext";
import router from "next/router";

export default function Home() {
  const { username, setUsername } = useUser();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/user/check', { username });
      router.push(`/user/check/${response.data.username}`);
      console.log(`username: ${username}`)
    } catch (error) {
      console.log(error)
    }
  
  }

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
          <p className="text-center text-black text-4xl font-bold pt-20 pb-8">
            Please enter your nickname
          </p>
          <div className="flex flex-col items-center justify-center pt-3 pb-20">
            <input 
              className="block w-3/4 p-6 text-center text-black border-4 border-black bg-zinc-300 sm:text-5xl focus:ring-black focus:border-black dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-black dark:focus:border-black"
              value={username}
              onChange={handleUsernameChange}
            >
            </input>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-5 pb-10">
          <button
            className="px-20 py-4 my-5 text-black text-4xl font-bold bg-stone-300 border-2 border-black hover:bg-amber-300"
            type="button"
            onClick={handleSubmit}
          >
            <Link href="/welcomePage">ENTER</Link>
          </button>
        </div>
      </div>
      <footer className="w-full fixed bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left bottom-0">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          © 2023 Copyright :
          <a
            className="text-neutral-800 dark:text-neutral-900 mx-2"
            href="https://tailwind-elements.com/"
          >
            Netcentric Project AY1/2023
          </a>
        </div>
      </footer>
    </div>
  );
}