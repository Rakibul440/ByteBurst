import { useState, useEffect, useRef } from "react";
import "./styles/about.css"
import ByteBurstIMG from "../assets/img/BYTEBURST-III.jpg"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — About Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS prefixed  ab-  (zero conflicts)

   ─── PROPS ───────────────────────────────────────────────
   <AboutPage
     heroImage="https://your-image-url.jpg"   ← 3:2 ratio image
     data={ABOUT_DATA}                         ← optional override
   />
═══════════════════════════════════════════════════════════ */

/* ─── Page Data ──────────────────────────────────────────── */
const ABOUT_DATA = {
  collegeName: "Cooch Behar Government Engineering College",
  collegeShort: "CGEC",
  edition: "Chapter III",
  year: "2026",

  /* ── Intro paragraphs ── */
  intro: [
    "ByteBurst is not a festival. It is a rite of passage — a proving ground carved from code, creativity, and the relentless will to build. Born from the collective vision of students who refused to accept ordinary, ByteBurst has evolved over three chapters into the most anticipated technical spectacle of the academic calendar.",
    "From the first line of code written in Chapter I to the ambitious architectures of Chapter III, every edition has pushed the boundary of what student-led innovation looks like. The desert of technical knowledge is vast. ByteBurst hands you a stillsuit and says: walk.",
  ],

  /* ── Vision & Mission ── */
  vision: "To forge a generation of builders who see not the problem before them, but the civilisation they will build after solving it.",
  mission: "To create an arena where raw talent meets structured challenge — where the worthy are elevated, the curious are transformed, and the bold are remembered.",

  /* ── Stats ── */
  stats: [
    { num: "3",    label: "Chapters",      dune: "Sagas Written"   },
    { num: "300+", label: "Participants",  dune: "Desert Walkers"  },
    { num: "12",   label: "Events",        dune: "Trials of Arrakis"},
    { num: "12h",  label: "Hackathon",     dune: "The Stillsuit"   },
  ],

  /* ── Core values ── */
  values: [
    {
      icon: "⟁",
      title: "Innovation",
      duneTitle: "The Prescient Mind",
      desc: "We do not celebrate answers that already exist. We celebrate the question no one dared ask — and the person brave enough to answer it.",
    },
    {
      icon: "✦",
      title: "Collaboration",
      duneTitle: "The Sietch Spirit",
      desc: "The desert kills the solitary. The sietch survives. ByteBurst is built on the conviction that the best work is done shoulder-to-shoulder.",
    },
    {
      icon: "◈",
      title: "Excellence",
      duneTitle: "The Fedaykin Standard",
      desc: "We hold our events, our participants, and ourselves to the highest standard. Mediocrity is not permitted. The desert has no patience for it.",
    },
    {
      icon: "❋",
      title: "Inclusion",
      duneTitle: "The Open Sietch",
      desc: "Every house, every department, every year — all are welcome here. The desert belongs to those who learn to walk it, not those born near it.",
    },
    {
      icon: "⬡",
      title: "Impact",
      duneTitle: "The Spice Trail",
      desc: "A solution that helps no one is a weapon pointed at nothing. Every project, every event, every team must build with impact in their vision.",
    },
    {
      icon: "◉",
      title: "Growth",
      duneTitle: "The Navigator's Path",
      desc: "We believe the person who leaves ByteBurst should be unrecognisable from the one who arrived. Transformation is the only acceptable outcome.",
    },
  ],

  /* ── Chapter history ── */
  chapters: [
    {
      num: "I",
      year: "2024",
      title: "The Awakening",
      desc: "The first step across the sand. ByteBurst Chapter I brought together 180 participants across 6 events, establishing a tradition of excellence that would define the chapters to come. The desert had its first name.",
      highlight: "180 Participants · 6 Events · First Edition",
    },
    {
      num: "II",
      year: "2025",
      title: "The Rising Dune",
      desc: "Chapter II doubled the scale and tripled the ambition. 320 participants, 8 events, and the first-ever hackathon that ran through the night — a trial by fire that produced projects of genuine quality.",
      highlight: "320 Participants · 8 Events · First Hackathon",
    },
    {
      num: "III",
      year: "2026",
      title: "The Saga Continues",
      desc: "Chapter III is the culmination. 10 events. 500+ participants. Industry collaboration. A 24-hour hackathon with real problem statements. ByteBurst has stopped being a college festival — it has become a movement.",
      highlight: "500+ Participants · 10 Events · Industry Collab",
      active: true,
    },
  ],

  /* ── Quotes throughout page ── */
  quotes: [
    {
      text: "ByteBurst did not begin as a festival. It began as a refusal — a refusal to let talent go unseen, potential go untested, and ambition go unrewarded.",
      attr: "— ByteBurst Founding Committee, Chapter I",
    },
    {
      text: "The desert tests everyone equally. It does not care about your CGPA, your branch, or your background. It cares only about what you build when no one is watching.",
      attr: "— ByteBurst Manifesto, Verse III",
    },
    {
      text: "Three chapters. One truth. The best engineers are not made in classrooms. They are forged in the crucible of a 24-hour deadline, a problem with no clear solution, and a team that refuses to give up.",
      attr: "— ByteBurst Chapter III Opening Address",
    },
  ],
};


/* ─── Section wrapper ────────────────────────────────────── */
function AbSection({ eyebrow, title, dune, children, style }) {
  return (
    <div className="ab-section" style={style}>
      <div className="ab-sec-corner tl"/><div className="ab-sec-corner tr"/>
      <div className="ab-sec-corner bl"/><div className="ab-sec-corner br"/>
      <div className="ab-sec-pad">
        <div className="ab-sec-head">
          {eyebrow && <span className="ab-sec-eyebrow">⟁ &nbsp; {eyebrow}</span>}
          {title   && <h2 className="ab-sec-title">{title}</h2>}
          {dune    && <p className="ab-sec-dune">{dune}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function AboutPage({
  heroImage = ByteBurstIMG,
  data = ABOUT_DATA,
  onExplore   = () => {},
  onRegister  = () => {},
}) {
  const d = { ...ABOUT_DATA, ...data };

  return (
    <div className="ab-root">

      {/* ════ HERO TEXT ════ */}
      <section className="ab-hero">
        <div className="ab-hero-bg"/><div className="ab-hero-grain"/>

        <div className="ab-hero-text">
          <span className="ab-hero-eyebrow">
            ⟁ &nbsp; {d.collegeName} &nbsp;·&nbsp; {d.year} &nbsp; ⟁
          </span>
          <h1 className="ab-hero-title">About</h1>
          <p className="ab-hero-dune">The Lore of the Desert</p>
          <p className="ab-hero-sub">
            "Every legend begins with a question no one dared ask."
          </p>
          <div className="ab-hero-orn">
            <div className="ab-orn-line"/>
            <div className="ab-orn-gem"/>
            <div className="ab-orn-line r"/>
          </div>
        </div>

        {/* ════ HERO IMAGE 3:2 ════ */}
        <div className="ab-img-wrap">
          <img
            src={heroImage}
            alt="ByteBurst Chapter III"
            className="ab-hero-img"
            onError={e => {
              e.target.src = "https://placehold.co/1100x733/0E0C08/C8891A?text=ByteBurst+Chapter+III";
            }}
          />
          {/* Vignette overlays */}
          <div className="ab-img-overlay-top"/>
          <div className="ab-img-overlay-bottom"/>
          <div className="ab-img-overlay-sides"/>
          {/* Corner ornaments */}
          <div className="ab-img-corner ab-img-c-tl"/>
          <div className="ab-img-corner ab-img-c-tr"/>
          <div className="ab-img-corner ab-img-c-bl"/>
          <div className="ab-img-corner ab-img-c-br"/>
          {/* Caption */}
          <div className="ab-img-caption">
            <span className="ab-img-cap-text">
              ByteBurst &nbsp;·&nbsp; {d.edition} &nbsp;·&nbsp; {d.collegeName}
            </span>
          </div>
        </div>
        {/* Fade image into page */}
        <div className="ab-img-fade-out"/>
      </section>

      <div className="ab-body">

        {/* ════ INTRO + VISION/MISSION ════ */}
        <AbSection
          eyebrow="The Origin"
          title="What is ByteBurst?"
          dune="A rite of passage carved from code, creativity, and conviction."
        >
          <div className="ab-intro-grid">
            <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
              {d.intro.map((p, i) => (
                <p key={i} className="ab-intro-para">{p}</p>
              ))}
            </div>
            <div className="ab-vm-pair">
              <div className="ab-vm-block">
                <span className="ab-vm-label">
                  <span className="ab-vm-gem"/>
                  Our Vision
                </span>
                <p className="ab-vm-text">{d.vision}</p>
              </div>
              <div className="ab-vm-block">
                <span className="ab-vm-label">
                  <span className="ab-vm-gem"/>
                  Our Mission
                </span>
                <p className="ab-vm-text">{d.mission}</p>
              </div>
            </div>
          </div>
        </AbSection>

        {/* ════ STATS BAR ════ */}
        <div className="ab-stats-bar">
          {d.stats.map((s, i) => (
            <div key={i} className="ab-stat-block">
              <span className="ab-stat-num">{s.num}</span>
              <span className="ab-stat-label">{s.label}</span>
              <span className="ab-stat-dune">{s.dune}</span>
            </div>
          ))}
        </div>

        {/* ════ QUOTE BAND 1 ════ */}
        <div className="ab-qband">
          <span className="ab-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ab-qband-text">"{d.quotes[0].text}"</p>
          <span className="ab-qband-attr">{d.quotes[0].attr}</span>
        </div>

        {/* ════ CORE VALUES ════ */}
        <AbSection
          eyebrow="The Pillars"
          title="Core Values"
          dune="Six truths the desert taught us."
        >
          <div className="ab-values-grid">
            {d.values.map((v, i) => (
              <div key={i} className="ab-value-card">
                <div className="ab-value-glow"/>
                <span className="ab-value-icon">{v.icon}</span>
                <span className="ab-value-title">{v.title}</span>
                <span className="ab-value-dune">{v.duneTitle}</span>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </AbSection>

        {/* ════ QUOTE BAND 2 ════ */}
        <div className="ab-qband">
          <span className="ab-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ab-qband-text">"{d.quotes[1].text}"</p>
          <span className="ab-qband-attr">{d.quotes[1].attr}</span>
        </div>

        {/* ════ CHAPTER HISTORY ════ */}
        <AbSection
          eyebrow="The Chronicle"
          title="Our Journey"
          dune="Three chapters. One relentless movement."
        >
          <div className="ab-chapters">
            {d.chapters.map((ch, i) => (
              <div key={i} className={`ab-chapter-item${ch.active ? " active" : ""}`}>
                <div className="ab-chapter-left">
                  <span className="ab-chapter-roman">{ch.num}</span>
                  <span className="ab-chapter-year">{ch.year}</span>
                </div>
                <div className="ab-chapter-right">
                  {ch.active && (
                    <span className="ab-chapter-badge">
                      <span className="ab-chapter-badge-dot"/>
                      Current Edition
                    </span>
                  )}
                  <span className="ab-chapter-title">{ch.title}</span>
                  <p className="ab-chapter-desc">{ch.desc}</p>
                  <span className="ab-chapter-highlight">{ch.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </AbSection>

        {/* ════ MANIFESTO ════ */}
        <div className="ab-section ab-manifesto" style={{border:"1px solid #3D2E1A"}}>
          <div className="ab-manifesto-bg"/>
          <div className="ab-manifesto-corners">
            <div className="ab-mc tl"/><div className="ab-mc tr"/>
            <div className="ab-mc bl"/><div className="ab-mc br"/>
          </div>
          <span className="ab-manifesto-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ab-manifesto-text">
            "The <em>desert</em> of mediocrity stretches endlessly for those who wait.
            But those who <em>rise</em> before dawn, sharpen their craft in silence,
            and walk boldly into the open sand — they do not merely survive <em>Arrakis</em>.
            They <em>become</em> it."
          </p>
          <span className="ab-manifesto-attr">— The ByteBurst Manifesto, Chapter III</span>
        </div>

        {/* ════ QUOTE BAND 3 ════ */}
        <div className="ab-qband">
          <span className="ab-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ab-qband-text">"{d.quotes[2].text}"</p>
          <span className="ab-qband-attr">{d.quotes[2].attr}</span>
        </div>

      </div>

      {/* ════ CTA ════ */}
      <section className="ab-cta">
        <div className="ab-cta-bg"/>
        <span className="ab-cta-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="ab-cta-title">
          Walk the <span>Desert.</span>
        </h2>
        <p className="ab-cta-sub">
          "The saga is written. Your chapter has not begun yet."
        </p>
        <div className="ab-cta-btns">
          <button className="ab-btn-primary" onClick={onRegister}>
            Seek Passage &nbsp;→
          </button>
          <button className="ab-btn-ghost" onClick={onExplore}>
            Explore Events
          </button>
        </div>
      </section>

    </div>
  );
}