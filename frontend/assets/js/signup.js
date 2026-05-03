import { injectLayout, setContent } from './app.js';

const GOOGLE_CLIENT_ID = '749012738925-c24pfprho3d126q0rvsn1pdb0q24b9on.apps.googleusercontent.com';
const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';

function handleGoogleResponse(response) {
  if (!response?.credential) {
    alert('Google sign-up failed.');
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

async function handleEmailSignup(e) {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const errorEl = document.getElementById('signup-error');

  errorEl.style.display = 'none';
  errorEl.textContent = '';

  if (!name || !email || !password) {
    errorEl.textContent = 'All fields are required.';
    errorEl.style.display = 'block';
    return;
  }

  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_name: name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Sign up failed');
    }

    localStorage.setItem('isLoggedIn', 'true');
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));

    window.location.href = 'home.html';
  } catch (err) {
    console.error(err);
    errorEl.textContent = err.message || 'Sign up failed';
    errorEl.style.display = 'block';
  }
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
    shape: 'rectangular',
    width: 420,
    text: 'signup_with',
  });
}

function init() {
  injectLayout('Sign Up', 'auth');

  setContent(`
    <div class="auth-hero auth-hero-signup">
      <div class="auth-overlay"></div>

      <section class="auth-shell">
        <div class="auth-brand-row">
          <a href="index.html" class="auth-brand-link">
            <span class="auth-brand-icon">🏛️</span>
            <span>CampusHub</span>
          </a>
        </div>

        <div class="auth-mock-card">
          <div class="auth-avatar-circle auth-avatar-combo">
            <span class="avatar-user">👤</span>
            <span class="avatar-plus">＋</span>
          </div>

          <h1 class="auth-big-title">Create Your Account</h1>
          <p class="auth-big-subtitle">Join CampusHub to explore campus events and resources</p>

          <form id="signup-form" style="width: 100%;">
            <div class="form-group">
              <label for="signup-name">Full Name</label>
              <input type="text" id="signup-name" placeholder="Enter your full name" required />
            </div>
            <div class="form-group">
              <label for="signup-email">Email</label>
              <input type="email" id="signup-email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
              <label for="signup-password">Password</label>
              <div class="password-wrapper">
                <input type="password" id="signup-password" placeholder="At least 6 characters" required />
              </div>
            </div>
            <p id="signup-error" class="error-text"></p>
            <button type="submit" class="btn btn-primary full-width" style="margin-bottom: 1.5rem;">Sign Up</button>
          </form>

          <div class="auth-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <div id="google-signup-button" class="google-auth-wrap auth-google-big"></div>

          <div class="auth-trust-row">
            <span class="auth-trust-icon">🛡️</span>
            <p>Safe, secure, and trusted by SJSU students</p>
          </div>

          <p class="auth-switch-text">
            Already have an account?
            <a href="login.html">Log In</a>
          </p>
        </div>

        <p class="auth-legal">
          By continuing, you agree to our
          <a href="#">Terms of Service</a>
          and
          <a href="#">Privacy Policy</a>.
        </p>
      </section>
    </div>
  `);

  document.getElementById('signup-form')?.addEventListener('submit', handleEmailSignup);
  setTimeout(initGoogleButton, 200);
}

init();
