import { useAuth } from "../../hooks/useAuth";
import {Navigate} from "react-router-dom"

export default function ProtectedRoute({
    children,
    adminOnly = false,
    redirectTo = '/auth'
}){
    const {isAuthenticated , isLoading , isAdmin} = useAuth()

    if(isLoading) return <div style={{
        minHeight:"100vh", background:"#070604",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"Cinzel,serif", color:"#C8891A", fontSize:".6rem",
        letterSpacing:".3em"
    }}>
        ⟁ &nbsp; CONSULTING THE DATABASE…
    </div>

    if(!isAuthenticated) return <Navigate to={redirectTo} replace/>
    if(adminOnly && !isAdmin) return <Navigate to="/" replace />

    return children
}