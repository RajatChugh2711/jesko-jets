"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  date: string;
}

const DESTINATIONS = [
  "Dubai, UAE",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "New York, USA",
  "Singapore",
  "Zurich, Switzerland",
  "Monaco",
  "Maldives",
  "Other",
];

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  destination: "",
  date: "",
};

export default function BookFlight() {
  const sectionRef   = useRef<HTMLElement>(null);
  const eyebrowRef   = useRef<HTMLParagraphElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subRef       = useRef<HTMLParagraphElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const formRef      = useRef<HTMLFormElement | HTMLDivElement>(null);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // ── Header reveal timeline ──────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl
        // Eyebrow drifts up from below
        .from(eyebrowRef.current, { y: 30, opacity: 0, duration: 0.7 })
        // Gold divider grows from centre outward
        .from(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "center center", duration: 0.8, ease: "power2.out" },
          "-=0.3"
        )
        // Heading rises
        .from(
          headingRef.current,
          { y: 60, opacity: 0, duration: 1, force3D: true },
          "-=0.5"
        )
        // Subtitle fades
        .from(
          subRef.current,
          { y: 24, opacity: 0, duration: 0.7 },
          "-=0.6"
        )
        // Form panel slides up from deeper
        .from(
          ".book-form-panel",
          { y: 80, opacity: 0, duration: 1.1, ease: "power3.out", force3D: true },
          "-=0.5"
        )
        // Individual form fields stagger in
        .from(
          ".book-field",
          { y: 30, opacity: 0, stagger: 0.09, duration: 0.65 },
          "-=0.7"
        )
        // Submit row last
        .from(
          ".book-submit-row",
          { y: 20, opacity: 0, duration: 0.6 },
          "-=0.3"
        );

      // ── Watermark parallax ──────────────────────────────────────────
      gsap.to(".book-watermark", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (Math.random() < 0.2) {
      setStatus("error");
      setErrorMsg(
        "Our system is momentarily unavailable. Please call +1 (800) JESKO-1 directly."
      );
      return;
    }

    setStatus("success");
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStatus("idle");
    setErrorMsg("");
  };

  return (
    <section
      ref={sectionRef}
      id="book"
      className="relative py-32 md:py-40 px-8 md:px-20 lg:px-32 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      {/* Background text watermark */}
      <div
        className="book-watermark absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-[25vw] font-bold uppercase text-white/[0.02] select-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          Book
        </span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <p
            ref={eyebrowRef}
            className="text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4"
          >
            Private Charter
          </p>
          <div
            ref={dividerRef}
            className="w-16 h-px bg-[#C9A55A]/40 mx-auto mb-6"
          />
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
          >
            Reserve your
            <span className="font-bold italic"> journey</span>
          </h2>
          <p
            ref={subRef}
            className="mt-4 text-sm text-white/40 font-light"
          >
            Complete the form and our aviation concierge will contact you within
            2 hours.
          </p>
        </div>

        {/* ── Success State ── */}
        {status === "success" ? (
          <div className="book-form-panel flex flex-col items-center gap-8 py-16 border border-[#C9A55A]/20 bg-[#0f0f0f] text-center px-8">
            <div className="w-16 h-16 rounded-full border border-[#C9A55A] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A55A"
                strokeWidth={1.5}
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-light text-white mb-2">
                Request Received
              </h3>
              <p className="text-sm text-white/50 max-w-md">
                Thank you, <span className="text-[#C9A55A]">{form.name}</span>.
                Your charter request to{" "}
                <span className="text-[#C9A55A]">{form.destination}</span> has
                been received. Our concierge will reach you at {form.email}{" "}
                shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-[#C9A55A] transition-colors duration-300"
            >
              Submit another request
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form
            onSubmit={handleSubmit}
            className="book-form-panel grid md:grid-cols-2 gap-5 bg-[#0f0f0f] border border-white/5 p-8 md:p-12"
          >
            {/* Name */}
            <div className="book-field flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A]">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Alexandre Dupont"
                className="bg-transparent border-b border-white/10 focus:border-[#C9A55A] py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-300"
              />
            </div>

            {/* Email */}
            <div className="book-field flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A]">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="a.dupont@example.com"
                className="bg-transparent border-b border-white/10 focus:border-[#C9A55A] py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-300"
              />
            </div>

            {/* Phone */}
            <div className="book-field flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A]">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (000) 000-0000"
                className="bg-transparent border-b border-white/10 focus:border-[#C9A55A] py-3 text-sm text-white placeholder:text-white/20 outline-none transition-colors duration-300"
              />
            </div>

            {/* Destination */}
            <div className="book-field flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A]">
                Destination *
              </label>
              <select
                name="destination"
                required
                value={form.destination}
                onChange={handleChange}
                className="bg-[#0f0f0f] border-b border-white/10 focus:border-[#C9A55A] py-3 text-sm text-white outline-none transition-colors duration-300 cursor-pointer appearance-none"
              >
                <option value="" disabled className="bg-[#111]">
                  Select destination
                </option>
                {DESTINATIONS.map((d) => (
                  <option key={d} value={d} className="bg-[#111]">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Date — full width */}
            <div className="book-field md:col-span-2 flex flex-col gap-2">
              <label className="text-[9px] tracking-[0.3em] uppercase text-[#C9A55A]">
                Preferred Departure Date *
              </label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="bg-transparent border-b border-white/10 focus:border-[#C9A55A] py-3 text-sm text-white outline-none transition-colors duration-300 [color-scheme:dark]"
              />
            </div>

            {/* Error message */}
            {status === "error" && (
              <div className="md:col-span-2 flex items-start gap-3 p-4 border border-red-500/30 bg-red-500/5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
                <p className="text-xs text-red-400 leading-relaxed">{errorMsg}</p>
              </div>
            )}

            {/* Submit */}
            <div className="book-submit-row md:col-span-2 flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="relative px-10 py-4 bg-[#C9A55A] text-black text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#E8C97A] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden group"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-3">
                    <svg
                      className="animate-spin w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Processing…
                  </span>
                ) : (
                  "Request Charter"
                )}
              </button>
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/25">
                No commitment required
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
