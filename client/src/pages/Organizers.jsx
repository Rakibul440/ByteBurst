import { useState } from "react";
import "./styles/team.css"
import { ORGANIZERS } from "../assets/data/data";
import { MemberCard } from "../components/MemberCard";
import { toast } from "sonner";


/* ─── DUNE Quotes for the page ───────────────────────────── */
const TEAM_QUOTES = [
  {
    q: "They were not assembled. They were summoned — by purpose older than any name, by a desert that chooses its own.",
    attr: "— Fremen Oral Canon, The Sayings of Shai-Hulud",
  },
  {
    q: "Prophecy does not name a single warrior. It names the bloodline — every soul who refused to break, across a thousand forgotten years.",
    attr: "— Bene Gesserit Codex, Rite of Passage",
  },
  {
    q: "The Lords do not rise because the world made room. They rise because the world had no choice but to kneel.",
    attr: "— Reverend Mother Gaius Helen Mohiam, Recorded Address",
  }
];

export default function OrganizersPage() {
  return (
    <div className="tm-root">
      {/* <style>{CSS}</style> */}

      {/* ── Hero Banner ── */}
      <section className="tm-hero">
        <div className="tm-hero-glow"/>
        <div className="tm-hero-grain"/>

        <span className="tm-hero-eyebrow">⟁ &nbsp; THE MUAD'DIB LINEAGE &nbsp; ⟁</span>
        <h1 className="tm-hero-title">The Lords</h1>
        <p className="tm-hero-sub">Written in Sand Before Time Had a Name</p>

        <div className="tm-orn">
          <div className="tm-orn-line"/>
          <div className="tm-orn-gem"/>
          <div className="tm-orn-line r"/>
        </div>

        <p className="tm-hero-quote">
          "Prophecy is not destiny — it is the weight of every ancestor who refused to kneel."
        </p>
        <span className="tm-hero-quote-attr">— Fremen Oral Canon, The Sayings of Shai-Hulud</span>
      </section>

      {/* ── Team Grid ── */}
      <section className="tm-grid-section">
        <div className="tm-grid">
          {ORGANIZERS.map((m, i) => (
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
          Walk Among <span>The Chosen.</span>
        </h2>
        <p className="tm-closing-sub">
          "No one stands alone on Arrakis. Join the house. Shape the saga."
        </p>
        <button className="tm-join-btn" onClick={()=>{toast.message("You can't be a GOD like US!")}}>Seek Passage &nbsp;→</button>
      </section>

    </div>
  );
}