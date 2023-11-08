"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cloud from "./clouds";
export default function scorePage() {

  const router = useRouter();

  const playerScore = 10;
  const enemyScore = 8;

  useEffect(() => {
    const delayRedirect = setTimeout(() => {
      // Check scores and navigate to the appropriate page after 3 seconds
      if (playerScore > enemyScore) {
        router.push('/winnerPage'); // Navigate to winnerPage if the user's score is higher
      } else {
        router.push('/loserPage'); // Navigate to loserPage if the user's score is lower
      }
    }, 4000);

    return () => clearTimeout(delayRedirect); // Clear the timeout if the component unmounts

  }, [playerScore, enemyScore, router]);

  return (
    <div className="w-full min-h-screen bg-slate-400 dark:bg-slate-600 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-stone-300 text-8xl font-normal p-10 tracking-tighter font-outline-4 outline-black">
          RainyWords
        </h1>

        <div className="pt-10 pb-2">
          <Cloud />
        </div>
      </div>
    </div>
  );
}
