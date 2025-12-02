"use client"
import YouTube from "./data/Youtube"

export default function Blog () {

    return (
        <main className="text-pg text-base">
          <div
  className="flex justify-between text-foreground items-center mb-6"
  style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1"
  }}
>
  <h2 className="text-xl font-extrabold"><span className="text-brand font-extrabold">B</span>log</h2>
</div>

 <section>
                <div className="flex gap-1 mb-4 pb-2 font-extrabold items-center border-pg border-b">
                    <img className="w-8" src={"/images/svg/blog/yt.svg"} />
                    <h3 className="font-extrabold">BDC PRESS</h3>
                </div> 
                <YouTube />
</section>

</main>
)}