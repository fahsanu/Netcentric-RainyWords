"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cloud from "./clouds";
import { socket } from "../sockets/socket";


export default function scorePage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [player, setPlayer] = useState('')
  const [enemy, setEnemy] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [enemyScore, setEnemyScore] = useState(0)
  const [result, setResult] = useState(true)

  useEffect(() => {
    socket.emit('sendData', mode)
    socket.on('getPlayer', (player) => {
      setPlayer(player.name)
      setPlayerScore(player.score)
    })
    socket.on('getEnemy', (enemy) => {
      setEnemy(enemy.name)
      setEnemyScore(enemy.score)
    })
  })

  useEffect(() => {
    socket.emit('isWinner', mode)
    socket.on('check', (r) => {setResult(r)})
    const delayRedirect = setTimeout(() => {
      // Check scores and navigate to the appropriate page after 3 seconds
      if (result) {
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
          {/* <h1>{player}: {playerScore}</h1>
          <h1>{enemy}: {enemyScore}</h1> */}
          <Cloud player={player} playerScore={playerScore} enemy={enemy} enemyScore={enemyScore}/>
        </div>
      </div>
    </div>
  );
}
