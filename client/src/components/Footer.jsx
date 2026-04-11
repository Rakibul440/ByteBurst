import { useState, useEffect, useRef } from "react";
import "./styles/footer.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Footer Component
   DUNE Cinematic Theme · Reusable · No Navbar · No Cursor
   All CSS prefixed  ft-  (zero conflicts)

   ─── PROPS ───────────────────────────────────────────────
   <DuneFooter
     onNavigate={(href) => navigate(href)}   ← optional
     year={2025}                              ← optional, defaults current
     collegeName="Your College Name"          ← optional
   />
═══════════════════════════════════════════════════════════ */

/* ─── Nav Links ─────────────────────────────────────────── */
const NAV_COLS = [
  {
    heading: "The Trials",
    duneHead: "Events",
    links: [
      { label: "Tech Exhibition",     duneLabel: "The Grand Bazaar",      href: "#events" },
      { label: "Hackathon",           duneLabel: "24-Hour Stillsuit",      href: "#events" },
      { label: "Code-A-Thon",         duneLabel: "Worm Rider's Sprint",    href: "#events" },
      { label: "CSS Warriors",        duneLabel: "Shapers of the Dune",    href: "#events" },
      { label: "Bug Bounty",          duneLabel: "Hunt Across the Code",   href: "#events" },
      { label: "Prompt Engineering",  duneLabel: "The Voice of Command",   href: "#events" },
    ],
  },
  {
    heading: "The Saga",
    duneHead: "Navigate",
    links: [
      { label: "Home",       duneLabel: "Enter the Desert",      href: "#home" },
      { label: "About",      duneLabel: "The Lore",              href: "#about" },
      { label: "Events",     duneLabel: "The Trials",            href: "#events" },
      { label: "Team",       duneLabel: "The House",             href: "#team" },
      { label: "Prizes",     duneLabel: "The Spice Rewards",     href: "#prizes" },
      { label: "Register",   duneLabel: "Seek Passage",          href: "#register" },
    ],
  },
  {
    heading: "The Signal",
    duneHead: "Contact",
    links: [
      { label: "Instagram",   duneLabel: "The Vision Channel",    href: "#",     icon: "IG" },
      { label: "LinkedIn",    duneLabel: "The Alliance Network",  href: "#",     icon: "LI" },
      { label: "WhatsApp",    duneLabel: "Spice Transmission",    href: "#",     icon: "WA" },
      { label: "Email Us",    duneLabel: "The Written Scroll",    href: "mailto:byteburst@college.edu", icon: "✉" },
    ],
  },
];

/* ─── Cycling Quotes ────────────────────────────────────── */
const FOOTER_QUOTES = [
  { text: "The code must flow.", attr: "— First Law of Arrakis" },
  { text: "He who controls the algorithm controls the universe.", attr: "— House Atreides Doctrine" },
  { text: "I must not fear the deadline. The deadline is the mind-killer.", attr: "— Litany Against the Bug" },
  { text: "Walk without rhythm — and the worm will not find you.", attr: "— Fremen Proverb" },
  { text: "Without change, something sleeps inside us and seldom awakens.", attr: "— Duke Leto Atreides" },
  { text: "The mystery of life is not a problem to solve, but a reality to build.", attr: "— Bene Gesserit Tech Codex" },
  { text: "A beginning is a very delicate time. So is a deployment.", attr: "— Princess Irulan's Dev Diary" },
  { text: "Deep in the human unconscious is a need for a logical universe.", attr: "— Guild Navigator's Log" },
];

/* ─── Social Icons ─────────────────────────────────────── */
const SocialIcons = {
  IG: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  LI: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  WA: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  "✉": () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  ),
};


/* ─── Ridge SVG ─────────────────────────────────────────── */
const FooterRidge = () => (
  <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{height:"90px"}}>
    <defs>
      <linearGradient id="ftg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8891A" stopOpacity=".0"/>
        <stop offset="100%" stopColor="#0A0804" stopOpacity=".95"/>
      </linearGradient>
    </defs>
    <path d="M0,30 C180,60 360,10 540,45 C720,80 900,15 1080,50 C1260,82 1380,25 1440,40 L1440,90 L0,90 Z"
      fill="url(#ftg1)"/>
    <path d="M0,30 C180,60 360,10 540,45 C720,80 900,15 1080,50 C1260,82 1380,25 1440,40"
      fill="none" stroke="#C8891A" strokeWidth=".8" opacity=".18"/>
  </svg>
);

/* ─── Link list component ───────────────────────────────── */
function FooterLinkList({ col, onNavigate }) {
  return (
    <div>
      <div className="ft-col-head">
        <span className="ft-col-gem"/>
        {col.heading}
      </div>
      <div className="ft-col-dune">{col.duneHead}</div>
      <div className="ft-link-list">
        {col.links.map((lk, i) => {
          const IconEl = lk.icon && SocialIcons[lk.icon];
          return (
            <a
              key={i}
              href={lk.href}
              className="ft-link-item"
              onClick={e => { if (onNavigate) { e.preventDefault(); onNavigate(lk.href); } }}
            >
              <div className="ft-link-icon">
                {IconEl ? <IconEl/> : "⟁"}
              </div>
              <div className="ft-link-labels">
                <span className="ft-link-main">{lk.label}</span>
                <span className="ft-link-dune">{lk.duneLabel}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Cycling Quote ─────────────────────────────────────── */
function CyclingQuote() {
  const [idx,    setIdx]    = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % FOOTER_QUOTES.length); setFading(false); }, 650);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const q = FOOTER_QUOTES[idx];
  return (
    <div className="ft-quote-block">
      <span className="ft-qt-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
      <div className={fading ? "ft-qt-fading" : ""}>
        <p className="ft-qt-text">"{q.text}"</p>
        <p className="ft-qt-attr">{q.attr}</p>
      </div>
      <div className="ft-qt-dots">
        {FOOTER_QUOTES.map((_, i) => (
          <div
            key={i}
            className={`ft-qt-dot${i === idx ? " active" : ""}`}
            onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 400); }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function Footer({
  onNavigate  = null,
  year        = new Date().getFullYear(),
  collegeName = "Cooch Behar Government Engineering College",
}) {
  const SOCIAL_LINKS = [
    { href:"#", label:"Instagram",  IconEl: SocialIcons.IG },
    { href:"#", label:"LinkedIn",   IconEl: SocialIcons.LI },
    { href:"#", label:"WhatsApp",   IconEl: SocialIcons.WA },
    { href:"mailto:byteburst@college.edu", label:"Email", IconEl: SocialIcons["✉"] },
  ];

  return (
    <footer className="ft-root">

      {/* ── Grain ── */}
      <div className="ft-grain"/>
      <div className="ft-glow"/>

      {/* ── Dune Ridge ── */}
      <div className="ft-ridge"><FooterRidge/></div>

      {/* ── Scrolling quote marquee ── */}
      <div className="ft-marquee-wrap">
        <div className="ft-marquee-track">
          {/* Duplicate for seamless loop */}
          {[...FOOTER_QUOTES, ...FOOTER_QUOTES].map((q, i) => (
            <span key={i} className="ft-marquee-item">
              <span className="ft-marquee-gem"/>
              {q.text}
              <span className="ft-marquee-gem"/>
            </span>
          ))}
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="ft-body">

        {/* ── Top: Logo + Quote ── */}
        <div className="ft-top">

          {/* Logo block */}
          <div className="ft-logo-block">
            <span className="ft-logo-sigil">⟁ &nbsp; A Tech Saga &nbsp; ⟁</span>
            <span className="ft-logo-byte">Byte</span>
            <span className="ft-logo-burst">Burst</span>
            <p className="ft-logo-chapter">Chapter III &nbsp;·&nbsp; {collegeName}</p>
            <p className="ft-logo-desc">
              "From the depths of the desert, we forge the architects of tomorrow.
              ByteBurst is not a festival. It is a rite of passage carved in sand and code."
            </p>
            <div className="ft-socials">
              {SOCIAL_LINKS.map((s, i) => (
                <a key={i} href={s.href} className="ft-social" aria-label={s.label} target="_blank" rel="noreferrer">
                  <s.IconEl/>
                </a>
              ))}
            </div>
          </div>

          {/* Cycling quote */}
          <CyclingQuote/>
        </div>

        {/* ── Navigation columns ── */}
        <div className="ft-links-grid">
          {NAV_COLS.map((col, i) => (
            <FooterLinkList key={i} col={col} onNavigate={onNavigate}/>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-bottom-left">
            © {year} <span>ByteBurst</span> — All rights reserved.
            Forged in the desert of {collegeName}.
          </p>
          <div className="ft-bottom-center">
            <div className="ft-bottom-gem"/>
            <div className="ft-bottom-sep"/>
            <a href="#" className="ft-bottom-link">Privacy</a>
            <div className="ft-bottom-sep"/>
            <a href="#" className="ft-bottom-link">Terms</a>
            <div className="ft-bottom-sep"/>
            <a href="#" className="ft-bottom-link">Contact</a>
            <div className="ft-bottom-sep"/>
            <div className="ft-bottom-gem"/>
          </div>
          <p className="ft-bottom-right">⟁ &nbsp; The Spice Must Flow &nbsp; ⟁</p>
        </div>

      </div>

      {/* ── Epilogue strip ── */}
      <div className="ft-epilogue">
        <p className="ft-epilogue-text">
          "The <em>desert</em> remembers every coder who walked its sands.
          &nbsp;·&nbsp; Built with melange by the <em>ByteBurst</em> organising committee.
          &nbsp;·&nbsp; <em>Chapter III</em> — The saga continues."
        </p>
      </div>

    </footer>
  );
}