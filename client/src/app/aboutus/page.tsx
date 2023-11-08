export default function AboutUs() {
  return (
    <div className="w-full h-full min-h-screen relative bg-slate-400">
      <div className="flex flex-wrap items-center justify-center">
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Rainy
        </h1>
        <h1 className="text-9xl text-center text-stone-300 font-outline-6 tracking-tighter pt-20">
          Words
        </h1>
      </div>
      <div className="text-center text-6xl text-black pt-10">
        <h1>About Us</h1>
      </div>
      <div className="text-center text-2xl text-black pt-5">
        <p>We are Group 7</p>
      </div>
      <div className="text-center text-xl text-black pt-2">
        <p>Team members:</p>
      </div>
      <div className="text-center text-2xl text-black pt-5">
        <p>Kanis Surajarus (UX/UI & Frontend)</p>
        <p>Pann Klankasem (Backend)</p>
        <p>Pitchapa Chaicharoen (Frontend)</p>
        <p>Punpaporn Saardloun (Frontend)</p>
        <p>Sasinapa Anugulsawad (Backend)</p>
        <p>Chanakan Kunanantakul</p>
      </div>
      <div className="text-center text-base text-black pt-10">
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
