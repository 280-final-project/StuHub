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
        throw new Error(data.error || 'Login failed');
      }

      const ADMIN_EMAILS = [
        'vedjigneshkumar.dabhi@sjsu.edu',
        'prabhjotsingh@sjsu.edu',
        'rafael.caculba@sjsu.edu',
        'email4@sjsu.edu'
      ];

      const isAdmin = ADMIN_EMAILS.includes(data.user.email.toLowerCase());

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAdmin', String(isAdmin));

      window.location.href = isAdmin ? 'admin.html' : 'home.html';
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || 'Login failed');
    });
}

function initGoogleButton() {
  const googleBtnWrap = document.getElementById('google-login-button');
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
    text: 'continue_with',
  });
}

function init() {
  injectLayout('Login', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Login</h1>
        <p class="page-subtitle">Sign in to continue with your SJSU Google account.</p>
      </section>

      <form class="form-card auth-card" id="login-form">
        <div class="form-group">
          <label for="login-email">SJSU Email</label>
          <input
            id="login-email"
            type="email"
            placeholder="name@sjsu.edu"
            disabled
          >
        </div>

        <div class="form-group password-group">
          <label for="login-password">Password</label>
          <div class="password-wrapper">
            <input
              id="login-password"
              type="password"
              placeholder="Enter password"
              disabled
            >
            <img
              src="../assets/icons/eye.png"
              id="toggle-password"
              class="toggle-password"
              alt="Show password"
            >
          </div>
        </div>

        <div id="google-login-button" class="google-auth-wrap"></div>

        <p class="note">
          Email/password login is not available right now. Please use Google Sign-In.
        </p>

        <p class="note">
          Don’t have an account?
          <a href="signup.html">Sign Up</a>
        </p>
      </form>
    </div>
  `);

  const passwordInput = document.getElementById('login-password');
  const toggleBtn = document.getElementById('toggle-password');

  toggleBtn.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    toggleBtn.src = isHidden
      ? '../assets/icons/eye-off.png'
      : '../assets/icons/eye.png';
  });

  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => e.preventDefault());

  setTimeout(initGoogleButton, 200);
}

init();