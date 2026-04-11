import { useEffect, useRef, useState } from "react";
import "./styles/navbar.css"
import { Link } from "react-router-dom";


const DEFAULT_LINKS = [
  { label: "Home",    href: "/",    duneLabel: "The Lore"   },
  { label: "Events",   href: "/events",   duneLabel: "The Trials" },
  { label: "Organizer", href: "/organizers", duneLabel: "The Lords"   },
  { label: "Team",     href: "/team",     duneLabel: "The House"  },
  { label: "Prizes",     href: "/prizes",     duneLabel: "The Artifacts"  },

];


/* ─── Component ──────────────────────────────────────────── */
export default function Navbar({
      onRegister    = () => {},
  links         = DEFAULT_LINKS,
  logoTo        = "/",
  scrollThreshold = 40,
}) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const [authenticated, setAuthenticated] = useState(false)

  const user = {
    name : "Rakibul Islam",
    username : "@Raki-001230311"
  }

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  /* ── Lock body scroll when drawer open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* ── Close on resize to desktop ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleRegister = () => {
    setMenuOpen(false);
    onRegister();
  };

  return (
    <>
      {/* <style>{NAVBAR_CSS}</style> */}

      {/* ── Navbar bar ── */}
      <nav className={`dn-root ${scrolled ? "scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="dn-inner">

          {/* ── Logo ── */}
          <a className="dn-logo" href={logoTo} aria-label="ByteBurst Home">
            <span className="dn-logo-sigil">⟁</span>
            <span className="dn-logo-word dn-logo-byte">Byte</span>
            <span className="dn-logo-word dn-logo-burst">Burst</span>
            <span className="dn-logo-tag">A Tech Saga · Chapter III</span>
          </a>

          {/* ── Desktop links ── */}
          <ul className="dn-links" role="list">
            {links.map((link) => (
              <li key={link.label} className="dn-link-item">
                <Link
                  to={link.href}
                  className="dn-link"
                  aria-label={link.label}
                >
                  <span className="dn-link-label">{link.label}</span>
                  {link.duneLabel && (
                    <span className="dn-link-dune" aria-hidden="true">{link.duneLabel}</span>
                  )}
                  <span className="dn-link-bar" aria-hidden="true"/>
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop register button ── */}
          {
            !authenticated ? (
              <button
              className="dn-register"
              onClick={handleRegister}
              aria-label="Register for ByteBurst"
            >
              <div data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="dn-register-inner">
                <div className="dn-register-fill" aria-hidden="true"/>
                <span className="dn-register-main"><Link to="/auth">Seek Passage</Link></span>
                <span className="dn-register-sub"> <Link to="/auth">Register Now</Link> </span>
              </div>
            </button>
            ) : (
              <button
                className="dn-register"
                aria-label="Register for ByteBurst"
              >
                <div data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className="dn-register-inner">
                  <div className="dn-register-fill" aria-hidden="true"/>
                  <span className="dn-register-main"><Link to={`profile/${user.username}`}>{user.name}</Link></span>
                  <span className="dn-register-sub"> <Link to={`profile/${user.username}`}>{user.username}</Link> </span>
                </div>
              </button>
            )
          }

          {/* ── Mobile hamburger ── */}
          <button
            className={`dn-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="dn-ham-line"/>
            <span className="dn-ham-line"/>
            <span className="dn-ham-line"/>
          </button>

        </div>
      </nav>

      {/* ── Mobile backdrop ── */}
      <div
        className={`dn-backdrop ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <div
        className={`dn-drawer ${menuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            className="dn-drawer-link"
            onClick={() => setMenuOpen(false)}
          >
            <span className="dn-drawer-num">0{i + 1}</span>
            <span className="dn-drawer-main">{link.label}</span>
            {link.duneLabel && (
              <span className="dn-drawer-dune">{link.duneLabel}</span>
            )}
          </a>
        ))}

        
        <div className="dn-drawer-cta">
          <button className="dn-drawer-register" onClick={handleRegister}>
            <span className="dn-drawer-register-label"><Link to={"/auth"}>Seek Passage</Link> </span>
            <span className="dn-drawer-register-sub"><Link to="/auth">Register for ByteBurst</Link></span>
          </button>
        </div>
      </div>
    </>
  );
}