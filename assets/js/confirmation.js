import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('');
  setContent(`
    <section class="container confirmation">
      <div class="confirmation-box">
        <div class="confirmation-icon">✅</div>
        <h1 class="page-title">Event Submitted Successfully</h1>
        <p>Your event has been submitted and is pending approval.</p>
        <p class="lead" style="margin-bottom:2rem;">It will be visible once approved.</p>
        <div class="actions" style="justify-content:center;">
          <a class="btn btn-primary" href="home.html">Back to Home</a>
          <a class="btn btn-secondary" href="events.html">View Events</a>
        </div>
      </div>
    </section>
  `);
}

init();
