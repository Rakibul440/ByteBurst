import { useState } from "react";
import "./styles/leaderboard.css"

/* ─── Events Data ────────────────────────────────────────── */
const EVENTS_DATA = [
  {
    id: "e1",
    name: "Hackathon",
    duneTitle: "The 24-Hour Stillsuit",
    category: "Build",
    isTeamEvent: true,
    categoryColor: "#E8A020",
    winners: [
      {
        rank: 1,
        teamName: "CGEC INNOVATORS",
        achievement: "Real-Time Safety for Blind Navigation",
        score: "94 / 100",
        projectLink: "https://youtu.be/4acx_FxH-ZA?si=dPi9QEZ7_Ix88OZy",
        members: [
          { name: "Sarbajit Mondal",  roll: "34900125023", dept: "CSE", year: "FIRST", isLeader: true  },
          { name: "Rajrup Chattopadhyay",   roll: "34900125024", dept: "CSE", year: "FIRST", isLeader: false },
          { name: "Surjya kanta Mukherjee",    roll: "34900125013", dept: "CSE",  year: "FIRST",  isLeader: false },
          { name: "Sayan Ray",  roll: "34900125019", dept: "CSE", year: "FIRST", isLeader: false },
        ],
      },
      {
        rank: 2,
        teamName: "ROBOMATES",
        achievement: "AI Crop Recommendation System",
        score: "89 / 100",
        members: [
          { name: "Rishav Prasad",    roll: "34900124037", dept: "CSE", year: "SECOND",  isLeader: true  },
          { name: "Subham Saha",  roll: "34900124005", dept: "CSE", year: "SECOND", isLeader: false },
          { name: "Debojit Sarkar", roll: "34900124042", dept: "CSE", year: "SECOND", isLeader: false },
          { name: "Parthiv Bania", roll: "34900124024", dept: "CSE", year: "SECOND", isLeader: false },
          { name: "Rajat Mondal", roll: "34900124018", dept: "CSE", year: "SECOND", isLeader: false },


        ],
      },
      {
        rank: 3,
        teamName: "TEAM X",
        achievement: "CyberShield is an API-powered  cybersecurity platform",
        score: "84 / 100",
        members: [
          { name: "SWASTIKA SHAW ", roll: "34900125046", dept: "CSE", year: "FIRST",  isLeader: true  },
          { name: "ARPITA ROY", roll: "34900125045", dept: "CSE",  year: "FIRST", isLeader: false },
          { name: "MRINAL ROY",  roll: "34900125001", dept: "CSE", year: "FIRST", isLeader: false },
          { name: "RAHUL SAH",  roll: "34900125059", dept: "CSE",  year: "FIRST",  isLeader: false },
          { name: "DISHA  SAMANTA",  roll: "34901325052", dept: "CE",  year: "FIRST",  isLeader: false },
        ],
      },
    ],
  },
  {
    id: "e2",
    name: "Code-A-Thon",
    duneTitle: "The Worm Rider's Sprint",
    category: "Coding",
    isTeamEvent: false,
    categoryColor: "#7ABAC8",
    winners: [
      { rank: 1, name: "Subham Saha",   roll: "34900124005", dept: "CSE", year: "SECOND",  score: "90/100", achievement: "Solved all 5 problems with fastest time" },
      { rank: 2, name: "Rajat Mondal", roll: "34900124018", dept: "CSE", year: "SECOND", score: "85/100", achievement: "Perfect score, second fastest" },
      { rank: 3, name: "Archisman Biswas",    roll: "34900125063", dept: "CSE",  year: "FIRST", score: "84/100", achievement: "Highest partial score" },
    ],
  },
    {
    id: "e3",
    name: "Tech Exhibition",
    duneTitle: "The 3-Hour Stillsuit",
    category: "Build",
    isTeamEvent: true,
    categoryColor: "#E8A020",
    winners: [
      {
        rank: 1,
        teamName: "CGEC INNOVATORS",
        achievement: "Real-Time Safety for Blind Navigation",
        score: "90 / 100",
        projectLink: "https://youtu.be/4acx_FxH-ZA?si=dPi9QEZ7_Ix88OZy",
        members: [
          { name: "Arpan Pachal",  roll: "34900325026", dept: "ECE", year: "FIRST", isLeader: true  },
          { name: "Sarbajit Mondal",  roll: "34900125023", dept: "CSE", year: "FIRST", isLeader: false  },
          { name: "Rajrup Chattopadhyay",   roll: "34900125024", dept: "CSE", year: "FIRST", isLeader: false },
          { name: "Surjya kanta Mukherjee",    roll: "34900125013", dept: "CSE",  year: "FIRST",  isLeader: false },
          { name: "Krishendu Paul",  roll: "34900324041", dept: "ECE", year: "SECOND", isLeader: false },
        ],
      },
      {
        rank: 2,
        teamName: "Invincible",
        achievement: "Driver's  Anti - drowsiness alert system",
        score: "87 / 100",
        members: [
          { name: "Pawan Shaw",    roll: "34900325016", dept: "ECE", year: "FIRST",  isLeader: true  },
          { name: "Subhadeep Shit",  roll: "34900325050", dept: "ECE", year: "FIRST", isLeader: false },
          { name: "Ritesh Lahiri", roll: "34900325040", dept: "ECE", year: "FIRST", isLeader: false },
          { name: "Debolina Das", roll: "34900325030", dept: "ECE", year: "FIRST", isLeader: false },
          { name: "Ananya Bhar", roll: "34900325019", dept: "ECE", year: "FIRST", isLeader: false },


        ],
      },
      {
        rank: 3,
        teamName: "Robo Ranger",
        achievement: "Home Automation",
        score: "84 / 100",
        members: [
          { name: "Sk Sahil Akhtar", roll: "34900324036", dept: "ECE", year: "SECOND",  isLeader: true  },
          { name: "Subham Jana", roll: "34900324007", dept: "ECE",  year: "SECOND", isLeader: false },
          { name: "Chiradeep Mukherjee",  roll: "34900324003", dept: "ECE", year: "SECOND", isLeader: false },
          { name: "Riya Bhattacharya",  roll: "34901324006", dept: "CIVIL",  year: "SECOND",  isLeader: false },
        ],
      },
    ],
  },
    {
    id: "e4",
    name: "Techno Commercial",
    duneTitle: "The 24-Hour Stillsuit",
    category: "Build",
    isTeamEvent: true,
    categoryColor: "#E8A020",
    winners: [
      {
        rank: 1,
        teamName: "VOLTEX",
        achievement: "",
        score: "90 / 100",
        projectLink: "",
        members: [
            { name: "Nibadita Mitra",   roll: "34901625028", dept: "EE", year: "FIRST", isLeader: true },
            { name: "Jayashree Bera",  roll: "34900325027", dept: "ECE", year: "FIRST", isLeader: false },
        ],
      },
      {
        rank: 2,
        teamName: "ROBORANGER",
        achievement: "",
        score: "85 / 100",
        members: [
          { name: "SK Sahil Akhtar",    roll: "34900324036", dept: "ECE", year: "SECOND",  isLeader: true  },
          { name: "Subham Jana",  roll: "34900324007", dept: "ECE", year: "SECOND", isLeader: false },

        ],
      },
      {
        rank: 3,
        teamName: "TECHNO WIZARD",
        achievement: "",
        score: "84 / 100",
        members: [
          { name: "Sreemoye Pandit", roll: "34901624019", dept: "EE", year: "SECOND",  isLeader: true  },
          { name: "Subhajit Dey", roll: "34901624020", dept: "CSE",  year: "SECOND", isLeader: false },
        ],
      },
    ],
  },

    {
    id: "e5",
    name: "Graphics Design",
    duneTitle: "The Vision Weavers' Trial",
    category: "Creative",
    isTeamEvent: false,
    categoryColor: "#D4826A",
    winners: [
      { rank: 1, name: "Krishanu Mondal",   roll: "34901624048", dept: "EE",  year: "SECOND", score: "4.9 / 5.0", achievement: "Judges' unanimous choice — cinematic composition" },
      { rank: 2, name: "Debojit Sarkar",   roll: "34900124042", dept: "CSE", year: "Second",  score: "4.7 / 5.0", achievement: "Outstanding typography and colour theory" },
    ],
  },

  {
    id: "e6-a",
    name: " AutoCAD 2D (CE)",
    duneTitle: "Trial of the Architect Mind",
    category: "Build",
    isTeamEvent: true,
    categoryColor: "#8A9EBA",
    winners: [
      {
        rank: 1,
        teamName: "Arnab & Shrestha",
        achievement: "",
        score: "88 / 100",
        members: [
          { name: "Arnab Bar",  roll: "34901324023", dept: "CE", year: "SECOND",  isLeader: true  },
          { name: "Shrestha Bhattacharya",  roll: "34901324008", dept: "CE", year: "SECOND",  isLeader: false },
        ],
      },
      {
        rank: 2,
        teamName: "Aakash",
        achievement: "",
        score: "83 / 100",
        members: [
          { name: "Aakash Singh",  roll: "22CS041", dept: "CSE", year: "SECOND", isLeader: true  },
        ],
      },
      {
        rank: 3,
        teamName: "Harsh",
        score: "78 / 100",
        members: [
          { name: "Harsh Agarwal", roll: "22ME008", dept: "ME",  year: "SECOND", isLeader: true  },
        ],
      },
    ],
  },
    {
    id: "e6-b",
    name: "AutoCAD 2D ME ",
    duneTitle: "The Hunt Across the Codebase",
    category: "Build",
    isTeamEvent: false,
    categoryColor: "#BA7A7A",
    winners: [
      { rank: 1, name: "Subhrajit Mandal",    roll: "34900725029", dept: "ME", year: "First",  score: "80/100", achievement: "" },
      { rank: 2, name: "SUBHAM RAY",    roll: "34900725040", dept: "ME", year: "First",  score: "75/100", achievement: "" },
    ],
  },
    {
    id: "e7",
    name: "Bug Bounty",
    duneTitle: "The Hunt Across the Codebase",
    category: "Security",
    isTeamEvent: false,
    categoryColor: "#BA7A7A",
    winners: [
      { rank: 1, name: "Rishav Prasad",    roll: "34900124037", dept: "CSE", year: "SECOND",  score: "15 bugs · 240 pts", achievement: "Discovered 3 critical vulnerabilities" },
    ],
  },
];

/* ─── Rank config ────────────────────────────────────────── */
const RANK_CFG = {
  1: {
    color:     "#E8C060",
    glow:      "rgba(232,192,96,.35)",
    shadow:    "rgba(232,192,96,.15)",
    label:     "Champion",
    duneLabel: "Muad'Dib",
    sigil:     "⟁",
    height:    "auto",
    border:    "rgba(232,192,96,.55)",
    bg:        "rgba(232,192,96,.06)",
  },
  2: {
    color:     "#C8C8C8",
    glow:      "rgba(200,200,200,.2)",
    shadow:    "rgba(200,200,200,.08)",
    label:     "Runner-Up",
    duneLabel: "Fedaykin Elite",
    sigil:     "✦",
    border:    "rgba(200,200,200,.35)",
    bg:        "rgba(200,200,200,.03)",
  },
  3: {
    color:     "#CD9B5A",
    glow:      "rgba(205,155,90,.18)",
    shadow:    "rgba(205,155,90,.07)",
    label:     "Second Runner-Up",
    duneLabel: "Fremen Warrior",
    sigil:     "◈",
    border:    "rgba(205,155,90,.3)",
    bg:        "rgba(205,155,90,.03)",
  },
};

/* ─── Year map ───────────────────────────────────────────── */
const YEAR_SHORT = { FIRST:"1st", SECOND:"2nd", THIRD:"3rd", FINAL:"4th" };



/* ─── Solo Winner Card ───────────────────────────────────── */
function SoloCard({ winner, eventCatColor }) {
  const cfg = RANK_CFG[winner.rank];
  const cssVars = {
    "--wc-color":  cfg.color,
    "--wc-glow":   cfg.glow,
    "--wc-shadow": cfg.shadow,
    "--wc-border": cfg.border,
    "--wc-bg":     cfg.bg,
  };

  return (
    <div
      className={`lb-winner-card rank-${winner.rank}`}
      style={cssVars}
    >
      <div className="lb-card-wm">{winner.rank}</div>

      {/* Rank badge */}
      <div className="lb-rank-badge">
        <span className="lb-rank-sigil">{cfg.sigil}</span>
        <div className="lb-rank-label-wrap">
          <span className="lb-rank-num">{winner.rank === 1 ? "1st" : winner.rank === 2 ? "2nd" : "3rd"}</span>
          <span className="lb-rank-label">{cfg.label}</span>
          <span className="lb-rank-dune">{cfg.duneLabel}</span>
        </div>
        <span className="lb-rank-sigil">{cfg.sigil}</span>
      </div>

      {/* Body */}
      <div className="lb-card-body">
        <div className="lb-winner-name">{winner.name}</div>
        {winner.achievement && (
          <div className="lb-winner-ach">"{winner.achievement}"</div>
        )}
        {winner.score && (
          <span className="lb-score-chip">{winner.score}</span>
        )}
        <div className="lb-sep"/>
        <div className="lb-solo-details">
          <div className="lb-detail-row">
            <span className="lb-detail-key">Sietch No.</span>
            <span className="lb-detail-val">{winner.roll}</span>
          </div>
          <div className="lb-detail-row">
            <span className="lb-detail-key">House</span>
            <span className="lb-detail-val">{winner.dept}</span>
          </div>
          <div className="lb-detail-row">
            <span className="lb-detail-key">Cycle</span>
            <span className="lb-detail-val">{YEAR_SHORT[winner.year] || winner.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Team Winner Card ───────────────────────────────────── */
function TeamCard({ winner, eventCatColor }) {
  const cfg    = RANK_CFG[winner.rank];
  const cssVars = {
    "--wc-color":  cfg.color,
    "--wc-glow":   cfg.glow,
    "--wc-shadow": cfg.shadow,
    "--wc-border": cfg.border,
    "--wc-bg":     cfg.bg,
  };

  return (
    <div
      className={`lb-winner-card rank-${winner.rank}`}
      style={cssVars}
    >
      <div className="lb-card-wm">{winner.rank}</div>

      {/* Rank badge */}
      <div className="lb-rank-badge">
        <span className="lb-rank-sigil">{cfg.sigil}</span>
        <div className="lb-rank-label-wrap">
          <span className="lb-rank-num">{winner.rank === 1 ? "1st" : winner.rank === 2 ? "2nd" : "3rd"}</span>
          <span className="lb-rank-label">{cfg.label}</span>
          <span className="lb-rank-dune">{cfg.duneLabel}</span>
        </div>
        <span className="lb-rank-sigil">{cfg.sigil}</span>
      </div>

      {/* Body */}
      <div className="lb-card-body">
        <div className="lb-winner-name">{winner.teamName}</div>
        {winner.achievement && (
          <div className="lb-winner-ach">"{winner.achievement}"</div>
        )}
        {winner.score && (
          <span className="lb-score-chip">{winner.score}</span>
        )}

        <div className="lb-sep"/>

        {/* Members */}
        <div className="lb-members-list">
          {(winner.members || []).map((m, i) => (
            <div key={i} className="lb-member-row">
              <div
                className="lb-member-leader-dot"
                style={{
                  background: m.isLeader ? cfg.color : "#3D2E1A",
                  boxShadow: m.isLeader ? `0 0 6px ${cfg.glow}` : "none",
                }}
              />
              <div className="lb-member-name-col">
                <span className="lb-member-name">{m.name}</span>
                <span className="lb-member-roll">{m.roll}</span>
              </div>
              <div className="lb-member-meta">
                <span className="lb-member-dept">{m.dept}</span>
                <span className="lb-member-year">{YEAR_SHORT[m.year] || m.year}</span>
              </div>
              {m.isLeader && <span className="lb-leader-tag">Lead</span>}
            </div>
          ))}
        </div>

        {winner.projectLink && (
          <a href={winner.projectLink} className="lb-project-link" target="_blank" rel="noreferrer">
            ⟁ &nbsp; View Project
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Event Section ──────────────────────────────────────── */
function EventSection({ event }) {
  return (
    <div
      className="lb-event-section"
      style={{ "--cat-c": event.categoryColor }}
    >
      {/* Event header */}
      <div className="lb-event-header">
        <div>
          <span className="lb-event-eyebrow">⟁ &nbsp; {event.category} &nbsp; · &nbsp; {event.isTeamEvent ? "Team Event" : "Solo Event"}</span>
          <h2 className="lb-event-name">{event.name}</h2>
          <p className="lb-event-dune">{event.duneTitle}</p>
        </div>
        <div className="lb-event-chip" style={{ "--cat-c": event.categoryColor }}>
          <span className="lb-filter-dot"/>
          {event.isTeamEvent ? "Team" : "Solo"}
        </div>
      </div>

      {/* Podium */}
      <div className="lb-podium">
        {event.winners.map(winner =>
          event.isTeamEvent
            ? <TeamCard key={winner.rank} winner={winner} eventCatColor={event.categoryColor}/>
            : <SoloCard key={winner.rank} winner={winner} eventCatColor={event.categoryColor}/>
        )}
      </div>
    </div>
  );
}

/* ─── Collect all rank-1 winners for closing ─────────────── */
function allChampions(events) {
  return events
    .map(ev => {
      const w = ev.winners.find(w => w.rank === 1);
      if (!w) return null;
      return ev.isTeamEvent ? w.teamName : w.name;
    })
    .filter(Boolean);
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function LeaderboardPage({
  events = EVENTS_DATA,
}) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(events.map(e => e.category)))];

  const filtered = filter === "All"
    ? events
    : events.filter(e => e.category === filter);

  const champions = allChampions(events);

  return (
    <div className="lb-root">

      {/* ════ HERO ════ */}
      <section className="lb-hero">
        <div className="lb-hero-bg"/><div className="lb-hero-grain"/>
        <span className="lb-hero-eyebrow">⟁ &nbsp; ByteBurst Chapter III &nbsp;·&nbsp; {new Date().getFullYear()} &nbsp; ⟁</span>
        <h1 className="lb-hero-title">Hall of Champions</h1>
        <p className="lb-hero-dune">The Desert Has Spoken Their Names</p>
        <p className="lb-hero-sub">"Not all who enter the trial survive it. These ones did more — they conquered it."</p>
        <div className="lb-hero-orn">
          <div className="lb-orn-line"/><div className="lb-orn-gem"/><div className="lb-orn-line r"/>
        </div>
        <p className="lb-hero-quote">
          "The spice cannot be taken. It must be earned — grain by grain, line by line, hour by sleepless hour. These are the names the desert chose to remember."
        </p>
        <span className="lb-hero-attr">— ByteBurst Chronicle, Final Inscription</span>
      </section>

      {/* ════ FILTER BAR ════ */}
      <div className="lb-filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`lb-filter-btn${filter === cat ? " active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat !== "All" && <span className="lb-filter-dot"/>}
            {cat}
          </button>
        ))}
      </div>

      {/* ════ EVENTS ════ */}
      <div className="lb-body">

        {filtered.map((ev, i) => (
          <>
            <EventSection key={ev.id} event={ev}/>
            {/* Quote band every 2 events */}
            {(i + 1) % 2 === 0 && i < filtered.length - 1 && (
              <div key={`q${i}`} className="lb-qband">
                <span className="lb-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
                <p className="lb-qb-text">
                  {[
                    '"The champion does not look back at those they left behind. They look forward — at the civilisation they are about to build."',
                    '"Every name on this board was once a student who chose to walk into the desert instead of watching from the shade."',
                    '"Second place on Arrakis is still a warrior. Third place still fought. The desert honours all who dared."',
                  ][Math.floor(i / 2) % 3]}
                </p>
                <span className="lb-qb-attr">— ByteBurst Hall of Champions, Verse {Math.floor(i/2) + 1}</span>
              </div>
            )}
          </>
        ))}

        {/* ════ CLOSING ════ */}
        <section className="lb-closing">
          <div className="lb-closing-bg"/>
          <span className="lb-closing-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <h2 className="lb-closing-title">
            The Desert <span>Remembers.</span>
          </h2>
          <p className="lb-closing-sub">
            "These names are now inscribed in the sand. Arrakis does not forget those who proved themselves worthy."
          </p>
          {/* Champion name chips */}
          {champions.length > 0 && (
            <div className="lb-closing-names">
              {champions.map((name, i) => (
                <span key={i} className="lb-closing-name-chip">{name}</span>
              ))}
            </div>
          )}

          {/* Final quote */}
          <div className="lb-qband" style={{padding:"2rem 0 0"}}>
            <p className="lb-qb-text">
              "A beginning is a very delicate time. But so is a victory. Handle both with the same reverence — for one leads to the other."
            </p>
            <span className="lb-qb-attr">— Princess Irulan's Address to the Champions</span>
          </div>
        </section>

      </div>
    </div>
  );
}