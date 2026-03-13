"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function About() {

  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
  
    const ctx = gsap.context(() => {
  
      /* IMAGE PARALLAX */
  
      gsap.to(imgRef.current,{
        y:"+=10",
        repeat:-1,
        yoyo:true,
        duration:4,
        ease:"sine.inOut"
      });
  
  
      /* MASTER TIMELINE */
  
      const tl = gsap.timeline({
        scrollTrigger:{
          trigger:sectionRef.current,
          start:"top 75%",
          end:"bottom 30%",
          toggleActions:"restart none restart none"
        }
      });
  
  
      /* TITLE REVEAL (luxury slide) */
  
      tl.fromTo(
        ".about-title",
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out"
        }
      )
  
  
      /* DIVIDER LINE GROW */
  
      .from(".about-divider",{
        scaleX:0,
        transformOrigin:"left center",
        duration:1,
        ease:"power2.out"
      },"-=0.8")
  
  
      /* TEXT STAGGER */
  
      tl.fromTo(
        ".about-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out"
        },
        "-=0.6"
      )
  
  
      /* IMAGE CINEMATIC REVEAL */
  
      .from(imgRef.current,{
        scale:1.35,
        opacity:0,
        duration:1.6,
        ease:"power3.out"
      },"-=1")
  
  
      /* STATS STAGGER */
  
      tl.fromTo(
        ".stat-block",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.25,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.8"
      )
  
  
      /* CTA BUTTON */
  
      .from(".about-cta",{
        y:30,
        opacity:0,
        duration:0.8,
        ease:"power2.out"
      },"-=0.5");
  
  
    },sectionRef);
  
    return () => ctx.revert();
  
  },[]);

  return (

    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 lg:py-40 px-8 md:px-20 lg:px-32 bg-[#0a0a0a] overflow-hidden"
    >

      {/* top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">

        {/* ── LEFT CONTENT ── */}
        <div className="flex flex-col gap-6 md:gap-8">

          <div className="about-title">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4">
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white">
              Beyond the
              <br />
              <span className="font-bold">horizon</span>
            </h2>
          </div>

          <div className="about-divider w-16 h-px bg-[#C9A55A]/40" />

          <p className="about-text text-base leading-relaxed text-white/55 font-light max-w-md">
            Founded on the belief that flight should be as extraordinary as
            the destinations it unlocks. Jesko Jets has redefined what it
            means to travel privately — pairing aviation mastery with an
            uncompromising pursuit of refinement.
          </p>

          <p className="about-text text-base leading-relaxed text-white/55 font-light max-w-md">
            Each journey is architected around you. Your schedule. Your
            comfort. Your vision of freedom at 45,000 feet.
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-8 pt-4">
            {[
              { number: "15+",   label: "Years of Excellence" },
              { number: "3,200+", label: "Flights Completed" },
              { number: "48",    label: "Global Destinations" },
            ].map((stat) => (
              <div key={stat.label} className="stat-block flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#C9A55A]">
                  {stat.number}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-cta">
            <a
              href="#fleet"
              className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/70 hover:text-[#C9A55A] transition-colors duration-300 group"
            >
              Discover Our Fleet
              <span className="w-8 h-px bg-current group-hover:w-14 transition-all duration-300" />
            </a>
          </div>

        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className="relative h-[320px] sm:h-[400px] md:h-[580px] overflow-hidden">

          <div className="absolute inset-0 border border-[#C9A55A]/15" />

          <div
            ref={imgRef}
            className="absolute inset-0 scale-[1.15] will-change-transform"
          >
            <Image
              src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=90&w=1200"
              alt="Luxury private jet interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* corner accents */}
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#C9A55A]/50" />
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#C9A55A]/50" />

        </div>

      </div>

    </section>

  );

}
