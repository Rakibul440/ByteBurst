import { useState } from "react";
import "./styles/team.css"
import { MEMBERS } from "../assets/data/data";
import { MemberCard } from "../components/MemberCard";
import { toast } from "sonner";


/* ─── DUNE Quotes for the page ───────────────────────────── */
const TEAM_QUOTES = [
  {
    q: "A team is not a collection of minds. It is a single mind, sharded across many bodies.",
    attr: "— Bene Gesserit Sisterhood Codex",
  },
  {
    q: "The strength of a house is not its walls but the loyalty of those who walk within them.",
    attr: "— House Atreides, First Principle",
  },
  {
    q: "No one stands alone on Arrakis. The desert kills the solitary. The sietch survives.",
    attr: "— Fremen Oral Tradition",
  },
];

export default function TeamPage() {
  return (
    <div className="tm-root">
      {/* <style>{CSS}</style> */}

      {/* ── Hero Banner ── */}
      <section className="tm-hero">
        <div className="tm-hero-glow"/>
        <div className="tm-hero-grain"/>

        <span className="tm-hero-eyebrow">⟁ &nbsp; The Desert Walkers &nbsp; ⟁</span>
        <h1 className="tm-hero-title">The House</h1>
        <p className="tm-hero-sub">Those Who Shape the Saga</p>

        <div className="tm-orn">
          <div className="tm-orn-line"/>
          <div className="tm-orn-gem"/>
          <div className="tm-orn-line r"/>
        </div>

        <p className="tm-hero-quote">
          "They did not choose the desert. The desert chose them — and found them worthy."
        </p>
        <span className="tm-hero-quote-attr">— Fremen Oral Tradition, Third Age</span>
      </section>

      {/* ── Team Grid ── */}
      <section className="tm-grid-section">
        <div className="tm-grid">
          {MEMBERS.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </section>

      {/* ── Quote Band 1 ── */}
      <div className="tm-quote-band">
        <span className="tm-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <p className="tm-qb-text">
          "{TEAM_QUOTES[0].q}"
        </p>
        <span className="tm-qb-attr">{TEAM_QUOTES[0].attr}</span>
      </div>

      {/* ── Quote Band 2 ── */}
      <div className="tm-quote-band" style={{ paddingTop:"1.5rem" }}>
        <p className="tm-qb-text">"{TEAM_QUOTES[1].q}"</p>
        <span className="tm-qb-attr">{TEAM_QUOTES[1].attr}</span>
      </div>

      {/* ── Quote Band 3 ── */}
      <div className="tm-quote-band" style={{ paddingTop:"1.5rem" }}>
        <p className="tm-qb-text">"{TEAM_QUOTES[2].q}"</p>
        <span className="tm-qb-attr">{TEAM_QUOTES[2].attr}</span>
      </div>

      {/* ── Closing CTA ── */}
      <section className="tm-closing">
        <div className="tm-closing-bg"/>
        <span className="tm-closing-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="tm-closing-title">
          The Desert Has  <span>Named You.</span>
        </h2>
        <p className="tm-closing-sub">
          "Prophecy does not ask permission. It arrives — and the worthy answer."

        </p>
        <button className="tm-join-btn" onClick={()=>toast.message("You'er not the worthy one!")}>Answer The Call &nbsp;→</button>
      </section>

    </div>
  );
}