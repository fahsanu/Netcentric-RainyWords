import Cloud from "./clouds";
export default function scorePage() {
    return (
<div className="min-h-screen flex flex-col items-center justify-center bg-slate-400">
      <h1 className="text-9xl font-bold pt-20 tracking-tighter pb-32 font-outline-4 top-28 text-center text-stone-300">
        RainyWords
        <div className="p-20"><Cloud/></div>
      </h1>
      </div>
  );
}

