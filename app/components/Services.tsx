"use client";
import React from "react";
import Image from "next/image";

interface ServicesTypes {
  image?: string;
  title: string;
  p: string;
}

export default function Services() {
  const serviceList: ServicesTypes[] = [
    {
      image:"/images/svg/services/web-design.svg",
      title: "Web Design",
      p: "I create modern, responsive, and visually stunning web designs that perfectly match your taste — smart, sleek, and tailored just for you.",
    },
    {
      image:"/images/svg/services/web-development.svg",
      title: "Web Development",
      p: "From the initial concept to the final launch, I design and develop comprehensive web solutions that are perfectly tailored to meet your unique needs and goals, ensuring a seamless and engaging user experience.",
    },
    {
      image:"/images/svg/services/next-js-expert.svg",
      title: "Next.js Expert",
      p: "Creating dynamic, responsive, and lightning-fast websites with Next.js for an exceptional user experience.",
    },
    {
      image:"/images/svg/services/ui-ux-design.svg",
      title: "UI/UX Design",
      p: "I craft intuitive and visually appealing interfaces that enhance user experience.",
    },
  ];

  return (
    <main className="text-pg py-8">
      {/* Section Title */}
      <div
        className="flex justify-between items-center mb-6"
        style={{
    borderBottomWidth: "2px",
    borderImage: "linear-gradient(to right, white, transparent) 1"
  }}
      >
        <h2  className="text-xl font-extrabold">
          <span className="text-brand font-extrabold">M</span>y Services
        </h2>
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {serviceList.map((service, idx) => {
    const isSM = typeof window !== "undefined" && window.innerWidth >= 640;
    const cols = isSM ? 2 : 1;

    const total = serviceList.length;
    const lastRowStartIndex = Math.floor((total - 1) / cols) * cols;

    const hideBorder = idx >= lastRowStartIndex;

    return (
      <div
        key={idx}
        className="rounded-xl flex flex-col items-center transition-transform duration-300"
      >
<div className="w-12 h-12 bg-nav rounded-2xl flex items-center justify-center mb-2">
  <Image 
    src={service.image ?? "/fallback.svg"}
    alt={service.title}
    height={40}
    width={40}
  />
</div>

        <h3
          className="text-xl font-bold mb-2"
        >
          {service.title}
        </h3>

        <p
          className="text-sm pb-2"
          style={{
            borderBottomWidth: hideBorder ? "0px" : "2px",
            borderImage: hideBorder
              ? "none"
              : "linear-gradient(to right, transparent, white, transparent) 1",
          }}
        >
          {service.p}
        </p>
      </div>
    );
  })}
</div>

    </main>
  );
}
