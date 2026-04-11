import { useEffect, useRef, useState } from "react";
import "./styles/home.css"
import { Link } from "react-router-dom";

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Home Page
   DUNE Cinematic Theme · No Navbar · No Cursor (external)
═══════════════════════════════════════════════════════════ */

const EVENT_DATE = new Date("2025-09-15T09:00:00");

const QUOTES = [
  {
    line: "The code must flow.",
    body: "As the spice sustains the universe, knowledge sustains the mind of every builder who dares to dream beyond the horizon.",
    attr: "— First Law of Arrakis",
  },
  {
    line: "I must not fear the deadline.",
    body: "The deadline is the mind-killer. I will face it fully. I will permit it to pass over me and through me. Only I will remain.",
    attr: "— Litany Against the Bug",
  },
  {
    line: "He who controls the algorithm controls the universe.",
    body: "Power is not handed down from the heavens. It is compiled, tested, iterated, and deployed — one commit at a time.",
    attr: "— House Atreides Doctrine",
  },
  {
    line: "Walk without rhythm — and you will not attract the worm.",
    body: "Write code without pattern and you invite chaos. But walk the correct path, and the desert itself becomes your ally.",
    attr: "— Fremen Proverb",
  },
  {
    line: "Without change, something sleeps inside us and seldom awakens.",
    body: "Every pull request is an act of courage. Every deployment, a step across the open sand toward something no one has built before.",
    attr: "— The Coder's Creed of Sietch Tabr",
  },
  {
    line: "The spice of knowledge must be earned, not merely found.",
    body: "Those who traverse this festival will carry the melange of ideas back to their houses — and the universe will never look the same.",
    attr: "— Bene Gesserit Tech Codex, Vol. III",
  },
  {
    line: "Survival is the ability to swim in strange water.",
    body: "In this vast desert of data and disruption, only those who adapt their mind like water shall inherit the sietch.",
    attr: "— Sayings of Muad'Dev",
  },
  {
    line: "The compiled mind opens its eyes and sees a universe of solutions.",
    body: "To think deeply is to traverse the desert alone at night. To build with others is to plant a garden where none existed.",
    attr: "— Navigators' Guild Tech Manifesto",
  },
];

/* ─── CSS ─────────────────────────────────────────────────── */


/* ─── Countdown ──────────────────────────────────────────── */
const pad = n => String(n).padStart(2, "0");
function useCountdown(target) {
  const calc = () => {
    const d = Math.max(0, target - Date.now());
    return {
      days:  Math.floor(d / 86400000),
      hours: Math.floor((d % 86400000) / 3600000),
      mins:  Math.floor((d % 3600000) / 60000),
      secs:  Math.floor((d % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ─── Sand Canvas ────────────────────────────────────────── */
function SandCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    resize();
    const N = 140;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: .3 + Math.random() * 1.8,
      vx: (.05 + Math.random() * .25) * (Math.random()<.5?1:-1),
      vy: -.04 - Math.random() * .18,
      op: .08 + Math.random() * .38,
      hue: 28 + Math.random() * 22,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},58%,52%,${p.op})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="h-canvas" />;
}

/* ─── Stars ──────────────────────────────────────────────── */
function Stars() {
  const stars = useRef(Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 60,
    size: .4 + Math.random() * 1.3,
    lo: .04 + Math.random() * .12, hi: .25 + Math.random() * .5,
    dur: 2 + Math.random() * 5,
    delay: Math.random() * 6,
  }))).current;
  return (
    <div className="h-stars">
      {stars.map(s => (
        <div key={s.id} className="h-star" style={{
          left:`${s.x}%`, top:`${s.y}%`,
          width:s.size, height:s.size,
          "--lo":s.lo, "--hi":s.hi,
          "--dur":`${s.dur}s`, "--delay":`${s.delay}s`,
        }}/>
      ))}
    </div>
  );
}

/* ─── Dune Ridge SVG ─────────────────────────────────────── */
const Ridge = () => (
  <svg viewBox="0 0 1440 260" preserveAspectRatio="none"
    style={{ width:"100%", display:"block", height:"220px" }}>
    <defs>
      <linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1A1208" stopOpacity=".85"/>
        <stop offset="100%" stopColor="#070604" stopOpacity="1"/>
      </linearGradient>
      <linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8891A" stopOpacity=".05"/>
        <stop offset="50%" stopColor="#0E0A05" stopOpacity=".75"/>
        <stop offset="100%" stopColor="#070604" stopOpacity="1"/>
      </linearGradient>
    </defs>
    <path d="M0,180 C200,130 380,210 580,165 C780,118 940,200 1100,158 C1260,118 1380,175 1440,155 L1440,260 L0,260Z"
      fill="url(#rg1)" opacity=".65"/>
    <path d="M0,215 C150,185 300,230 520,200 C740,170 860,215 1040,192 C1220,170 1340,210 1440,193 L1440,260 L0,260Z"
      fill="url(#rg2)"/>
    <path d="M0,215 C150,185 300,230 520,200 C740,170 860,215 1040,192 C1220,170 1340,210 1440,193"
      fill="none" stroke="#C8891A" strokeWidth=".7" opacity=".2"/>
  </svg>
);

/* ─── Parallax ───────────────────────────────────────────── */
function useParallax() {
  const scrollY = useRef(0);
  const skyRef   = useRef(null);
  const starsRef = useRef(null);
  const ridgeRef = useRef(null);
  const floorRef = useRef(null);
  const rafRef   = useRef(null);
  useEffect(() => {
    const onScroll = () => { scrollY.current = window.scrollY; };
    const tick = () => {
      const s = scrollY.current;
      if (skyRef.current)   skyRef.current.style.transform   = `translateY(${s*.32}px)`;
      if (starsRef.current) starsRef.current.style.transform = `translateY(${s*.18}px)`;
      if (ridgeRef.current) ridgeRef.current.style.transform = `translateY(${s*.52}px)`;
      if (floorRef.current) floorRef.current.style.transform = `translateY(${s*.62}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("scroll", onScroll); };
  }, []);
  return { skyRef, starsRef, ridgeRef, floorRef };
}

/* ─── Rotating Quote ─────────────────────────────────────── */
function QuoteStrip() {
  const [idx, setIdx]     = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i+1) % QUOTES.length); setFading(false); }, 750);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const q = QUOTES[idx];
  return (
    <section className="h-quote-strip">
      <div className="h-quote-bg-glow"/>
      <span className="h-quote-icon">⟁ &nbsp; ✦ &nbsp; ⟁</span>
      <div className={fading ? "h-quote-fading" : ""}>
        <p className="h-quote-line">"{q.line}"</p>
        <p className="h-quote-body">{q.body}</p>
        <p className="h-quote-attr">{q.attr}</p>
      </div>
      <div className="h-quote-dots">
        {QUOTES.map((_, i) => (
          <div key={i} className={`h-quote-dot ${i===idx?"active":""}`}
            onClick={() => { setFading(true); setTimeout(()=>{ setIdx(i); setFading(false); },400); }}/>
        ))}
      </div>
    </section>
  );
}

/* ─── Pillars ────────────────────────────────────────────── */
const PILLARS = [
  {
    num:"01", icon:"⚙", name:"Compete",
    dune:"Enter the Trials",
    desc:"Face the crucible of code, logic, and creativity. The strongest minds rise from the desert, not born from comfort but forged by challenge.",
  },
  {
    num:"02", icon:"✦", name:"Discover",
    dune:"Traverse the Lore",
    desc:"Absorb knowledge from those who have walked the sands before. Workshops, talks, and sessions that expand the boundary of the known universe.",
  },
  {
    num:"03", icon:"⟁", name:"Connect",
    dune:"Find Your Sietch",
    desc:"Every great house is built on alliance. Meet the minds who will shape tomorrow — your future collaborators walk among these dunes.",
  },
];

/* ─── Quote Wall ─────────────────────────────────────────── */
const WALL_QUOTES = [
  { q:"The spice of knowledge must be earned, never merely found.", s:"Those who walk through this festival carry the melange of ideas back to their houses.", attr:"— Bene Gesserit Tech Codex" },
  { q:"A great man doesn't seek to lead — he is called to it.", s:"Leadership in code is not declared. It emerges through the work, commit by commit.", attr:"— Atreides Engineering Doctrine" },
  { q:"The first step in avoiding a trap is knowing it exists.", s:"Debug your assumptions before you debug your code. The bug is almost never where you think.", attr:"— Fremen Developer Proverb" },
  { q:"The mystery of life isn't a problem to solve, but a reality to experience.", s:"Some systems cannot be understood by analysis alone. You must build them to know them.", attr:"— Reverend Mother's Axiom" },
  { q:"Beginnings are such delicate times.", s:"Every project starts as a whisper of potential. Protect it. Nurture it. Let no one rush it to ruin.", attr:"— Princess Irulan's Dev Diary" },
  { q:"Deep in the human unconscious is a pervasive need for a logical universe.", s:"We build systems not to control the chaos — but to find the pattern that was always there.", attr:"— Guild Navigator's Log" },
];

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function HomePage() {
  const { days, hours, mins, secs } = useCountdown(EVENT_DATE);
  const { skyRef, starsRef, ridgeRef, floorRef } = useParallax();

  return (
    <div className="home-root">
      {/*  */}

      {/* ══════════ HERO ══════════ */}
      <section className="h-hero">
        <div ref={skyRef} className="h-sky"/>
        <div ref={starsRef}><Stars/></div>
        <SandCanvas/>
        <div className="h-grain"/>
        <div ref={ridgeRef} className="h-ridge"><Ridge/></div>
        <div ref={floorRef} className="h-floor"><div className="h-floor-grad"/></div>

        <div className="h-content">

          {/* Badge */}
          <div className="h-badge h-ani-1">
            <span className="h-badge-gem"/>
            A Tech Saga &nbsp;·&nbsp; Chapter III
            <span className="h-badge-gem"/>
          </div>

          {/* Title */}
          <h1 className="h-title">
            <span className="h-title-byte h-ani-2">Byte</span>
            <span className="h-title-burst h-ani-3">Burst</span>
          </h1>

          {/* Subtitle */}
          <p className="h-subtitle h-ani-4">The Spice of Knowledge Awaits</p>

          {/* Ornament */}
          <div className="h-orn h-ani-4">
            <div className="h-orn-line"/>
            <div className="h-orn-tri"/>
            <div className="h-orn-diamond"/>
            <div className="h-orn-tri" style={{transform:"rotate(180deg)"}}/>
            <div className="h-orn-line r"/>
          </div>

          {/* Countdown */}
          <div className="h-clock h-ani-5">
            <div className="h-unit">
              <div className="h-num"><span>{pad(days)}</span></div>
              <span className="h-lbl">Days</span>
            </div>
            <span className="h-sep">:</span>
            <div className="h-unit">
              <div className="h-num"><span>{pad(hours)}</span></div>
              <span className="h-lbl">Hours</span>
            </div>
            <span className="h-sep">:</span>
            <div className="h-unit">
              <div className="h-num"><span>{pad(mins)}</span></div>
              <span className="h-lbl">Mins</span>
            </div>
            <span className="h-sep">:</span>
            <div className="h-unit">
              <div className="h-num"><span>{pad(secs)}</span></div>
              <span className="h-lbl">Secs</span>
            </div>
          </div>

          {/* CTA */}
          <Link to={"events"} >
            <button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="h-cta-btn h-ani-6">
              Walk Without Rhythm &nbsp;→
            </button>
          </Link>
        </div>

        {/* Scroll cue */}
        <div className="h-scroll-cue">
          <span className="h-scroll-lbl">Descend into the Desert</span>
          <div className="h-scroll-line"/>
        </div>
      </section>

      {/* ══════════ ROTATING QUOTE ══════════ */}
      <QuoteStrip/>

      {/* ══════════ PILLARS ══════════ */}
      <section className="h-pillars">
        <div className="h-pillars-header">
          <span className="h-pillars-eyebrow">⟁ &nbsp; The Three Pillars &nbsp; ⟁</span>
          <h2 className="h-pillars-title">Why You Must <span>Attend</span></h2>
        </div>
        <div className="h-pillars-grid">
          {PILLARS.map(p => (
            <div key={p.num} className="h-pillar">
              <div className="h-pillar-glow"/>
              <div className="h-pillar-num">{p.num}</div>
              <span className="h-pillar-icon">{p.icon}</span>
              <div className="h-pillar-name">{p.name}</div>
              <span className="h-pillar-dune">{p.dune}</span>
              <p className="h-pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ MANIFESTO ══════════ */}
      <section className="h-manifesto">
        <div className="h-manifesto-bg"/>
        <div className="h-manifesto-corners">
          <div className="h-mc h-mc-tl"/>
          <div className="h-mc h-mc-tr"/>
          <div className="h-mc h-mc-bl"/>
          <div className="h-mc h-mc-br"/>
        </div>
        <span className="h-manifesto-sigil">⟁ ✦ ⟁ ✦ ⟁</span>
        <p className="h-manifesto-text">
          "The <em>desert</em> of mediocrity stretches endlessly for those who wait.
          But those who <em>rise</em> before dawn, sharpen their tools in the dark,
          and walk boldly into the open sand — they do not merely survive Arrakis.
          They <em>become</em> it."
        </p>
        <span className="h-manifesto-attr">— The ByteBurst Manifesto, Chapter III</span>
      </section>

      {/* ══════════ QUOTE WALL ══════════ */}
      <section className="h-qwall">
        <span className="h-qwall-title">⟁ &nbsp; Whispers of the Desert &nbsp; ⟁</span>
        <div className="h-qwall-list">
          {WALL_QUOTES.map((q, i) => (
            <div key={i} className="h-qwall-item">
              <span className="h-qwall-num">0{i+1}</span>
              <div className="h-qwall-body">
                <p className="h-qwall-q">"{q.q}"</p>
                <p className="h-qwall-sub">{q.s}</p>
              </div>
              <div className="h-qwall-gem"/>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="h-cta-band">
        <div className="h-cta-bg"/>
        <span className="h-cta-band-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="h-cta-band-title">
          The <span>Spice</span> Awaits.<br/>Will You Walk?
        </h2>
        <p className="h-cta-band-sub">
          "He who hesitates is lost in the dunes. Register before the sands shift."
        </p>
        <div className="h-cta-band-btns">
          <Link to={"auth"}><button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="h-btn-primary"> Seek Passage &nbsp;→</button></Link>
          <button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="h-btn-ghost"><Link to={"events"}>Learn the Trails</Link></button>
        </div>
      </section>

    </div>
  );
}