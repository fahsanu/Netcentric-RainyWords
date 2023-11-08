export default function AboutUs() {
  return (
    <div className="w-full h-full min-h-screen relative bg-slate-400 dark:bg-slate-600">
      <div className="text-center">
        <h1 className="text-stone-300 text-8xl font-normal p-10 tracking-tighter font-outline-4 outline-black">
          RainyWords
        </h1>
      </div>
      <div className="text-center text-6xl text-black dark:text-stone-300 pt-5">
        <h1>About Us</h1>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-2/3 border-2 border-black bg-slate-500 dark:bg-slate-700">
          <div className="text-center text-3xl text-black dark:text-stone-300 pt-8">
            <h1>Our Team</h1>
          </div>
          <div className="text-center text-2xl text-black dark:text-stone-300 pt-8 pb-8">
            <p>Kanis Surajarus (UX/UI & Frontend)</p>
            <p>Pann Klankasem (Backend)</p>
            <p>Pitchapa Chaicharoen (Frontend)</p>
            <p>Punpaporn Saardloun (Frontend)</p>
            <p>Sasinapa Anugulsawad (Backend)</p>
            <p>Chanakan Kunanantakul</p>
          </div>
        </div>
      </div>

      <div className="text-center text-base text-black dark:text-stone-300">
        <p>This project is part of 2190472 Netcentric Architecture AY1/2023</p>
        <p>Information and Communication Engineering</p>
        <p>International School of Engineering, Chulalongkorn University</p>
      </div>

      <footer className="w-full fixed bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left bottom-0">
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
          © 2023 Copyright :
          <a
            className="text-neutral-800 dark:text-neutral-900 mx-2"
            href="https://tailwind-elements.com/"
          >
            Netcentric Project AY1/2023
          </a>
        </div>
      </footer>
    </div>
  );
}
