import { useState } from "react";
import "./styles/event.css"
import { Link } from "react-router-dom";
import BugBountyPoster from "../assets/img/BugBountyPoster.png"
import PromtEngineeringPoster from "../assets/img/PromtEngineeringPoster.png"
import CodeAThonPoster from "../assets/img/Code-A-ThonPoster.png"
import CSSWarriorPoster from "../assets/img/CSSWarriorPoster.png"
import TechnoCOm from "../assets/img/TechnoCommercialPoster.png"
import TechExhibitionPoster from "../assets/img/TechExhibitionPoster.png"
import Autocad2DCE from "../assets/img/Autocad2DCE.png"
import Graphics from "../assets/img/Graphics.jpeg"



/* ═══════════════════════════════════════════════════════════
   ByteBurst — Events Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS classes prefixed  ev-  (zero conflicts)
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   EVENTS DATA
   → Replace `poster` with your actual 5:7 image URL
   → `registerLink` → your Google Form / registration URL
   → Edit `details` array (tag-style info rows)
───────────────────────────────────────────────────────── */
const EVENTS = [

    {
    id: 1,
    name: "Tech Exhibition",
    duneTitle: "The Grand Bazaar of Arrakis",
    sigil: "⟁",
    category: "Exhibition",
    poster: TechExhibitionPoster,
    tagline: "Display what the desert forged within you.",
    quote: "Every invention begins as a whisper in the dark. Here, you shout it to the stars.",
    quoteAttr: "— Guild Navigator's Codex",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual / Team" },
      { icon: "◈", label: "Duration", value: "Full Day" },
      { icon: "◈", label: "Round",    value: "Single Presentation" },
      { icon: "◈", label: "Prize",    value: "Spice of Glory" },
    ],
    desc: "Unveil your innovations before the council of the sietch. From hardware prototypes to software marvels — if you built it, the desert shall witness it.",
    registerLink: "TechExhibition/e3",
  },
  {
    id: 8,
    name: "Prompt Engineering",
    duneTitle: "The Voice of Command",
    sigil: "◈",
    category: "AI",
    poster: PromtEngineeringPoster,
    tagline: "Speak precisely. The machine bends to those who know the words.",
    quote: "The Bene Gesserit used the Voice to command. You use the prompt. The principle is the same.",
    quoteAttr: "— Reverend Mother Gaius Helen Mohiam, AI Edition",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual" },
      { icon: "◈", label: "Duration", value: "90 Minutes" },
      { icon: "◈", label: "Tools",    value: "GPT-4 / Gemini" },
      { icon: "◈", label: "Judged",   value: "Output Quality" },
    ],
    desc: "Craft prompts that extract the impossible from large language models. The one who bends the machine most elegantly — using fewest words to greatest effect — earns mastery.",
    registerLink: "PromptEngineering/e8",
  },
  {
    id: 2,
    name: "Graphics Design",
    duneTitle: "The Vision Weavers' Trial",
    sigil: "✦",
    category: "Creative",
    poster: Graphics,
    tagline: "Shape perception. Bend light. Command the eye.",
    quote: "The Fremen drew maps with charcoal on stone. You draw worlds with light itself.",
    quoteAttr: "— Bene Gesserit Art Doctrine",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual" },
      { icon: "◈", label: "Duration", value: "3 Hours" },
      { icon: "◈", label: "Tools",    value: "PS / AI / Figma" },
      { icon: "◈", label: "Theme",    value: "Revealed on Day" },
    ],
    desc: "Receive the theme at dawn and conjure a masterpiece before sunset. The one whose design silences the room shall be named keeper of the visual arts.",
    registerLink: "GraphicsDesign/e2",
  },
  {
    id: 3,
    name: "Tech & Apti Quiz",
    duneTitle: "Trial of the Mentat Mind",
    sigil: "◉",
    category: "Quiz",
    poster: "https://placehold.co/500x700/0E0C08/C8891A?text=Tech+%26+Apti+Quiz",
    tagline: "The sharpest blade in the desert is a trained mind.",
    quote: "A Mentat does not guess. A Mentat calculates, deduces, and knows.",
    quoteAttr: "— Mentat School of Ix, Primary Axiom",
    details: [
      { icon: "◈", label: "Mode",     value: "Team of 2" },
      { icon: "◈", label: "Rounds",   value: "3 Elimination Rounds" },
      { icon: "◈", label: "Topics",   value: "CS · Aptitude · GK" },
      { icon: "◈", label: "Format",   value: "MCQ + Rapid Fire" },
    ],
    desc: "Three rounds of ruthless elimination. The unprepared fall in the first. Only the sharpest Mentats advance to the final chamber of knowledge.",
    registerLink: "TechAptiQuiz/e5",
  },
  {
    id: 4,
    name: "Autocad ME / CE",
    duneTitle: "Architecture of the Sietch",
    sigil: "⬡",
    category: "Design",
    poster: Autocad2DCE,
    tagline: "Engineer the impossible. Draft the eternal.",
    quote: "The Fremen built Sietch Tabr not with faith alone, but with precision and geometry.",
    quoteAttr: "— Stilgar's Field Notes on Architecture",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual" },
      { icon: "◈", label: "Duration", value: "2.5 Hours" },
      { icon: "◈", label: "Software", value: "AutoCAD 2024" },
      { icon: "◈", label: "Branch",   value: "ME & CE Tracks" },
    ],
    desc: "Receive your engineering brief and render a design that would make the desert engineers weep with admiration. Precision is the weapon. AutoCAD is the blade.",
    registerLink: "autocad/e6",
  },
  {
    id: 5,
    name: "Techno Commercial",
    duneTitle: "The Spice Merchant's Gauntlet",
    sigil: "❋",
    category: "Business",
    poster: TechnoCOm,
    tagline: "Sell the idea. Command the market. Rule the spice.",
    quote: "He who controls the spice controls the universe — but first, he must convince the council.",
    quoteAttr: "— CHOAM Trading Doctrine, Article I",
    details: [
      { icon: "◈", label: "Mode",     value: "Team of 2–3" },
      { icon: "◈", label: "Rounds",   value: "Pitch + Q&A" },
      { icon: "◈", label: "Focus",    value: "Tech Business Case" },
      { icon: "◈", label: "Duration", value: "10 Min Pitch" },
    ],
    desc: "Blend technical depth with commercial cunning. Present a tech-business solution to the council. The strongest pitch — not the loudest voice — claims the throne.",
    registerLink: "TechnoCommercial/e1",
  },
  {
    id: 6,
    name: "Code-A-Thon",
    duneTitle: "The Worm Rider's Sprint",
    sigil: "⟁",
    category: "Coding",
    poster: CodeAThonPoster,
    tagline: "Ride the worm. Solve the storm. Be the last standing.",
    quote: "The sandworm does not wait for the rider to be ready. Neither does the problem set.",
    quoteAttr: "— Fedaykin Combat Code Manual",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual" },
      { icon: "◈", label: "Duration", value: "2 Hours" },
      { icon: "◈", label: "Platform", value: "HackerRank / Custom" },
      { icon: "◈", label: "Language", value: "Any" },
    ],
    desc: "A relentless sprint of algorithmic problems. Speed matters. Accuracy commands respect. The coder who rides every problem without falling shall be named Champion of the Code.",
    registerLink: "codathon/e4",
  },
  {
    id: 7,
    name: "Hackathon",
    duneTitle: "The 24-Hour Stillsuit",
    sigil: "✦",
    category: "Build",
    poster: "https://placehold.co/500x700/0E0C08/C8891A?text=Hackathon",
    tagline: "Build. Break. Rebuild. Repeat until dawn.",
    quote: "The stillsuit recycles every drop of moisture. The hackathon recycles every hour of doubt into output.",
    quoteAttr: "— ByteBurst Engineering Manifesto",
    details: [
      { icon: "◈", label: "Mode",     value: "Team of 3–4" },
      { icon: "◈", label: "Duration", value: "24 Hours" },
      { icon: "◈", label: "Theme",    value: "Announced at Start" },
      { icon: "◈", label: "Judging",  value: "Demo + Code Review" },
    ],
    desc: "Twenty-four hours. One problem. Infinite solutions. From ideation to deployment — the team that builds the most complete, elegant, and impactful product wins the spice.",
    registerLink: "Hackathon/e69",
  },
  {
    id: 9,
    name: "Bug Bounty",
    duneTitle: "The Hunt Across the Codebase",
    sigil: "⬡",
    category: "Security",
    poster: BugBountyPoster,
    tagline: "Every bug is a sandworm. Track it. Trap it. Claim your reward.",
    quote: "The desert hides its dangers well. So does poorly written code.",
    quoteAttr: "— Gurney Halleck's Security Briefings, Vol. II",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual / Pair" },
      { icon: "◈", label: "Duration", value: "3 Hours" },
      { icon: "◈", label: "Focus",    value: "Web / Code Bugs" },
      { icon: "◈", label: "Scoring",  value: "Per Bug Severity" },
    ],
    desc: "Prowl through a deliberately broken codebase. Find vulnerabilities, logic errors, and hidden traps. Points awarded by severity. The sharpest eye claims the highest bounty.",
    registerLink: "BugBunty/e143",
  },
  {
    id: 10,
    name: "CSS Warriors",
    duneTitle: "Shapers of the Digital Dune",
    sigil: "❋",
    category: "Frontend",
    poster: CSSWarriorPoster,
    tagline: "The desert is your canvas. Style it into legend.",
    quote: "A Fremen shapes the desert. A CSS Warrior shapes the viewport — one declaration at a time.",
    quoteAttr: "— Liet-Kynes, Planetologist & Frontend Prophet",
    details: [
      { icon: "◈", label: "Mode",     value: "Individual" },
      { icon: "◈", label: "Duration", value: "2 Hours" },
      { icon: "◈", label: "Tools",    value: "Pure CSS / HTML" },
      { icon: "◈", label: "Task",     value: "Pixel-perfect Render" },
    ],
    desc: "Receive a design mockup. Recreate it using pure CSS — no frameworks, no shortcuts. The closest pixel-perfect render wins. Beauty and precision are the only currency.",
    registerLink: "CssWarriors/e67",
  },
];

const CATEGORY_COLORS = {
  Exhibition: "#C8891A",
  Creative:   "#D4826A",
  Quiz:       "#8A9EBA",
  Design:     "#9AB87A",
  Business:   "#BA9A5A",
  Coding:     "#7ABAC8",
  Build:      "#E8A020",
  AI:         "#A87AC8",
  Security:   "#BA7A7A",
  Frontend:   "#7AC8A0",
};


/* ─── Event Card ─────────────────────────────────────────── */
function EventCard({ event, index }) {
  const isFlipped = index % 2 === 1;
  const catColor  = CATEGORY_COLORS[event.category] || "#C8891A";



  return (
    <div className={`ev-card${isFlipped ? " ev-flip" : ""}`}>
      <span className="ev-card-watermark">0{index + 1}</span>

      {/* ── Poster ── */}
      <div className="ev-card-poster">
        <img
          src={event.poster}
          alt={event.name}
          className="ev-poster-img"
          onError={e => { e.target.src = `https://placehold.co/500x700/0E0C08/C8891A?text=${encodeURIComponent(event.name)}`; }}
        />
        <div className="ev-poster-overlay"/>
        <span
          className="ev-poster-cat"
          style={{ "--cat-color": catColor }}
        >
          {event.category}
        </span>
        <div className="ev-poster-sigil">{event.sigil}</div>
      </div>

      {/* ── Info ── */}
      <div className="ev-card-info">
        <span className="ev-info-eyebrow">⟁ &nbsp; Event {String(index + 1).padStart(2,"0")}</span>
        <h2 className="ev-info-name">{event.name}</h2>
        <p className="ev-info-dune">{event.duneTitle}</p>
        <p className="ev-info-tagline">"{event.tagline}"</p>

        <div className="ev-info-div">
          <div className="ev-info-div-line"/>
          <div className="ev-info-div-gem"/>
        </div>

        {/* Detail rows */}
        <div className="ev-details">
          {event.details.map((d, i) => (
            <div key={i} className="ev-detail-row">
              <span className="ev-detail-icon">{d.icon}</span>
              <div>
                <span className="ev-detail-label">{d.label}</span>
                <span className="ev-detail-value">{d.value}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="ev-info-desc">{event.desc}</p>

        {/* Quote */}
        <blockquote className="ev-info-quote">
          "{event.quote}"
          <span className="ev-info-quote-attr">{event.quoteAttr}</span>
        </blockquote>

        {/* Buttons */}
        <div className="ev-btns">
          <Link data-dune-text="ENTER THE SIETCH" data-dune-hover="true" to={event.registerLink} className="ev-btn-register">
            Seek Entry &nbsp;→
          </Link>
          <button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="ev-btn-details">
          <Link to={event.registerLink} className="">
            Learn More &nbsp;→
          </Link> </button>
           
        </div>
      </div>
    </div>
  );
}

/* ─── Quote Band ─────────────────────────────────────────── */
function QuoteBand({ text, attr }) {
  return (
    <div className="ev-quote-band">
      <span className="ev-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
      <p className="ev-qb-text">"{text}"</p>
      <span className="ev-qb-attr">{attr}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
const ALL_CATS = ["All", ...Array.from(new Set(EVENTS.map(e => e.category)))];

export default function EventsPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? EVENTS
    : EVENTS.filter(e => e.category === active);

  return (
    <div className="ev-root">


      {/* ── Hero ── */}
      <section className="ev-hero">
        <div className="ev-hero-glow"/>
        <div className="ev-hero-grain"/>
        <span className="ev-hero-eyebrow">⟁ &nbsp; The Trials of Arrakis &nbsp; ⟁</span>
        <h1 className="ev-hero-title">The Events</h1>
        <p className="ev-hero-sub">Choose Your Trial. Prove Your Worth.</p>
        <div className="ev-hero-orn">
          <div className="ev-orn-line"/>
          <div className="ev-orn-gem"/>
          <div className="ev-orn-line r"/>
        </div>
        <p className="ev-hero-quote">
          "The spice has many forms. So do the tests it sets before you.
          Enter with your full strength, or not at all."
        </p>
        <span className="ev-hero-attr">— Muad'Dib's Address to the Contestants</span>
      </section>

      {/* ── Filter Bar ── */}
      <div className="ev-filter-bar">
        {ALL_CATS.map(cat => (
          <button
            key={cat}
            className={`ev-filter-btn${active === cat ? " active" : ""}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Events List ── */}
      <div className="ev-list">
        {filtered.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
        ))}
      </div>

      {/* ── Mid Quote Bands ── */}
      <QuoteBand
        text="The trial does not measure what you know. It measures who you become under pressure."
        attr="— Sardaukar Training Doctrine, Refracted"
      />
      <QuoteBand
        text="Every great coder, designer, and builder was once a contestant who refused to yield."
        attr="— ByteBurst Hall of Champions, Inscription I"
      />

      {/* ── Closing ── */}
      <section className="ev-closing">
        <div className="ev-closing-bg"/>
        <span className="ev-closing-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="ev-closing-title">
          The Desert <span>Calls.</span><br/>Will You Answer?
        </h2>
        <p className="ev-closing-sub">
          "He who does not register before the sands shift shall find no place in the sietch."
        </p>
        <button className="ev-closing-btn">Register for All Events &nbsp;→</button>
      </section>
    </div>
  );
}