"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const AIRCRAFT = [
  {
    name: "Gulfstream G650ER",
    category: "Ultra Long Range",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=90&w=900",
    specs: [
      { label: "Range",      value: "7,500 nm" },
      { label: "Speed",      value: "Mach 0.925" },
      { label: "Passengers", value: "Up to 19" },
      { label: "Altitude",   value: "51,000 ft" },
    ],
  },
  {
    name: "Bombardier Global 7500",
    category: "Business Jet",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=90&w=900",
    specs: [
      { label: "Range",      value: "7,700 nm" },
      { label: "Speed",      value: "Mach 0.925" },
      { label: "Passengers", value: "Up to 19" },
      { label: "Altitude",   value: "51,000 ft" },
    ],
  },
  {
    name: "Dassault Falcon 8X",
    category: "Trijet Long Range",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=90&w=900",
    specs: [
      { label: "Range",      value: "6,450 nm" },
      { label: "Speed",      value: "Mach 0.90" },
      { label: "Passengers", value: "Up to 16" },
      { label: "Altitude",   value: "51,000 ft" },
    ],
  },
];

export default function Fleet() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Section header: fade-up via a timeline ──────────────────
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          once: true,              // fire once — won't re-run on scroll back up
          invalidateOnRefresh: true,
        },
      });

      // Each direct child of the header row animates in staggered
      headerTl.from(headerRef.current!.children, {
        opacity: 0,
        y: 52,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform,opacity", // clean up will-change after anim
      });

      // ── Cards: fade-up + slight scale + stagger ──────────────────
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      cardTl.from(".fleet-card", {
        opacity: 0,
        y: 80,
        scale: 0.94,
        stagger: 0.2,
        duration: 1.1,
        ease: "power3.out",
        force3D: true,
        transformOrigin: "center bottom",
        clearProps: "transform,opacity",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="relative py-20 md:py-32 lg:py-40 px-8 md:px-20 lg:px-32 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-20 gap-4 sm:gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4">
              Our Aircraft
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              Fly the
              <span className="font-bold italic"> Legacy</span>
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
            A carefully curated fleet of the world&apos;s most capable and
            refined aircraft.
          </p>
        </div>

        {/* ── Aircraft Grid ── */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {AIRCRAFT.map((aircraft) => (
            <div
              key={aircraft.name}
              className="fleet-card group relative bg-[#0f0f0f] border border-white/5 overflow-hidden cursor-pointer"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Gold top border — reveals on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#C9A55A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={aircraft.image}
                  alt={aircraft.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 text-[9px] tracking-[0.3em] uppercase text-[#C9A55A] border border-[#C9A55A]/40 px-2.5 py-1">
                  {aircraft.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-5">
                <h3 className="text-lg font-semibold text-white tracking-wide">
                  {aircraft.name}
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {aircraft.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-0.5">
                      <span className="text-[9px] tracking-[0.25em] uppercase text-white/30">
                        {spec.label}
                      </span>
                      <span className="text-sm text-white/80 font-medium">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/5">
                  <a
                    href="#book"
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#C9A55A] hover:gap-4 transition-all duration-300"
                  >
                    Charter This Aircraft
                    <span className="w-4 h-px bg-[#C9A55A]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
