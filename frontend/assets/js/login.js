import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('Login', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Login</h1>
        <p class="page-subtitle">Welcome back! Sign in to continue.</p>
      </section>

      <form class="form-card auth-card" id="login-form">
        <div class="form-group">
          <label for="login-email">SJSU Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="name@sjsu.edu"
            required
          >
          <small class="error-text" id="login-email-error"></small>
        </div>

        <div class="form-group password-group">
          <label for="login-password">Password</label>
          <div class="password-wrapper">
          <input
            id="login-password"
            type="password"
            placeholder="Enter password"
            required
          >
          <img
            src="../assets/icons/eye.png"
            id="toggle-password"
            class="toggle-password"
            alt="toggle password"
          >
          </div>
        </div>

        <button class="btn btn-primary full-width" type="submit">Login</button>

        <p class="note">
          Don't have an account?
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
  const emailInput = document.getElementById('login-email');
  const emailError = document.getElementById('login-email-error');

  emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim().toLowerCase();

    if (email && !email.endsWith('@sjsu.edu')) {
      emailError.textContent = 'Please use your SJSU email address.';
      emailInput.classList.add('invalid');
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('invalid');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = document.getElementById('login-password').value.trim();

    if (!email.endsWith('@sjsu.edu')) {
      emailError.textContent = 'Please use your SJSU email address.';
      emailInput.classList.add('invalid');
      return;
    }

    console.log({ email, password });
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'home.html';
  });
}

init();