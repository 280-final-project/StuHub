import { injectLayout, setContent } from './app.js';

const GOOGLE_CLIENT_ID = '749012738925-c24pfprho3d126q0rvsn1pdb0q24b9on.apps.googleusercontent.com';
const BACKEND_URL = 'https://studenthub-backend-rpn0.onrender.com';

const ADMIN_EMAILS = [
  'vedjigneshkumar.dabhi@sjsu.edu',
  'prabhjotsingh@sjsu.edu',
  'email3@sjsu.edu',
  'email4@sjsu.edu'
];

function storeAuthAndRedirect(data) {
  const isAdmin = ADMIN_EMAILS.includes(data.user.email.toLowerCase());

  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  localStorage.setItem('isAdmin', String(isAdmin));

  window.location.href = isAdmin ? 'admin.html' : 'home.html';
}

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
        throw new Error(data.error || data.message || 'Login failed');
      }

      storeAuthAndRedirect(data);
    })
    .catch((err) => {
      console.error(err);
      alert(err.message || 'Login failed');
    });
}

async function handleEmailLogin(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  errorEl.style.display = 'none';
  errorEl.textContent = '';

  if (!email || !password) {
    errorEl.textContent = 'Email and password are required.';
    errorEl.style.display = 'block';
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    storeAuthAndRedirect(data);
  } catch (err) {
    console.error(err);
    errorEl.textContent = err.message || 'Login failed';
    errorEl.style.display = 'block';
  }
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
    shape: 'rectangular',
    width: 420,
    text: 'continue_with',
  });
}

function init() {
  injectLayout('Login', 'auth');

  setContent(`
    <div class="auth-hero auth-hero-login">
      <div class="auth-overlay"></div>

      <section class="auth-shell">
        <div class="auth-brand-row">
          <a href="index.html" class="auth-brand-link">
            <span class="auth-brand-icon">🏛️</span>
            <span>CampusHub</span>
          </a>
        </div>

        <div class="auth-mock-card">
          <div class="auth-avatar-circle">👤</div>

          <h1 class="auth-big-title">Welcome Back</h1>
          <p class="auth-big-subtitle">Sign in to continue to CampusHub</p>

          <form id="login-form" style="width: 100%;">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input type="email" id="login-email" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
              <label for="login-password">Password</label>
              <div class="password-wrapper">
                <input type="password" id="login-password" placeholder="Enter your password" required />
              </div>
            </div>
            <p id="login-error" class="error-text"></p>
            <button type="submit" class="btn btn-primary full-width" style="margin-bottom: 1.5rem;">Log In</button>
          </form>

          <div class="auth-divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <div id="google-login-button" class="google-auth-wrap auth-google-big"></div>

          <div class="auth-trust-row">
            <span class="auth-trust-icon">🛡️</span>
            <p>Secure login with your SJSU Google account</p>
          </div>

          <p class="auth-switch-text">
            Don't have an account?
            <a href="signup.html">Sign Up</a>
          </p>
        </div>

        <p class="auth-legal">
          By continuing, you agree to our Terms of Service
          and Privacy Policy.
        </p>
      </section>
    </div>
  `);

  document.getElementById('login-form')?.addEventListener('submit', handleEmailLogin);
  setTimeout(initGoogleButton, 200);
}

init();
