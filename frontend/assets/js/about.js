import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('');
  setContent(`
    <section class="container page-header">
      <h1 class="page-title">About</h1>
      <p class="page-subtitle">Learn more about this platform</p>
    </section>
    <section class="container section-tight about-copy">
      <p>This platform is designed to help SJSU students discover and connect with campus events, academic resources, and exclusive local deals. Whether you are looking for the next campus gathering, study materials, or student discounts, this hub keeps them in one place.</p>
      <p>Our mission is to create a centralized student platform where it feels easy to find opportunities, get support, and save money.</p>
    </section>
    <section class="container section-tight">
      <h2>Our Team</h2>
      <div class="team-grid">
        <div>Arvin Andiappan</div>
        <div>Prabhjot Singh</div>
        <div>Rafael Caculba</div>
        <div>Ved Jigneshkumar Dabhi</div>
      </div>
    </section>
    <section class="container section-tight about-copy" id="contact">
      <h2>Contact</h2>
      <p>Have questions or feedback? We'd love to hear from you.</p>
      <p><a href="mailto:prabhjotsingh@sjsu.edu" style="color:var(--primary);">prabhjotsingh@sjsu.edu</a></p>
    </section>
  `);
}

init();
