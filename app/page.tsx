"use client"
import Image from "next/image"
import About from "./components/About"

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center sm:items-start gap-6">
        <div className="flex-shrink-0">
          <Image 
            src="/images/brand/rahat.webp"
            alt="Rahat Hossain"
            height={300}
            width={300}
            className="w-[300px] h-[300px] object-cover lg:fixed"
          />
        </div>

        <div className="text-center sm:text-left lg:pl-80"> 
          <About />
        </div>

      </div>
    </main>
  );
}
