import { useState } from "react";
import "./styles/auth.css"
import { Field } from "../components/Field";
import { toast } from "sonner";



export default function Auth() {
  const [page, setPage] = useState("login"); // "login" | "signup"
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", roll: "", email: "", password: "" });

  const handleSubmit = () => {
    setSubmitted(true);
    if(page === 'login'){
        toast.success("loggid in successfully")
    }
    else if(page === 'signup'){
        toast.success("registered successfully")
    }
    setTimeout(() => setSubmitted(false), 2500);
  };

  const switchPage = (p) => {
    setPage(p);
    setSubmitted(false);
    setShowPass(false);
  };

  return (
    <>
      <div className="dune-root">
        <div className="dune-card">
          {/* Corner ornaments */}
          <div className="corner corner-tl" />
          <div className="corner corner-tr" />
          <div className="corner corner-bl" />
          <div className="corner corner-br" />

          {/* Sigil */}
          <div className="dune-sigil">⟁ ✦ ⟁</div>

          {/* Heading */}
          <h1 className="dune-heading">
            {page === "login" ? "Return to Arrakis" : "Seek Passage"}
          </h1>
          <p className="dune-subtitle">
            {page === "login"
              ? '"The desert remembers those who walked it before"'
              : '"Only those worthy shall walk the sands"'}
          </p>

          {/* Toggle */}
          <div className="page-toggle">
            <button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className={`toggle-btn ${page === "login" ? "active" : ""}`} onClick={() => switchPage("login")}>
              Return
            </button>
            <button data-dune-text="ENTER THE SIETCH" data-dune-hover="true" className={`toggle-btn ${page === "signup" ? "active" : ""}`} onClick={() => switchPage("signup")}>
              Seek Passage
            </button>
          </div>

          {/* Fields */}
          <div className="fields-enter" key={page}>
            {page === "signup" && (
              <>
                <Field
                  label="Blood Name"
                  id="name"
                  placeholder="Your chosen name"
                  value={signup.name}
                  onChange={e => setSignup({ ...signup, name: e.target.value })}
                />
                <Field
                  label="Sietch Number"
                  id="roll"
                  placeholder="House sigil code"
                  value={signup.roll}
                  onChange={e => setSignup({ ...signup, roll: e.target.value })}
                />
              </>
            )}
            <Field
              label="Transmission Frequency"
              id="email"
              type="email"
              placeholder="spice.channel@arrakis.dune"
              value={page === "login" ? login.email : signup.email}
              onChange={e => page === "login"
                ? setLogin({ ...login, email: e.target.value })
                : setSignup({ ...signup, email: e.target.value })}
            />
            <Field
              label="Voice Cipher"
              id="password"
              placeholder="Your Atreides key"
              value={page === "login" ? login.password : signup.password}
              onChange={e => page === "login"
                ? setLogin({ ...login, password: e.target.value })
                : setSignup({ ...signup, password: e.target.value })}
              showToggle
              showPass={showPass}
              onToggle={() => setShowPass(!showPass)}
            />
          </div>

          {/* Forgot */}
          {page === "login" && (
            <div className="dune-forgot">
              <a>Lost your Voice Cipher?</a>
            </div>
          )}

          {/* Divider */}
          <div className="dune-divider">
            <div className="dune-divider-line" />
            <div className="dune-divider-diamond" />
            <div className="dune-divider-line" />
          </div>

          {/* Button */}
          <button data-dune-hover="true" className={`dune-btn ${submitted ? "success" : ""}`} onClick={handleSubmit}>
            {submitted
              ? "✦  The Spice Flows  ✦"
              : page === "login"
                ? "Enter the Sietch  →"
                : "Walk Without Rhythm  →"}
          </button>

          {/* Footer */}
          <p className="dune-footer">
            {page === "login" ? (
              <>First time on Arrakis?{" "}
                <span className="dune-link" onClick={() => switchPage("signup")}>Seek Passage</span>
              </>
            ) : (
              <>Already a desert walker?{" "}
                <span className="dune-link" onClick={() => switchPage("login")}>Return to Arrakis</span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}