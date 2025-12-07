"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

// --- CONSTANTS ---
const SIDE_SIZE = 120;
const CENTER_SIZE = 120;
const GAP = 16;
const TRANSITION_DURATION = 500;

export default function Media() {
  const images = [
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
        "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
    "/images/images/2.jpeg", "/images/images/3.jpg", "/images/images/4.jpg", "/images/images/5.jpg", "/images/images/2.jpeg", "/images/images/3.jpg",
  ];

  const total = images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sideCount, setSideCount] = useState(1); // number of side images

  const containerRef = useRef<HTMLDivElement>(null);
  const slideInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Responsive side images count ---
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);

        if (window.innerWidth < 640) setSideCount(1); // mobile
        else if (window.innerWidth < 1024) setSideCount(2); // sm/md
        else setSideCount(3); // lg
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // --- AUTOPLAY ---
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => handleSlide("next"), 500);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const handleSlide = (direction: "next" | "prev") => {
    if (transitioning || total <= 1) return;
    setTransitioning(true);
    stopAutoSlide();

    setTimeout(() => {
      setCurrentIndex((prev) =>
        direction === "next" ? (prev + 1) % total : (prev - 1 + total) % total
      );
      setTransitioning(false);
      startAutoSlide();
    }, TRANSITION_DURATION);
  };

  // --- Calculate VISIBLE_WIDTH dynamically ---
  const VISIBLE_WIDTH =
    CENTER_SIZE + SIDE_SIZE * sideCount * 2 + GAP * (sideCount * 2 + 1);

  // --- Calculate transform to center the current image ---
  const totalItemWidth = CENTER_SIZE + GAP; // only center item for simplicity
  const positionOfCurrentElementStart = currentIndex * totalItemWidth;
  const requiredShift = positionOfCurrentElementStart + CENTER_SIZE / 2 - VISIBLE_WIDTH / 2;
  const finalTransform = `translateX(${-requiredShift}px)`;

  return (
    <main className="flex flex-col w-full text-pg items-center">
      <h2 className="mb-6 w-full text-foreground font-extrabold"
            style={{
    borderBottomWidth: "1px",
    borderImage: "linear-gradient(to right, var(--pg-color), transparent) 1"
  }}>
    <span className="text-brand">M</span>edia</h2>
      <div className="flex gap-1 items-center text-foreground border-b border-pg pb-2 w-full mb-6">
        <img className="w-7" src={"/images/svg/media/slider.svg"} />
        <h3 className="font-extrabold">SLIDER</h3>
      </div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="relative flex justify-center items-center overflow-hidden w-full max-w-full"
        style={{ width: `${VISIBLE_WIDTH}px` }}
      >
        {/* Left Button */}
        <button
          onClick={() => handleSlide("prev")}
          disabled={transitioning}
          className="absolute left-3 sm:left-7 text-3xl text-white/40 hover:text-brand top-1/2 -translate-y-1/2 p-2 rounded-full z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ◀
        </button>

        {/* Slider Track */}
        <div
          className="flex items-center"
          style={{
            transform: finalTransform,
            transition: `transform ${TRANSITION_DURATION}ms ease-in-out`,
          }}
        >
          {images.map((img, i) => {
            const isCenter = i === currentIndex;
            const size = isCenter ? CENTER_SIZE : SIDE_SIZE;
            return (
              <img
                key={i}
                src={img}
                draggable={false}
                onClick={() => isCenter && setFullscreen(true)}
                className="object-cover rounded-xl cursor-pointer transition-all duration-500"
                style={{
                  width: size,
                  height: size,
                  marginRight: `${GAP}px`,
                  opacity: isCenter ? 1 : 0.6,
                }}
              />
            );
          })}
        </div>

        {/* Right Button */}
        <button
          onClick={() => handleSlide("next")}
          disabled={transitioning}
          className="absolute right-3 sm:right-7 text-3xl text-white/40 hover:text-brand top-1/2 -translate-y-1/2 p-2 rounded-full z-20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶
        </button>
      </div>

      {/* FULLSCREEN */}
      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 cursor-pointer"
        >
          <img
            src={images[currentIndex]}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            draggable={false}
          />
        </div>
      )}
    </main>
  );
}
