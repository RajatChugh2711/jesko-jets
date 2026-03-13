"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LuxurySection() {

  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLDivElement>(null);
  const jetRef      = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      const isMobile = window.innerWidth < 768;

      // ─────────────────────────────────────────────────────────────
      //  ENTRANCE — fires once when section scrolls into view.
      //  Title first, gold line grows, then the jet banks in from
      //  below-right (desktop) replicating the cinematic approach
      //  of jeskojets.com where the plane is the section hero.
      // ─────────────────────────────────────────────────────────────
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      entranceTl
        // Title slides up
        .from(titleRef.current, { y: 100, opacity: 0, duration: 1.2 })
        // Gold line grows from left
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.out" },
          "-=0.8"
        )
        // Jet banks in — rotate: -14 simulates a banking approach on desktop
        .from(
          jetRef.current,
          {
            y:       isMobile ? 60  : 160,
            x:       isMobile ? 0   : 50,
            opacity: 0,
            scale:   0.75,
            rotate:  isMobile ? 0   : -14,
            duration: 1.8,
            ease: "power3.out",
            force3D: true,
          },
          "-=1"
        )
        // Spec text block
        .from(contentRef.current, { y: 50, opacity: 0, duration: 1 }, "-=1.2")
        // Spec rows stagger
        .from(".spec-item", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, "-=0.7");

      // ─────────────────────────────────────────────────────────────
      //  CONTINUOUS FLOAT — gentle hover after entrance settles.
      //  Uses yPercent so it doesn't conflict with the scale-based
      //  scroll parallax below (different transform properties).
      // ─────────────────────────────────────────────────────────────
      gsap.to(jetRef.current, {
        yPercent: -3.5,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      });

      // ─────────────────────────────────────────────────────────────
      //  SCROLL PARALLAX — desktop only.
      //  Exact values from jeskojets.com source:
      //    scale 1 → 0.4, yPercent 0 → -15, scrub: 1.2
      //  We use a softer scale (0.82) since our layout differs.
      // ─────────────────────────────────────────────────────────────
      if (!isMobile) {
        gsap.fromTo(
          jetRef.current,
          { scale: 1 },
          {
            scale: 0.82,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "30% center",
              end: "85% bottom",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();

  }, []);

  return (

    <section
      ref={sectionRef}
      className="relative bg-[#050505] text-white py-20 md:py-32 lg:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
    >

      {/* Top separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-[1400px] mx-auto">

        {/* ── TITLE ── */}
        <div ref={titleRef} className="mb-10 md:mb-16 lg:mb-20">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-5">
            The Aircraft
          </p>
          <h2 className="text-[clamp(2.8rem,6vw,7rem)] leading-[0.92] font-light">
            Fly in 
            <span className="block font-bold italic">Luxury</span>
          </h2>
        </div>

        {/* Gold divider */}
        <div ref={lineRef} className="w-full h-px bg-[#C9A55A]/20 mb-10 md:mb-16 lg:mb-24" />

        {/* ── CONTENT GRID ── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">

          {/* ── JET ── */}
          <div
            ref={jetRef}
            className="relative w-full flex items-center justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Soft gold glow behind the plane */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 70% at 50% 55%, rgba(201,165,90,0.07) 0%, transparent 70%)",
              }}
              aria-hidden
            />
            <Image
              src="/img_jet.webp"
              alt="Gulfstream G650ER — top view"
              width={560}
              height={620}
              className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[540px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* ── DETAILS ── */}
          <div ref={contentRef} style={{ willChange: "transform, opacity" }}>

            <p className="text-[10px] tracking-[0.4em] text-[#C9A55A] uppercase mb-3">
              Gulfstream
            </p>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-none mb-2">
              G650<span className="font-bold">ER</span>
            </h3>
            <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-6 md:mb-8">
              Ultra Long Range
            </p>

            <p className="text-white/55 leading-relaxed mb-8 md:mb-10 text-sm md:text-base font-light max-w-md">
              Featuring wings designed to minimise anything that could disrupt
              its natural aerodynamic balance and powered by high-thrust BR725
              engines, the G650ER is engineered for exceptional range and speed —
              redefining what it means to travel privately.
            </p>

            <div className="w-10 h-px bg-[#C9A55A]/40 mb-8 md:mb-10" />

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {[
                { label: "Range",      value: "11,263 km",  sub: "7,500 nm" },
                { label: "Speed",      value: "Mach 0.925", sub: "480 knots" },
                { label: "Passengers", value: "Up to 19",   sub: "Full-flat beds" },
                { label: "Endurance",  value: "14 hrs",     sub: "Non-stop" },
              ].map((s) => (
                <div key={s.label} className="spec-item">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 mb-1">
                    {s.label}
                  </p>
                  <p className="text-xl md:text-2xl font-light text-white">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#book"
              className="inline-flex items-center gap-3 mt-8 md:mt-12 text-[10px] tracking-[0.35em] uppercase text-[#C9A55A] hover:gap-6 transition-all duration-300 group"
            >
              Charter This Aircraft
              <span className="w-6 h-px bg-[#C9A55A] group-hover:w-10 transition-all duration-300" />
            </a>

          </div>

        </div>

      </div>

    </section>

  );

}
