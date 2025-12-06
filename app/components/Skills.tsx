"use client"
import React from "react"

export default function Skills() {
    return (
        <main className="text-zinc-400">
        
            <h2 className="mb-6 text-foreground font-extrabold"
            style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1"
  }}>
    <span className="text-brand">S</span>kills</h2>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <section>
    <div className="gap-2 pb-2 mb-4 items-center">
      <div className="flex items-center gap-1 border-pg border-b pb-2">
        <img className="w-8" src={"/images/svg/skills/design.svg"} />
        <h3 className="font-extrabold text-lg text-pg">DESIGN</h3>
      </div>

      <div className="flex gap-8 justify-center pt-4">
        <div className="bg-neutral-600/80 rounded-md w-32 h-32 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" className="stroke-gray-700 fill-none stroke-2" />
                <circle cx="18" cy="18" r="16" className="stroke-brand fill-none stroke-2" strokeDasharray="60 100" />
              </svg>
              <div className="absolute inset-0 text-slate-300 flex items-center justify-center text-center text-sm font-semibold">
                FRONT-END (75%)
              </div>
            </div>
            <div className="text-center text-slate-300 text-base">Next.js</div>
          </div>
        </div>

        <div className="bg-neutral-600/80 rounded-md w-32 h-32 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" className="stroke-gray-700 fill-none stroke-2" />
                <circle cx="18" cy="18" r="16" className="stroke-brand fill-none stroke-2" strokeDasharray="70 100" />
              </svg>
              <div className="absolute text-slate-300 inset-0 flex items-center justify-center text-sm font-semibold">
                70%
              </div>
            </div>
            <div className="text-center text-slate-300 text-base">Web Design</div>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>

        </main>
    )
}