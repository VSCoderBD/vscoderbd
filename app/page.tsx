"use client";
import Image from "next/image";
import About from "./components/About";
import BubbleCanvas from "./components/BubbleCanvas";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">
      
      {/* Left Image - Large screen e fixed (কোন পরিবর্তন নেই) */}
      <div 
        className="relative lg:ml-6 flex-shrink-0 w-full h-[500px] 
                   lg:fixed z-20 lg:w-[300px] lg:h-[95%] 
                   rounded-xl overflow-hidden 
                   lg:-skew-x-3 lg:origin-top-left 
                   glitch-container" 
      > 
        <Image
          src="/images/brand/rahat.webp"
          alt="Rahat Hossain"
          fill 
          className="object-cover" 
          sizes="(max-width: 1024px) 100vw, 300px"
        />
      </div>
      
      <div className="relative lg:right-0 lg:left-36 lg:fixed lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[90vh]">
  
        <div className="absolute inset-0 z-0 hidden sm:block">
  <BubbleCanvas />
</div>
       <div className="relative z-10 lg:h-full lg:overflow-y-auto">
  <div className="sm:backdrop-blur-2xl sm:p-4 rounded-xl">
    <About />
  </div>
</div>
      </div>
    </main>
  );
}