"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export function TypewriterEffectDemo() {
  const words = [
    { text: "EspeonX ", className: "text-white" },
    { text: "– ", className: "text-gray-300" },
    { text: "The ", className: "text-gray-400" },
    { text: "Future ", className: "text-gray-500" },
    { text: "of ", className: "text-gray-400" },
    { text: "Decentralized ", className: "text-white" },
    { text: "Esports ", className: "text-blue-500" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] text-center">
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-white drop-shadow-lg">
        <TypewriterEffect words={words} />
      </h1>
    </div>
  );
}
