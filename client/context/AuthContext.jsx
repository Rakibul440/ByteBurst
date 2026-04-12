import { createContext, use, useCallback, useContext, useRef, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null)

export function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    const [status, setStaus] = useState("idle") // idle | loading | authenticated | unauthenticated

    const [flow, setFlow] = useState("idle") // idle | registering | otp | logging_in

    const [error, setError] = useState(null)

    const pendingEmail = useRef(null) // Pending email waiting for OTP verification

    const setAuthenticated = useCallback((userData)=>{
        setUser(userData);
        setStaus("authenticated")
        setError(null)
    },[])

    // signup
    const signupFn = useCallback(async(payload)=>{
        setFlow("Registering")
        setError(null);

        try {
            await authService.signup(payload);
            pendingEmail.current = payload.email
            setFlow("otp")    // -> tigger OTP Screen
            return {sucess : true}
        } catch (error) {
            setError(error.message)
            setFlow("idle")
            throw error
        }
    },[])

    // verifyOtp
    const verifyOtp = useCallback(async (otp)=>{
        setError(null);
        try {
            const email = pendingEmail.current;
            if(!email) throw new Error("No pending registration found")
            
            const {user} = await authService.verifyOtp({email,otp});
            pendingEmail.current = null;

            setAuthenticated(user)
            setFlow("idle")
            return {sucess : true, user : user}
        } catch (error) {
            setError(error.message)
            throw error
        }
    })

    // login
    const loginFn = useCallback(async ({email, password})=>{
        setFlow("Logging_In")
        setError(null)
        try {
            const {user} = await authService.login({email,password});
            
            if(!user.isEmailVerified) {
                pendingEmail.current = email;
                setFlow("otp")
                return {
                    sucess : true, reason : "Otp_Required"
                }
            }

            setAuthenticated(user)
            setUser(user)
            setFlow("idle")
            return {success : true ,user : user}

        } catch (error) {
            setError(error.message)
            setFlow("idle")
            throw error
        }
    },[setAuthenticated]);

    // Healpers
    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading' || status === 'idle';
    const isAdmin = user?.role === "admin"
    const isOTPFlow = flow === "otp";
    const pendingEmailVal = pendingEmail.current;

    const clearError = ()=> setError(null)

    // all context value
    const value = {
        // ---- State
        user,
        status,
        flow,
        error,
        isAuthenticated,
        isLoading,
        isAdmin,
        isOTPFlow,
        pendingEmail : pendingEmailVal,

        // ---- Action
        signupFn,
        loginFn,
        verifyOtp,
        clearError

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};