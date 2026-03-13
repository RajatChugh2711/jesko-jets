"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {

  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* INITIAL STATE */

      gsap.set(bgRef.current,{ scale:1.15 })
      gsap.set(windowRef.current,{ scale:1, opacity:1 })
      gsap.set(leftRef.current,{ x:-250, opacity:0 })
      gsap.set(rightRef.current,{ x:250, opacity:0 })
      gsap.set(bottomRef.current,{ y:40, opacity:0 })


      /* INTRO ANIMATION */

      const intro = gsap.timeline({ defaults:{ ease:"power3.out"}})

      intro
      .to(bgRef.current,{ scale:1, duration:2 })
      .to(leftRef.current,{ x:0, opacity:1, duration:1.2 },"-=1.2")
      .to(rightRef.current,{ x:0, opacity:1, duration:1.2 },"<")
      .to(bottomRef.current,{ y:0, opacity:1, duration:.8 },"-=.8")


      /* SCROLL CINEMATIC TIMELINE */

      const tl = gsap.timeline({

        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 1,           // links animation to scroll progress
          anticipatePin: 1
        }

      })


      /* SKY PARALLAX */

      tl.to(bgRef.current,{
        y:-160,
        scale:1.25,
        ease:"none",
        duration:10
      },0)


      /* TAGLINE FADE */

      tl.to(bottomRef.current,{
        y:-60,
        opacity:0,
        duration:3,
        ease:"none"
      },0)


      /* LEFT TEXT ZOOM + EXIT */

      tl.to(leftRef.current,{
        xPercent: -290,
        scale: 1.4,
        transformOrigin: "left center",
        ease: "none",
        duration: 7
      },0)


      /* RIGHT TEXT ZOOM + EXIT */

      tl.to(rightRef.current,{
        xPercent: 290,
        scale: 1.4,
        transformOrigin: "right center",
        ease: "none",
        duration: 7
      },0)


      /* WINDOW FLY THROUGH */

      tl.to(windowRef.current,{
        scale:11,
        transformOrigin:"center center",
        ease:"power2.in",
        duration:9
      },2)


      /* WINDOW DISAPPEAR */

      tl.to(windowRef.current,{
        opacity:0,
        duration:2
      },8)


    },containerRef)

    return ()=>ctx.revert()

  },[])


  return(

    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >

      {/* SKY */}

      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{willChange:"transform"}}
      >
        <Image
          src="/img_sky-hero.webp"
          alt="Sky"
          fill
          priority
          className="object-cover"
        />
      </div>


      {/* WINDOW */}

      <div
        ref={windowRef}
        className="absolute inset-0 z-10"
        style={{willChange:"transform,opacity"}}
      >
        <Image
          src="/img_hero-front.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>


      {/* TEXT */}

      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-start md:items-center justify-between px-6 sm:px-10 md:px-12 lg:px-24 pt-24 pb-20 md:pt-0 md:pb-0">

        <div ref={leftRef}>

          <p className="text-[10px] tracking-[0.45em] uppercase text-[#C9A55A] mb-3 md:mb-5">
            Est. 2008
          </p>

          <h1 className="text-[clamp(3.2rem,5vw,6rem)] leading-[1.05] text-white font-light">

            We are <br/>

            <span className="font-bold italic">
              movement
            </span>

          </h1>

        </div>


        <div ref={rightRef} className="mt-auto md:mt-0 md:text-right">

          <h1 className="text-[clamp(3.2rem,5vw,6rem)] leading-[1.05] text-white font-light">

            We are <br/>

            <span className="font-bold italic">
              distinction
            </span>

          </h1>

        </div>

      </div>


      {/* BOTTOM TAGLINE */}

      <div
        ref={bottomRef}
        className="absolute bottom-8 md:bottom-14 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >

        <p className="text-[11px] tracking-[0.5em] uppercase text-[#C9A55A]">
          Your freedom to enjoy life
        </p>

        <div className="mt-4 flex flex-col items-center">

          <span className="w-[1px] h-12 bg-gradient-to-b from-[#C9A55A] to-transparent"/>

          <span className="text-[10px] text-white/40 mt-2">
            Scroll
          </span>

        </div>

      </div>


    </section>

  )

}