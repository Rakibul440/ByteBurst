import {Routes, Route, useNavigate, Navigate} from "react-router-dom"
import Auth from "./pages/Auth";
import {Toaster} from "sonner"
import Cursor from "./components/Cursor";
import UserProfile from "./pages/UserProfile";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import EventsPage from "./pages/EventsPage";
import CodeOThon from "./pages/registrations/Code-O-Thon";
import TechExhibition from "./pages/registrations/TechExhibition";
import GraphicsDesign from "./pages/registrations/GraphicsDesign";
import TechAptiQuiz from "./pages/registrations/TechAptiQuiz";
import Autocad from "./pages/registrations/Autocad";
import TechnoCommercial from "./pages/registrations/TechnoCommercial";
import Hackathon from "./pages/registrations/Hackathon";
import PromptEngineering from "./pages/registrations/PromptEngineering";
import BugBunty from "./pages/registrations/BugBunty";
import CssWarriors from "./pages/registrations/CssWarriors";
import AdminPage from "./pages/AdminPage";
import OrganizersPage from "./pages/Organizers";
import PrizePage from "./pages/Prizepage";
import Footer from "./components/Footer";
import AboutPage from "./pages/Aboutpage";
import HackathonProblemStatement from "./pages/HackathonProblemStatement";


import {useAuth} from "../hooks/useAuth"
import ProtectedRoute from "./components/ProtectedRoute";
import OTPVerifyPage from "./pages/OTPVerifyPage";
import axios from "axios";

export default function App() {

  const navigate = useNavigate()

  const {isAuthenticated, isOTPFlow, user, logout} = useAuth()

    const userObj = JSON.parse(localStorage.getItem("user"));



  return (
    <div className="App">
      <Toaster toastOptions={{
        style: {
          background: "#1a120b",
          color: "#ffb347",
          border: "1px solid rgba(255,180,80,0.3)",
          borderRadius : '0px'
        }}} 
      />
      <Cursor />
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage/>} />

        <Route path="/auth" element={ isAuthenticated ? <Navigate to={`/profile/${user?.username}`} replace/> : <Auth/>}/>
        <Route path="/verify" element={isOTPFlow ? <OTPVerifyPage/> : <Navigate to="/auth" replace />} />

        {/* Protected */}
        <Route path="/profile/:userId" element={
          <ProtectedRoute>
            <UserProfile user={user} onUpdate={null}/>
          </ProtectedRoute>
        }/>

        <Route path="/admin/profile/" element={
          <ProtectedRoute adminOnly>
            <AdminPage/>
          </ProtectedRoute>
        } />

        <Route path="/team" element={<TeamPage/>} />
        <Route path="/organizers" element={<OrganizersPage/>} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/prizes" element={<PrizePage/>} />
        <Route path="/about" element={<AboutPage/>}  onRegister={() => navigate("/auth")} onExplore={()  => navigate("/events")}/>
        <Route path="/events/hackathon/problem-statements" element={<HackathonProblemStatement/>} onRegister={() => navigate("/events/hackathon")}  />



        {/* Registration page */}
        <Route path="/events/code-a-thon" element={<CodeOThon/>} />
        <Route path="/events/tech-exhibition" element={<TechExhibition/>} />
        <Route path="/events/graphics-design" element={<GraphicsDesign/>} />
        <Route path="/events/tech-apti-quiz" element={<TechAptiQuiz/>} />
        <Route path="/events/autocad" element={<Autocad/>} />
        <Route path="/events/techno-commercial" element={<TechnoCommercial/>} />
        <Route path="/events/hackathon" element={<Hackathon/>} />
        <Route path="/events/prompt-engineering" element={<PromptEngineering/>} />
        <Route path="/events/bug-bounty" element={<BugBunty/>} />
        <Route path="/events/css-warriors" element={<CssWarriors/>} />

        
      </Routes>

      <Footer />

    </div>
  );
}