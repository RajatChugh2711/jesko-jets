"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const leftHeadRef  = useRef<HTMLDivElement>(null);
  const rightHeadRef = useRef<HTMLDivElement>(null);
  const windowRef    = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Lock scroll during intro — scrub timeline must start from scroll = 0
    document.body.style.overflow = "hidden";
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 3200);

    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────────────────────
      //  STEP 1 — Hard initial state (before first browser paint)
      // ─────────────────────────────────────────────────────────────
      gsap.set(bgRef.current,        { scale: 1.12 });
      // windowRef: the full-screen cabin overlay — starts slightly scaled
      // down (edges visible) so it "settles" into frame on load
      gsap.set(windowRef.current,    { opacity: 0, scale: 0.96, transformOrigin: "center center" });
      gsap.set(leftHeadRef.current,  { x: -200, opacity: 0 });
      gsap.set(rightHeadRef.current, { x: 200,  opacity: 0 });
      gsap.set(bottomRef.current,    { y: 32,   opacity: 0 });

      // ─────────────────────────────────────────────────────────────
      //  STEP 2 — Page-load entrance (runs once, not scroll-driven)
      //
      //  bg zooms to full → cabin fades in → headings fly in → tagline
      // ─────────────────────────────────────────────────────────────
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          clearTimeout(safetyTimer);
          document.body.style.overflow = "";
          requestAnimationFrame(() => ScrollTrigger.refresh(true));
        },
      });

      loadTl
        .to(bgRef.current,        { scale: 1,   duration: 2.2, ease: "power2.out" })
        .to(windowRef.current,    { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, "-=2")
        .to(leftHeadRef.current,  { x: 0, opacity: 1, duration: 1.2 }, "-=1.2")
        .to(rightHeadRef.current, { x: 0, opacity: 1, duration: 1.2 }, "<")
        .to(bottomRef.current,    { y: 0, opacity: 1, duration: 1 },   "-=0.7");

      // ─────────────────────────────────────────────────────────────
      //  STEP 3 — Scroll-driven cinematic exit
      //
      //  Relative timeline durations (out of 10):
      //
      //   t 0──────4──────7──────10
      //   bg  ░░░░░░░░░░░░░░░░░░░  parallax up
      //   txt ░░░░                 tagline fades
      //   hdg ░░░░░░░░░░░          headings exit ±
      //   win      ░░░░░░░░░░░░░   cabin scales up (starts at t=2)
      //   wop                ░░░   cabin fades out (t=7→10)
      //   ovr           ░░░░░░░░   overlay in (t=5→10)
      // ─────────────────────────────────────────────────────────────
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sky background parallax — whole timeline
      scrollTl.to(
        bgRef.current,
        { y: -80, force3D: true, ease: "none", duration: 10 },
        0
      );

      // Tagline fades out quickly (t 0→4)
      scrollTl.to(
        bottomRef.current,
        { opacity: 0, y: -20, ease: "none", duration: 4 },
        0
      );

      // Left heading exits LEFT (t 0→7)
      // The left heading occupies ~0–45vw, so -62vw puts its right edge at -17vw
      scrollTl.to(
        leftHeadRef.current,
        { x: "-62vw", force3D: true, ease: "none", duration: 7 },
        0
      );

      // Right heading exits RIGHT (t 0→7)
      scrollTl.to(
        rightHeadRef.current,
        { x: "62vw", force3D: true, ease: "none", duration: 7 },
        0
      );

      // Cabin overlay scales up (t 2→10)
      // As it scales, the transparent oval expands → user "flies through" the window
      scrollTl.to(
        windowRef.current,
        {
          scale: 6,
          force3D: true,
          transformOrigin: "center center",
          ease: "power1.in",
          duration: 8,
        },
        2
      );

      // Cabin fades out once headings are gone (t 7→10)
      scrollTl.to(
        windowRef.current,
        { opacity: 0, ease: "none", duration: 3 },
        7
      );

      // Dark overlay closes in to complete transition (t 5→10)
      scrollTl.to(
        overlayRef.current,
        { opacity: 1, ease: "none", duration: 5 },
        5
      );

    }, containerRef);

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >

      {/* ─────────────────────────────────────────────────────────────
          LAYER 0 — Sky background (parallax)
          Extra height (140%) + negative top offset prevent bare edges
          during the upward y parallax movement.
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0"
        style={{ top: "-20%", height: "140%", willChange: "transform" }}
      >
        <Image
          src="/img_sky-hero.webp"
          alt="Aerial view above the clouds"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 1 — Window frame assembly (scales on scroll)
          img_hero-front.webp: full-screen dark cabin interior with a
          transparent oval center — as this scales up, the oval expands
          to fill the screen, creating the "fly-through" effect.
          All child elements (glass ring, knobs) scale with it.
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={windowRef}
        className="absolute inset-0 z-10"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Main cabin overlay — transparent oval reveals sky behind */}
        <Image
          src="/img_hero-front.webp"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden
        />

        {/* Inner glass frame ring — sits inside the transparent oval */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden
        >
          <div
            className="relative"
            style={{
              width:  "clamp(210px, 30vw, 460px)",
              height: "clamp(260px, 40vw, 610px)",
            }}
          >
            <Image
              src="/img_hero-back.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Top arc knob — sits at the top edge of the oval */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: "calc(50% - 20vw)",
            width: "clamp(160px, 24vw, 360px)",
          }}
          aria-hidden
        >
          <Image
            src="/img_hero-front-over.webp"
            alt=""
            width={360}
            height={110}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Bottom latch — sits at the bottom edge of the oval */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            bottom: "calc(50% - 20vw)",
            width: "clamp(160px, 24vw, 360px)",
          }}
          aria-hidden
        >
          <Image
            src="/img_window-knob.webp"
            alt=""
            width={360}
            height={100}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2 — Dark transition overlay (fades in at scroll end)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-[#0a0a0a] pointer-events-none"
        style={{ opacity: 0, willChange: "opacity" }}
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3 — Headings (above window and overlay during scroll;
          they exit via translate before overlay reaches full opacity)
          A flex-spacer in the center keeps headings on the outer edges
          where the dark cabin walls are — perfect contrast for text.
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-30 flex items-center justify-between px-8 md:px-16 lg:px-24 pointer-events-none">

        {/* Left heading */}
        <div
          ref={leftHeadRef}
          className="flex-1 pointer-events-auto"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-3">
            Est. 2008
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-light leading-[1.05] text-white drop-shadow-lg">
            We are
            <br />
            <span className="font-bold italic">movement</span>
          </h1>
        </div>

        {/* Spacer — matches the width of the oval window area so
            headings sit cleanly over the dark cabin walls on each side */}
        <div
          className="flex-shrink-0"
          style={{ width: "clamp(180px, 34vw, 540px)" }}
          aria-hidden
        />

        {/* Right heading */}
        <div
          ref={rightHeadRef}
          className="flex-1 text-right pointer-events-auto"
          style={{ willChange: "transform, opacity" }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-3">
            &nbsp;
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-light leading-[1.05] text-white drop-shadow-lg">
            We are
            <br />
            <span className="font-bold italic">distinction</span>
          </h1>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4 — Bottom tagline + scroll cue
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        style={{ willChange: "transform, opacity" }}
      >
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#C9A55A]">
          Your freedom to enjoy life
        </p>
        <div className="flex flex-col items-center gap-1">
          <span className="w-px h-10 bg-gradient-to-b from-[#C9A55A] to-transparent" />
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">
            Scroll
          </span>
        </div>
      </div>

    </section>
  );
}
