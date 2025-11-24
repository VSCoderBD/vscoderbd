"use client";

import { useEffect, useState } from "react";
import BubbleCanvas from "@/lib/Animations/BubbleCanvas"; 
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";

interface HomeProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Home({ activeSection, setActiveSection }: HomeProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect desktop vs mobile
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">
      {/* Hero Section */}
      <Hero />

      {/* Desktop Layout */}
      {isDesktop && (
        <div className="relative lg:right-0 lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[320px] overflow-hidden lg:h-[93vh]">
          <BubbleCanvas key={activeSection} />
          <div className="relative lg:h-full z-10 overflow-hidden p-5">
            {/* About Section */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeSection === "about" ? "opacity-100 z-20" : "opacity-0 z-10"
              } overflow-auto scrollbar-sec px-5 top-5 h-[94%]`}
            >
              <About />
              <Services />
            </div>

            {/* Resume Section */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeSection === "resume" ? "opacity-100 z-20" : "opacity-0 z-10"
              } overflow-auto scrollbar-sec`}
            >
              <Resume />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      <div className="relative lg:hidden rounded-xl flex-1 overflow-hidden">
        <BubbleCanvas />
        <div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
          <About />
          <Services />
        </div>
      </div>

      <div id="resume" className="relative lg:hidden rounded-xl flex-1 overflow-hidden">
        <BubbleCanvas />
        <div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
          <Resume />
          </div>
        </div>

    </main>
  );
}
