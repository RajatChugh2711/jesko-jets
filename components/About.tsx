"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text elements stagger fade-up
      gsap.from(".about-item", {
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Image parallax — moves slower than scroll
      gsap.to(imgRef.current, {
        y: -70,
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
      id="about"
      className="relative py-32 md:py-40 px-8 md:px-20 lg:px-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Subtle background line art */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-8">
          <div className="about-item">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              Beyond the
              <br />
              <span className="font-bold">horizon</span>
            </h2>
          </div>

          <div className="about-item w-16 h-px bg-[#C9A55A]/40" />

          <p className="about-item text-base leading-relaxed text-white/55 font-light max-w-md">
            Founded on the belief that flight should be as extraordinary as
            the destinations it unlocks. Jesko Jets has redefined what it
            means to travel privately — pairing aviation mastery with an
            uncompromising pursuit of refinement.
          </p>

          <p className="about-item text-base leading-relaxed text-white/55 font-light max-w-md">
            Each journey is architected around you. Your schedule. Your
            comfort. Your vision of freedom at 45,000 feet.
          </p>

          <div className="about-item flex gap-12 pt-4">
            {[
              { number: "15+", label: "Years of Excellence" },
              { number: "3,200+", label: "Flights Completed" },
              { number: "48", label: "Global Destinations" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#C9A55A]">
                  {stat.number}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="about-item">
            <a
              href="#fleet"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/70 hover:text-[#C9A55A] transition-colors duration-300 group"
            >
              Discover Our Fleet
              <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* ── Right: Image with parallax ── */}
        <div className="about-item relative h-[480px] md:h-[580px] overflow-hidden">
          {/* Outer gold frame */}
          <div className="absolute inset-0 border border-[#C9A55A]/15" />
          <div
            ref={imgRef}
            className="absolute inset-0 scale-[1.15]"
            style={{ willChange: "transform" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=90&w=1200"
              alt="Luxury private jet interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          {/* Gold corner accent */}
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#C9A55A]/50" />
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#C9A55A]/50" />
        </div>
      </div>
    </section>
  );
}
