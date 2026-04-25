import { injectLayout, setContent } from './app.js';

function init() {
  injectLayout('Home');
  setContent(`
    <section class="home-hero">
      <div class="container home-hero-inner">
        <div class="home-hero-copy">
          <span class="eyebrow">SJSU Student Platform</span>
          <h1 class="hero-title">Discover campus events, resources, and student deals in one place.</h1>
          <p class="hero-subtitle">
            CampusHub helps SJSU students stay connected, save money, and find the support they need throughout the semester.
          </p>

          <div class="hero-actions">
            <a href="events.html" class="btn btn-primary">Explore Events</a>
            <a href="resources.html" class="btn btn-secondary">Browse Resources</a>
          </div>
        </div>

        <div class="home-hero-card">
          <div class="hero-stat">
            <span class="hero-stat-number">16+</span>
            <span class="hero-stat-label">Campus Resources</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-number">10+</span>
            <span class="hero-stat-label">Student Deals</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-number">24/7</span>
            <span class="hero-stat-label">Easy Access</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading">
        <h2>Quick Access</h2>
        <p>Jump into the most important parts of CampusHub.</p>
      </div>

      <div class="quick-grid">
        <a href="events.html" class="info-card quick-card">
          <div class="icon-chip blue">📅</div>
          <h3>Events</h3>
          <p>Explore campus events, workshops, fairs, and student activities.</p>
        </a>

        <a href="resources.html" class="info-card quick-card">
          <div class="icon-chip blue">📘</div>
          <h3>Resources</h3>
          <p>Find academic, wellness, financial, and student support resources.</p>
        </a>

        <a href="deals.html" class="info-card quick-card">
          <div class="icon-chip blue">💸</div>
          <h3>Deals</h3>
          <p>Save money with student discounts, offers, and campus promotions.</p>
        </a>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading section-heading-row">
        <div>
          <h2>Upcoming Events</h2>
          <p>Stay updated with what’s happening around campus.</p>
        </div>
        <a href="events.html" class="text-link">View All</a>
      </div>

      <div class="home-preview-grid">
        <article class="info-card preview-card">
          <div class="preview-badge">Career</div>
          <h3>Tech Career Fair 2026</h3>
          <p class="preview-meta">Feb 12 • Event Center</p>
          <p>Meet recruiters, explore internships, and connect with industry professionals.</p>
        </article>

        <article class="info-card preview-card">
          <div class="preview-badge">Community</div>
          <h3>Annual Spring Festival</h3>
          <p class="preview-meta">Mar 08 • Tower Lawn</p>
          <p>Enjoy student performances, food stalls, and cultural celebrations on campus.</p>
        </article>

        <article class="info-card preview-card">
          <div class="preview-badge">Academic</div>
          <h3>Guest Lecture: AI & Future</h3>
          <p class="preview-meta">Apr 02 • Engineering Building</p>
          <p>Join a guest speaker session on AI trends, careers, and innovation.</p>
        </article>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading section-heading-row">
        <div>
          <h2>Essential Resources</h2>
          <p>Start with the most useful campus services for students.</p>
        </div>
        <a href="resources.html" class="text-link">View All</a>
      </div>

      <div class="home-preview-grid">
        <article class="info-card preview-card">
          <div class="icon-chip blue">💼</div>
          <h3>Career Center</h3>
          <p>Resume reviews, interview prep, job fairs, and career support.</p>
        </article>

        <article class="info-card preview-card">
          <div class="icon-chip blue">🩺</div>
          <h3>Student Wellness Center</h3>
          <p>Medical services, counseling, wellness care, and health support.</p>
        </article>

        <article class="info-card preview-card">
          <div class="icon-chip blue">🥫</div>
          <h3>Spartan Food Pantry</h3>
          <p>Free groceries and basic needs support for students in need.</p>
        </article>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading section-heading-row">
        <div>
          <h2>Featured Deals</h2>
          <p>Popular student savings and promotions.</p>
        </div>
        <a href="deals.html" class="text-link">View All</a>
      </div>

      <div class="home-preview-grid">
        <article class="info-card preview-card">
          <div class="icon-chip blue">🎵</div>
          <h3>Spotify Premium Student</h3>
          <p>Get discounted premium music streaming with student verification.</p>
        </article>

        <article class="info-card preview-card">
          <div class="icon-chip blue">📦</div>
          <h3>Amazon Prime Student</h3>
          <p>Enjoy shipping benefits, shopping offers, and student pricing.</p>
        </article>

        <article class="info-card preview-card">
          <div class="icon-chip blue">📚</div>
          <h3>Campus Bookstore Offers</h3>
          <p>Check discounts on textbooks, merchandise, and school essentials.</p>
        </article>
      </div>
    </section>

    <section class="container section">
      <div class="section-heading">
        <h2>Why CampusHub?</h2>
        <p>Everything students need, organized in one simple place.</p>
      </div>

      <div class="benefits-grid">
        <div class="info-card benefit-card">
          <div class="icon-chip blue">⚡</div>
          <h3>Fast Access</h3>
          <p>Find important events, services, and student deals quickly.</p>
        </div>

        <div class="info-card benefit-card">
          <div class="icon-chip blue">🎓</div>
          <h3>Student-Focused</h3>
          <p>Built specifically around the needs of SJSU students.</p>
        </div>

        <div class="info-card benefit-card">
          <div class="icon-chip blue">🤝</div>
          <h3>Campus Connection</h3>
          <p>Stay involved with opportunities happening across campus.</p>
        </div>
      </div>
    </section>
  `);
}

init();