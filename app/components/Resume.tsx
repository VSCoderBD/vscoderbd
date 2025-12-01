"use client"

export default function Resume () {
    return (
        <main className=" text-pg">
            
            <h2 className="mb-6 font-extrabold"
            style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1"
  }}>
    <span className="text-brand">R</span>esume</h2>
            
<div className="grid grid-cols-1 lg:grid-cols-2 pb:5 gap-10 sm:gap-">
            <div className="flex flex-col text-base">
            <div>
                <div className="flex gap-1 mb-4 pb-2 font-extrabold items-center border-pg border-b">
                    <img src={"/images/svg/resume/experince.svg"} />
                    <h3 className="font-extrabold">EXPERINCE</h3>
                </div>

<div className="relative border-l border-pg pl-4 ml-2">
  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-brand rounded-full"></div>
  <div className="inline-block text-brand px-2 border border-brand rounded-md">2025-Present</div>
  <div  className="text-pg font-extrabold pb-2">Front-End Web Developer</div>
  <p className="text-sm pb-2">Next.js, Typescript, Tailwind</p>
  <p>
    Creating dynamic, responsive, and lightning-fast websites with Next.js for an exceptional user experience.
  </p>
</div>
     </div>
    </div>


         <div>
            <div className="flex flex-col text-base">
            <div>
                <div className="flex gap-1 pb-2 mb-4 items-center border-pg border-b">
                    <img src={"/images/svg/resume/education.svg"} />
                    <h3 className="font-extrabold ">EDUCATION</h3>
                </div>
<div className="relative border-l pl-4 border-pg ml-2">
  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-pg rounded-full"></div>
  <div className="inline-block text-pg px-2 border border-pg rounded-md">2008-Present</div>
  <div className="text-pg font-extrabold pb-2">High School</div>
  <p className="text-sm pb-2">Munshiganj</p>
  <p>
   Completed schooling up to Secondary Level (2008)
(No formal certificate received)
  </p>
</div>
     </div>
         </div>
</div>

<div>
  <div className=" gap-2 pb-2 mb-4 items-center ">
       <div className="flex gap-1 border-pg border-b pb-2">
        <img src={"/images/svg/resume/language.svg"} />
       <h3 className="font-extrabold before:">LANGUAGES SKILLS</h3>
      </div>

<div className="flex gap-8 text-zinc-400 justify-center pt-4">
  {/* English - 50% ring */}

  <div className="bg-neutral-800/80 rounded-md w-32 h-32 flex items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          className="stroke-gray-700 fill-none stroke-2"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          className="stroke-brand fill-none stroke-2"
          strokeDasharray="60 100"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        60%
      </div>
    </div>

    {/* Language Name */}
    <div className="text-center text-base">English</div>
  </div>
  </div>


  {/* Bangla - 100% ring */}
  <div className="bg-neutral-800/80 border-zinc-400 rounded-md w-32 h-32 flex items-center justify-center">
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24">
      <svg className="rotate-[-90deg]" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="16"
          className="stroke-gray-700 fill-none stroke-2"
        />
        <circle
          cx="18"
          cy="18"
          r="16"
          className="stroke-brand fill-none stroke-2"
          strokeDasharray="100 100"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
        100%
      </div>
    </div>

    {/* Language Name */}
    <div className="text-center text-base">Bangla</div>
  </div>
</div>
</div></div>
</div>

<div>
  <div className=" gap-1 pb-2 mb-4 items-center ">
       <div className="flex gap-1 border-pg border-b pb-2">
        <img src={"/images/svg/resume/knoledge.svg"} />
       <h3 className="font-extrabold before:">KNOWLEDGE</h3>
      </div>
      <div className="flex flex-col pt-3 gap-2 text-base font-bold">
        <p><span className="text-lg text-brand pr-2">✔</span>Webpage Design</p>
        <p><span className="text-lg text-brand pr-2">✔</span>Web Development</p>
        <p><span className="text-lg text-brand pr-2">✔</span>UI/UX Design</p>
        <p><span className="text-lg text-brand pr-2">✔</span>Modern and mobile Friendly Website</p>
      </div>
      </div></div>
 
 
    </div>
        </main>
    )
}