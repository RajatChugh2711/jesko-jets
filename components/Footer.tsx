"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const FOOTER_LINKS = {
  Fleet: ["Gulfstream G650ER", "Bombardier Global 7500", "Dassault Falcon 8X"],
  Company: ["About Us", "Careers", "Press", "Safety"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const brandRef   = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Brand column slides in from left ──────────────────────────
      gsap.from(brandRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // ── Link columns stagger up from below ────────────────────────
      gsap.from(".footer-col", {
        y: 50,
        opacity: 0,
        stagger: 0.14,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      // ── Gold divider line grows from left ─────────────────────────
      gsap.from(".footer-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      // ── Bottom bar fades in last ───────────────────────────────────
      gsap.from(bottomRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative bg-[#030303] border-t border-[#C9A55A]/10 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C9A55A 0, #C9A55A 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 lg:px-32 pt-14 md:pt-20 pb-8 md:pb-10">
        {/* ── Top Row ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-14 pb-12 md:pb-16">

          {/* Brand Column */}
          <div ref={brandRef} className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-[0.3em] text-white uppercase">
                Jesko
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A55A]" />
              <span className="text-xl font-light tracking-[0.3em] text-white/60 uppercase">
                Jets
              </span>
            </div>

            <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs">
              Private aviation reimagined. Where precision engineering meets the
              art of refined living at 45,000 feet.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { label: "Phone", value: "+1 (800) JESKO-1" },
                { label: "Email", value: "concierge@jeskojets.com" },
                { label: "HQ", value: "Geneva, Switzerland" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A] w-12 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-xs text-white/50">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="footer-col flex flex-col gap-5">
              <h4 className="text-[9px] tracking-[0.35em] uppercase text-[#C9A55A]">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/40 hover:text-white/80 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="footer-divider w-full h-px bg-white/5 mb-8" />

        {/* ── Bottom Row ── */}
        <div ref={bottomRef} className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/20">
            © {new Date().getFullYear()} Jesko Jets. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Instagram", "LinkedIn", "Twitter"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-[9px] tracking-[0.25em] uppercase text-white/25 hover:text-[#C9A55A] transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>

          <p className="text-[9px] tracking-[0.2em] uppercase text-white/15">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
