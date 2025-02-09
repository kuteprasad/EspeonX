"use client";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function GlowingButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative px-6 py-3 font-semibold text-white bg-black rounded-xl transition-all hover:scale-105 focus:outline-none"
    >
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <span className="relative z-10">{text}</span>
    </button>
  );
}
