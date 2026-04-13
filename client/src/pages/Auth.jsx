import { useEffect, useState } from "react";
import "./styles/auth.css"
import { Field } from "../components/Field";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";


export default function Auth() {
  const [page, setPage] = useState("login"); // "login" | "signup"
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({ name: "", roll: "", email: "", password: "" });

  const [pending, setPending] = useState(false); // waiting for user to populate
  const navigate = useNavigate()

  const {signupFn, loginFn, isAuthenticated,user , error, } = useAuth()

  console.log(isAuthenticated)


  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setSubmitted(true);

  //   if(page === 'login'){

  //     if (!login.email.trim()) return toast.error("Transmission frequency is required.");
  //     if (!login.password.trim()) return toast.error("Voice cipher is required.");

  //     const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  //     if (!emailRegex.test(login.email)) return toast.error("Enter correct email")

  //     try {

  //       const result = await loginFn({
  //         email : login.email,
  //         password : login.password
  //       })

  //       if(result.reason ==="Otp_Required"){
  //         navigate("/verify");
  //         return
  //       }
  //       localStorage.setItem("user", JSON.stringify(result.user));

  //       toast.success("Successfully Logged in")
  //       setSubmitted(false)
        
  //       navigate(`/profile/${result.user.username}`)

  //     } catch (error) {
  //       console.log(error.message)
  //       toast.error("The cipher was not recognised. The desert does not forgive.")
  //     }
  //   }
  //   else if(page === 'signup'){
  //       // Basic client-side validation
  //       if (!signup.name.trim())     return toast.error("Blood name is required.");
  //       if (!signup.roll.trim())     return toast.error("Sietch number is required.");
  //       if (!signup.email.trim())    return toast.error("Transmission frequency is required.");
  //       if (signup.password.length < 4) return toast.error("Voice cipher must be at least 4 characters.");
        
  //       const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  //       const rollRegex = /^349\d{8}$/
  //       if (!emailRegex.test(signup.email)) return toast.error("Enter correct email")
  //       if (!rollRegex.test(signup.roll)) return toast.error("Enter correct roll")

  //       try {
  //         await signupFn({
  //           name:     signup.name.trim(),
  //           roll:     signup.roll.trim(),
  //           email:    signup.email.trim(),
  //           password: signup.password,
  //         })
  //         localStorage.setItem("verifyEmail", signup.email);
  //         toast.success("Enter Otp to verify")
  //         navigate("/verify")

  //       } catch (error) {
  //         toast.error(error.message || "The desert rejected your passage. Try again.");
  //       }
  //   }
    
  // };


    const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true);

    if(page === 'login'){

      if (!login.email.trim()) return toast.error("Transmission frequency is required.");
      if (!login.password.trim()) return toast.error("Voice cipher is required.");

      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(login.email)) return toast.error("Enter correct email")

      try {

        const result = await loginFn({
          email : login.email,
          password : login.password
        })

        if(result.reason ==="Otp_Required"){
          navigate("/verify");
          return
        }
        localStorage.setItem("user", JSON.stringify(result.user));

        toast.success("Successfully Logged in")
        setSubmitted(false)
        
        navigate(`/profile/${result.user.username}`)

      } catch (error) {
        console.log(error.message)
        toast.error("The cipher was not recognised. The desert does not forgive.")
      }
    }
    else if(page === 'signup'){
        // Basic client-side validation
        if (!signup.name.trim())     return toast.error("Blood name is required.");
        if (!signup.roll.trim())     return toast.error("Sietch number is required.");
        if (!signup.email.trim())    return toast.error("Transmission frequency is required.");
        if (signup.password.length < 4) return toast.error("Voice cipher must be at least 4 characters.");
        
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        const rollRegex = /^349\d{8}$/
        if (!emailRegex.test(signup.email)) return toast.error("Enter correct email")
        if (!rollRegex.test(signup.roll)) return toast.error("Enter correct roll")

        try {
          await signupFn({
            name:     signup.name.trim(),
            roll:     signup.roll.trim(),
            email:    signup.email.trim(),
            password: signup.password,
          })
          localStorage.setItem("verifyEmail", signup.email);
          toast.success("Enter Otp to verify")
          const username = "@" + signup.email.split('@')[0] + '-' + roll.slice(-8)

          navigate(`/profile/${username}`)

        } catch (error) {
          console.log(error.message)
          toast.error(error.message || "The desert rejected your passage. Try again.");
        }
    }
    
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
                  label="Blood Name [Name]"
                  id="name"
                  placeholder="Your chosen name"
                  value={signup.name}
                  onChange={e => setSignup({ ...signup, name: e.target.value })}
                />
                <Field
                  label="Sietch Number [Roll No]"
                  id="roll"
                  placeholder="House sigil code"
                  value={signup.roll}
                  onChange={e => setSignup({ ...signup, roll: e.target.value })}
                />
              </>
            )}
            <Field
              label="Transmission Frequency [Email]"
              id="email"
              type="email"
              placeholder="spice.channel@arrakis.dune"
              value={page === "login" ? login.email : signup.email}
              onChange={e => page === "login"
                ? setLogin({ ...login, email: e.target.value })
                : setSignup({ ...signup, email: e.target.value })}
            />
            <Field
              label="Voice Cipher [Password]"
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