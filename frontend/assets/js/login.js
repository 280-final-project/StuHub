import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('Login', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Login</h1>
        <p class="page-subtitle">Sign in with your SJSU Google account.</p>
      </section>

      <div class="form-card auth-card">
        <div id="google-login-btn" style="margin-top: 12px;"></div>

        <p class="note">
          Don't have an account?
          <a href="signup.html">Sign Up</a>
        </p>
      </div>
    </div>
  `);

  window.handleCredentialResponse = async (response) => {
    try {
      const idToken = response.credential;

      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idToken })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert(data.error || "Google login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      window.location.href = "home.html";
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  setTimeout(() => {
    if (!window.google) {
      console.error("Google script not loaded");
      return;
    }

    google.accounts.id.initialize({
      client_id: "749012738925-c24pfprho3d126q0rvsn1pdb0q24b9on.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );
  }, 500);
}

init();