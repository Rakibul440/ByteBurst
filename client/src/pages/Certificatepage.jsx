import { useEffect, useRef, useState } from "react";
import "./styles/certificatepage.css"

import clglogo from "../assets/img/clglogopng.png"
import dd from "../assets/img/DDsign.png"
import somen from "../assets/img/somensign.png"
import arpan from "../assets/img/arpansign.png"


import html2canvas from "html2canvas";
import { api } from "../../config/axios";
import { useAuth } from "../../hooks/useAuth";

const downloadCertImage = async (elementId, fileName = "certificate.png") => {
    const element = document.getElementById(elementId);

    if (!element) {
        console.error("Certificate element not found:", elementId);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
        scale: 3, // 🔥 high quality for certificates
        useCORS: true,
        backgroundColor: "#FDFBF4", // match your cert background
        });

        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (err) {
        console.error("Image download failed:", err);
    }
};


/* ─── Default mock data ──────────────────────────────────── */
const MOCK_USER = {
  name:  "Aryan Mehta",
  roll:  "22CS001",
  dept:  "CSE",
  year:  "SECOND",
  email: "aryan@college.edu",
};

const MOCK_REGS = [
  { id:"r1", event:{ id:"e1", category:"Code-A-Thon",          }},
  { id:"r2", event:{ id:"e2", category:"CSS Warriors",        }},
  { id:"r3", event:{ id:"e3", category:"Hackathon",   teamName:"Sandworm Riders" }},
];

const MOCK_SIGS = [
  { name:"DeepJyoti Santra",    title:"Assistant professor\nDepartment of Electrical Engineering",     signImg: dd },
  { name:"Somen Mondol",      title:"Head of Department\nComputer Science & Engg.",   signImg: somen },
  { name:"Arpan Mukherjee",  title:"Tech Head\nCooch Behar Govt. Engg.",           signImg: arpan },
];

const YEAR_FULL = { FIRST:"First Year", SECOND:"Second Year", THIRD:"Third Year", FINAL:"Final Year" };
const CAT_COLOR = {
  Coding:"#7ABAC8", Frontend:"#7AC8A0", AI:"#A87AC8",
  Creative:"#D4826A", Quiz:"#8A9EBA", Design:"#9AB87A",
  Business:"#BA9A5A", Build:"#E8A020", Security:"#BA7A7A",
  Exhibition:"#C8891A",
};

/* ─── generate cert ID ───────────────────────────────────── */
const certId = (roll, eventId) =>
  `BB-III-${eventId.toUpperCase().replace(/\W/g,"")}-${roll.toUpperCase()}-${new Date().getFullYear()}`;
/* ─── Corner SVG ornament ────────────────────────────────── */
const CornerOrnament = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2 L2 20 M2 2 L20 2" stroke="#8B6914" strokeWidth="1.5" fill="none"/>
    <path d="M2 2 L14 14" stroke="rgba(139,105,20,.4)" strokeWidth=".8"/>
    <circle cx="2" cy="2" r="2.5" fill="#8B6914"/>
    <circle cx="20" cy="2" r="1.2" fill="rgba(139,105,20,.6)"/>
    <circle cx="2" cy="20" r="1.2" fill="rgba(139,105,20,.6)"/>
    <path d="M6 6 Q14 6 14 14" stroke="rgba(139,105,20,.25)" strokeWidth=".6" fill="none"/>
    <rect x="8" y="1" width="3" height="3" transform="rotate(45 9 2)" fill="rgba(139,105,20,.3)"/>
    <rect x="1" y="8" width="3" height="3" transform="rotate(45 2 9)" fill="rgba(139,105,20,.3)"/>
  </svg>
);

/* ─── The Certificate Component ──────────────────────────── */
const Certificate = ({ user, reg, signatories, collegeName, collegeShort, eventDate, certRef, watermarkImg }) => {
  const ev       = reg.event;
  // const catColor = CAT_COLOR[ev.category] || "#C8891A";
  const id       = certId(user.roll, ev.id);

  return (
    <div
      ref={certRef}
      className="ct-cert"
      // style={{ "--cat-c": catColor }}
      id={`cert-${ev.id}`}
    >
      {/* Category colour bar */}
      <div className="ct-cert-cat-bar"/>

      {/* Borders */}
      <div className="ct-cert-border-outer"/>
      <div className="ct-cert-border-inner"/>

      {/* Corner ornaments */}
      <div className="ct-cert-corner tl"><CornerOrnament/></div>
      <div className="ct-cert-corner tr"><CornerOrnament/></div>
      <div className="ct-cert-corner bl"><CornerOrnament/></div>
      <div className="ct-cert-corner br"><CornerOrnament/></div>

      {/* Watermark — replace src with your college logo PNG */}
      <img className="ct-cert-wm" src={watermarkImg} alt="" aria-hidden="true"/>
      <div className="ct-cert-glow"/>

      {/* Content */}
      <div className="ct-cert-content">

        {/* Institute header */}
        <div className="ct-cert-institute">
          <div className="ct-cert-inst-name">{collegeName}</div>
          <div className="ct-cert-inst-sub">Technical Students' Association &nbsp;·&nbsp; ByteBurst Chapter III &nbsp;·&nbsp; {eventDate}</div>
          <div className="ct-cert-inst-line"/>
          <div className="ct-cert-inst-line2"/>
        </div>

        {/* CERTIFICATE OF PARTICIPATION */}
        <div className="ct-cert-heading-wrap">
          <span className="ct-cert-of">This is to certify that</span>
          <div className="ct-cert-heading">Certificate of Participation</div>
          <div className="ct-cert-heading-line">
            <div className="ct-cert-hl"/>
            <div className="ct-cert-hd"/>
            <div className="ct-cert-hl"/>
          </div>
        </div>

        {/* Presented to */}
        <div className="ct-cert-presented">is proudly presented to</div>

        {/* NAME */}
        <div className="ct-cert-name">{user.name}</div>
        <div className="ct-cert-name-line"/>

        {/* Body text */}
        <div className="ct-cert-body-text">
          for their dedicated participation in{" "}
          <strong>ByteBurst — A Tech Saga Chapter III</strong>, the annual technical festival organised by {collegeName}.
          This certificate acknowledges their commitment to innovation, excellence, and the relentless pursuit of knowledge.
        </div>

        {/* Event highlight */}
        <div className="ct-cert-event-block">
          <span className="ct-cert-event-label">Event Participated</span>
          <div className="ct-cert-event-name-cert">{ev.category}</div>
          {/* <div className="ct-cert-event-dune-cert">{ev.duneTitle}</div> */}
          {ev.teamName && (
            <div className="ct-cert-event-team">Team: {ev.teamName}</div>
          )}
        </div>

        {/* Participant details */}
        <div className="ct-cert-details">
          {[
            { k:"Roll No.", v: user.roll },
            { k:"Department", v: user.dept },
            { k:"Year", v: YEAR_FULL[user.year] || user.year },
          ].map((d, i) => (
            <div key={i} className="ct-cert-detail-chip">
              {i > 0 && <span className="ct-cert-detail-sep"/>}
              <span style={{color:"rgba(139,105,20,.55)",fontSize:".85em"}}>{d.k}:&nbsp;</span>
              {d.v}
            </div>
          ))}
        </div>

        {/* Cert ID */}
        <div className="ct-cert-id">Certificate No.: {id}</div>

        <div className="ct-cert-spacer"/>

        {/* Signatories */}
        <div className="ct-cert-sigs">
          {signatories.map((sig, i) => (
            <div key={i} className="ct-cert-sig-block">
              <div className="ct-cert-sig-img-wrap">
                {sig.signImg
                  ? <img src={sig.signImg} alt={`${sig.name} signature`} className="ct-cert-sig-img"/>
                  : (
                    <div className="ct-cert-sig-placeholder">
                      <span className="ct-cert-sig-placeholder-text">Signature</span>
                    </div>
                  )
                }
              </div>
              <div className="ct-cert-sig-name">{sig.name}</div>
              <div className="ct-cert-sig-title">{sig.title}</div>
            </div>
          ))}
        </div>

      </div>

      {/* Seal */}
      <div className="ct-cert-seal">
        <div className="ct-cert-seal-ring"/>
        <div className="ct-cert-seal-ring2"/>
        <div className="ct-cert-seal-text">{collegeShort}<br/>BB<br/>III</div>
      </div>

    </div>
  );
};


/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function CertificatePage({
  // user          = MOCK_USER,
  // registrations : initialRegistrations =  MOCK_REGS,
  signatories   = MOCK_SIGS,
  collegeName   = "Cooch Behar Government Engineering College",
  collegeShort  = "CGEC",
  eventDate     = "April 14-15, 2026",
  watermarkImg  = clglogo,   // ← replace with your college logo PNG path e.g. "/logo.png"
}) {
  const [loading, setLoading] = useState({});

  const {isAuthenticated,user , error, } = useAuth()


  const [registrations, setRegistrations] = useState([]);


  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await api.get("/user/registrations");
        console.log(response.data.user.registrations)
        setRegistrations(response.data.user.registrations);
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
      }
    };

    fetchRegistrations();
  }, []);

    const hasCerts = registrations && registrations.length > 0;

  return (
    <div className="ct-page">
      {/* <style>{CSS}</style> */}

      {/* ── Hero ── */}
      <section className="ct-hero">
        <div className="ct-hero-bg"/><div className="ct-hero-grain"/>
        <span className="ct-hero-eyebrow">⟁ &nbsp; ByteBurst Chapter III &nbsp; ⟁</span>
        <h1 className="ct-hero-title">Certificates</h1>
        <p className="ct-hero-sub">
          "The desert remembers every name inscribed in its sand."
        </p>
        <div className="ct-hero-orn">
          <div className="ct-orn-line"/><div className="ct-orn-gem"/><div className="ct-orn-line r"/>
        </div>
      </section>

      <div className="ct-body">

        {!hasCerts ? (
          <div className="ct-no-certs">
            <span className="ct-nc-sigil">⟁</span>
            <h2 className="ct-nc-title">No Certificates Yet</h2>
            <p className="ct-nc-body">
              "The desert only grants passage to those who have entered its trials.
              Register for an event to earn your certificate."
            </p>
          </div>
        ) : (
          <>
            {/* Quote intro */}
            <div className="ct-qband" style={{paddingTop:"0"}}>
              <span className="ct-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁</span>
              <p className="ct-qb-text">
                "A certificate is not a trophy. It is a declaration — proof that you chose to walk when others waited, that you built when others watched, and that the desert found you worthy."
              </p>
              <span className="ct-qb-attr">— ByteBurst Certificate Doctrine, Chapter III</span>
            </div>

            {/* One certificate block per registered event */}
            {registrations.map((reg, i) => (
              <div key={reg.id} className="ct-event-block" style={{ animationDelay:`${i * .12}s` }}>

                {/* Label bar above cert */}
                <div className="ct-event-label-bar">
                  <div className="ct-event-label-left">
                    {/* <span className="ct-event-eyebrow">⟁ &nbsp; {reg.event.category} &nbsp;·&nbsp; Certificate {i + 1} of {registrations.length}</span> */}
                    <span className="ct-event-name">{reg.event.category}</span>
                    {/* <span className="ct-event-dune">{reg.event.duneTitle}</span> */}
                  </div>
                  <button
                    className="ct-dl-btn"
                    onClick={() => {
                        const ev = reg.event;
                        downloadCertImage(
                        `cert-${ev.id}`,
                        `Certificate-${user.name}-${ev.category}.png`
                        );
                    }}
                    >
                    <span className="ct-dl-icon">🖼</span>
                    Download Image
                  </button>
                </div>

                {/* The certificate */}
                <div className="ct-cert-outer">
                  <Certificate
                    user={user}
                    reg={reg}
                    signatories={signatories}
                    collegeName={collegeName}
                    collegeShort={collegeShort}
                    eventDate={eventDate}
                    watermarkImg={watermarkImg}

                  />
                </div>

              </div>
            ))}

            {/* Closing quote */}
            <div className="ct-qband">
              <span className="ct-qb-sigil">⟁ &nbsp; ✦ &nbsp; ⟁ &nbsp; ✦ &nbsp; ⟁</span>
              <p className="ct-qb-text">
                "Carry this scroll into the world. Let it speak before you enter every room. The desert forged you here — let the world know."
              </p>
              <span className="ct-qb-attr">— ByteBurst Closing Address, Chapter III</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}