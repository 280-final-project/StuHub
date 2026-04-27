import { injectLayout, setContent } from './app.js';

const resources = [
  {
    icon: "💼",
    title: "Career Center",
    desc: "Career development support including resumes and interviews.",
    previewHours: "Mon–Fri 9 AM – 4:30 PM",
    previewLocation: "Admin Building",
    details: "Resume help, job fairs, interview prep, networking events."
  },
  {
    icon: "🩺",
    title: "Student Wellness Center",
    desc: "Medical and mental health services.",
    previewHours: "Mon–Fri 8:30 AM – 5 PM",
    previewLocation: "7th Street",
    details: "Healthcare, counseling, lab tests, nutrition support."
  },
  {
    icon: "🤝",
    title: "SJSU Cares",
    desc: "Support for financial and housing needs.",
    previewHours: "Mon–Fri 9 AM – 5 PM",
    previewLocation: "Clark Hall",
    details: "Emergency grants, case management, referrals."
  },
  {
    icon: "🥫",
    title: "Spartan Food Pantry",
    desc: "Free groceries for students.",
    previewHours: "Mon–Fri 10 AM – 5 PM",
    previewLocation: "Student Union",
    details: "Fresh food, nutrition help, basic needs support."
  },
  {
    icon: "📚",
    title: "Peer Connections",
    desc: "Tutoring and mentoring services.",
    previewHours: "Varies",
    previewLocation: "Student Services Center",
    details: "Tutoring, mentoring, workshops."
  },
  {
    icon: "♿",
    title: "Accessible Education Center",
    desc: "Support for students with disabilities.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Accommodations, assistive tech, exam support."
  },
  {
    icon: "💰",
    title: "Financial Aid Office",
    desc: "Help with financial aid and scholarships.",
    previewHours: "Mon–Fri 9 AM – 4 PM",
    previewLocation: "SSC",
    details: "FAFSA, grants, loans, counseling."
  },
  {
    icon: "🏦",
    title: "Bursar’s Office",
    desc: "Handles payments and billing.",
    previewHours: "Mon–Fri 9 AM – 4 PM",
    previewLocation: "SSC",
    details: "Tuition payments, ID services."
  },
  {
    icon: "🏛️",
    title: "MLK Library",
    desc: "Main campus library.",
    previewHours: "Varies",
    previewLocation: "Center Campus",
    details: "Study rooms, research help, equipment."
  },
  {
    icon: "✍️",
    title: "Writing Center",
    desc: "Academic writing support.",
    previewHours: "Mon–Fri",
    previewLocation: "Clark Hall",
    details: "Essay help, workshops."
  },
  {
    icon: "🖨️",
    title: "Print & Tech Center",
    desc: "Printing and tech services.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Printing, laptop repair, rentals."
  },
  {
    icon: "🎉",
    title: "Student Involvement",
    desc: "Clubs and campus events.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Clubs, leadership programs."
  },
  {
    icon: "🌍",
    title: "MOSAIC Center",
    desc: "Diversity and cultural support.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Cultural events, inclusion support."
  },
  {
    icon: "🏳️‍🌈",
    title: "PRIDE Center",
    desc: "LGBTQ+ support space.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Community events, advocacy."
  },
  {
    icon: "🌐",
    title: "ISSS",
    desc: "International student support.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    details: "Visa help, CPT/OPT guidance."
  },
  {
    icon: "🏋️",
    title: "Spartan Recreation",
    desc: "Fitness and recreation center.",
    previewHours: "Varies",
    previewLocation: "7th Street",
    details: "Gym, sports, classes."
  }
];

function renderResources() {
  const container = document.getElementById("resources-container");

  container.innerHTML = resources.map(r => `
    <div class="info-card resource-card" data-id="${r.title}">
      <div class="icon-chip blue">${r.icon}</div>
      <h3>${r.title}</h3>
      <p class="resource-card-desc">${r.desc}</p>
      <div class="resource-card-meta">
        <span><strong>Hours:</strong> ${r.previewHours}</span>
        <span><strong>Location:</strong> ${r.previewLocation}</span>
      </div>
    </div>
  `).join('');

  const modal = document.getElementById("resource-modal");

  document.querySelectorAll(".resource-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const r = resources[index];
      document.getElementById("modal-title").textContent = r.title;
      document.getElementById("modal-desc").textContent = r.desc;
      document.getElementById("modal-details").innerHTML = r.details;
      modal.classList.add("open");
    });
  });
}

function init() {
  injectLayout("Resources");

  setContent(`
    <section class="container section resources-page">
      <h1 class="page-title">Resources</h1>
      <p class="page-subtitle">Explore important campus resources for SJSU students.</p>

      <div id="resources-container" class="resources-grid"></div>
    </section>

    <div id="resource-modal" class="modal">
      <div class="modal-panel">
        <button id="modal-close">✕</button>
        <h2 id="modal-title"></h2>
        <p id="modal-desc"></p>
        <div id="modal-details"></div>
      </div>
    </div>
  `);

  renderResources();

  document.getElementById("modal-close").onclick = () => {
    document.getElementById("resource-modal").classList.remove("open");
  };

  window.onclick = (e) => {
    if (e.target.id === "resource-modal") {
      e.target.classList.remove("open");
    }
  };
}

init();