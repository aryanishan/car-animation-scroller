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
  const smokeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const car = carRef.current;
    const greenTrail = greenTrailRef.current;
    const headline = headlineRef.current;
    if (!wrapper || !car || !greenTrail || !headline) return;

    const statRefs = [stat1Ref, stat2Ref, stat3Ref, stat4Ref];

    // Set initial GSAP states
    gsap.set(car, { x: -450, yPercent: -50, opacity: 0 });
    gsap.set(greenTrail, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(headline, { clipPath: "inset(0% 100% 0% 0%)" });
    statRefs.forEach((ref) => {
      if (ref.current) gsap.set(ref.current, { opacity: 0, y: 40, scale: 0.85 });
    });

    // Intro animation sequence
    const introTl = gsap.timeline({ delay: 0.3 });
    const cWidth = car.offsetWidth || 450;
    introTl
      .to(car, { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" })
      .to(
        greenTrail,
        { scaleX: (cWidth * 0.4) / window.innerWidth, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .to(
        headline,
        { clipPath: `inset(0% ${100 - ((cWidth * 0.4) / window.innerWidth) * 100}% 0% 0%)`, duration: 0.6, ease: "power2.out" },
        "<"
      );

    // Scroll-bound timeline execution
    const ctx = gsap.context(() => {
      const viewportW = window.innerWidth;
      const carWidth = car.offsetWidth;
      // Car travels so that half of it remains visible at the end
      const travel = viewportW - carWidth * 0.5;

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: `+=${viewportW * 1.2}`,
          pin: true,
          scrub: 0,
          anticipatePin: 1,
        },
      });

      // Car moves left → right
      scrollTl.to(car, { x: travel, ease: "none", duration: 10 }, 0);

      // Green trail expands perfectly synced with the back of the car
      scrollTl.to(
        greenTrail,
        { scaleX: (travel + carWidth * 0.4) / viewportW, ease: "none", duration: 10 },
        0
      );

      // Headline reveals perfectly synced with the green trail
      scrollTl.to(
        headline,
        { clipPath: `inset(0% ${100 - ((travel + carWidth * 0.4) / viewportW) * 100}% 0% 0%)`, ease: "none", duration: 10 },
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

  // Smoke exhaust particle effect logic
  useEffect(() => {
    let lastSmokeTime = 0;

    function spawnSmoke(speed: number) {
      const car = carRef.current;
      const smokeContainer = smokeContainerRef.current;
      if (!car || !smokeContainer) return;

      const heroEl = document.getElementById("hero-section");
      if (!heroEl) return;

      const carRect = car.getBoundingClientRect();
      const heroRect = heroEl.getBoundingClientRect();

      // Car faces right → rear exhaust is on the left side
      const rearX = carRect.left - heroRect.left + 28;
      const centerY = carRect.top - heroRect.top + carRect.height * 0.52;

      // Normal slow scrolling yields ~3-4 particles.
      let count = Math.min(3 + Math.floor(speed / 90), 8);
      let sizeScale = 1;
      let driftScale = 1;

      // Increase density and volume significantly for fast scrolls
      if (speed > 150) {
        count = Math.min(8 + Math.floor((speed - 150) / 15), 30);
        sizeScale = 1.6; // 60% larger base particles
        driftScale = 1.6; // 60% wider dispersion
      }

      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        const size = (22 + Math.random() * 32) * sizeScale;
        const offsetY = ((Math.random() - 0.5) * carRect.height * 0.55) * driftScale;
        const gray = Math.floor(140 + Math.random() * 95);
        const alpha = 0.45 + Math.random() * 0.4;

        Object.assign(particle.style, {
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${gray},${gray},${gray},${alpha}) 0%, rgba(${gray},${gray},${gray},0) 70%)`,
          left: `${rearX - size / 2}px`,
          top: `${centerY - size / 2 + offsetY}px`,
          pointerEvents: "none",
          opacity: String(alpha),
        });

        smokeContainer.appendChild(particle);

        const driftX = -(55 + Math.random() * 75) * driftScale;
        const driftY = ((Math.random() - 0.5) * 65) * driftScale;
        const duration = 700 + Math.random() * 600;
        const scale = (2.0 + Math.random() * 1.4) * sizeScale;

        particle.animate(
          [
            { transform: "scale(0.25)", opacity: String(alpha), offset: 0 },
            {
              transform: `scale(${scale}) translate(${driftX}px, ${driftY}px)`,
              opacity: "0",
              offset: 1,
            },
          ],
          { duration, easing: "ease-out", fill: "forwards" }
        );

        setTimeout(() => {
          // Guard: particle may have already been removed on unmount
          if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, duration + 120);
      }
    }

    function handleWheel(e: WheelEvent) {
      const speed = Math.abs(e.deltaY);
      const now = Date.now();
      // Trigger smoke only on fast scrolls (threshold: 70px per event)
      if (speed > 70 && now - lastSmokeTime > 55) {
        spawnSmoke(speed);
        lastSmokeTime = now;
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      // Clear all pending smoke particles on unmount to avoid stale DOM errors
      if (smokeContainerRef.current) {
        smokeContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      {/* Main hero wrapper and sticky pin target */}
      <div ref={wrapperRef} id="hero-wrapper" className="relative w-full">
        {/* The sticky hero viewport */}
        <div
          id="hero-section"
          className="relative w-full overflow-hidden"
          style={{ height: "100vh", backgroundColor: "#c9c9c9" }}
        >
          {/* Smoke particle overlay container */}
          <div
            ref={smokeContainerRef}
            id="smoke-container"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 15,
            }}
          />

          {/* Statistics highlight cards */}
          <div
            ref={stat1Ref}
            id="stat-1"
            className="absolute shadow-2xl italic"
            style={{
              top: "9%",
              left: "46%",
              width: "max-content",
              padding: "48px 64px",
              borderRadius: "16px",
              backgroundColor: "#FFB3D1",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>58%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Increase in pick up point use
            </p>
          </div>

          <div
            ref={stat2Ref}
            id="stat-2"
            className="absolute shadow-2xl italic"
            style={{
              top: "9%",
              right: "8%",
              width: "max-content",
              padding: "48px 64px",
              borderRadius: "16px",
              backgroundColor: "#292929",
              color: "#fff",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>27%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Increase in pick up point use
            </p>
          </div>

          <div
            ref={stat3Ref}
            id="stat-3"
            className="absolute shadow-2xl italic"
            style={{
              bottom: "9%",
              left: "8%",
              width: "max-content",
              padding: "48px 64px",
              borderRadius: "16px",
              backgroundColor: "#62CAEE",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>23%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Decreased in customer phone calls
            </p>
          </div>

          <div
            ref={stat4Ref}
            id="stat-4"
            className="absolute shadow-2xl italic"
            style={{
              bottom: "9%",
              left: "36%",
              width: "max-content",
              padding: "48px 64px",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              color: "#111",
            }}
          >
            <p className="font-extrabold leading-none mb-2" style={{ fontSize: "3rem" }}>40%</p>
            <p className="text-sm font-medium leading-snug" style={{ opacity: 0.75 }}>
              Decreased in customer phone calls
            </p>
          </div>

          {/* Horizontal animated track band */}
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
            {/* Blue trail — scaleX animated 0→1 from left */}
            <div
              ref={greenTrailRef}
              id="green-trail"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "100%",
                backgroundColor: "#62CAEE",
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
                justifyContent: "flex-start",
                paddingLeft: "8vw",
                zIndex: 2,
                pointerEvents: "none",
              }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-oswald), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(4rem, 10vw, 10rem)",
                  backgroundImage: "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 4px, transparent 4px, transparent 7px)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  userSelect: "none",
                  transform: "skewX(-15deg)",
                }}
              >
                WELCOME ITZFIZZ
              </h1>
            </div>
          </div>

          {/* Hero subject entity */}
          <div
            ref={carRef}
            id="car"
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              width: "450px",
              zIndex: 20,
            }}
          >
            <CarImage style={{ width: "450px" }} />
          </div>
        </div>
      </div>


    </>
  );
}
