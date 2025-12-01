"use client"
import React from "react"

export default function GetInTouch() {
  return (
    <main className="text-zinc-400 ">
      <h2
        className="mb-6 text-pg font-extrabold"
        style={{
          borderBottomWidth: "1px",
          borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1",
        }}
      >
        <span className="text-brand">G</span>et in Touch
      </h2>

      <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden border border-neutral-600">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14623.772484861334!2d90.25077710000002!3d23.606372750000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37559713add31265%3A0xb917a647655ea575!2sBaraikhali!5e0!3m2!1sen!2sbd!4v1764508053572!5m2!1sen!2sbd"
          style={{ border: 0 }}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
       <div className="grid grid-cols-1 text-base mt-8 sm:grid-cols-2 gap-2">
<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, transparent, var(--pg-color), transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Address:</div>
  <div className="text-pg">1544, Baraikhali, Sreenagar, Munshiganj</div>
</div>

<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, transparent, var(--pg-color), transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Email:</div>
  <div className="text-pg">rahat292.dev@gmail.com</div>
</div>
<div
  className="flex justify-between items-center pb-2"
  style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, transparent, var(--pg-color), transparent) 1"
  }}
>
  <div className="text-zinc-600 bg-brand rounded px-2">Phone:</div>
  <div className="text-pg">+8801920852271</div>
</div>

<div
  className="flex justify-between items-center pb-2"
>
  <div className="text-zinc-600 bg-brand rounded px-2">Freelance:</div>
  <div className="text-pg">Available</div>
</div>

</div>
    </main>
  )
}
