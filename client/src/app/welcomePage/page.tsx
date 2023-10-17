'use client'
import React from "react";
import Link from "next/link";
import Button from "./button";
import { useSearchParams } from "next/navigation";

function WelcomePage() {
  const [active, setActive] = React.useState<number | null>(null);
  const handleClick = (buttonId: number, mode: string) => {
    setActive(buttonId);
    const key={mode};
    console.log(mode);
  }

  const searchParams = useSearchParams();
  const username = searchParams.get('username');

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
            onClick={() => handleClick(1, "easy")}
            isActive={active === 1}
            mode="easy"
          >
            Easy
          </Button>
          <Button
            onClick={() => handleClick(2, "medium")}
            isActive={active === 2}
            mode="medium"
          >
            Medium
          </Button>
          <Button
            onClick={() => handleClick(3, "hard")}
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
          >
            <Link href="/matchPage">START</Link>
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

export default WelcomePage;
