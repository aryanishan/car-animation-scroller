"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarImage from "./CarImage";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const greenTrailRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const car = carRef.current;
    const greenTrail = greenTrailRef.current;
    const headline = headlineRef.current;
    if (!wrapper || !car || !greenTrail || !headline) return;

    const statRefs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];

    // ─── Set initial states ───────────────────────────────────────────────────
    gsap.set(car, { x: -350, opacity: 0 });
    gsap.set(greenTrail, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(headline, { opacity: 0 });
    statRefs.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0, y: 40, scale: 0.85 });
    });

    // ─── Intro animation — car drives in from off-screen left ─────────────────
    const introTl = gsap.timeline({ delay: 0.3 });
    introTl
      .to(car, { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" })
      .to(
        greenTrail,
        { scaleX: 0.015, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        headline,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );

    // ─── Scroll-driven animation ──────────────────────────────────────────────
    const ctx = gsap.context(() => {
      const viewportW = window.innerWidth;
      const carWidth = car.offsetWidth;
      // Car travels from 0 → (viewport - carWidth)
      const travel = viewportW - carWidth;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${viewportW * 2.8}`,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      });

      // Car moves left → right
      scrollTl.to(car, { x: travel, ease: "none", duration: 10 }, 0);

      // Green trail expands left → right behind the car
      scrollTl.to(
        greenTrail,
        { scaleX: 1, ease: "none", duration: 10 },
        0
      );

      // Stat cards: appear progressively as car passes each quadrant
      scrollTl.to(
        stat1Ref.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "back.out(1.5)" },
        1.2   // at ~12% of scroll
      );
      scrollTl.to(
        stat2Ref.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "back.out(1.5)" },
        3.2   // at ~32% of scroll
      );
      scrollTl.to(
        stat3Ref.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "back.out(1.5)" },
        5.5   // at ~55%
      );
      scrollTl.to(
        stat4Ref.current,
        { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: "back.out(1.5)" },
        7.2   // at ~72%
      );
    }, wrapper);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ── Hero wrapper: creates scroll room and pins the hero ─── */}
      <div ref={wrapperRef} id="hero-wrapper" className="relative w-full">
        {/* The sticky hero viewport */}
        <div
          id="hero-section"
          className="relative w-full overflow-hidden"
          style={{ height: "100vh", backgroundColor: "#c9c9c9" }}
        >

          {/* ── Stat cards ──────────────────────────────────────── */}
          {/* Top-left lime: 58% */}
          <div
            ref={stat1Ref}
            id="stat-1"
            className="absolute rounded-2xl p-6 shadow-2xl"
            style={{
              top: "9%",
              left: "36%",
              width: "210px",
              backgroundColor: "#B5E040",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>58%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Increase in pick up point use
            </p>
          </div>

          {/* Top-right charcoal: 27% */}
          <div
            ref={stat2Ref}
            id="stat-2"
            className="absolute rounded-2xl p-6 shadow-2xl"
            style={{
              top: "9%",
              right: "8%",
              width: "210px",
              backgroundColor: "#292929",
              color: "#fff",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>27%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Increase in pick up point use
            </p>
          </div>

          {/* Bottom-left sky-blue: 23% */}
          <div
            ref={stat3Ref}
            id="stat-3"
            className="absolute rounded-2xl p-6 shadow-2xl"
            style={{
              bottom: "9%",
              left: "36%",
              width: "210px",
              backgroundColor: "#62CAEE",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>23%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Decreased in customer phone calls
            </p>
          </div>

          {/* Bottom-right orange: 40% */}
          <div
            ref={stat4Ref}
            id="stat-4"
            className="absolute rounded-2xl p-6 shadow-2xl"
            style={{
              bottom: "9%",
              right: "8%",
              width: "210px",
              backgroundColor: "#EE6F28",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>40%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Decreased in customer phone calls
            </p>
          </div>

          {/* ── Road track (black horizontal band centered) ─────── */}
          <div
            id="road-track"
            className="absolute left-0 right-0"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              height: "220px",
              backgroundColor: "#1a1a1a",
              overflow: "visible",
              position: "absolute",
            }}
          >
            {/* Green trail — scaleX animated 0→1 from left */}
            <div
              ref={greenTrailRef}
              id="green-trail"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "100%",
                backgroundColor: "#4BE04B",
                transformOrigin: "left center",
                zIndex: 1,
              }}
            />

            {/* Headline text on the track */}
            <div
              ref={headlineRef}
              id="headline"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.5rem, 8.5vw, 8.5rem)",
                  color: "#0c0c0c",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  userSelect: "none",
                }}
              >
                WELCOME ITZFIZZ
              </h1>
            </div>
          </div>

          {/* ── Car — absolutely positioned at vertical center of hero ─ */}
          <div
            ref={carRef}
            id="car"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: "380px",
              zIndex: 20,
            }}
          >
            <CarImage style={{ width: "380px" }} />
          </div>
        </div>
      </div>

      {/* ── Below-fold section ────────────────────────────────────── */}
      <div
        id="below-fold"
        className="flex flex-col items-center justify-center gap-4"
        style={{
          backgroundColor: "#c9c9c9",
          minHeight: "60vh",
          padding: "6rem 2rem",
        }}
      >
        <h2
          className="font-black uppercase"
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            letterSpacing: "0.12em",
            color: "#1a1a1a",
          }}
        >
          ITZFIZZ
        </h2>
        <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: "420px", textAlign: "center" }}>
          Delivering premium experiences — driven by data and designed for the future.
        </p>
      </div>
    </>
  );
}
