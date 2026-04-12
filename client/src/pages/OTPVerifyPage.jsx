import { useEffect, useState } from "react";
import OTPVerify from "./Otpverify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// OTPVerifyPage.jsx
export default function OTPVerifyPage() {
  const { verifyOtp, pendingEmail, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  /* Navigate once user populates after verifyOTP */
  useEffect(() => {
    if (pending && isAuthenticated && user?.id) {
      navigate(`/profile/${user.id}`);
      setPending(false);
    }
  }, [user, isAuthenticated, pending]);

  console.log(pendingEmail)

  return (
    <OTPVerify
      email={pendingEmail}
      length={6}
      onVerify={async (otp) => {
        await verifyOtp(otp);
        setPending(true); // ← triggers useEffect above
      }}
    //   onResend={resendOTP}
      resendCooldown={60}
    />
  );
}