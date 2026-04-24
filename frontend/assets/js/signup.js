import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('Sign Up', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Sign Up</h1>
        <p class="page-subtitle">Use your SJSU Google account to create your CampusHub account.</p>
      </section>

      <div class="form-card auth-card">
        

        <div id="google-signup-btn" style="margin-top: 12px;"></div>

        <p class="note">
          Already have an account?
          <a href="login.html">Login</a>
        </p>
      </div>
    </div>
  `);

  window.handleSignupCredentialResponse = async (response) => {
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
      alert(data.error || "Google sign up failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "home.html";
  };

  

  setTimeout(() => {
    if (!window.google) {
      console.error("Google script not loaded");
      return;
    }

    google.accounts.id.initialize({
      client_id: "749012738925-c24pfprho3d126q0rvsn1pdb0q24b9on.apps.googleusercontent.com",
      callback: handleSignupCredentialResponse
    });

    google.accounts.id.renderButton(
  document.getElementById("google-signup-btn"),
  {
    theme: "outline",
    size: "large",
    text: "signup_with"   
  }
);
  }, 500);
}

init();