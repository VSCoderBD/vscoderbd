"use client";

import { Component, useEffect, useState } from "react";
// Assuming these components are defined elsewhere
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";
import Skills from "./components/Skills";
import GetInTouch from "./components/GetInTouch";
import ContactForm from "./components/ContactForm";
import Blog from "./components/Blog";

interface HomeProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Data defining your sections
const sections = [
  { id: "about", component: <> <About /> <Services /> </> },
  { id: "resume", component: <Resume /> },
  { id: "skills", component: <Skills />},
  { id: "contact", component: <> <GetInTouch /> <ContactForm /> </> },
  { id: "blog", component: <Blog />},
];

export default function Home({ activeSection, setActiveSection }: HomeProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  // Effect to handle responsive layout based on screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">

      {/* Hero Section - Always visible */}
      <Hero />

      {/* Desktop Layout: Stacked, absolute positioned sections */}
      {isDesktop && (
        <div className="relative lg:right-0  overflow-auto  scrollbar-sec bg-white/70 dark:bg-zinc-800/70 lg:-skew-x-3 rounded-e-xl flex-1 lg:ml-[270px] lg:h-[95vh]">
          {sections.map(({ id, component }) => (
            <div
              key={id}
              className={`
                absolute inset-0  transition-all duration-1000 ease-out
                ${activeSection === id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 pointer-events-none -translate-x-60"
                }
                pl-8 pr-5 top-5 h-[94%]
              `}
            >
              {component}
            </div>
          ))}
        </div>
      )}

      {/* Mobile Layout: separate, sequentially displayed sections.
        FIXED: Added id attributes for smooth scrolling from the Navbar.
      */}
      {!isDesktop && (
        <>
          <div 
            id={sections[0].id} // Added id="about"
            className="bg-white/70 dark:bg-zinc-800/70 flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10"
          >
            {sections[0].component}
          </div>

          <div 
            id={sections[1].id} // Added id="resume"
            className="bg-white/70 dark:bg-zinc-800/70 flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10"
          >
            {sections[1].component}
          </div>

          <div 
            id={sections[2].id} // Added id="resume"
            className="bg-white/70 dark:bg-zinc-800/70 flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10"
          >
            {sections[2].component}
          </div>

          <div 
            id={sections[3].id} // Added id="resume"
            className="bg-white/70 dark:bg-zinc-800/70 flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10"
          >
            {sections[3].component}
          </div>

          <div 
            id={sections[4].id} // Added id="resume"
            className="bg-white/70 dark:bg-zinc-800/70 flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10"
          >
            {sections[4].component}
          </div>

        </>
      )}

    </main>
  );
}