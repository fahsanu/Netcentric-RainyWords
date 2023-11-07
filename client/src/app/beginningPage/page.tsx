"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

export default function LandingPage(props: string) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')
  const id = searchParams.get('id')
  console.log(id)

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        router.push(`/gamePage?mode=${mode}`)
      }
    }, 1000);

    return () => {
      clearInterval(timer);

    };
  }, [countdown, mode, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start relative bg-slate-400">
      <h1 className="text-9xl font-bold pt-24 font-outline-2 top-28 text-center text-stone-300">
        RainyWords
      </h1>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="pb-24">
          <h1 className="text-4xl font-bold">Beginning in...</h1>
          <div className="text-7xl font-bold pt-24 font-outline-2 top-28 text-center text-stone-300">
            {countdown > 0 ? countdown : "Go!"}
          </div>
        </div>
      </div>
    </div>
  );
}
