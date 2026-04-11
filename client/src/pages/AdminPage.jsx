import { useState, useMemo } from "react";
import "./styles/admin.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — Admin Dashboard Page
   DUNE Cinematic Theme · No Navbar · No Cursor
   All CSS prefixed  ap-  (zero conflicts)

   Prisma models covered:
     User · Registration · Event · Team

   ─── PROPS ───────────────────────────────────────────────
   <AdminPage
     admin      = { user object with role:"admin" }
     users      = [ ...User[] with registrations[] ]
     events     = [ ...Event[] with registrations[] & teams[] ]
     teams      = [ ...Team[] with members[] ]
     onDeleteUser    = async (userId) => {}
     onToggleActive  = async (userId, bool) => {}
   />
═══════════════════════════════════════════════════════════ */

/* ─── Mock data (replace with real API) ─────────────────── */
const MOCK_ADMIN = {
  id:"adm001", name:"Rakibul Islam", username:"sietch_commander",
  roll:"ADMIN01", email:"admin@byteburst.dev",
  dept:"CSE", year:"THIRD", role:"admin",
  createdAt:"2024-01-15T00:00:00Z",
  isActive:true, ifEmailVerified:true,
  sessions:[{id:"s1"},{id:"s2"}],
};

const MOCK_USERS = [
  { id:"u1", name:"Aryan Mehta",   username:"aryan_m",  roll:"22CS001", email:"aryan@clg.edu",  dept:"CSE", year:"SECOND", sex:"MALE",   isActive:true,  ifEmailVerified:true,  createdAt:"2024-08-01T00:00:00Z", registrations:[{id:"r1",event:{category:"Code-A-Thon"}},{id:"r2",event:{category:"CSS Warriors"}}] },
  { id:"u2", name:"Sneha Patel",   username:"sneha_p",  roll:"22ECE02", email:"sneha@clg.edu",  dept:"ECE", year:"SECOND", sex:"FEMALE", isActive:true,  ifEmailVerified:true,  createdAt:"2024-08-03T00:00:00Z", registrations:[{id:"r3",event:{category:"Hackathon"}}] },
  { id:"u3", name:"Rohan Das",     username:"rohan_d",  roll:"21ME003", email:"rohan@clg.edu",  dept:"ME",  year:"THIRD",  sex:"MALE",   isActive:false, ifEmailVerified:false, createdAt:"2024-08-05T00:00:00Z", registrations:[] },
  { id:"u4", name:"Kiran Rao",     username:"kiran_r",  roll:"23CE004", email:"kiran@clg.edu",  dept:"CE",  year:"FIRST",  sex:"MALE",   isActive:true,  ifEmailVerified:true,  createdAt:"2024-08-07T00:00:00Z", registrations:[{id:"r4",event:{category:"Tech & Apti Quiz"}},{id:"r5",event:{category:"Bug Bounty"}},{id:"r6",event:{category:"Hackathon"}}] },
  { id:"u5", name:"Meera Singh",   username:"meera_s",  roll:"22EE005", email:"meera@clg.edu",  dept:"EE",  year:"SECOND", sex:"FEMALE", isActive:true,  ifEmailVerified:true,  createdAt:"2024-08-09T00:00:00Z", registrations:[{id:"r7",event:{category:"Graphics Design"}}] },
  { id:"u6", name:"Aarav Kumar",   username:"aarav_k",  roll:"21CSE06", email:"aarav@clg.edu",  dept:"CSE", year:"THIRD",  sex:"MALE",   isActive:false, ifEmailVerified:true,  createdAt:"2024-08-10T00:00:00Z", registrations:[{id:"r8",event:{category:"Prompt Engineering"}},{id:"r9",event:{category:"Code-A-Thon"}}] },
];

const MOCK_EVENTS = [
  { id:"e1", category:"Code-A-Thon",        isTeamEvent:false, registrations:[{id:"r1"},{id:"r8"}] },
  { id:"e2", category:"CSS Warriors",        isTeamEvent:false, registrations:[{id:"r2"}] },
  { id:"e3", category:"Hackathon",           isTeamEvent:true,  registrations:[{id:"r3"},{id:"r6"}] },
  { id:"e4", category:"Tech & Apti Quiz",    isTeamEvent:false, registrations:[{id:"r4"}] },
  { id:"e5", category:"Bug Bounty",          isTeamEvent:false, registrations:[{id:"r5"}] },
  { id:"e6", category:"Graphics Design",     isTeamEvent:false, registrations:[{id:"r7"}] },
  { id:"e7", category:"Prompt Engineering",  isTeamEvent:false, registrations:[{id:"r9"}] },
  { id:"e8", category:"Tech Exhibition",     isTeamEvent:false, registrations:[] },
  { id:"e9", category:"Autocad ME/CE",       isTeamEvent:false, registrations:[] },
  { id:"e10",category:"Techno Commercial",   isTeamEvent:true,  registrations:[] },
];

const MOCK_TEAMS = [
  { id:"t1", teamName:"Sandworm Riders", eventId:"e3", createdAt:"2024-08-12T00:00:00Z", members:[{id:"r3",user:{name:"Sneha Patel"}},{id:"r6",user:{name:"Kiran Rao"}}] },
  { id:"t2", teamName:"Spice Harvesters",eventId:"e10",createdAt:"2024-08-14T00:00:00Z", members:[{id:"rx1",user:{name:"Aryan Mehta"}}] },
];



/* ─── Helpers ────────────────────────────────────────────── */
const fmtDate = iso => iso ? new Date(iso).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"}) : "—";
const initial = name => (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const YEAR_SHORT = { FIRST:"I", SECOND:"II", THIRD:"III", FINAL:"IV" };

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function AdminPage({
  admin        = MOCK_ADMIN,
  users        = MOCK_USERS,
  events       = MOCK_EVENTS,
  teams        = MOCK_TEAMS,
  onDeleteUser    = null,
  onToggleActive  = null,
}) {
  const adm = { ...MOCK_ADMIN, ...admin };

  /* ── Users state ── */
  const [search,    setSearch]    = useState("");
  const [sortKey,   setSortKey]   = useState("name");
  const [sortDir,   setSortDir]   = useState(1);
  const [deptFilter,setDeptFilter]= useState("ALL");
  const [yearFilter,setYearFilter]= useState("ALL");
  const [userList,  setUserList]  = useState(users);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* ── Registrations state ── */
  const [regSort, setRegSort] = useState("count"); // "count" | "name"

  /* ── Filtered + sorted users ── */
  const displayed = useMemo(() => {
    let list = [...userList];
    if (search)       list = list.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.roll.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));
    if (deptFilter !== "ALL") list = list.filter(u => u.dept === deptFilter);
    if (yearFilter !== "ALL") list = list.filter(u => u.year === yearFilter);
    list.sort((a,b) => {
      let va = a[sortKey] ?? ""; let vb = b[sortKey] ?? "";
      if (sortKey === "registrations") { va = a.registrations?.length||0; vb = b.registrations?.length||0; }
      return (va > vb ? 1 : va < vb ? -1 : 0) * sortDir;
    });
    return list;
  }, [userList, search, sortKey, sortDir, deptFilter, yearFilter]);

  const handleSort = key => {
    if (sortKey === key) setSortDir(d => d * -1);
    else { setSortKey(key); setSortDir(1); }
  };
  const arrow = key => sortKey !== key ? "" : sortDir === 1 ? " ↑" : " ↓";

  /* ── Delete flow ── */
  const confirmDelete = user => setDeleteTarget(user);
  const executeDelete = async () => {
    if (!deleteTarget) return;
    setUserList(l => l.filter(u => u.id !== deleteTarget.id));
    if (onDeleteUser) await onDeleteUser(deleteTarget.id);
    setDeleteTarget(null);
  };

  /* ── Sorted events ── */
  const sortedEvents = useMemo(() => {
    return [...events].sort((a,b) => {
      if (regSort === "count") return (b.registrations?.length||0) - (a.registrations?.length||0);
      return a.category.localeCompare(b.category);
    });
  }, [events, regSort]);

  /* ── Dept/Year options ── */
  const depts = ["ALL", ...Array.from(new Set(users.map(u=>u.dept).filter(Boolean)))];
  const years = ["ALL", ...Array.from(new Set(users.map(u=>u.year).filter(Boolean)))];

  const totalRegs = userList.reduce((s,u) => s + (u.registrations?.length||0), 0);
  const activeCount = userList.filter(u=>u.isActive).length;

  return (
    <div className="ap-root">

      {/* ══════════ HERO ══════════ */}
      <section className="ap-hero">
        <div className="ap-hero-glow"/><div className="ap-hero-grain"/>
        <div className="ap-hero-inner">

          {/* Avatar */}
          <div className="ap-avatar ap-rise-1">
            <span className="ap-avatar-init">{initial(adm.name)}</span>
            <div className="ap-avatar-ring"/>
            <span className="ap-admin-badge">Sietch Commander</span>
          </div>

          {/* Text */}
          <div className="ap-hero-text ap-rise-2">
            <span className="ap-hero-eyebrow">⟁ &nbsp; Admin Command Deck &nbsp; ⟁</span>
            <h1 className="ap-hero-name">{adm.name}</h1>
            <p className="ap-hero-handle">@<span>{adm.username||"commander"}</span> &nbsp;·&nbsp; {adm.roll}</p>
            <div className="ap-hero-tags">
              <span className="ap-tag gold">{adm.dept || "—"}</span>
              <span className="ap-tag">{adm.year || "—"}</span>
              <span className={`ap-tag ${adm.isActive?"green":"red"}`}>{adm.isActive?"Active":"Inactive"}</span>
              <span className={`ap-tag ${adm.ifEmailVerified?"green":"red"}`}>{adm.ifEmailVerified?"Verified":"Unverified"}</span>
              <span className="ap-tag">Since {fmtDate(adm.createdAt)}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="ap-stat-bar ap-rise-3">
            <div className="ap-stat">
              <span className="ap-stat-num">{userList.length}</span>
              <span className="ap-stat-lbl">Contestants</span>
            </div>
            <div className="ap-stat">
              <span className="ap-stat-num">{activeCount}</span>
              <span className="ap-stat-lbl">Active</span>
            </div>
            <div className="ap-stat">
              <span className="ap-stat-num">{totalRegs}</span>
              <span className="ap-stat-lbl">Registrations</span>
            </div>
            <div className="ap-stat">
              <span className="ap-stat-num">{teams.length}</span>
              <span className="ap-stat-lbl">Teams</span>
            </div>
          </div>

        </div>
      </section>

      <div className="ap-body">

        {/* ══════════ ADMIN CREDENTIALS ══════════ */}
        <div className="ap-card ap-rise-1" style={{padding:"2rem 2.2rem"}}>
          <div className="ap-card-corner tl"/><div className="ap-card-corner tr"/>
          <div className="ap-card-corner bl"/><div className="ap-card-corner br"/>
          <div className="ap-sec-head">
            <div className="ap-sec-head-left">
              <span className="ap-section-label">⟁ &nbsp; Commander Identity &nbsp; ⟁</span>
              <h2 className="ap-section-title">Admin Credentials</h2>
              <p className="ap-sec-head-sub">"Carved in the bedrock of Arrakis. These sigils do not change."</p>
            </div>
          </div>
          <div className="ap-cred-grid">
            {[
              { k:"Blood Name",      v:adm.name },
              { k:"Username",        v:`@${adm.username||"—"}`,  gold:true },
              { k:"Sietch Number",   v:adm.roll,                 gold:true },
              { k:"Spice Channel",   v:adm.email },
              { k:"House",           v:adm.dept||"—" },
              { k:"Cycle",           v:adm.year||"—" },
              { k:"System Role",     v:adm.role?.toUpperCase(),  gold:true },
              { k:"Account Status",  v:adm.isActive,             bool:true, boolKey:"isActive" },
              { k:"Email Verified",  v:adm.ifEmailVerified,      bool:true },
              { k:"Initiation Date", v:fmtDate(adm.createdAt) },
            ].map(c => (
              <div key={c.k} className="ap-cred-row">
                <span className="ap-cred-key">{c.k}</span>
                {c.bool ? (
                  <span className={`ap-cred-val`}>
                    <span className={`ap-verified ${c.v?"yes":"no"}`}>{c.v?"✓ Yes":"✕ No"}</span>
                  </span>
                ) : (
                  <span className={`ap-cred-val${c.gold?" gold":""}`}>{c.v}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ QUOTE BAND 1 ══════════ */}
        <div className="ap-quote-band">
          <span className="ap-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ap-qb-text">"The commander does not merely observe the desert. The commander shapes it — one decision, one deletion, one deployment at a time."</p>
          <span className="ap-qb-attr">— Sietch Command Doctrine, Article I</span>
        </div>

        {/* ══════════ USERS TABLE ══════════ */}
        <div className="ap-card ap-rise-2" style={{padding:"2rem 2.2rem"}}>
          <div className="ap-card-corner tl"/><div className="ap-card-corner tr"/>
          <div className="ap-card-corner bl"/><div className="ap-card-corner br"/>

          <div className="ap-sec-head">
            <div className="ap-sec-head-left">
              <span className="ap-section-label">⟁ &nbsp; The Desert Walkers &nbsp; ⟁</span>
              <h2 className="ap-section-title">Contestants ({userList.length})</h2>
              <p className="ap-sec-head-sub">"Every name in this register is a soul who walked into the trial."</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="ap-toolbar">
            <div className="ap-search-wrap">
              <span className="ap-search-icon">⟁</span>
              <input
                className="ap-search-input"
                placeholder="Search by name, roll, email…"
                value={search} onChange={e=>setSearch(e.target.value)}
              />
            </div>
            <select className="ap-filter-select" value={deptFilter} onChange={e=>setDeptFilter(e.target.value)}>
              {depts.map(d=><option key={d} value={d}>{d==="ALL"?"All Depts":d}</option>)}
            </select>
            <select className="ap-filter-select" value={yearFilter} onChange={e=>setYearFilter(e.target.value)}>
              {years.map(y=><option key={y} value={y}>{y==="ALL"?"All Years":y}</option>)}
            </select>
          </div>

          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  {[
                    {label:"Contestant",   key:"name"},
                    {label:"Sietch No.",   key:"roll"},
                    {label:"House",        key:"dept"},
                    {label:"Cycle",        key:"year"},
                    {label:"Status",       key:"isActive"},
                    {label:"Verified",     key:"ifEmailVerified"},
                    {label:"Trials",       key:"registrations"},
                    {label:"Joined",       key:"createdAt"},
                    {label:"Remove",       key:null},
                  ].map(col => (
                    <th
                      key={col.label}
                      className={`ap-th${sortKey===col.key?" sorted":""}`}
                      onClick={()=>col.key&&handleSort(col.key)}
                    >
                      {col.label}{col.key&&<span className="ap-th-arrow">{arrow(col.key)}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayed.length === 0 && (
                  <tr><td colSpan={9} className="ap-empty">"No contestants match the current filter."</td></tr>
                )}
                {displayed.map(u => (
                  <tr key={u.id} className="ap-tr">
                    <td className="ap-td">
                      <div className="ap-td-name">{u.name}</div>
                      <div className="ap-td-sub">{u.email}</div>
                    </td>
                    <td className="ap-td"><span className="ap-td-mono">{u.roll}</span></td>
                    <td className="ap-td"><span className="ap-td-chip ap-chip-dept">{u.dept||"—"}</span></td>
                    <td className="ap-td"><span className="ap-td-chip ap-chip-year">{u.year ? YEAR_SHORT[u.year] : "—"}</span></td>
                    <td className="ap-td"><span className={`ap-td-chip ${u.isActive?"ap-chip-active":"ap-chip-inactive"}`}>{u.isActive?"Active":"Inactive"}</span></td>
                    <td className="ap-td"><span className={`ap-td-chip ${u.ifEmailVerified?"ap-chip-verified":"ap-chip-unverified"}`}>{u.ifEmailVerified?"✓":"✕"}</span></td>
                    <td className="ap-td"><span className="ap-reg-count">{u.registrations?.length||0}</span></td>
                    <td className="ap-td"><span className="ap-td-sub">{fmtDate(u.createdAt)}</span></td>
                    <td className="ap-td">
                      <button className="ap-del-btn" onClick={()=>confirmDelete(u)}>✕ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════ QUOTE BAND 2 ══════════ */}
        <div className="ap-quote-band">
          <span className="ap-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ap-qb-text">"The Spacing Guild tracks every soul who traverses the stars. An admin tracks every soul who enters the sietch. Both are acts of sacred stewardship."</p>
          <span className="ap-qb-attr">— Guild Navigator's Log on Administration</span>
        </div>

        {/* ══════════ REGISTRATIONS BY EVENT ══════════ */}
        <div className="ap-card ap-rise-3" style={{padding:"2rem 2.2rem"}}>
          <div className="ap-card-corner tl"/><div className="ap-card-corner tr"/>
          <div className="ap-card-corner bl"/><div className="ap-card-corner br"/>

          <div className="ap-sec-head">
            <div className="ap-sec-head-left">
              <span className="ap-section-label">⟁ &nbsp; The Trials &nbsp; ⟁</span>
              <h2 className="ap-section-title">Registrations by Event</h2>
              <p className="ap-sec-head-sub">"Track which trials draw the most desert walkers."</p>
            </div>
            <div style={{display:"flex",gap:".5rem"}}>
              <button className={`ap-sort-btn${regSort==="count"?" active":""}`} onClick={()=>setRegSort("count")}>By Count</button>
              <button className={`ap-sort-btn${regSort==="name"?" active":""}`}  onClick={()=>setRegSort("name")}>A–Z</button>
            </div>
          </div>

          <div className="ap-event-grid">
            {sortedEvents.map(ev => (
              <div key={ev.id} className="ap-event-tile">
                <div className="ap-event-cat">{ev.category}</div>
                <div className="ap-event-type">{ev.isTeamEvent ? "Team Trial" : "Solo Trial"}</div>
                <div className="ap-event-count-row">
                  <div>
                    <div className="ap-event-count-num">{ev.registrations?.length||0}</div>
                    <div className="ap-event-count-lbl">Registered</div>
                  </div>
                  {ev.isTeamEvent && <span className="ap-event-team-chip">⟁ Team</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ TEAMS LIST ══════════ */}
        <div className="ap-card ap-rise-4" style={{padding:"2rem 2.2rem"}}>
          <div className="ap-card-corner tl"/><div className="ap-card-corner tr"/>
          <div className="ap-card-corner bl"/><div className="ap-card-corner br"/>

          <div className="ap-sec-head">
            <div className="ap-sec-head-left">
              <span className="ap-section-label">⟁ &nbsp; The Houses &nbsp; ⟁</span>
              <h2 className="ap-section-title">Registered Teams ({teams.length})</h2>
              <p className="ap-sec-head-sub">"Every team is a house. Every house has a name worth remembering."</p>
            </div>
          </div>

          {teams.length === 0 ? (
            <p className="ap-empty">"No teams have formed yet. The desert waits."</p>
          ) : (
            <div className="ap-teams-list">
              {teams.map((t,i) => {
                const ev = events.find(e=>e.id===t.eventId);
                return (
                  <div key={t.id} className="ap-team-row">
                    <span className="ap-team-num">{String(i+1).padStart(2,"0")}</span>
                    <div className="ap-team-body">
                      <span className="ap-team-name">{t.teamName}</span>
                      <div className="ap-team-event">{ev?.category||t.eventId}</div>
                      <div className="ap-team-members">
                        {t.members?.map(m=>m.user?.name).filter(Boolean).join(" · ") || "No members listed"}
                      </div>
                    </div>
                    <div style={{textAlign:"center",flexShrink:0}}>
                      <div className="ap-team-count">{t.members?.length||0}</div>
                      <div style={{fontFamily:"'Cinzel',serif",fontSize:".38rem",letterSpacing:".15em",textTransform:"uppercase",color:"#7A6548"}}>Members</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ══════════ FINAL QUOTE ══════════ */}
        <div className="ap-quote-band">
          <span className="ap-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
          <p className="ap-qb-text">"The sietch commander who does not know the names of every walker is no commander at all. Know your people. Protect the data. Guard the spice."</p>
          <span className="ap-qb-attr">— ByteBurst Admin Doctrine, Final Inscription</span>
        </div>

      </div>

      {/* ══════════ DELETE CONFIRM MODAL ══════════ */}
      {deleteTarget && (
        <div className="ap-confirm-overlay" onClick={()=>setDeleteTarget(null)}>
          <div className="ap-confirm-box" onClick={e=>e.stopPropagation()}>
            <span className="ap-confirm-sigil">⟁</span>
            <h2 className="ap-confirm-title">Banish from the Sietch?</h2>
            <p className="ap-confirm-sub">
              "You are about to erase <span className="ap-confirm-name">{deleteTarget.name}</span> ({deleteTarget.roll}) from the desert's memory. This action cannot be undone. All their registrations shall be lost to the sands."
            </p>
            <div className="ap-confirm-btns">
              <button className="ap-confirm-yes" onClick={executeDelete}>✕ Banish</button>
              <button className="ap-confirm-no"  onClick={()=>setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}