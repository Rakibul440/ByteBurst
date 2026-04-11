import { useState, useRef, useEffect, useCallback } from "react";
import "./styles/otpVerify.css"

/* ═══════════════════════════════════════════════════════════
   ByteBurst — OTP Verification Component
   DUNE Cinematic Theme · Reusable · No Navbar · No Cursor
   All CSS prefixed  ot-  (zero conflicts)

   ─── PROPS ───────────────────────────────────────────────
   <OTPVerify
     email        = "user@college.edu"      ← shows masked email
     length       = {6}                     ← OTP digit count (4 or 6)
     onVerify     = async (otp) => {}       ← called with full OTP string
     onResend     = async ()    => {}       ← called on resend click
     resendCooldown = {60}                  ← seconds before resend allowed
   />
═══════════════════════════════════════════════════════════ */

/* ─── mask email helper ──────────────────────────────────── */
const maskEmail = email => {
  if (!email) return "your spice channel";
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const visible = user.slice(0, 2);
  const masked  = "*".repeat(Math.max(0, user.length - 2));
  return `${visible}${masked}@${domain}`;
};



/* ─── Sand particle config ───────────────────────────────── */
const SAND = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  size:  3 + Math.random() * 5,
  left:  `${5 + Math.random() * 90}%`,
  top:   `${10 + Math.random() * 80}%`,
  tx:    `${(Math.random() - .5) * 30}px`,
  ty:    `${-15 - Math.random() * 35}px`,
  dur:   `${5 + Math.random() * 8}s`,
  delay: `${Math.random() * 6}s`,
}));

/* ─── Quotes pool ────────────────────────────────────────── */
const OTP_QUOTES = [
  { text: "The cipher knows no mercy for those who hesitate. Speak it now or surrender the passage.", attr: "— Gate-Warden's Doctrine, Sietch Tabr" },
  { text: "A Mentat does not guess the code. A Mentat calculates, verifies, and knows.", attr: "— Mentat School of Ix, Primary Axiom" },
  { text: "The Voice cannot be faked. Neither can this key. Enter it as it was written — precisely.", attr: "— Bene Gesserit Authentication Rites" },
  { text: "Every lock on Arrakis was designed by a Fremen. Every key was memorised, never written down.", attr: "— Fremen Security Proverb" },
  { text: "The password to paradise is spoken once. If you forget it, the desert claims you.", attr: "— Sayings of Muad'Dib, Vol. II" },
];

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function OTPVerify({
  email           = "user@college.edu",
  length          = 6,
  onVerify        = null,
  onResend        = null,
  resendCooldown  = 60,
}) {
  const [digits,   setDigits]   = useState(Array(length).fill(""));
  const [copied,   setCopied]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [particles,setParticles]= useState([]);
  const [quote]    = useState(() => OTP_QUOTES[Math.floor(Math.random() * OTP_QUOTES.length)]);

  const inputRefs = useRef([]);
  const cardRef   = useRef(null);

  /* ── Cooldown timer ── */
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  /* ── Full OTP string ── */
  const otp     = digits.join("");
  const isReady = otp.length === length;

  /* ── Handle digit input ── */
  const handleChange = useCallback((index, value) => {
    const cleaned = value.replace(/\D/g, "").slice(-1);
    setError("");
    setHasError(false);
    const next = [...digits];
    next[index] = cleaned;
    setDigits(next);
    if (cleaned && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, [digits, length]);

  /* ── Handle backspace ── */
  const handleKeyDown = useCallback((index, e) => {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits]; next[index] = "";
        setDigits(next);
      } else if (index > 0) {
        const next = [...digits]; next[index - 1] = "";
        setDigits(next);
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft"  && index > 0)           inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < length - 1)  inputRefs.current[index + 1]?.focus();
  }, [digits, length]);

  /* ── Handle paste ── */
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!text) return;
    const next = Array(length).fill("");
    text.split("").forEach((ch, i) => { next[i] = ch; });
    setDigits(next);
    setError(""); setHasError(false);
    const focusIdx = Math.min(text.length, length - 1);
    inputRefs.current[focusIdx]?.focus();
  }, [length]);

  /* ── Copy OTP to clipboard ── */
  const handleCopy = useCallback(() => {
    if (!isReady) return;
    navigator.clipboard.writeText(otp).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {
      /* fallback */
      const el = document.createElement("textarea");
      el.value = otp; document.body.appendChild(el);
      el.select(); document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  }, [otp, isReady]);

  /* ── Burst particles on success ── */
  const spawnBurst = useCallback(() => {
    const rect   = cardRef.current?.getBoundingClientRect();
    const cx     = (rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2);
    const cy     = (rect ? rect.top  + rect.height / 2 : window.innerHeight / 2);
    const items  = Array.from({ length: 18 }, (_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const dist  = 60 + Math.random() * 80;
      return {
        id: i,
        left: cx, top: cy,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist - 20,
        size: 3 + Math.random() * 5,
        dur: `.${4 + Math.floor(Math.random() * 4)}s`,
      };
    });
    setParticles(items);
    setTimeout(() => setParticles([]), 1000);
  }, []);

  /* ── Submit ── */
  const handleSubmit = useCallback(async () => {
    if (!isReady) { setError("Complete the cipher — all digits required."); setHasError(true); return; }
    setLoading(true); setError("");
    try {
      if (onVerify) await onVerify(otp);
      spawnBurst();
      setTimeout(() => setSuccess(true), 200);
    } catch (err) {
      setError(err?.message || "The cipher was rejected. The desert does not forgive.");
      setHasError(true);
      setDigits(Array(length).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    } finally {
      setLoading(false);
    }
  }, [isReady, otp, onVerify, spawnBurst, length]);

  /* ── Resend ── */
  const handleResend = useCallback(async () => {
    if (cooldown > 0) return;
    setCooldown(resendCooldown);
    setDigits(Array(length).fill(""));
    setError(""); setHasError(false);
    if (onResend) await onResend();
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  }, [cooldown, resendCooldown, onResend, length]);

  /* ── OTP display (dots for empty) ── */
  const otpDisplay = digits.map(d => d || "·").join(" ");

  /* ── Render ── */
  return (
    <div className="ot-page">
      {/* Background */}
      <div className="ot-page-glow"/>
      <div className="ot-page-grain"/>
      {SAND.map(s => (
        <div key={s.id} className="ot-sand-dot" style={{
          width: s.size, height: s.size,
          left: s.left, top: s.top,
          "--tx": s.tx, "--ty": s.ty,
          "--dur": s.dur, "--delay": s.delay,
        }}/>
      ))}

      {/* Burst particles */}
      {particles.map(p => (
        <div key={p.id} className="ot-burst-particle" style={{
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          "--tx": `${p.tx}px`, "--ty": `${p.ty}px`,
          "--dur": p.dur,
        }}/>
      ))}

      {/* ── Card ── */}
      <div className="ot-card" ref={cardRef}>
        <div className="ot-corner ot-c-tl"/>
        <div className="ot-corner ot-c-tr"/>
        <div className="ot-corner ot-c-bl"/>
        <div className="ot-corner ot-c-br"/>

        {success ? (
          /* ════ SUCCESS SCREEN ════ */
          <div className="ot-success">
            <span className="ot-success-rune">⟁</span>
            <h2 className="ot-success-title">Passage Granted</h2>
            <div className="ot-success-line"/>
            <p className="ot-success-body">
              "The desert has spoken your name and found it worthy.
              Your identity is confirmed. Walk forward without fear."
            </p>
            <span className="ot-success-attr">— Gate-Warden of Sietch Tabr</span>
          </div>
        ) : (
          /* ════ OTP FORM ════ */
          <>
            {/* Header */}
            <div className="ot-header">
              <span className="ot-sigil">⟁</span>
              <div className="ot-badge">Voice Cipher Verification</div>
              <h1 className="ot-title">Speak the Code</h1>
              <p className="ot-subtitle">
                "The desert sent a cipher to your spice channel.
                Enter it before the sands shift."
              </p>
              <span className="ot-email">{maskEmail(email)}</span>
            </div>

            {/* OTP digit inputs */}
            <div className="ot-inputs-wrap" onPaste={handlePaste}>
              {digits.map((d, i) => (
                <>
                  {i === 3 && length === 6 && (
                    <span key="sep" className="ot-sep">·</span>
                  )}
                  <input
                    key={i}
                    ref={el => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    onFocus={e => e.target.select()}
                    className={`ot-digit${d ? " filled" : ""}${hasError ? " error" : ""}`}
                    autoComplete="one-time-code"
                  />
                </>
              ))}
            </div>

            {/* Copy row */}
            <div className="ot-copy-row">
              <span className={`ot-copy-display${isReady ? " complete" : ""}`}>
                {otpDisplay}
              </span>
              <button
                className={`ot-copy-btn${copied ? " copied" : ""}`}
                onClick={handleCopy}
                disabled={!isReady}
                title="Copy OTP to clipboard"
              >
                <span className="ot-copy-icon">{copied ? "✓" : "⧉"}</span>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="ot-error-msg">
                <div className="ot-error-gem"/>
                {error}
                <div className="ot-error-gem"/>
              </div>
            )}

            {/* Divider */}
            <div className="ot-divider">
              <div className="ot-div-line"/>
              <div className="ot-div-gem"/>
              <div className="ot-div-line r"/>
            </div>

            {/* Submit */}
            <button
              className={`ot-submit${loading ? " loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading || !isReady}
            >
              {loading
                ? "Consulting the Oracle…"
                : isReady
                  ? "Confirm the Cipher  →"
                  : `Enter All ${length} Digits`}
            </button>

            {/* Resend */}
            <div className="ot-resend-row">
              The cipher fades.
              <button
                className="ot-resend-btn"
                onClick={handleResend}
                disabled={cooldown > 0}
              >
                {cooldown > 0 ? "Resend" : "Resend the Signal"}
              </button>
              {cooldown > 0 && (
                <span className="ot-cooldown">({cooldown}s)</span>
              )}
            </div>

            {/* Quote */}
            <p className="ot-quote">"{quote.text}"</p>
            <p className="ot-quote-attr">{quote.attr}</p>
          </>
        )}
      </div>
    </div>
  );
}