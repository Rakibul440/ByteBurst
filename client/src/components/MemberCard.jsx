import "./styles/memberCard.css"
import { InstaIcon, GithubIcon , LinkedInIcon } from "../assets/icon/icon";

/* ─── Profile Card ───────────────────────────────────────── */
export function MemberCard({ member, index }) {
  return (
    <div className="tm-card" style={{ animationDelay: `${index * 0.1}s` }}>

      {/* Image */}
      <div className="tm-card-img-wrap">
        <img
          src={member.img}
          alt={member.name}
          className="tm-card-img"
          onError={e => { e.target.style.display="none"; }}
        />
        <div className="tm-card-sigil">{member.sigil || "⟁"}</div>
        <div className="tm-card-overlay"/>
        <p className="tm-card-img-quote">"{member.quote}"</p>
      </div>

      {/* Body */}
      <div className="tm-card-body">
        <div className="tm-card-num">0{index + 1}</div>
        <h3 className="tm-card-name">{member.name}</h3>
        <p className="tm-card-role">{member.role}</p>
        <span className="tm-card-dune">{member.duneTitle}</span>

        <div className="tm-card-sep">
          <div className="tm-card-sep-line"/>
          <div className="tm-card-sep-dot"/>
        </div>

        <div className="tm-card-socials">
          {member.socials?.linkedin && (
            <a href={member.socials.linkedin} className="tm-social-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon/>
            </a>
          )}
          {member.socials?.github && (
            <a href={member.socials.github} className="tm-social-btn" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon/>
            </a>
          )}
          {member.socials?.instagram && (
            <a href={member.socials.instagram} className="tm-social-btn" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstaIcon/>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}