export default function Home() {
  return (
    <div className="w-full relative bg-black p-8">
      <div className="w-full h-20 pt-5 bg-white rounded-lg">
        <h1 className="font-extrabold text-4xl text-center text-black">
          Rainy Words
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center py-10">
        <button
          className="px-6 py-2.5 text-white text-2xl rounded-full bg-blue-500 hover:bg-blue-600"
          type="button"
        >
          START
        </button>
      </div>
    </div>
  );
}
