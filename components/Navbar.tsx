"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const NAV_LINKS = ["Fleet", "Destinations", "Services", "Contact"];

// Debounce helper — avoids spamming ScrollTrigger.refresh() on every resize tick
function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export default function Navbar() {
  const navRef      = useRef<HTMLElement>(null);
  const stRef       = useRef<ScrollTrigger | null>(null);   // stored so we can kill it
  const animRef     = useRef<gsap.core.Tween | null>(null); // entrance anim ref
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Smooth-scroll to a section, then refresh ScrollTrigger ──────
  // We must NOT rely on the browser's instant anchor jump because
  // GSAP's pin spacer shifts DOM positions; scrollIntoView handles
  // the spacer correctly, and the 600ms delay covers the transition.
  const navigateTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Refresh after smooth scroll settles so all ScrollTrigger
    // start/end calculations are based on the new scroll position.
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 700);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── 1. Navbar background swap on scroll ─────────────────────
    stRef.current = ScrollTrigger.create({
      start: "top -80",
      onEnter: () => {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(8, 8, 8, 0.88)",
          borderBottomColor: "rgba(201, 165, 90, 0.15)",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(navRef.current, {
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    // ── 2. Entrance animation ───────────────────────────────────
    animRef.current = gsap.from(navRef.current, {
      y: -24,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    // ── 3. Refresh ScrollTrigger when user uses hash navigation ──
    // Hash changes happen both from clicking our links (which we
    // intercept below) AND from the browser back/forward buttons.
    const onHashChange = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("hashchange", onHashChange);

    // ── 4. Refresh on resize (debounced) ────────────────────────
    const onResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);
    window.addEventListener("resize", onResize);

    // ── Cleanup ─────────────────────────────────────────────────
    return () => {
      stRef.current?.kill();
      animRef.current?.kill();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex justify-between items-center border-b border-transparent"
      style={{ willChange: "background-color" }}
    >
      {/* ── Logo ── */}
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setTimeout(() => ScrollTrigger.refresh(), 700); }}
        className="flex items-center gap-2 group"
      >
        <span className="text-xl font-bold tracking-[0.3em] text-white uppercase">
          Jesko
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#C9A55A] group-hover:scale-150 transition-transform duration-300"
          aria-hidden
        />
        <span className="text-xl font-light tracking-[0.3em] text-white/70 uppercase">
          Jets
        </span>
      </a>

      {/* ── Desktop Links ── */}
      <ul className="hidden md:flex items-center gap-10">
        {NAV_LINKS.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(item.toLowerCase());
                setMenuOpen(false);
              }}
              className="relative text-xs tracking-[0.25em] uppercase text-white/60 hover:text-white transition-colors duration-300 group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A55A] group-hover:w-full transition-all duration-300" />
            </a>
          </li>
        ))}
        <li>
          <a
            href="#book"
            onClick={(e) => { e.preventDefault(); navigateTo("book"); setMenuOpen(false); }}
            className="px-6 py-2.5 border border-[#C9A55A]/60 text-xs tracking-[0.25em] uppercase text-[#C9A55A] hover:bg-[#C9A55A] hover:text-black transition-all duration-300"
          >
            Book Now
          </a>
        </li>
      </ul>

      {/* ── Mobile Hamburger ── */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
      </button>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-[#C9A55A]/10 md:hidden">
          <ul className="flex flex-col py-6">
            {[...NAV_LINKS, "Book Now"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(" ", "")}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(item.toLowerCase().replace(" ", ""));
                    setMenuOpen(false);
                  }}
                  className="block px-8 py-4 text-xs tracking-[0.25em] uppercase text-white/60 hover:text-[#C9A55A] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
