const NAV_ITEMS = [
  { href: 'index.html', label: 'Home' },
  { href: 'events.html', label: 'Events' },
  { href: 'resources.html', label: 'Resources' },
  { href: 'deals.html', label: 'Deals' },
  { href: 'add-event.html', label: 'Add Event' }
];

export function injectLayout(activePage = '') {
  const app = document.querySelector('[data-app]');
  if (!app) return;

  app.innerHTML = `
    <div class="page-shell">
      <div class="page-frame">
        <header class="site-header">
          <div class="inner">
            <a class="brand" href="index.html">CampusHub</a>
            <div class="nav-links">
              ${NAV_ITEMS.map((item) => `<a href="${item.href}" class="${activePage === item.label ? 'active' : ''}">${item.label}</a>`).join('')}
              <div class="search-wrap">
                <span class="icon">🔎</span>
                <input
                  type="text"
                  id="site-search"
                  placeholder="Search..."
                  aria-label="Search"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                />
                <div class="search-suggestions" id="search-suggestions"></div>
              </div>
            </div>
          </div>
        </header>
        <main id="page-content"></main>
        <footer class="site-footer">
          <div class="inner">
            <div class="brand" style="font-size:1.15rem;">CampusHub</div>
            <div class="nav-links">
              <a href="about.html">About</a>
              <a href="about.html#contact">Contact</a>
            </div>
          </div>
          <div class="container footer-bottom">Built with ❤️ by the CampusHub Team</div>
        </footer>
      </div>
    </div>
  `;

  const searchInput = document.getElementById('site-search');
  const suggestionsBox = document.getElementById('search-suggestions');

  
      const searchItems = [
        { label: 'Home', url: 'index.html', type: 'Page' },
        { label: 'Events', url: 'events.html', type: 'Page' },
        { label: 'Resources', url: 'resources.html', type: 'Page' },
        { label: 'Deals', url: 'deals.html', type: 'Page' },
        { label: 'Add Event', url: 'add-event.html', type: 'Page' },
        { label: 'About', url: 'about.html', type: 'Page' },

        { label: 'Tech Career Fair 2026', url: 'event.html?id=1', type: 'Event' },
        { label: 'Annual Spring Festival', url: 'event.html?id=2', type: 'Event' },
        { label: 'Guest Lecture: AI & Future', url: 'event.html?id=3', type: 'Event' },

        { label: 'Study Materials', url: 'resources.html', type: 'Resource' },
        { label: 'Tutoring Services', url: 'resources.html', type: 'Resource' },
        { label: 'Academic Calendar', url: 'resources.html', type: 'Resource' },

        { label: 'Spotify Premium Student', url: 'deals.html', type: 'Deal' },
        { label: 'Amazon Prime Student', url: 'deals.html', type: 'Deal' },
        { label: 'Campus Bookstore', url: 'deals.html', type: 'Deal' }
      ];

      if (searchInput && suggestionsBox) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();

      if (query === '') {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
        return;
      }

      let matches = searchItems.filter(item =>
        item.label.toLowerCase().includes(query)
      );

      matches.sort((a, b) => {
        if (a.label.toLowerCase() === query) return -1;
        if (b.label.toLowerCase() === query) return 1;

        if (a.label.toLowerCase().startsWith(query)) return -1;
        if (b.label.toLowerCase().startsWith(query)) return 1;

        if (a.type === 'Page' && b.type !== 'Page') return -1;
        if (b.type === 'Page' && a.type !== 'Page') return 1;

        if (a.label === 'Add Event') return 1;
        if (b.label === 'Add Event') return -1;

        return 0;
      });

      matches = matches.slice(0, 6);

      if (matches.length === 0) {
        suggestionsBox.innerHTML = `
          <div class="suggestion-item">
            <div class="suggestion-title">No results found</div>
          </div>
        `;
        suggestionsBox.classList.add('show');
        return;
      }

      suggestionsBox.innerHTML = matches
        .map((item) => `
          <a href="${item.url}" class="suggestion-item">
            <div class="suggestion-title">${item.label}</div>
            <div class="suggestion-type">${item.type}</div>
          </a>
        `)
        .join('');

      suggestionsBox.classList.add('show');
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.trim() !== '') {
        suggestionsBox.classList.add('show');
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrap')) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.classList.remove('show');
      }
    });
  }


document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrap')) {
    suggestionsBox.innerHTML = '';
    suggestionsBox.classList.remove('show');
  }
});
}

export function setContent(html) {
  const pageContent = document.getElementById('page-content');
  if (pageContent) pageContent.innerHTML = html;
}

export async function fetchJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

export function renderModalShell() {
  if (document.getElementById('global-modal')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal" id="global-modal" aria-hidden="true">
      <div class="modal-panel">
        <button class="modal-close" type="button" aria-label="Close">✕</button>
        <div id="modal-content"></div>
      </div>
    </div>
  `);

  const modal = document.getElementById('global-modal');
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.classList.contains('modal-close')) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

export function openModal(item) {
  const modal = document.getElementById('global-modal');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <h2 style="margin-top:0; padding-right:2rem;">${item.title || item.name}</h2>
    ${item.badges?.length ? `<div class="badge-row">${item.badges.map((badge) => `<span class="badge">${badge}</span>`).join('')}</div>` : ''}
    <p class="lead" style="line-height:1.7; color: var(--muted);">${item.fullDescription || item.description}</p>
    <div class="detail-list">
      ${(item.details || []).map((detail) => `
        <div class="detail-item">
          <div class="detail-label">${detail.label}</div>
          <div class="muted">${detail.value}</div>
        </div>`).join('')}
    </div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const modal = document.getElementById('global-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

export function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
