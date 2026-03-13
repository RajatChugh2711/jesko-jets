"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SERVICES = [
  {
    title: "Pets Welcome",
    description:
      "Your companions travel first class too. Full pet-friendly cabins with dedicated care on every flight.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M9.5 14s1 1.5 2.5 1.5 2.5-1.5 2.5-1.5" />
      </svg>
    ),
  },
  {
    title: "24 / 7 Availability",
    description:
      "Around the clock, around the globe. Our operations team is awake whenever you need to be airborne.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Onboard Services",
    description:
      "From curated menus by Michelin-trained chefs to personalised cabin setups — every detail considered.",
    image:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m14.16 14.16.7.7M3 12h1m16 0h1M4.92 19.08l.7-.7M18.36 5.64l.7-.7" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Maximum Efficiency",
    description:
      "Direct routes, private FBOs, no check-in queues. Your time is the most valuable asset on board.",
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".service-header", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".service-card", {
        opacity: 0,
        y: 70,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 md:py-40 px-8 md:px-20 lg:px-32 bg-[#050505] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A55A]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="service-header text-[10px] tracking-[0.4em] uppercase text-[#C9A55A] mb-4">
            What We Offer
          </p>
          <h2 className="service-header text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight">
            Crafted for
            <span className="font-bold italic"> the few</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="service-card group relative bg-[#0f0f0f] border border-white/5 overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* Icon */}
                <div className="absolute bottom-4 left-4 text-[#C9A55A]">
                  {service.icon}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-sm font-semibold tracking-wide text-white">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/45 font-light">
                  {service.description}
                </p>
              </div>

              {/* Bottom gold accent line slides in on hover */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#C9A55A] group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
