"use client";
import Image from "next/image";
import About from "./components/About";
import BubbleCanvas from "./components/features/BubbleCanvas";
import TypingAnimation from "./components/features/TypingAnimation";


export default function Home() {
  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">
      <div 
        className="relative lg:ml-6 flex-shrink-0 w-full h-[500px] 
                   lg:fixed z-20 lg:w-[300px] lg:h-[95%] 
                   rounded-xl overflow-hidden 
                   lg:-skew-x-3 lg:origin-top-left" 
      >
        <Image
          src="/images/brand/rahat.webp"
          alt="Rahat Hossain"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 300px "
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-30 px-4">
    <h1 className="text-white text-3xl lg:text-4xl font-extrabold drop-shadow-lg">
      Rahat Hossain
    </h1>
    <div className="text-xl lg:text-xl text-brand2 drop-shadow-md">
      <TypingAnimation />
    </div>
  </div>

<div className="absolute inset-x-0 bottom-0 flex justify-center">
  <div className="flex w-full max-w-lg justify-between border-t p-4">
    <div className="absolute left-1/2 top-0 h-full w-px bg-white"></div>
    <a href="#" className="text-white hover:text-gray-300 transition duration-300 pr-4"> 
      DOWNLOAD CV
    </a>
    <a href="#" className="text-white hover:text-gray-300 transition duration-300 pl-4">
      CONTACT ME
    </a>
  </div>
</div>

      </div>
      <div className="relative lg:right-0 lg:left-36 lg:fixed lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[93vh]">
        <div className="absolute inset-0 z-0 hidden sm:block rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 rounded-xl">
            <BubbleCanvas />
          </div>
          <div className="absolute inset-0 backdrop-blur-lg bg-zinc-800/60 rounded-xl"></div>
        </div>
        <div className="relative z-10 sm:m-5 lg:h-full lg:overflow-y-auto">
          <About />
        </div>
      </div>
    </main>
  );
}
