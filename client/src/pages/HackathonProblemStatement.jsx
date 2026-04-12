import { useState, useEffect, useRef } from "react";
import "./styles/hackathonproblem.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Hackathon Problem Statement Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS prefixed  ps-  (zero conflicts)

   ─── PROPS ───────────────────────────────────────────────
   <HackathonPage
     hackathon={HACKATHON_DATA}      ← override with your data
     onRegister={() => {}}           ← registration callback
   />
═══════════════════════════════════════════════════════════ */

/* ─── Hackathon Data ─────────────────────────────────────── */
const HACKATHON_DATA = {
  edition:     "ByteBurst Chapter III",
  title:       "Hackathon",
  duneTitle:   "The 24-Hour Stillsuit",
  tagline:     "Build. Break. Rebuild. Repeat until dawn.",
  duration:    "24 Hours",
  teamSize:    "3 – 4 Members",
  date:        "September 15–16, 2025",
  venue:       "Main Auditorium Complex",
  prizePool:   "₹ Revealed on Day",

  /* ── Problem Statements ── */
  problems: [
    {
      id: "PS-01",
      domain: "Artificial Intelligence",
      duneDomain: "The Prescient Mind",
      difficulty: "Advanced",
      diffColor: "#BA7A7A",
      title: "Desert of Data — Predictive Crop Failure Detection",
      duneTitle: "The Harvest Oracle",
      overview:
        "Arrakis has no rain. Earth is running out of it. Design an AI-powered system that analyses satellite imagery, soil sensor data, and historical weather patterns to predict crop failure zones 30 days in advance — giving farmers time to adapt before the harvest is lost.",
      background:
        "Over 1.3 billion people face food insecurity annually. Traditional farming advisory systems are reactive, not predictive. With climate volatility accelerating, the window for intervention is shrinking. The desert does not announce its arrival — but a trained model might.",
      requirements: [
        "Ingest multi-modal data: satellite images (NDVI), soil moisture readings, weather APIs",
        "Train or fine-tune a model to predict crop failure probability per region",
        "Provide a dashboard with risk heatmaps and actionable farmer advisories",
        "Support at minimum 3 crop types and 2 geographic regions",
        "Achieve ≥ 78% prediction accuracy on your test set",
      ],
      techStack: ["Python · TensorFlow / PyTorch", "Satellite APIs (NASA EarthData / Sentinel)", "React / Next.js for dashboard", "FastAPI or Flask backend"],
      evaluation: ["Model accuracy & validation methodology (30%)", "Usefulness of dashboard & UX (25%)", "Data pipeline completeness (25%)", "Presentation & documentation (20%)"],
      quote: "The desert teaches patience to those who learn to read its signs. Your model must read signs no human eye can see.",
      quoteAttr: "— Liet-Kynes, Planetary Ecologist",
    },
    {
      id: "PS-02",
      domain: "Cybersecurity",
      duneDomain: "The Shield Wall",
      difficulty: "Advanced",
      diffColor: "#BA7A7A",
      title: "Stillsuit Protocol — Zero-Trust Authentication for Edge Devices",
      duneTitle: "The Gate-Warden's Cipher",
      overview:
        "A stillsuit wastes nothing. Your security system should waste no trust. Design a zero-trust authentication framework for IoT edge devices in critical infrastructure — where every access request, regardless of origin, must be continuously verified.",
      background:
        "IoT devices in hospitals, power grids, and water treatment plants are increasingly targeted. Perimeter-based security is dead. In 2024, over 60% of OT/IoT breaches originated from trusted internal devices that had been compromised weeks earlier — undetected.",
      requirements: [
        "Implement continuous authentication using device behaviour fingerprinting",
        "Design a lightweight cryptographic protocol suitable for constrained devices",
        "Build an anomaly detection layer that flags compromised device behaviour",
        "Provide a real-time monitoring dashboard with alert severity classification",
        "Demonstrate with at least 2 simulated device types (e.g. sensor + actuator)",
      ],
      techStack: ["Python · Rust or C for embedded simulation", "MQTT / CoAP protocols", "JWT / mTLS for auth", "React dashboard"],
      evaluation: ["Security model robustness (35%)", "Protocol efficiency on constrained devices (25%)", "Anomaly detection accuracy (25%)", "Demo quality & threat modelling (15%)"],
      quote: "A locked gate is not security. True security is a gate that knows who stands before it — even when it wears a familiar face.",
      quoteAttr: "— Bene Gesserit Security Doctrine, Article VII",
    },
    {
      id: "PS-03",
      domain: "Sustainability & CleanTech",
      duneDomain: "The Planetologist's Vision",
      difficulty: "Intermediate",
      diffColor: "#9AB87A",
      title: "Moisture Farmers — Smart Campus Energy Optimisation",
      duneTitle: "The Energy Sietch",
      overview:
        "On Arrakis, moisture farmers capture every drop the atmosphere yields. On campus, energy is hemorrhaging through inefficiency. Build a smart campus energy management system that monitors, predicts, and optimises electricity consumption across departments in real time.",
      background:
        "Indian educational institutions waste an estimated 30–45% of consumed energy through unoptimised lighting, HVAC, and lab equipment scheduling. Manual monitoring is inadequate. Sensors are cheap. Intelligence is the missing ingredient.",
      requirements: [
        "Collect or simulate energy consumption data from ≥ 5 campus zones",
        "Implement anomaly detection for energy spikes",
        "Build a predictive model for next-day consumption per zone",
        "Provide actionable recommendations and automated scheduling logic",
        "Calculate estimated carbon savings and cost reduction",
      ],
      techStack: ["Node.js / Python backend", "InfluxDB / TimescaleDB for time-series", "MQTT for sensor simulation", "React with Recharts / D3 dashboard"],
      evaluation: ["Data pipeline & prediction accuracy (30%)", "Actionability of recommendations (25%)", "Dashboard quality (25%)", "Sustainability impact analysis (20%)"],
      quote: "The Fremen did not dream of rain. They built systems to capture dew. Dream of efficiency, then build the system.",
      quoteAttr: "— Pardot Kynes, First Planetologist of Arrakis",
    },
    {
      id: "PS-04",
      domain: "HealthTech",
      duneDomain: "The Suk Doctor's Algorithm",
      difficulty: "Intermediate",
      diffColor: "#9AB87A",
      title: "Spice-Sense — Real-Time Rural Health Monitoring Dashboard",
      duneTitle: "The Healer's Oracle",
      overview:
        "In remote villages, a patient deteriorates before a doctor ever arrives. Build a real-time health monitoring and early warning system that aggregates wearable sensor data, flags deterioration patterns, and connects patients with the nearest available healthcare resource.",
      background:
        "India has 1 doctor per 1,456 people in rural areas. Response time is the difference between life and death. Wearables are becoming affordable. A platform that bridges wearable data with triage intelligence could save thousands of lives annually.",
      requirements: [
        "Simulate or ingest real-time vitals: heart rate, SpO2, temperature, BP",
        "Implement a risk-scoring algorithm with severity classification",
        "Build a triage dashboard for health workers with patient priority queuing",
        "Include offline-first capability (progressive sync when connectivity returns)",
        "Add SMS / notification alert system for critical patients",
      ],
      techStack: ["React Native or React PWA", "Node.js / Express backend", "WebSockets for real-time sync", "SQLite / PouchDB for offline"],
      evaluation: ["Clinical logic & risk scoring (30%)", "Offline-first implementation (25%)", "UI/UX for non-technical health workers (25%)", "Alert & notification system (20%)"],
      quote: "The Suk doctor does not panic. The Suk doctor has already run every scenario in their mind before the patient walks through the door. So must your system.",
      quoteAttr: "— Suk Medical School Primary Doctrine",
    },
    {
      id: "PS-05",
      domain: "Open Innovation",
      duneDomain: "Walk Without Rhythm",
      difficulty: "Open",
      diffColor: "#C8891A",
      title: "The Fremen's Problem — Solve What the Desert Has Not Named Yet",
      duneTitle: "The Unnamed Trial",
      overview:
        "The greatest problems have no name yet. This track invites teams to identify a real-world problem in their community, institution, or industry — and build a working solution from scratch within 24 hours. The problem must be clearly articulated. The solution must be demonstrably functional.",
      background:
        "The Fremen did not wait for outsiders to name their struggles. They observed, adapted, and built. ByteBurst believes the most powerful innovations come not from assigned briefs but from personal conviction — from builders who have seen the problem with their own eyes.",
      requirements: [
        "Define a clear problem statement with evidence of its real-world impact",
        "Identify your target user and validate assumptions (even informally)",
        "Build a working MVP that addresses the core pain point",
        "Demonstrate the solution with real or simulated data",
        "Present a roadmap for how this scales beyond the hackathon",
      ],
      techStack: ["Any language, framework, or platform", "Cloud services allowed", "Hardware prototyping permitted", "No restrictions — only results"],
      evaluation: ["Problem clarity & real-world relevance (30%)", "Solution completeness & functionality (30%)", "Innovation & originality (25%)", "Scalability vision (15%)"],
      quote: "The desert has a thousand problems with no names. The builder who names one and solves it has done what emperors could not.",
      quoteAttr: "— ByteBurst Open Innovation Manifesto",
    },
  ],

  /* ── Rules ── */
  rules: [
    { title: "Team Composition",   body: "Teams of 3 to 4 members. All members must be registered participants of ByteBurst Chapter III." },
    { title: "Duration",           body: "Exactly 24 hours from the opening ceremony. The clock starts when problem statements are revealed." },
    { title: "Problem Selection",  body: "Each team selects exactly one problem statement at registration. No switching after the first 2 hours." },
    { title: "Submission",         body: "Working prototype + GitHub repository + 3-minute demo video. Submitted via the ByteBurst portal before time expires." },
    { title: "Judging Criteria",   body: "Innovation (25%) · Technical execution (35%) · Presentation (20%) · Impact potential (20%)." },
    { title: "Code of Honour",     body: "All code must be written during the hackathon. Pre-built templates are prohibited. Open-source libraries are permitted." },
    { title: "Resources",          body: "Wi-Fi, power, and workstations provided. Cloud credits and API keys distributed at opening ceremony." },
    { title: "Final Authority",    body: "All judging decisions are final. The ByteBurst committee reserves the right to disqualify submissions that violate the spirit of the rules." },
  ],

  /* ── Timeline ── */
  timeline: [
    { time: "09:00 AM",  label: "Opening Ceremony",       dune: "The Call to Arms",       desc: "Problem statements revealed. Clock starts." },
    { time: "10:00 AM",  label: "Hacking Begins",         dune: "The First Step",         desc: "Teams lock their problem statement and begin building." },
    { time: "01:00 PM",  label: "Mentor Check-In",        dune: "The Navigator's Visit",  desc: "Assigned mentors visit each team for 15-min consultation." },
    { time: "06:00 PM",  label: "Mid-Point Review",       dune: "The Desert Crossing",    desc: "Optional progress check with judges. Not scored." },
    { time: "11:59 PM",  label: "Submission Deadline",    dune: "The Sand Shifts",        desc: "All code, demo video, and documentation submitted." },
    { time: "09:00 AM+1",label: "Final Presentations",    dune: "The Reckoning",          desc: "Each team presents for 5 minutes + 3 min Q&A." },
    { time: "11:30 AM+1",label: "Judging Deliberation",   dune: "The Council Convenes",   desc: "Judges deliberate. Teams rest. The spice settles." },
    { time: "12:30 PM+1",label: "Results & Ceremony",     dune: "The Champions Rise",     desc: "Winners announced. Prizes awarded. Saga inscribed." },
  ],

  mentorQuote: "The mentor does not give you the answer. The mentor shows you the edge of the map — and trusts you to find what lies beyond.",
  mentorQuoteAttr: "— Hackathon Mentor's Oath, ByteBurst Chapter III",
};

/* ─── Shared section wrapper ─────────────────────────────── */
function PsSection({ eyebrow, title, dune, right, children, style }) {
  return (
    <div className="ps-section" style={style}>
      <div className="ps-sec-corner tl"/><div className="ps-sec-corner tr"/>
      <div className="ps-sec-corner bl"/><div className="ps-sec-corner br"/>
      <div className="ps-sec-pad">
        <div className="ps-sec-header">
          <div className="ps-sec-head-left">
            {eyebrow && <span className="ps-sec-eyebrow">⟁ &nbsp; {eyebrow}</span>}
            {title   && <h2 className="ps-sec-title">{title}</h2>}
            {dune    && <p className="ps-sec-dune">{dune}</p>}
          </div>
          {right}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── Problem Viewer ─────────────────────────────────────── */
function ProblemViewer({ problems }) {
  const [active, setActive] = useState(0);
  const p = problems[active];

  return (
    <>
      {/* Tab bar */}
      <div className="ps-tab-bar">
        {problems.map((pr, i) => (
          <button
            key={pr.id}
            className={`ps-tab${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {pr.id} &nbsp;·&nbsp; {pr.domain.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Active problem */}
      <div className="ps-problem" key={p.id}>

        {/* Header */}
        <div className="ps-problem-header">
          <div className="ps-problem-id-wrap">
            <span className="ps-problem-id">{p.id}</span>
            <div className="ps-problem-domain">
              <span className="ps-domain-gem" style={{ background: p.diffColor }}/>
              {p.domain}
            </div>
            <div className="ps-problem-dune-domain">{p.duneDomain}</div>
          </div>
          <div className="ps-problem-title-wrap">
            <h3 className="ps-problem-name">{p.title}</h3>
            <div className="ps-problem-dune-name">{p.duneTitle}</div>
          </div>
          <span className="ps-diff-chip" style={{ "--diff-c": p.diffColor }}>
            {p.difficulty}
          </span>
        </div>

        {/* Overview */}
        <div className="ps-block">
          <div className="ps-block-label">
            Overview
            <div className="ps-block-label-line"/>
          </div>
          <p className="ps-text">{p.overview}</p>
        </div>

        {/* Background */}
        <div className="ps-block">
          <div className="ps-block-label">
            Background &amp; Context
            <div className="ps-block-label-line"/>
          </div>
          <p className="ps-text">{p.background}</p>
        </div>

        {/* Requirements */}
        <div className="ps-block">
          <div className="ps-block-label">
            Technical Requirements
            <div className="ps-block-label-line"/>
          </div>
          <div className="ps-req-list">
            {p.requirements.map((r, i) => (
              <div key={i} className="ps-req-item">
                <span className="ps-req-num">{String(i+1).padStart(2,"0")}</span>
                <p className="ps-req-text">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech + Evaluation */}
        <div className="ps-two-col">
          <div className="ps-mini-card">
            <div className="ps-mini-card-title">
              <span className="ps-mini-gem"/>
              Suggested Tech Stack
            </div>
            <div className="ps-mini-list">
              {p.techStack.map((t, i) => (
                <div key={i} className="ps-mini-item">{t}</div>
              ))}
            </div>
          </div>
          <div className="ps-mini-card">
            <div className="ps-mini-card-title">
              <span className="ps-mini-gem"/>
              Evaluation Criteria
            </div>
            <div className="ps-mini-list">
              {p.evaluation.map((e, i) => (
                <div key={i} className="ps-mini-item">{e}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Problem quote */}
        <blockquote className="ps-problem-quote">
          "{p.quote}"
          <span className="ps-problem-quote-attr">{p.quoteAttr}</span>
        </blockquote>

      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function HackathonProblemStatement({
  hackathon  = HACKATHON_DATA,
  onRegister = () => {},
}) {
  const hk = { ...HACKATHON_DATA, ...hackathon };

  return (
    <div className="ps-root">

      {/* ════ HERO ════ */}
      <section className="ps-hero">
        <div className="ps-hero-bg"/><div className="ps-hero-grain"/>

        <span className="ps-hero-eyebrow">⟁ &nbsp; ByteBurst Chapter III &nbsp; · &nbsp; {hk.date} &nbsp; ⟁</span>
        <h1 className="ps-hero-title">{hk.title}</h1>
        <p className="ps-hero-dune">{hk.duneTitle}</p>
        <p className="ps-hero-tagline">"{hk.tagline}"</p>

        <div className="ps-hero-stats">
          {[
            { gem:true, label: hk.duration },
            { gem:true, label: `Team: ${hk.teamSize}` },
            { gem:true, label: hk.venue },
            { gem:true, label: `Prize: ${hk.prizePool}` },
            { gem:false,label: `${hk.problems.length} Problem Statements` },
          ].map((s, i) => (
            <div key={i} className="ps-stat-chip">
              {s.gem && <div className="ps-stat-chip-gem"/>}
              {s.label}
            </div>
          ))}
        </div>

        <div className="ps-orn">
          <div className="ps-orn-line"/>
          <div className="ps-orn-gem"/>
          <div className="ps-orn-line r"/>
        </div>

        <p className="ps-hero-quote">
          "The stillsuit recycles every drop of moisture. The hackathon recycles every hour of doubt into output. Enter fully, or not at all."
        </p>
        <span className="ps-hero-attr">— ByteBurst Engineering Manifesto</span>
      </section>

      <div className="ps-body">

        {/* ════ PROBLEM STATEMENTS ════ */}
        <PsSection
          eyebrow="The Five Trials"
          title="Problem Statements"
          dune="Choose your desert. Walk without hesitation."
        >
          <ProblemViewer problems={hk.problems}/>
        </PsSection>

        {/* ════ QUOTE BAND 1 ════ */}
        <div className="ps-qband">
          <span className="ps-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ps-qband-text">
            "The greatest builders are not those who waited for the perfect problem. They are those who took an imperfect problem and built something that outlasted the desert itself."
          </p>
          <span className="ps-qband-attr">— Guild Navigator's Log on Innovation</span>
        </div>

        {/* ════ TIMELINE ════ */}
        <PsSection
          eyebrow="The Chronicle"
          title="Event Timeline"
          dune="Every grain of sand is a moment. Miss none of them."
        >
          <div className="ps-timeline">
            {hk.timeline.map((t, i) => (
              <div key={i} className="ps-tl-item">
                <span className="ps-tl-time">{t.time}</span>
                <div className="ps-tl-dot"/>
                <div className="ps-tl-body">
                  <span className="ps-tl-label">{t.label}</span>
                  <span className="ps-tl-dune">{t.dune}</span>
                  <p className="ps-tl-desc">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </PsSection>

        {/* ════ QUOTE BAND 2 ════ */}
        <div className="ps-qband">
          <span className="ps-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ps-qband-text">"{hk.mentorQuote}"</p>
          <span className="ps-qband-attr">{hk.mentorQuoteAttr}</span>
        </div>

        {/* ════ RULES ════ */}
        <PsSection
          eyebrow="The Sacred Scrolls"
          title="Rules &amp; Guidelines"
          dune="Laws of the desert are not suggestions — they are survival."
        >
          <div className="ps-rules-list">
            {hk.rules.map((r, i) => (
              <div key={i} className="ps-rule-item">
                <span className="ps-rule-num">{String(i+1).padStart(2,"0")}</span>
                <div style={{flex:1}}>
                  <span className="ps-rule-title">{r.title}</span>
                  <p className="ps-rule-body">{r.body}</p>
                </div>
                <div className="ps-rule-gem"/>
              </div>
            ))}
          </div>
        </PsSection>

        {/* ════ QUOTE BAND 3 ════ */}
        <div className="ps-qband">
          <span className="ps-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ps-qband-text">
            "Twenty-four hours is not a constraint. It is a gift. It is the exact amount of time a Fremen needs to cross the Harkonnen line, build a shelter, and emerge having changed everything."
          </p>
          <span className="ps-qband-attr">— ByteBurst Hackathon Doctrine, Opening Words</span>
        </div>

      </div>

      {/* ════ CTA BAND ════ */}
      <section className="ps-cta-band">
        <div className="ps-cta-bg"/>
        <span className="ps-cta-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="ps-cta-title">
          The Desert <span>Calls.</span><br/>Will You Build?
        </h2>
        <p className="ps-cta-sub">
          "The sandworm does not wait for the rider to be ready. Register before the sands shift."
        </p>
        <div className="ps-cta-btns">
          <button className="ps-btn-primary" onClick={onRegister}>
            Register Your Team &nbsp;→
          </button>
          <button className="ps-btn-ghost">Download Problem Brief</button>
        </div>
      </section>

    </div>
  );
}