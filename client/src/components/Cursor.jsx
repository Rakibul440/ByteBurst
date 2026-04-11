import { useEffect, useRef, useState, useCallback } from "react";
import "./styles/cursor.css"
/**
 * DuneCursor — Cinematic DUNE-themed custom cursor
 *
 * USAGE:
 *   1. Drop <DuneCursor /> anywhere inside your app (once, near the root)
 *   2. Add data-dune-hover="true" on any element you want the cursor to react to
 *   3. Add data-dune-text="YOUR TEXT" to show a spice label on hover
 *
 * PROPS:
 *   color        — primary gold color       (default: "#C8891A")
 *   glowColor    — glow / trail color        (default: "#E8A020")
 *   trailLength  — number of sand particles  (default: 12)
 *   sandCount    — floating dust particles   (default: 18)
 */


// ─── Utility: lerp ───────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t;

// ─── Main Component ──────────────────────────────────────────
export default function Cursor({
  color = "#C8891A",
  glowColor = "#E8A020",
  trailLength = 12,
  sandCount = 18,
}) {
  const mouseRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);

  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const labelTextRef = useRef(null);
  const wormRef = useRef(null);
  const trailRefs = useRef([]);
  const trailHistory = useRef(Array(trailLength).fill({ x: -200, y: -200 }));

  const [ripples, setRipples] = useState([]);
  const [sandParticles, setSandParticles] = useState([]);
  const isHovering = useRef(false);
  const isIdle = useRef(false);

  // ── Spawn sand on move ────────────────────────────────────
  const spawnSand = useCallback((x, y) => {
    if (Math.random() > 0.3) return;
    const id = Math.random();
    const angle = Math.random() * Math.PI * 2;
    const dist = 15 + Math.random() * 25;
    setSandParticles(prev => [
      ...prev.slice(-sandCount),
      {
        id,
        x, y,
        size: 1 + Math.random() * 2,
        tx: `${Math.cos(angle) * dist}px`,
        ty: `${Math.sin(angle) * dist - 10}px`,
        dur: 0.6 + Math.random() * 0.6,
      },
    ]);
    setTimeout(() => setSandParticles(prev => prev.filter(p => p.id !== id)), 1200);
  }, [sandCount]);

  // ── Animation loop ────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const { x, y } = mouseRef.current;

      // Move core instantly
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }

      // Move label
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${x + 14}px, ${y - 28}px)`;
      }

      // Move worm indicator
      if (wormRef.current) {
        wormRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      }

      // Lerp ring
      ringPosRef.current.x = lerp(ringPosRef.current.x, x, 0.12);
      ringPosRef.current.y = lerp(ringPosRef.current.y, y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(calc(${ringPosRef.current.x}px - 50%), calc(${ringPosRef.current.y}px - 50%))`;
      }

      // Trail — shift history
      trailHistory.current = [{ x, y }, ...trailHistory.current.slice(0, trailLength - 1)];
      trailRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const pos = trailHistory.current[i] || { x: -200, y: -200 };
        const progress = i / trailLength;
        const size = Math.max(1, 5 * (1 - progress));
        dot.style.transform = `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${(1 - progress) * 0.5}`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [trailLength]);

  // ── Mouse events ──────────────────────────────────────────
  useEffect(() => {
    document.body.classList.add("dune-cursor-active");

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      spawnSand(e.clientX, e.clientY);

      // Reset idle
      isIdle.current = false;
      if (wormRef.current) wormRef.current.classList.remove("visible");
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        isIdle.current = true;
        if (wormRef.current) wormRef.current.classList.add("visible");
      }, 3000);

      // Detect hover targets
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hoverEl = el?.closest("[data-dune-hover]");
      const duneText = el?.closest("[data-dune-text]")?.dataset?.duneText;

      const wasHovering = isHovering.current;
      isHovering.current = !!hoverEl;

      if (coreRef.current) coreRef.current.classList.toggle("is-hovering", isHovering.current);
      if (ringRef.current) ringRef.current.classList.toggle("is-hovering", isHovering.current);

      // Label
      if (labelRef.current && labelTextRef.current) {
        if (duneText) {
          labelTextRef.current.textContent = duneText;
          labelRef.current.classList.add("visible");
        } else {
          labelRef.current.classList.remove("visible");
        }
      }
    };

    const onClick = (e) => {
      const id = Date.now();
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.body.classList.remove("dune-cursor-active");
      clearTimeout(idleTimerRef.current);
    };
  }, [spawnSand]);

  const cssVars = {
    "--dc-gold": color,
    "--dc-amber": glowColor,
  };

  return (
    <>
      {/* <style>{STYLES}</style> */}

      <div className="dune-cursor-root" style={cssVars}>

        {/* Core crosshair */}
        <div ref={coreRef} className="dc-core">
          <div className="dc-arm dc-arm-h" />
          <div className="dc-arm dc-arm-v" />
          <div className="dc-core-inner" />
          <div className="dc-core-dot" />
        </div>

        {/* Orbit ring */}
        <div ref={ringRef} className="dc-ring">
          <div className="dc-ring-tick" />
          <div className="dc-ring-tick" />
          <div className="dc-ring-tick" />
          <div className="dc-ring-tick" />
        </div>

        {/* Spice label */}
        <div ref={labelRef} className="dc-label">
          <div className="dc-label-inner">
            <span ref={labelTextRef} />
          </div>
        </div>

        {/* Trail */}
        {Array.from({ length: trailLength }).map((_, i) => (
          <div
            key={i}
            ref={el => (trailRefs.current[i] = el)}
            className="dc-trail-dot"
            style={{
              background: i < 3 ? glowColor : color,
              boxShadow: i < 3 ? `0 0 4px ${glowColor}` : "none",
            }}
          />
        ))}

        {/* Sand particles */}
        {sandParticles.map(p => (
          <div
            key={p.id}
            className="dc-sand"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              "--tx": p.tx,
              "--ty": p.ty,
              animation: `dc-sand-float ${p.dur}s ease-out forwards`,
            }}
          />
        ))}

        {/* Click ripples */}
        {ripples.map(r => (
          <div
            key={r.id}
            className="dc-ripple"
            style={{ left: r.x, top: r.y }}
          />
        ))}

        {/* Idle worm pulse */}
        <div ref={wormRef} className="dc-worm">
          <div className="dc-worm-ring" />
          <div className="dc-worm-ring" />
          <div className="dc-worm-ring" />
        </div>

      </div>
    </>
  );
}