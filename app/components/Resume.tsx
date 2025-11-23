"use client"

export default function Resume () {
    return (
        <main className=" text-pg">
            
            <h2 className="mb-6 font-extrabold"
            style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, white, transparent) 1"
  }}>
    <span className="text-brand">R</span>esume</h2>
            
<div className="grid sm:grid-cols-2 pb:5 gap-10 sm:gap-">
            <div className="flex flex-col text-base">
            <div>
                <div className="flex gap-1 mb-4 pb-2 font-extrabold items-center border-pg border-b">
                    <img src={"/images/svg/resume/experince.svg"} />
                    <h3>EXPERINCE</h3>
                </div>

<div className="relative border-l border-pg pl-4 ml-2">
  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-brand rounded-full border border-white"></div>
  <div className="inline-block text-brand px-2 border border-brand rounded-md">2025-Present</div>
  <div  className="text-white font-extrabold pb-2">Front-End Web Developer</div>
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
                    <h3>EDUCATION</h3>
                </div>
<div className="relative border-l pl-4 border-pg ml-2">
  <div className="absolute -left-[7px] top-0 w-3 h-3 bg-brand rounded-full border border-white"></div>
  <div className="inline-block text-pg px-2 border border-pg rounded-md">2008-Present</div>
  <div className="text-white font-extrabold pb-2">High School</div>
  <p className="text-sm pb-2">Munshiganj</p>
  <p>
   Completed schooling up to Secondary Level (2008)
(No formal certificate received)
  </p>
</div>
     </div>
         </div>
</div>
 
 
    </div>
        </main>
    )
}