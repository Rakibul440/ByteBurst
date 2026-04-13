import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | authenticated | unauthenticated
  const [flow, setFlow] = useState("idle"); // idle | registering | otp | logging_in
  const [error, setError] = useState(null);

  const pendingEmail = useRef(null);

  // Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  // Set authenticated user + persist
  const setAuthenticated = useCallback((userData) => {
    setUser(userData);
    setStatus("authenticated");
    localStorage.setItem("user", JSON.stringify(userData));
    setError(null);
  }, []);

  // ---------------- SIGNUP ----------------
  const signupFn = useCallback(async (payload) => {
    setFlow("registering");
    setError(null);

    try {
      await authService.signup(payload);
      pendingEmail.current = payload.email;
      setFlow("otp");

      return { success: true };
    } catch (error) {
      setError(error.message);
      setFlow("idle");
      throw error;
    }
  }, []);

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = useCallback(async (otp) => {
    setError(null);

    try {
      const email = pendingEmail.current;
      if (!email) throw new Error("No pending registration found");

      const { user } = await authService.verifyOtp({ email, otp });

      pendingEmail.current = null;

      setAuthenticated(user);
      setFlow("idle");

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }, [setAuthenticated]);

  // ---------------- LOGIN ----------------
  const loginFn = useCallback(
    async ({ email, password }) => {
      setFlow("logging_in");
      setError(null);

      try {
        const { user } = await authService.login({ email, password });

        if (!user.isEmailVerified) {
          pendingEmail.current = email;
          setFlow("otp");

          return {
            success: true,
            reason: "Otp_Required",
          };
        }

        setAuthenticated(user);
        setFlow("idle");

        return { success: true, user };
      } catch (error) {
        setError(error.message);
        setFlow("idle");
        throw error;
      }
    },
    [setAuthenticated]
  );

  // ---------------- LOGOUT ----------------
  const logout = useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
    localStorage.removeItem("user");
  }, []);

  // ---------------- Update Profile ----------------
  const updateProfile = useCallback(
  async (data) => {
    setError(null);

    try {
      const { user } = await authService.updateUserProfile(data);

      setAuthenticated(user);
      setFlow("idle");

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      setFlow("idle");
      throw error;
    }
  },
  [setAuthenticated]
);

  // ---------------- HELPERS ----------------
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "idle"; // 👈 important fix
  const isAdmin = user?.role === "admin";
  const isOTPFlow = flow === "otp";

  const clearError = () => setError(null);

  const value = {
    // state
    user,
    status,
    flow,
    error,
    isAuthenticated,
    isLoading,
    isAdmin,
    isOTPFlow,
    pendingEmail: pendingEmail.current,

    // actions
    signupFn,
    loginFn,
    verifyOtp,
    logout,
    clearError,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ---------------- HOOK ----------------
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};