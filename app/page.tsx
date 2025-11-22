"use client";
import BubbleCanvas from "@/lib/Animations/BubbleCanvas";
import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">

     <Hero />
      <div className="relative lg:right-0 lg:left-36 lg:fixed lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[93vh]">
        <div className="absolute inset-0 z-0 hidden sm:block rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 rounded-xl">
            <BubbleCanvas />
          </div>

          <div className="absolute inset-0 backdrop-blur-lg bg-zinc-800/60 rounded-xl">
          </div>
        </div>

        <div className="relative flex flex-col z-10 gap-10 sm:m-5 lg:h-full lg:overflow-y-auto">
          <div id="about"><About /></div>
          <div><Services /></div>
        </div>
      </div>
    </main>
  );
}
