import Cloud from "./cloud";
export default function gamePage() {
  return (
    <div className="w-full h-full justify-center relative bg-slate-400">
      <div className="w-screen flex justify-center">
        <h1 className="absolute text-center text-stone-300 font-normal text-8xl pt-5 tracking-tighter font-outline-4 outline-black">
          Rainy Words
        </h1>

        <div className="pt-10 pb-2">
          <Cloud />
        </div>
      </div>

      <div className="w-full h-screen flex justify-center">
        <div className="relative justify-self-center w-10/12 h-2/4 bg-slate-500 border-4 border-black pt-10">
          <h1 className="absolute text-stone-300 text-3xl top-2 left-5">
            Name : #
          </h1>
          <h1 className="absolute text-stone-300 text-3xl top-2 right-5">
            # : Name
          </h1>
        </div>
        <div className="absolute justify-center bottom-96">
          <input
            className="text-center block w-96 p-4 text-black border-4 border-cyan-900 rounded-lg bg-zinc-300 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Type Rainy Words Here..."
          ></input>
        </div>
        <div className="absolute w-3/4 h-56 bg-stone-300 border-black rounded-lg border-4 bottom-28">
          <h1 className="flex justify-center text-2xl text-black p-8">
            How to play
          </h1>
          <p className="flex justify-center text-black text-lg">
            Your task is to type words appearing on the screen before they have
            fallen down.
          </p>
          <p className="flex justify-center text-black text-lg">
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
