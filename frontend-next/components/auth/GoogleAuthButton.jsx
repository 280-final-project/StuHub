"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { fetchJSON } from "@/lib/api";

export default function GoogleAuthButton({ mode = "login" }) {
  const { login, signup } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    try {
      const data = await fetchJSON("/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      if (mode === "signup") {
        signup(data.token, data.user);
      } else {
        login(data.token, data.user);
      }
    } catch (err) {
      alert(err.message || `${mode === "signup" ? "Sign up" : "Login"} failed`);
    }
  };

  return (
    <div className="google-auth-wrap auth-google-big">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => alert("Google sign-in failed")}
        theme="outline"
        size="large"
        shape="rectangular"
        width="420"
        text={mode === "signup" ? "signup_with" : "continue_with"}
      />
    </div>
  );
}
