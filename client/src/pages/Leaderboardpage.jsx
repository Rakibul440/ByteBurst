import { useState } from "react";
import "./styles/leaderboard.css"
import { EVENTS_DATA } from "../assets/data/data";


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