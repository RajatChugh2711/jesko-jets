import React from "react";

const FOOTER_LINKS = {
  Fleet: ["Gulfstream G650ER", "Bombardier Global 7500", "Dassault Falcon 8X"],
  Company: ["About Us", "Careers", "Press", "Safety"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer
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

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-20 lg:px-32 pt-20 pb-10">
        {/* ── Top Row ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-14 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Logo */}
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

            {/* Contact Info */}
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
            <div key={title} className="flex flex-col gap-5">
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

        {/* ── Bottom Row ── */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-white/20">
            © {new Date().getFullYear()} Jesko Jets. All rights reserved.
          </p>

          {/* Social Icons */}
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
