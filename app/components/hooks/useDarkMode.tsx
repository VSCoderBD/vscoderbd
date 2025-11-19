"use client"
import {useState, useEffect} from "react"

export function useDarkMode (){
    const [isDark, setIsDark] = useState(false);

    useEffect (() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        } else if (storedTheme === "light") {
            setIsDark (false);
            document.documentElement.classList.remove("dark")
        } else {
            const systemPrefersDark = 
            window.matchMedia("(prefers-color-scheme: dark)").matches
            setIsDark (systemPrefersDark);

            if (systemPrefersDark) {
                document.documentElement.classList.add ("dark");
            } else {
                document.documentElement.classList.remove ("dark")
            }
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDark;
        setIsDark(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return { isDark, toggleDarkMode };
}