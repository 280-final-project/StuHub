import { injectLayout, setContent } from './app.js';

const GOOGLE_CLIENT_ID = '749012738925-c24pfprho3d126q0rvsn1pdb0q24b9on.apps.googleusercontent.com';
const BACKEND_URL = 'http://localhost:5000';

function handleGoogleResponse(response) {
  if (!response?.credential) {
    alert('Google sign-in failed.');
    return;
  }

  fetch(`${BACKEND_URL}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken: response.credential,
    }),
  })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Sign up failed');
      }

      localStorage.setItem('isLoggedIn', 'true');
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

      window.location.href = 'home.html';
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || 'Sign up failed');
    });
}

function initGoogleButton() {
  const googleBtnWrap = document.getElementById('google-signup-button');
  if (!window.google || !googleBtnWrap) return;

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleResponse,
  });

  google.accounts.id.renderButton(googleBtnWrap, {
    theme: 'outline',
    size: 'large',
    shape: 'pill',
    width: 320,
    text: 'signup_with',
  });
}

function init() {
  injectLayout('Sign Up', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Sign Up</h1>
        <p class="page-subtitle">Create your CampusHub account with Google.</p>
      </section>

      <form class="form-card auth-card" id="signup-form">
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            placeholder="Your Google profile name"
            disabled
          >
        </div>

        <div class="form-group">
          <label for="signup-email">SJSU Email</label>
          <input
            id="signup-email"
            type="email"
            placeholder="name@sjsu.edu"
            disabled
          >
        </div>

        <div id="google-signup-button" class="google-auth-wrap"></div>

        <p class="note">
          Your account will be created automatically when you continue with Google.
        </p>

        <p class="note">
          Already have an account?
          <a href="login.html">Login</a>
        </p>
      </form>
    </div>
  `);

  const form = document.getElementById('signup-form');
  form.addEventListener('submit', (e) => e.preventDefault());

  setTimeout(initGoogleButton, 200);
}

init();