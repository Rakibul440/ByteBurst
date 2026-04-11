import { useState } from "react";
import "./styles/prize.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Prize & Collab Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS prefixed  pz-  (zero conflicts)

   ─── HOW TO CUSTOMISE ────────────────────────────────────
   • Replace COLLAB.posterImg   → your 5:7 sponsorship poster URL
   • Replace COLLAB details     → your sponsor's name, tagline, etc.
   • Edit PRIZES array          → add / remove / reorder prize cards
   • Replace prize.img          → your product photo URL
═══════════════════════════════════════════════════════════ */

const COLLAB = {
  posterImg:   "https://placehold.co/500x700/0E0C08/C8891A?text=Sponsor+Poster",  // ← replace
  companyName: "The CGEC Store",
  tagline:     "Delivering Rewards to Every Champion",
  duneTitle:   "The Guild That Delivers the Bounty",
  website:     "https://cgecstore.in",
  description: "The CGEC Store is a rising eCommerce powerhouse, bringing together curated products, seamless delivery, and unmatched reliability. For ByteBurst Chapter III, they take on the mantle of the grand supplier — ensuring every victor receives rewards worthy of their triumph, carried across the sands with precision and care.",
  about: [
    { label:"Founded",   value:"2026" },
    { label:"Domain",    value:"eCommerce · Retail · Logistics" },
    { label:"Presence",  value:"Pan-India" },
    { label:"Mission",   value:"Delivering value to every doorstep" },
  ],
  quote: "Rewards are not merely given. They are delivered with purpose, precision, and pride — to those who rise above the rest.",
  quoteAttr: "— CGEC Store Leadership, ByteBurst Chapter III",
};

/* ─── PRIZES DATA ───────────────────────────────────────── */
const PRIZES = [
  {
    id: 1,
    rank: "Champion",
    duneRank: "Muad'Dib of the Code",
    icon: "⟁",
    tierColor: "#E8C060",   // deep gold
    items: [
      {
        name: "Champion Trophy",
        duneLabel: "The Golden Crysknife",
        img: "https://placehold.co/500x700/0E0C08/E8C060?text=Trophy",
        desc: "A hand-crafted resin trophy engraved with the ByteBurst Chapter III insignia. A permanent testament to your dominance over the desert.",
        quote: "The crysknife is sacred to the Fremen. So is this.",
        quoteAttr: "— Fremen Trophy Doctrine",
        details: [
          { label:"Material",   value:"Cast Resin + Metal Finish" },
          { label:"Height",     value:"30 cm" },
          { label:"Engraving",  value:"Personalised + Event Seal" },
          { label:"Given To",   value:"1st Place — All Events" },
        ],
      },
      {
        name: "Champion T-Shirt",
        duneLabel: "The Stillsuit of Victory",
        img: "https://placehold.co/500x700/0E0C08/E8C060?text=Champion+Tshirt",
        desc: "Premium 240gsm cotton tee. Embossed ByteBurst x NovaTech logo. The uniform of those who walked through the storm and emerged first.",
        quote: "Wear it as the Fremen wear their stillsuits — with pride, purpose, and no apology.",
        quoteAttr: "— Apparel Codex, Sietch Tabr",
        details: [
          { label:"Material",   value:"240 GSM Cotton" },
          { label:"Print",      value:"Screen Printed" },
          { label:"Design",     value:"ByteBurst × NovaTech" },
          { label:"Given To",   value:"1st Place — All Events" },
        ],
      },
      {
        name: "Cash Prize",
        duneLabel: "The Spice Purse",
        img: "https://placehold.co/500x700/0E0C08/E8C060?text=Cash+Prize",
        desc: "Real melange. Real value. The champion's purse, sealed in the House Atreides treasury and delivered into worthy hands.",
        quote: "Spice has no substitute. Neither does this.",
        quoteAttr: "— CHOAM Financial Doctrine",
        details: [
          { label:"Amount",    value:"₹ Announced on Day" },
          { label:"Mode",      value:"Bank Transfer / UPI" },
          { label:"Given To",  value:"1st Place — Select Events" },
          { label:"Taxable",   value:"As per applicable norms" },
        ],
      },
    ],
  },
  {
    id: 2,
    rank: "Runner-Up",
    duneRank: "Fedaykin Elite",
    icon: "✦",
    tierColor: "#C0C0C0",  // silver
    items: [
      {
        name: "Runner-Up Trophy",
        duneLabel: "The Silver Sandworm",
        img: "https://placehold.co/500x700/0E0C08/C0C0C0?text=Runner+Trophy",
        desc: "The silver mark of those who came second — but finished further than ninety-nine others ever dared to begin.",
        quote: "Second on Arrakis is still a warrior. Never forget that.",
        quoteAttr: "— Gurney Halleck's Field Notes",
        details: [
          { label:"Material",  value:"Cast Resin + Silver Finish" },
          { label:"Height",    value:"25 cm" },
          { label:"Given To",  value:"2nd Place — All Events" },
          { label:"Engraving", value:"Personalised + Chapter III" },
        ],
      },
      {
        name: "ByteBurst T-Shirt",
        duneLabel: "Cloth of the Desert Walker",
        img: "https://placehold.co/500x700/0E0C08/C0C0C0?text=Tshirt",
        desc: "220gsm premium cotton. The desert-walker's uniform. Every stitch carries the mark of a ByteBurst finalist.",
        quote: "The Fremen do not go unclothed into the desert. Neither do our finalists.",
        quoteAttr: "— Fremen Fashion Codex",
        details: [
          { label:"Material",  value:"220 GSM Cotton" },
          { label:"Design",    value:"ByteBurst Chapter III" },
          { label:"Print",     value:"DTF Print" },
          { label:"Given To",  value:"2nd Place — All Events" },
        ],
      },
    ],
  },
  {
    id: 3,
    rank: "Second Runner-Up",
    duneRank: "Fremen Warrior",
    icon: "◈",
    tierColor: "#CD7F32",  // bronze
    items: [
      {
        name: "Participation Trophy",
        duneLabel: "The Bronze Dune",
        img: "https://placehold.co/500x700/0E0C08/CD7F32?text=Bronze+Trophy",
        desc: "Bronze-finished cast resin. A monument to the moment you chose to walk the trial when others watched from the stands.",
        quote: "Bronze on Arrakis is forged at a temperature few survive.",
        quoteAttr: "— Sietch Metallurgy Scrolls",
        details: [
          { label:"Material",  value:"Cast Resin + Bronze Finish" },
          { label:"Given To",  value:"3rd Place — All Events" },
          { label:"Height",    value:"20 cm" },
          { label:"Seal",      value:"ByteBurst Chapter III" },
        ],
      },
      {
        name: "ByteBurst Mug",
        duneLabel: "The Spice Cup",
        img: "https://placehold.co/500x700/0E0C08/CD7F32?text=Mug",
        desc: "A 350ml ceramic mug bearing the ByteBurst insignia. Drink your coffee like a Mentat — with complete focus and terrifying speed.",
        quote: "The Mentat drinks. Then calculates. Then wins.",
        quoteAttr: "— Mentat Morning Ritual, First Law",
        details: [
          { label:"Material",  value:"Ceramic" },
          { label:"Capacity",  value:"350 ml" },
          { label:"Print",     value:"Both Sides, Full Colour" },
          { label:"Given To",  value:"3rd Place — All Events" },
        ],
      },
    ],
  },
  {
    id: 4,
    rank: "Participant Gifts",
    duneRank: "The Spice Relics",
    icon: "❋",
    tierColor: "#C8891A",  // gold-dust
    items: [
      {
        name: "ByteBurst Pen",
        duneLabel: "The Scribe's Instrument",
        img: "https://placehold.co/500x700/0E0C08/C8891A?text=Pen",
        desc: "A matte-black metal-finish pen engraved with the ByteBurst Chapter III mark. For signing code. For signing history.",
        quote: "The pen that wrote the first algorithm is more powerful than the sword that defended it.",
        quoteAttr: "— Bene Gesserit Writing Codex",
        details: [
          { label:"Material",  value:"Metal Body, Matte Finish" },
          { label:"Ink",       value:"Smooth Ball-Point" },
          { label:"Engraving", value:"ByteBurst Insignia" },
          { label:"Given To",  value:"All Participants" },
        ],
      },
      {
        name: "ByteBurst Sticker Pack",
        duneLabel: "Seals of the Desert",
        img: "https://placehold.co/500x700/0E0C08/C8891A?text=Stickers",
        desc: "A curated set of die-cut vinyl stickers. Each one a desert relic. Laptop, bottle, workstation — mark your territory like a Fremen marks the rock.",
        quote: "The Fremen leave marks on the desert. Leave yours on the world.",
        quoteAttr: "— Sayings of Stilgar",
        details: [
          { label:"Count",     value:"6 Die-Cut Stickers" },
          { label:"Material",  value:"Vinyl, Waterproof" },
          { label:"Design",    value:"ByteBurst Exclusive Art" },
          { label:"Given To",  value:"All Participants" },
        ],
      },
      {
        name: "Certificate of the Desert",
        duneLabel: "The Fremen's Scroll",
        img: "https://placehold.co/500x700/0E0C08/C8891A?text=Certificate",
        desc: "A digitally signed, beautifully typeset certificate of participation. The desert shall have your name on record — always.",
        quote: "A name inscribed is a name that outlives the dune.",
        quoteAttr: "— Arrakis Archival Doctrine, Vol. I",
        details: [
          { label:"Format",    value:"Digital + Print Ready" },
          { label:"Signed by", value:"ByteBurst Organizing Team" },
          { label:"Issued",    value:"Within 7 days of event" },
          { label:"Given To",  value:"All Participants" },
        ],
      },
    ],
  },
];



/* ─── Prize Card Component ───────────────────────────────── */
function PrizeCard({ item, tierColor, onView }) {
  return (
    <div
      className="pz-prize-card"
      style={{ "--tier-c": tierColor }}
      onClick={() => onView(item, tierColor)}
    >
      <div className="pz-prize-img-col">
        <img
          src={item.img}
          alt={item.name}
          className="pz-prize-img"
          onError={e => { e.target.src = `https://placehold.co/300x420/0E0C08/C8891A?text=${encodeURIComponent(item.name)}`; }}
        />
        <div className="pz-prize-img-overlay"/>
        <div className="pz-prize-tier-dot"/>
      </div>
      <div className="pz-prize-info">
        <h3 className="pz-prize-name">{item.name}</h3>
        <p className="pz-prize-dune">{item.duneLabel}</p>
        <div className="pz-prize-mini">
          {item.details.slice(0, 3).map((d, i) => (
            <div key={i} className="pz-prize-mini-row">
              <span className="pz-mini-key">{d.label}</span>
              <span className="pz-mini-val">{d.value}</span>
            </div>
          ))}
        </div>
        <button className="pz-view-btn">View Details &nbsp;→</button>
      </div>
    </div>
  );
}

/* ─── Modal Component ────────────────────────────────────── */
function PrizeModal({ item, tierColor, onClose }) {
  if (!item) return null;
  return (
    <div className="pz-modal-overlay" onClick={onClose}>
      <div
        className="pz-modal"
        style={{ "--tier-c": tierColor }}
        onClick={e => e.stopPropagation()}
      >
        <div className="pz-modal-img-col">
          <img
            src={item.img}
            alt={item.name}
            className="pz-modal-img"
            onError={e => { e.target.src = `https://placehold.co/500x700/0E0C08/C8891A?text=${encodeURIComponent(item.name)}`; }}
          />
          <div className="pz-modal-img-overlay"/>
        </div>
        <div className="pz-modal-content">
          <span className="pz-modal-eyebrow">⟁ &nbsp; Prize Details</span>
          <h2 className="pz-modal-title">{item.name}</h2>
          <p className="pz-modal-dune">{item.duneLabel}</p>
          <p className="pz-modal-desc">{item.desc}</p>
          <div className="pz-modal-details">
            {item.details.map((d, i) => (
              <div key={i} className="pz-modal-detail-row">
                <span className="pz-modal-d-key">{d.label}</span>
                <span className="pz-modal-d-val">{d.value}</span>
              </div>
            ))}
          </div>
          <blockquote className="pz-modal-quote">
            "{item.quote}"
            <span>{item.quoteAttr}</span>
          </blockquote>
          <button className="pz-modal-close" onClick={onClose}>✕ &nbsp; Close the Vault</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function PrizePage({
  collab = COLLAB,
  prizes = PRIZES,
}) {
  const co = { ...COLLAB, ...collab };
  const [modal, setModal] = useState(null); // { item, tierColor }

  return (
    <div className="pz-root">


      {/* ── Hero ── */}
      <section className="pz-hero">
        <div className="pz-hero-glow"/><div className="pz-hero-grain"/>
        <span className="pz-hero-eyebrow pz-a1">⟁ &nbsp; The Spice Rewards &nbsp; ⟁</span>
        <h1 className="pz-hero-title">Prizes &amp; Glory</h1>
        <p className="pz-hero-sub pz-a2">What the Desert Grants to the Worthy</p>
        <div className="pz-hero-orn pz-a2">
          <div className="pz-orn-line"/><div className="pz-orn-gem"/><div className="pz-orn-line r"/>
        </div>
        <p className="pz-hero-quote pz-a3">
          "The desert does not reward the timid. It saves its gifts — its rarest spice — for those who walk its surface without flinching."
        </p>
        <span className="pz-hero-attr pz-a3">— Muad'Dib's Address to the ByteBurst Champions</span>
      </section>

      {/* ── Collab / Sponsor ── */}
      <div className="pz-collab-wrap pz-a2">
        <div className="pz-collab-inner">
          {/* Poster */}
          <div className="pz-collab-poster">
            <img
              src={co.posterImg}
              alt={co.companyName}
              className="pz-collab-img"
              onError={e=>{ e.target.src="https://placehold.co/500x700/0E0C08/C8891A?text=Sponsor"; }}
            />
            <div className="pz-collab-poster-overlay"/>
            <span className="pz-collab-poster-badge">Official Sponsor</span>
          </div>

          {/* Info */}
          <div className="pz-collab-info">
            <div className="pz-collab-wm">S</div>
            <span className="pz-collab-eyebrow">⟁ &nbsp; Presented In Collaboration With &nbsp; ⟁</span>
            <h2 className="pz-collab-name">{co.companyName}</h2>
            <p className="pz-collab-dune">{co.duneTitle}</p>
            <p className="pz-collab-tagline">"{co.tagline}"</p>
            <div className="pz-div"><div className="pz-div-line"/><div className="pz-div-gem"/></div>
            <div className="pz-collab-about">
              {co.about.map((a, i) => (
                <div key={i} className="pz-about-row">
                  <span className="pz-about-key">{a.label}</span>
                  <span className="pz-about-val">{a.value}</span>
                </div>
              ))}
            </div>
            <p className="pz-collab-desc">{co.description}</p>
            <blockquote className="pz-collab-quote">
              "{co.quote}"
              <span>{co.quoteAttr}</span>
            </blockquote>
            <a href={co.website} className="pz-visit-btn" target="_blank" rel="noreferrer">
              Visit the Guild &nbsp;→
            </a>
          </div>
        </div>
      </div>

      {/* ── Quote Band 1 ── */}
      <div className="pz-qband">
        <span className="pz-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <p className="pz-qband-text">"A champion does not fight for the trophy. The trophy is merely proof — proof for those who were not there — that the champion walked where others feared to step."</p>
        <span className="pz-qband-attr">— Gurney Halleck's Ballad of the Champion</span>
      </div>

      {/* ── Prize Tiers ── */}
      <div className="pz-tiers-wrap">
        {prizes.map((tier, ti) => (
          <div key={tier.id} className="pz-tier-block pz-a3">
            {/* Tier header */}
            <div className="pz-tier-head" style={{ "--tier-c": tier.tierColor }}>
              <div className="pz-tier-icon" style={{ "--tier-c": tier.tierColor }}>
                {tier.icon}
              </div>
              <div className="pz-tier-title-wrap">
                <h2 className="pz-tier-rank" style={{ "--tier-c": tier.tierColor }}>
                  {tier.rank}
                </h2>
                <p className="pz-tier-dune">{tier.duneRank}</p>
              </div>
              <span className="pz-tier-count">
                {tier.items.length} {tier.items.length === 1 ? "Prize" : "Prizes"}
              </span>
            </div>

            {/* Prize cards */}
            <div className="pz-prizes-grid">
              {tier.items.map((item, ii) => (
                <PrizeCard
                  key={ii}
                  item={item}
                  tierColor={tier.tierColor}
                  onView={(item, color) => setModal({ item, tierColor: color })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Quote Band 2 ── */}
      <div className="pz-qband">
        <span className="pz-qband-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <p className="pz-qband-text">"The spice cannot be given. It must be taken, earned, wrested from the sand with every fibre of your being. That is why it is worth having."</p>
        <span className="pz-qband-attr">— Liet-Kynes on the Nature of Reward</span>
      </div>

      {/* ── Closing CTA ── */}
      <section className="pz-closing">
        <div className="pz-closing-bg"/>
        <span className="pz-closing-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <h2 className="pz-closing-title">
          Claim Your <span>Destiny.</span>
        </h2>
        <p className="pz-closing-sub">
          "These prizes do not wait forever. The sands shift. Register before they are lost to the dune."
        </p>
        <button className="pz-closing-btn">Seek Entry &nbsp;→</button>
      </section>

      {/* ── Modal ── */}
      {modal && (
        <PrizeModal
          item={modal.item}
          tierColor={modal.tierColor}
          onClose={() => setModal(null)}
        />
      )}

    </div>
  );
}