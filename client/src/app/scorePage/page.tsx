"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cloud from "./clouds";
import { socket } from "../sockets/socket";

export default function scorePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [player, setPlayer] = useState("");
  const [enemy, setEnemy] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [result, setResult] = useState(true);

  useEffect(() => {
    socket.emit("sendData", mode);
    socket.on("getPlayer", (player) => {
      setPlayer(player.name);
      setPlayerScore(player.score);
    });
    socket.on("getEnemy", (enemy) => {
      setEnemy(enemy.name);
      setEnemyScore(enemy.score);
    });
  });

  useEffect(() => {
    try {
      fetch(`http://172.20.10.12:4000/user/add_score`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: player,
          score: playerScore // Use the player's final score
        }),
      })
        .then((response) => response.json())
        .then((data) => {console.log(data);})
        .catch((error) => {console.log(error);});
    } catch (error) {
      console.log(error);
    }
  }, [player, playerScore])

  useEffect(() => {
    let delayRedirect:NodeJS.Timeout;
    socket.emit('isWinner', mode)
    socket.on('check', (r) => {setResult(r)
    
      delayRedirect = setTimeout(() => {
        // Check scores and navigate to the appropriate page after 3 seconds
        if (result) {
          router.push(`/winnerPage?mode=${mode}`); // Navigate to winnerPage if the user's score is higher
        } else {
          router.push(`/loserPage?mode=${mode}`); // Navigate to loserPage if the user's score is lower
        }
      }, 4000);
    })

    return () => {
      if (delayRedirect) clearTimeout(delayRedirect); // Clear the timeout if the component unmounts
    }
  }, [playerScore, enemyScore, router, result]);

  return (
    <div className="w-full min-h-screen bg-slate-400 dark:bg-slate-600 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-stone-300 text-8xl font-normal p-10 tracking-tighter font-outline-4 outline-black">
          RainyWords
        </h1>

        <div className="pt-10 pb-2">
          {/* <h1>{player}: {playerScore}</h1>
          <h1>{enemy}: {enemyScore}</h1> */}
          <Cloud
            player={player}
            playerScore={playerScore}
            enemy={enemy}
            enemyScore={enemyScore}
          />
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
}
