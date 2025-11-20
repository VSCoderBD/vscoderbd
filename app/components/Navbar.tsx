"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDarkMode } from "./hooks/useDarkMode";
import TypingAnimation from "./features/TypingAnimation";

interface NavbarProps {
  className?: string; 
}

interface NavLinks {
    label?: string;
    href: string;
    image?: string;
}

export default function Navbar({ className }: NavbarProps) {
    const { isDark, toggleDarkMode } = useDarkMode()

    const mainLinks: NavLinks[] = [
        { label: "Rahat Hossain", href: "/" }
    ]

    const userLinks: NavLinks[] = [
        { image: "/images/svg/shop.svg", href: "/" }
    ]

    const secLinks: NavLinks[] = [
        { image: "/images/svg/profile.svg", href: "/" },
        { image: "/images/svg/works.svg", href: "/" },
        { image: "/images/svg/skills.svg", href: "/" },
        { image: "/images/svg/resume.svg", href: "/" },
        { image: "/images/svg/blog.svg", href: "/" },
        { image: "/images/svg/contact.svg", href: "/" },
        { image: "/images/svg/lessons.svg", href: "/" },
    ]

    return (
    <nav className="bg-nav lg:-skew-x-3 lg:origin-top-left lg:ml-6">
        <div className="flex justify-between items-center px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col items-start sm:hidden text-foreground">
                {mainLinks.map((link, idx) => (
                    <Link key={idx} href={link.href}
                    className="text-[15px]"
                    >
                        {link.label}
                    </Link>
                ))}
                <div className="mt-[-5px] text-brand text-[15px]"><TypingAnimation /></div>
                
            </div>
            <div className="flex sm:flex-col-reverse sm:justify-center gap-4 items-center sm:w-full">
                {userLinks.map((link, idx) => (
                    <Link key={idx} href={link.href}>
                        {link.image && <Image 
                        src={link.image}
                        alt="Button"
                        height={25}
                        width={25}
                        className="icon-filter"
                        />}
                    </Link>
                ))}
                <button onClick={toggleDarkMode}>
                    <Image 
                    src={isDark ? "/images/svg/light.svg" : "/images/svg/dark.svg"}
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

        <div className="flex sm:flex-col sm:gap-4 justify-between px-8 py-4">
            {secLinks.map((link, idx) => (
                <Link key={idx} href={link.href}>
                    {link.image && <Image 
                    src={link.image}
                    alt="Button"
                    height={25}
                    width={25}
                    className="icon-filter"
                    />}
                </Link>
            ))}
        </div>
    </nav>
    )
}
