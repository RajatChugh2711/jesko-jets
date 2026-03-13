"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const DESTINATIONS = [
  {
    city: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=800",
    featured: true,
  },
  {
    city: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=85&w=800",
    featured: false,
  },
  {
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=800",
    featured: false,
  },
  {
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=85&w=800",
    featured: true,
  },
  {
    city: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=85&w=800",
    featured: false,
  },
  {
    city: "Singapore",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=85&w=800",
    featured: false,
  },
];

export default function Destinations() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Header reveal via timeline ───────────────────────────────
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      headerTl.from(headerRef.current!.children, {
        opacity: 0,
        y: 52,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform,opacity",
      });

      // ── Cards: stagger fade-up + scale ───────────────────────────
      // We use individual card elements via the scoped context selector.
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      cardTl.from(".dest-card", {
        opacity: 0,
        y: 70,
        scale: 0.93,
        stagger: {
          each: 0.1,
          from: "start",   // left-to-right, top-to-bottom order
        },
        duration: 0.95,
        ease: "power3.out",
        force3D: true,
        transformOrigin: "center bottom",
        clearProps: "transform,opacity",
      });

    }, sectionRef); // scope: all class selectors searched within sectionRef

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="destinations"
      className="relative py-32 md:py-40 px-8 md:px-20 lg:px-32 bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 md:mb-20 gap-4 sm:gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4">
              Where We Fly
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
              The world
              <span className="font-bold italic"> awaits</span>
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-xs font-light leading-relaxed">
            Exclusive access to private FBOs across six continents.
          </p>
        </div>

        {/* ── Destinations Grid — asymmetric mosaic ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.city}
              className={`dest-card group relative overflow-hidden cursor-pointer ${
                dest.featured ? "h-52 sm:h-64 md:h-80" : "h-36 sm:h-48 md:h-64"
              }`}
              style={{ willChange: "transform, opacity" }}
            >
              <Image
                src={dest.image}
                alt={`${dest.city}, ${dest.country}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 group-hover:from-black/70 transition-all duration-500" />

              {/* City label */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A] mb-1">
                  {dest.country}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                  {dest.city}
                </h3>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href="#book"
                  className="px-5 py-2.5 border border-[#C9A55A] text-[10px] tracking-[0.3em] uppercase text-[#C9A55A] hover:bg-[#C9A55A] hover:text-black transition-all duration-300"
                >
                  Book Flight
                </a>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C9A55A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
