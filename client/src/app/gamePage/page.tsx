import Cloud from "./cloud";
export default function gamePage() {
  return (
    <div className="w-full h-full relative bg-slate-400">
      <div className="w-screen flex justify-center">
        <h1 className="absolute text-center text-stone-300 font-normal text-8xl pt-5 font-outline-4 outline-black">
          Rainy Words
        </h1>
        <p className="absolute text-black text-3xl left-44 top-40">Player1 #</p>
        <p className="absolute text-black text-3xl right-44 top-40">
          Player2 #
        </p>
        <div className="p-10">
          <Cloud />
        </div>
      </div>
      <div className=" h-screen flex justify-center">
        <div className="relative w-10/12 h-2/4 bg-slate-500 border-4 border-black pt-10"></div>
        <div className="absolute justify-center bottom-96">
          <input
            className="block w-96 p-4 text-black border-4 border-cyan-900 rounded-lg bg-zinc-300 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type Rainy Words Here"
          ></input>
        </div>
      </div>
    </div>
  );
}
