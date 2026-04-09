"use client";

/**
 * Renders the Bugatti top-view PNG which already has its background removed.
 * No canvas manipulation needed — the image is a clean transparent PNG.
 */
export default function CarImage({ style }: { style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/car-animation-scroller/bugatti-top-view-removebg-preview.png"
      alt="Bugatti supercar top-down view"
      style={{
        display: "block",
        /* no flip — car naturally faces the direction of travel (right) */
        transform: "none",
        filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.65))",
        ...style,
      }}
    />
  );
}
