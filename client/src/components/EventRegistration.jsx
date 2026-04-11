import { useState } from "react";
import "./styles/eventRegistration.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Event Registration Page
   DUNE Cinematic Theme · Fully Reusable · No Navbar · No Cursor
   All CSS prefixed  rg-  (zero conflicts with other pages)

   ─── USAGE ───────────────────────────────────────────────
   <EventRegistrationPage
     event={{
       name:       "Code-A-Thon",
       duneTitle:  "The Worm Rider's Sprint",
       category:   "Coding",
       tagline:    "Ride the worm. Solve the storm.",
       quote:      "The sandworm does not wait for the rider to be ready.",
       quoteAttr:  "— Fedaykin Combat Code Manual",
       posterImg:  "https://your-poster-url.com/poster.jpg",
       rules: [
         { title: "Eligibility",   body: "Open to all enrolled students of the institution." },
         { title: "Team Size",     body: "Individual participation only." },
         { title: "Duration",      body: "2 hours. No extensions granted." },
         { title: "Language",      body: "Any programming language permitted." },
         { title: "Devices",       body: "Personal laptops only. No internet access." },
         { title: "Judging",       body: "Based on correctness, efficiency, and code elegance." },
         { title: "Plagiarism",    body: "Zero tolerance. Immediate disqualification." },
         { title: "Final Call",    body: "Organiser's decision is final and binding." },
       ],
     }}
     onSubmit={(formData) => console.log(formData)}
   />
═══════════════════════════════════════════════════════════ */

/* ─── Default event (shown when no props passed) ─────────── */
const DEFAULT_EVENT = {
  name:      "Code-A-Thon",
  duneTitle: "The Worm Rider's Sprint",
  category:  "Coding",
  tagline:   "Ride the worm. Solve the storm. Be the last standing.",
  quote:     "The sandworm does not wait for the rider to be ready. Neither does the problem set.",
  quoteAttr: "— Fedaykin Combat Code Manual",
  posterImg: "https://placehold.co/500x700/0E0C08/C8891A?text=Code-A-Thon",
  rules: [
    { title: "Eligibility",    body: "Open to all currently enrolled students of the institution. Valid ID required at the venue." },
    { title: "Registration",   body: "Each participant must register individually. Duplicate registrations will be disqualified without notice." },
    { title: "Team Size",      body: "Individual participation only. No teams permitted for this event." },
    { title: "Duration",       body: "Exactly 2 hours. The clock begins when the problem set is distributed. No extensions." },
    { title: "Language",       body: "Any programming language is permitted. Participants must declare their language at the start." },
    { title: "Devices",        body: "Personal laptops only. Internet access is strictly prohibited. Organisers may inspect devices." },
    { title: "Code of Honour", body: "Plagiarism, cheating, or use of pre-written code will result in immediate disqualification." },
    { title: "Judging",        body: "Scores based on correctness (60%), efficiency (25%), and code elegance (15%)." },
    { title: "Disputes",       body: "All disputes must be raised within 10 minutes of result announcement. Organiser's decision is final." },
    { title: "Final Authority", body: "The ByteBurst organising committee reserves the right to modify rules. Participation implies acceptance." },
  ],
};

const YEARS  = ["FIRST", "SECOND", "THIRD", "FINAL"];
const DEPTS  = ["CSE", "ECE", "CE", "ME","CE"];


/* ─── Field Component ────────────────────────────────────── */
function RgField({ label, error, children }) {
  return (
    <div className="rg-field">
      <label className="rg-label">{label}</label>
      {children}
      {error && <span className="rg-error">⟁ {error}</span>}
    </div>
  );
}

/* ─── Input Component ────────────────────────────────────── */
function RgInput({ type = "text", placeholder, value, onChange, name }) {
  return (
    <div className="rg-input-wrap">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rg-input"
        autoComplete="off"
      />
      <div className="rg-field-bar"/>
    </div>
  );
}

/* ─── Select Component ───────────────────────────────────── */
function RgSelect({ value, onChange, name, options, placeholder }) {
  return (
    <div className="rg-input-wrap">
      <select className="rg-select" name={name} value={value} onChange={onChange}>
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="rg-select-arrow">▾</span>
      <div className="rg-field-bar"/>
    </div>
  );
}

/* ─── Validation ─────────────────────────────────────────── */
function validate(form) {
  const e = {};
  if (!form.name.trim())                         e.name   = "Blood name is required";
  if (!form.roll.trim())                         e.roll   = "Sietch number is required";
  if (!/^\d{10}$/.test(form.phone))             e.phone  = "10-digit transmission code required";
  if (!form.year)                                e.year   = "Select your cycle year";
  if (!form.dept)                                e.dept   = "Select your house department";
  return e;
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT — EventRegistrationPage
═══════════════════════════════════════════════════════════ */
export default function EventRegistrationPage({
  event = DEFAULT_EVENT,
  onSubmit = null,
}) {
  const ev = { ...DEFAULT_EVENT, ...event };

  const [form, setForm] = useState({ name:"", roll:"", phone:"", year:"", dept:"" });
  const [errors, setErrors]   = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handle = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate API
    if (onSubmit) onSubmit({ ...form, event: ev.name });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="rg-root">

      {/* ── Hero ── */}
      <section className="rg-hero">
        <div className="rg-hero-glow"/>
        <div className="rg-hero-grain"/>
        <span className="rg-hero-eyebrow">⟁ &nbsp; Seek Entry &nbsp; · &nbsp; {ev.category} &nbsp; ⟁</span>
        <h1 className="rg-hero-title">{ev.name}</h1>
        <p className="rg-hero-dune">{ev.duneTitle}</p>
        <p className="rg-hero-tagline">"{ev.tagline}"</p>
        <div className="rg-hero-orn">
          <div className="rg-orn-line"/>
          <div className="rg-orn-gem"/>
          <div className="rg-orn-line r"/>
        </div>
      </section>

      {/* ── Main two-column body ── */}
      <div className="rg-body">

        {/* ════ LEFT: FORM ════ */}
        <div className="rg-form-panel">
          <div className="rg-corner rg-c-tl"/>
          <div className="rg-corner rg-c-tr"/>
          <div className="rg-corner rg-c-bl"/>
          <div className="rg-corner rg-c-br"/>


          {/* =======  Correct it after registration function fixed */}
          {/*             <div className="rg-success">
              <span className="rg-success-sigil">⟁</span>
              <h2 className="rg-success-title">Passage Granted</h2>
              <p className="rg-success-body">
                "You have been accepted into the trial. The desert remembers
                every name that walks its sands with purpose."
              </p>
              <div className="rg-success-line"/>
              <span className="rg-success-attr">— ByteBurst Registration Oracle</span>
            </div> */}

          {submitted ? (
            /* ── Success screen ── */
            <div className="rg-success">
              <span className="rg-success-sigil">⟁</span>
              <h2 className="rg-success-title">Registration hasn't strated yet</h2>
              <p className="rg-success-body">
                "You have been accepted into the trial. The desert remembers
                every name that walks its sands with purpose."
              </p>
              <div className="rg-success-line"/>
              <span className="rg-success-attr">— ByteBurst Registration Oracle</span>
            </div>
          ) : (
            /* ── Form ── */
            <>
              <div className="rg-form-header">
                <span className="rg-form-sigil">⟁ &nbsp; ✦ &nbsp; Contestant Manifest &nbsp; ✦ &nbsp; ⟁</span>
                <h2 className="rg-form-title">Register Your Name</h2>
                <p className="rg-form-subtitle">"Speak your truth to the desert. It forgets nothing."</p>
              </div>

              {/* Name */}
              <RgField label="Blood Name (Full Name)" error={errors.name}>
                <RgInput name="name" placeholder="Your full name" value={form.name} onChange={handle}/>
              </RgField>

              {/* Roll */}
              <RgField label="Sietch Number (Roll No.)" error={errors.roll}>
                <RgInput name="roll" placeholder="e.g. 22CS001" value={form.roll} onChange={handle}/>
              </RgField>

              {/* Phone */}
              <RgField label="Transmission Frequency (Phone)" error={errors.phone}>
                <RgInput type="tel" name="phone" placeholder="10-digit contact number" value={form.phone} onChange={handle}/>
              </RgField>

              {/* Year + Dept */}
              <div className="rg-row">
                <RgField label="Cycle Year" error={errors.year}>
                  <RgSelect
                    name="year" value={form.year} onChange={handle}
                    options={YEARS} placeholder="Select Year"
                  />
                </RgField>
                <RgField label="House / Department" error={errors.dept}>
                  <RgSelect
                    name="dept" value={form.dept} onChange={handle}
                    options={DEPTS} placeholder="Select Dept"
                  />
                </RgField>
              </div>

              <button
                className="rg-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Consulting the Oracle…" : "Claim Your Place in the Sietch →"}
              </button>
            </>
          )}
        </div>

        {/* ════ RIGHT: RULEBOOK ════ */}
        <div className="rg-rules-panel">

          <div className="rg-rules-header">
            <span className="rg-rules-eyebrow">⟁ &nbsp; The Sacred Scrolls &nbsp; ⟁</span>
            <h2 className="rg-rules-title">Rulebook</h2>
            <p className="rg-rules-subtitle">"Laws of the desert are not suggestions — they are survival."</p>
          </div>

          {/* Event poster thumbnail */}
          {ev.posterImg && (
            <img
              src={ev.posterImg}
              alt={ev.name}
              className="rg-poster-thumb"
              onError={e => { e.target.style.display="none"; }}
            />
          )}

          {/* Rules list */}
          <div className="rg-rules-list">
            {(ev.rules || []).map((rule, i) => (
              <div key={i} className="rg-rule-item">
                <span className="rg-rule-num">{String(i+1).padStart(2,"0")}</span>
                <div className="rg-rule-body">
                  <span className="rg-rule-title">{rule.title}</span>
                  <p className="rg-rule-desc">{rule.body}</p>
                </div>
                <div className="rg-rule-gem"/>
              </div>
            ))}
          </div>

          {/* Event quote */}
          <div className="rg-rules-quote">
            <p className="rg-rq-text">"{ev.quote}"</p>
            <span className="rg-rq-attr">{ev.quoteAttr}</span>
          </div>

          {/* Contact strip */}
          <div className="rg-contact-strip">
            <div className="rg-contact-gem"/>
            <p className="rg-contact-text">
              Questions? Find a <strong>ByteBurst coordinator</strong> at the festival desk or reach us via the spice channel.
            </p>
          </div>

        </div>
      </div>

      {/* ── Bottom quote band ── */}
      <div className="rg-quote-band">
        <span className="rg-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <p className="rg-qb-text">
          "The Fremen did not ask for permission to walk the desert.
          They registered their name in sand and walked anyway."
        </p>
        <span className="rg-qb-attr">— ByteBurst Registration Chronicle, Vol. III</span>
      </div>

    </div>
  );
}