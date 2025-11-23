"use client"

export default function About () {

    return (
        <main className="text-pg text-base">
          <div
  className="flex justify-between items-center mb-6"
  style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, white, transparent) 1"
  }}
>
  <h2 className="text-xl font-extrabold"><span className="text-brand font-extrabold">A</span>bout</h2>
</div>
            <div className="grid grid-cols-1 lg:gap-6 lg:grid-cols-2 justify-between">
            
<div>

                <p>I’m Rahat Hossain, a fron-end NEXT.JS Web Designer & Developer from Dhaka, Bangladesh. I specialize in responsive website design, Next.js, Typescript, Tailwind development, and SEO-friendly digital solutions.</p>
            </div>

            <div className="flex flex-col gap-2">
<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, transparent, white, transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Age:</div>
  <div className="text-pg">33</div>
</div>

<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, transparent, white, transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Residence:</div>
  <div className="text-pg">BANGLADESH</div>
</div>

<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, transparent, white, transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Freelance:</div>
  <div className="text-pg">Available</div>
</div>

<div
  className="flex justify-between items-center"
>
  <div className="text-zinc-600 bg-brand rounded px-2">Address:</div>
  <div className="text-pg">Dhaka, Bangladesh</div>
</div>

</div>
            </div>
    </main>
)}