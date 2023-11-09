"use client";

import React, { useEffect, useState } from "react";
import Threemek from "./treemek";
import axios from "axios";
import Link from "next/link";

export default function Leader() {
  // const handlePlayClick = () => {
  //   alert("Play button clicked");
  // };

  // const handleExitClick = () => {
  //   alert("Exit button clicked");
  // };
  const [topThree, setTopThree] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.20.10.12:4000/user/top_three"
        );
        const userData = response.data;

        if (userData.length > 0) {
          // Find the user with the highest score
          const maxScoreUser = userData.reduce((maxUser, currentUser) => {
            return currentUser.score > maxUser.score ? currentUser : maxUser;
          });

          // Update the state to display the max score user in Box1
          setTopThree([
            maxScoreUser,
            ...userData.filter((user) => user !== maxScoreUser),
          ]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full min-h-screen relative bg-slate-400 dark:bg-slate-600">
      <div className="w-screen flex justify-center pt-10">
        <h1 className="absolute text-center text-stone-300 font-normal text-8xl pt-5 tracking-tighter font-outline-4 outline-black z-50">
          Rainy Words
        </h1>
        <h2 className="col-start-2 text-5xl w-full absolute z-30 font-bold top-48 text-center text-black">
          <Link href="/">Play Again</Link>
        </h2>
        <Threemek />
      </div>
      

      <div className="flex flex-col items-center justify-center pt-20">
        <div className="bg-slate-500 dark:bg-slate-700 border-4 border-black relative px-24 py-20 w-10/12 justify-center grid grid-cols-[0.5fr_3fr_1fr] gap-6 top-[-28px] z-0">
          {/* Boxes for row 1 */}
          <div className="w-full h-30">
            <h1 className="text-8xl pb-4 font-bold font-outline-2 text-right text-stone-300">
              1
            </h1>
          </div>
          {/* Boxes for row 2 */}
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[0].name : "Loading..."}
            </div>
          </div>
          {/* Boxes for row 3 */}
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[0].score : "Loading..."}
            </div>
          </div>
          {/* Boxes for row 4 */}
          <div className="w-full pb-4 h-30">
            <h1 className="text-8xl font-bold font-outline-2 text-right text-stone-300">
              2
            </h1>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[1].name : "Loading..."}
            </div>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[1].score : "Loading..."}
            </div>
          </div>
          {/* Boxes for row 5 */}
          <div className="w-full pb-4 h-30">
            <h1 className="text-8xl font-bold font-outline-2  pt-1 text-right text-stone-300">
              3
            </h1>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[2].name : "Loading..."}
            </div>
          </div>
          <div className="w-full h-24 bg-stone-300 rounded-1xl border-4 border-black">
            <div className="justify-center mt-4 flex text-5xl dark:text-black">
              {topThree.length > 0 ? topThree[2].score : "Loading..."}
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full fixed bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left bottom-0">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          <Link
            className="text-neutral-800 dark:text-neutral-200 mx-2"
            href="/aboutus"
          >
            © 2023 Copyright : Netcentric Project AY1/2023
          </Link>
        </div>
      </footer>
    </div>
  );
}
