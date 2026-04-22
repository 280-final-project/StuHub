import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('Sign Up', 'auth');

  setContent(`
    <div class="auth-page">
      <section class="auth-header">
        <h1 class="page-title">Sign Up</h1>
        <p class="page-subtitle">Create your CampusHub account.</p>
      </section>

      <form class="form-card auth-card" id="signup-form">
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <input
            id="signup-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
          >
        </div>

        <div class="form-group">
          <label for="signup-email">SJSU Email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="name@sjsu.edu"
            required
          >
          <small class="error-text" id="signup-email-error"></small>
        </div>

        <div class="form-group password-group">
          <label for="signup-password">Password</label>
          <div class="password-wrapper">
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Enter password"
              required
            >
            <img
              src="../assets/icons/eye.png"
              id="toggle-signup-password"
              class="toggle-password"
              alt="Show password"
            >
          </div>
        </div>

        <div class="form-group password-group">
          <label for="signup-confirm-password">Confirm Password</label>
          <div class="password-wrapper">
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              required
            >
            <img
              src="../assets/icons/eye.png"
              id="toggle-confirm-password"
              class="toggle-password"
              alt="Show password"
            >
          </div>
          <small class="error-text" id="signup-password-error"></small>
        </div>

        <button class="btn btn-primary full-width" type="submit">Sign Up</button>

        <p class="note">
          Already have an account?
          <a href="login.html">Login</a>
        </p>
      </form>
    </div>
  `);

  const form = document.getElementById('signup-form');
  const emailInput = document.getElementById('signup-email');
  const emailError = document.getElementById('signup-email-error');
  const passwordInput = document.getElementById('signup-password');
  const confirmInput = document.getElementById('signup-confirm-password');
  const passwordError = document.getElementById('signup-password-error');

  const toggleSignupPassword = document.getElementById('toggle-signup-password');
  const toggleConfirmPassword = document.getElementById('toggle-confirm-password');

  function togglePassword(input, icon) {
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.src = isHidden ? './assets/icons/eye-off.png' : './assets/icons/eye.png';
  }

  toggleSignupPassword.addEventListener('click', () => {
    togglePassword(passwordInput, toggleSignupPassword);
  });

  toggleConfirmPassword.addEventListener('click', () => {
    togglePassword(confirmInput, toggleConfirmPassword);
  });

  emailInput.addEventListener('blur', () => {
  const email = emailInput.value.trim().toLowerCase();

  if (email && !email.endsWith('@sjsu.edu')) {
    emailError.textContent = 'Please use your SJSU email address.';
    emailError.style.display= "block";
    emailInput.classList.add('invalid');
  } else {
    emailError.textContent = '';
    emailError.style.display= "none";
    emailInput.classList.remove('invalid');
  }
});

  function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (confirmPassword && password !== confirmPassword) {
      passwordError.textContent = 'Passwords do not match.';
      confirmInput.classList.add('invalid');
      return false;
    }

    passwordError.textContent = '';
    confirmInput.classList.remove('invalid');
    return true;
  }

  passwordInput.addEventListener('input', validatePasswords);
  confirmInput.addEventListener('input', validatePasswords);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    let valid = true;

    if (!email.endsWith('@sjsu.edu')) {
      emailError.textContent = 'Please use your SJSU email address.';
      emailInput.classList.add('invalid');
      valid = false;
    }

    if (!validatePasswords()) {
      valid = false;
    }

    if (!valid) return;

    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'home.html';
  });
}

init();
