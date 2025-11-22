"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "./hooks/useDarkMode";
import TypingAnimation from "@/lib/Animations/TypingAnimation";
import { mainLinks, userLinks, secLinks } from "./data/buttons";

interface NavbarProps {
  className?: string; 
}

export default function Navbar({ className }: NavbarProps) {
    const { isDark, toggleDarkMode } = useDarkMode()

    const scrollToSection = (id:string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }

    return (
    <nav className="bg-nav lg:-skew-x-3 lg:origin-top-left lg:ml-6">
        <div className="flex justify-between items-center px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col items-start sm:hidden text-foreground">
                {mainLinks.map((link, idx) => (
                 link.href && (
                 <Link key={idx} href={link.href}>
                  {link.label}
               </Link>
             )
            ))}

                <div className="mt-[-5px] text-brand text-[15px]"><TypingAnimation /></div>
                
            </div>
            <div className="flex sm:flex-col-reverse sm:justify-center gap-4 items-center sm:w-full">
                {userLinks.map((link, idx) => (
  <Link key={idx} href={link.href!}> {/* ! added here */}
    {link.image && <Image 
      src={link.image!} 
      alt="Button"
      height={25}
      width={25}
      className="icon-filter"
    />}
  </Link>
))}

                <button onClick={toggleDarkMode}>
                    <Image 
                    src={isDark ? "/images/svg/nav-svg/light.svg" : "/images/svg/nav-svg/dark.svg"}
                    alt="Mode"
                    width={25}
                    height={25}
                    className="icon-filter"
                    />
                </button>
                <div className="flex flex-col gap-[5px] group">
                    <span className="bg-foreground w-5 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                    <span className="bg-foreground w-6 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                    <span className="bg-foreground w-4 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                </div>
            </div>
        </div>

        <div className="flex sm:flex-col sm:gap-4 justify-between py-4 overflow-x-auto scroll-smooth scrollbar-custom">
            {secLinks.map((link, idx) => (
    <button 
    key={idx} 
    onClick={() => link.sec && scrollToSection(link.sec)}  
    className="flex-shrink-0 w-[20%] sm:w-[100%] flex items-center justify-center"
    >
                    {link.image && <Image 
                    src={link.image}
                    alt="Button"
                    height={25}
                    width={25}
                    className="icon-filter"
                    />}
                </button>
            ))}
        </div>
    </nav>
    )
}
