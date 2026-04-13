import { useState } from "react";
import "./styles/profile.css"
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";


/* ═══════════════════════════════════════════════════════════
   ByteBurst — User Profile Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS prefixed  up-  (zero conflicts)

   ─── USAGE ───────────────────────────────────────────────
   <UserProfilePage
     user={{
       id:         "clx1234abc",
       username:   "desert_walker",          ← READ-ONLY (never editable)
       name:       "Aryan Mehta",
       roll:       "22CS001",                ← READ-ONLY
       email:      "aryan@college.edu",      ← READ-ONLY
       dept:       "CSE",
       year:       "SECOND",
       sex:        "MALE",
       whatsAppNo: "9876543210",
       role:       "user",
       createdAt:  "2024-08-01T00:00:00Z",
       registrations: [
         { id:"r1", event:{ name:"Code-A-Thon", category:"Coding" } },
         { id:"r2", event:{ name:"CSS Warriors", category:"Frontend" } },
       ],
     }}
     onUpdate={(updatedFields) => console.log(updatedFields)}
   />
═══════════════════════════════════════════════════════════ */

/* ─── Enums matching Prisma schema ──────────────────────── */
const DEPT_OPTIONS = ["CSE","ECE","EE","ME","CE"];
const YEAR_OPTIONS = ["FIRST","SECOND","THIRD","FOURTH"];
const SEX_OPTIONS  = ["MALE","FEMALE","OTHER"];

const YEAR_DUNE = {
  FIRST:  "First Cycle — The Initiate",
  SECOND: "Second Cycle — The Apprentice",
  THIRD:  "Third Cycle — The Adept",
  FOURTH: "Fourth Cycle — The Navigator",
};
const DEPT_DUNE = {
  CSE: "House of Code",  ECE:  "House of Systems",
  EE: "House of Waves", 
  ME:  "House of Steel", CE:  "House of Earth",
};
const ROLE_DUNE = { user:"Desert Walker", admin:"Sietch Commander", coordinator:"Guild Navigator" };

/* ─── Default mock user (remove when wiring real API) ────── */
const DEFAULT_USER = {
  id: "clx1234abc",
  username: "desert_walker",
  name: "Afrina Ahmed",
  roll: "22CS001",
  email: "afrina@college.edu",
  dept: "CSE",
  year: "SECOND",
  sex: "FEMALE",
  whatsAppNo: "9876543210",
  role: "user",
  createdAt: "2024-08-01T00:00:00Z",
  registrations: [
    { id:"r1", event:{ name:"",       category:""   } },
    { id:"r2", event:{ name:"",       category:"" } },
    { id:"r3", event:{ name:"", category:""       } },
  ],
};

/* ─── Category accent colours ────────────────────────────── */
const CAT_COLORS = {
  Coding:"#7ABAC8", Frontend:"#7AC8A0", AI:"#A87AC8",
  Creative:"#D4826A", Quiz:"#8A9EBA", Design:"#9AB87A",
  Business:"#BA9A5A", Build:"#E8A020", Security:"#BA7A7A",
  Exhibition:"#C8891A",
};


/* ─── Field components ───────────────────────────────────── */
function EditInput({ label, name, value, onChange, readOnly, placeholder }) {
  return (
    <div className="up-edit-field">
      <label className="up-edit-label">
        {label}
        {readOnly && <span className="up-readonly-badge">locked</span>}
      </label>
      <div className="up-edit-wrap">
        {readOnly ? (
          <div className="up-edit-readonly">{value || "—"}</div>
        ) : (
          <>
            <input
              className="up-edit-input"
              name={name}
              value={value || ""}
              onChange={onChange}
              placeholder={placeholder}
              autoComplete="off"
            />
            <div className="up-edit-bar"/>
          </>
        )}
      </div>
    </div>
  );
}

function EditSelect({ label, name, value, onChange, options }) {
  return (
    <div className="up-edit-field">
      <label className="up-edit-label">{label}</label>
      <div className="up-edit-wrap">
        <select className="up-edit-select" name={name} value={value || ""} onChange={onChange}>
          <option value="">— Select —</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="up-select-arr">▾</span>
        <div className="up-edit-bar"/>
      </div>
    </div>
  );
}

/* ─── DataRow ────────────────────────────────────────────── */
function DataRow({ label, value, dune, gold, muted }) {
  return (
    <div className="up-data-row">
      <span className="up-data-label">{label}</span>
      <span className={`up-data-value${gold?" gold":muted?" muted":""}`}>
        {value || <span className="up-data-value muted">Not set</span>}
      </span>
      {dune && <span className="up-data-dune">{dune}</span>}
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────── */
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" });
}
function initial(name) {
  return (name || "?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function UserProfile({
  user    = DEFAULT_USER,
  onUpdate = null,
}) {
  const u = { ...DEFAULT_USER, ...user };

  /* ── editable fields (excludes: id, username, roll, email, role, createdAt) ── */
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  const { updateProfile} = useAuth()


  const [draft, setDraft] = useState({
    name:       u.name       || "",
    dept:       u.dept       || "",
    year:       u.year       || "",
    sex:        u.sex        || "",
    whatsAppNo: u.whatsAppNo || "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setDraft(d => ({ ...d, [name]: value }));
  };

const handleSave = async () => {
  setSaving(true);

  try {
    await new Promise(r => setTimeout(r, 800));

    // console.log(draft)
    await updateProfile(draft);

    toast.success("Updated successfully");
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);

  } catch (error) {
    console.error(error);
    toast.error(error?.message || "Failed to update");
  } finally {
    setSaving(false); // ✅ always runs
  }
};

  const handleCancel = () => {
    setDraft({
      name:       u.name       || "",
      dept:       u.dept       || "",
      year:       u.year       || "",
      sex:        u.sex        || "",
      whatsAppNo: u.whatsAppNo || "",
    });
    setEditing(false);
  };

  const regs = u.registrations || [];

  return (
    <div className="up-root">


      {/* ════ HERO IDENTITY ════ */}
      <section className="up-hero">
        <div className="up-hero-glow"/>
        <div className="up-hero-grain"/>

        <div className="up-identity">

          {/* Avatar */}
          <div className="up-avatar-wrap">
            <div className="up-avatar">
              <span className="up-avatar-initial">{initial(u.name)}</span>
              <div className="up-avatar-ring"/>
            </div>
            <span className="up-role-badge">{ROLE_DUNE[u.role] || u.role}</span>
          </div>

          {/* Identity text */}
          <div className="up-identity-text">
            <span className="up-identity-eyebrow">⟁ &nbsp; Desert Walker Profile &nbsp; ⟁</span>
            <h1 className="up-identity-name">{u.name}</h1>
            <p className="up-identity-handle">
              @<span>{u.username || "unnamed"}</span>
              &nbsp;·&nbsp; {u.roll}
            </p>
            <div className="up-identity-meta">
              {u.dept && <span className="up-meta-chip gold">{DEPT_DUNE[u.dept] || u.dept}</span>}
              {u.year && <span className="up-meta-chip">{YEAR_DUNE[u.year] || u.year}</span>}
              <span className="up-meta-chip">Joined {fmtDate(u.createdAt)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="up-stats">
            <div className="up-stat">
              <span className="up-stat-num">{regs.length}</span>
              <span className="up-stat-lbl">Trials Entered</span>
            </div>
            <div className="up-stat">
              <span className="up-stat-num">{u.dept || "—"}</span>
              <span className="up-stat-lbl">House</span>
            </div>
            <div className="up-stat">
              <span className="up-stat-num">{u.year ? u.year.charAt(0) : "—"}</span>
              <span className="up-stat-lbl">Cycle</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════ MAIN BODY ════ */}
      <div className="up-body">

        {/* ── LEFT: Profile Data ── */}
        <div className="up-profile-panel">

          {/* ── Personal Information ── */}
          <div className="up-section">
            <div className="up-sec-c tl"/><div className="up-sec-c tr"/>
            <div className="up-sec-c bl"/><div className="up-sec-c br"/>

            <div className="up-sec-header">
              <div>
                <div className="up-sec-title-wrap">
                  <div className="up-sec-gem"/>
                  <span className="up-sec-title">Personal Manifest</span>
                </div>
                <p className="up-sec-subtitle">"The desert knows your true name. Update it when you must."</p>
              </div>
              <button
                className={`up-edit-btn${editing?" active":""}`}
                onClick={() => editing ? handleCancel() : setEditing(true)}
              >
                {editing ? "✕ Cancel" : "✎ Edit Manifest"}
              </button>
            </div>

            {editing ? (
              /* ── EDIT MODE ── */
              <>
                <div className="up-edit-grid">
                  <EditInput label="Blood Name" name="name"
                    value={draft.name} onChange={handleChange}
                    placeholder="Your full name"/>
                  <EditInput label="Sietch Number (Roll)" name="roll"
                    value={u.roll} readOnly/>
                  <EditInput label="Spice Channel (Email)" name="email"
                    value={u.email} readOnly/>
                  <EditInput label="Username" name="username"
                    value={u.username} readOnly/>
                  <EditInput label="WhatsApp Transmission" name="whatsAppNo"
                    value={draft.whatsAppNo} onChange={handleChange}
                    placeholder="10-digit WhatsApp number"/>
                  <EditSelect label="House / Department" name="dept"
                    value={draft.dept} onChange={handleChange}
                    options={DEPT_OPTIONS}/>
                  <EditSelect label="Cycle Year" name="year"
                    value={draft.year} onChange={handleChange}
                    options={YEAR_OPTIONS}/>
                  <EditSelect label="Sex" name="sex"
                    value={draft.sex} onChange={handleChange}
                    options={SEX_OPTIONS}/>
                </div>
                <div className="up-edit-actions">
                  <button className="up-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? "Inscribing to the Sand…" : "Save Manifest →"}
                  </button>
                  <button className="up-cancel-btn" onClick={handleCancel}>Abandon Changes</button>
                  {saved && <span className="up-saved-flash">⟁ &nbsp; Manifest Updated</span>}
                </div>
              </>
            ) : (
              /* ── VIEW MODE ── */
              <div className="up-data-grid">
                <DataRow label="Blood Name" value={u.name} />
                <DataRow
                  label="Sietch Number"
                  value={<>{u.roll} <span className="up-readonly-badge">locked</span></>}
                  gold
                />
                <DataRow
                  label="Spice Channel (Email)"
                  value={<>{u.email} <span className="up-readonly-badge">locked</span></>}
                />
                <DataRow
                  label="Username"
                  value={<>@{u.username || "—"} <span className="up-readonly-badge">locked</span></>}
                  gold
                />
                <DataRow
                  label="WhatsApp Transmission"
                  value={u.whatsAppNo || null}
                  muted={!u.whatsAppNo}
                />
                <DataRow
                  label="House / Department"
                  value={u.dept || null}
                  dune={u.dept ? DEPT_DUNE[u.dept] : null}
                  gold={!!u.dept}
                  muted={!u.dept}
                />
                <DataRow
                  label="Cycle Year"
                  value={u.year || null}
                  dune={u.year ? YEAR_DUNE[u.year] : null}
                  muted={!u.year}
                />
                <DataRow label="Sex" value={u.sex || null} muted={!u.sex} />
              </div>
            )}
          </div>

          {/* ── Identity & Access ── */}
          <div className="up-section" style={{animationDelay:".3s"}}>
            <div className="up-sec-c tl"/><div className="up-sec-c tr"/>
            <div className="up-sec-c bl"/><div className="up-sec-c br"/>
            <div className="up-sec-header">
              <div>
                <div className="up-sec-title-wrap">
                  <div className="up-sec-gem"/>
                  <span className="up-sec-title">Identity & Access</span>
                </div>
                <p className="up-sec-subtitle">"These credentials are carved in the bedrock of Arrakis. They do not change."</p>
              </div>
            </div>
            <div className="up-data-grid">
              <DataRow label="Assigned Role" value={ROLE_DUNE[u.role] || u.role} gold />
              <DataRow label="System Role" value={u.role?.toUpperCase()} />
              <DataRow label="Contestant ID" value={u.id} />
              <DataRow label="Date of Initiation" value={fmtDate(u.createdAt)} />
            </div>
          </div>

        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="up-sidebar">

          {/* Registrations */}
          <div className="up-side-card">
            <h3 className="up-side-title">
              <span className="up-side-title-gem"/>
              Trials Entered
            </h3>
            {regs.length === 0 ? (
              <p className="up-reg-empty">"No trial has been entered yet. The desert waits."</p>
            ) : (
              <div className="up-reg-list">
                {regs.map(r => {
                  const cat   = r.event?.category || "Other";
                  const color = CAT_COLORS[cat] || "#7A6548";
                  return (
                    <div key={r.id} className="up-reg-item">
                      <div className="up-reg-dot" style={{"--dot-c": color}}/>
                      <span className="up-reg-name">{r.event?.name || "Unknown Trial"}</span>
                      <span className="up-reg-cat">{cat}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* DUNE Quote */}
          <div className="up-quote-card">
            <p className="up-qc-text">
              "The mystery of life isn't a problem to solve, but a reality to experience.
              Your profile is not a form. It is a declaration."
            </p>
            <span className="up-qc-attr">— Reverend Mother's Profile Doctrine</span>
          </div>

          {/* Account info */}
          <div className="up-side-card">
            <h3 className="up-side-title">
              <span className="up-side-title-gem"/>
              Account Sigils
            </h3>
            <div className="up-account-rows">
              <div className="up-acc-row">
                <span className="up-acc-key">Email</span>
                <span className="up-acc-val">{u.email}</span>
              </div>
              <div className="up-acc-row">
                <span className="up-acc-key">Roll No.</span>
                <span className="up-acc-val gold">{u.roll}</span>
              </div>
              <div className="up-acc-row">
                <span className="up-acc-key">Role</span>
                <span className="up-acc-val gold">{u.role}</span>
              </div>
              <div className="up-acc-row">
                <span className="up-acc-key">Member Since</span>
                <span className="up-acc-val">{fmtDate(u.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Second quote */}
          <div className="up-quote-card">
            <p className="up-qc-text">
              "A person needs new experiences. They jar something deep inside,
              allowing you to grow. Without change, something sleeps inside."
            </p>
            <span className="up-qc-attr">— Duke Leto Atreides on Personal Growth</span>
          </div>

        </div>
      </div>

      {/* ── Bottom Quote Band ── */}
      <div className="up-quote-band">
        <span className="up-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
        <p className="up-qb-text">
          "Your name is your first weapon and your last shield.
          Keep it sharp. Keep it true. The desert remembers every contestant
          who walked its sands with purpose."
        </p>
        <span className="up-qb-attr">— ByteBurst Hall of Champions, Inscription VII</span>
      </div>

    </div>
  );
}