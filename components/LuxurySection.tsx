"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// Repeated text for the infinite-feel marquee strip
const MARQUEE_TEXT =
  "Fly in Luxury  —  Fly in Luxury  —  Fly in Luxury  —  Fly in Luxury  —  Fly in Luxury  —  Fly in Luxury  —  ";

export default function LuxurySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Row 1 — moves LEFT while scrolling
      gsap.to(track1Ref.current, {
        x: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Row 2 — moves RIGHT while scrolling (opposite direction)
      gsap.to(track2Ref.current, {
        x: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background parallax
      gsap.to(bgImgRef.current, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      {/* Parallax background */}
      <div
        ref={bgImgRef}
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?q=80&w=1920')",
          willChange: "transform",
        }}
      />
      {/* Dark scrim — keeps text legible */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 overflow-hidden">
        {/* Row 1 — moves left */}
        <div
          ref={track1Ref}
          className="whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          <span
            className="text-[12vw] md:text-[10vw] font-bold uppercase text-white leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            {MARQUEE_TEXT}
          </span>
        </div>

        {/* Gold divider line */}
        <div className="px-8 md:px-20">
          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A55A]/50 to-transparent" />
        </div>

        {/* Row 2 — moves right (gold outlined text) */}
        <div
          ref={track2Ref}
          className="whitespace-nowrap"
          style={{ willChange: "transform", transform: "translateX(-25%)" }}
        >
          <span
            className="text-[12vw] md:text-[10vw] font-bold uppercase leading-none"
            style={{
              letterSpacing: "-0.02em",
              color: "transparent",
              WebkitTextStroke: "1px rgba(201, 165, 90, 0.5)",
            }}
          >
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>
    </section>
  );
}
