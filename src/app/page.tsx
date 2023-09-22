export default function Home() {
  return (
    <div className="w-full h-full relative bg-white">
      <div>
        <h1 className="font-extrabold text-8xl text-center text-black pt-20">
          Rainy Words!
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-3/4  rounded-lg border border-black">
          <h2 className="text-center text-black text-5xl font-bold pt-20 pb-8">
            Please enter your nickname
          </h2>
          <div className="flex flex-col items-center justify-center pt-3 pb-20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Input
            </label>
            <input className="block w-3/4 p-4 text-black border border-gray-300 rounded-lg bg-zinc-300 sm:text-xl focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-5 pb-16">
        <button
          className="px-6 py-2.5 w-1/3 text-black text-3xl font-bold bg-zinc-300 rounded-2xl border border-black"
          type="button"
        >
          ENTER
        </button>
      </div>

      <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          © 2023 Copyright :
          <a
            className="text-neutral-800 dark:text-neutral-400"
            href="https://tailwind-elements.com/"
          >
            Netcentric Project AY1/2023
          </a>
        </div>
      </footer>
    </div>
  );
}
