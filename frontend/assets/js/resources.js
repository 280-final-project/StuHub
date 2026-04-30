import { injectLayout, setContent } from './app.js';

const resources = [
  {
    icon: "💼",
    title: "Career Center",
    desc: "Career development support including resumes and interviews.",
    previewHours: "Mon–Fri 9 AM – 4:30 PM",
    previewLocation: "Admin Building",
    badges: ["Student Only"],
    fullDescription:
      "Get one-on-one help with resumes, cover letters, job search strategy, interview preparation, and networking for internships and full-time roles.",
    details: [
      { label: "Location", value: "Admin Building" },
      { label: "Hours", value: "Mon–Fri 9 AM – 4:30 PM" },
      { label: "Services", value: "Resume reviews, mock interviews, career fairs, networking events" }
    ]
  },
  {
    icon: "🩺",
    title: "Student Wellness Center",
    desc: "Medical and mental health services.",
    previewHours: "Mon–Fri 8:30 AM – 5 PM",
    previewLocation: "7th Street",
    badges: ["Health Support"],
    fullDescription:
      "Access medical care, counseling, lab testing, and wellness guidance in one place to support both physical and mental health.",
    details: [
      { label: "Location", value: "7th Street" },
      { label: "Hours", value: "Mon–Fri 8:30 AM – 5 PM" },
      { label: "Services", value: "Healthcare, counseling, lab tests, nutrition support" }
    ]
  },
  {
    icon: "🤝",
    title: "SJSU Cares",
    desc: "Support for financial and housing needs.",
    previewHours: "Mon–Fri 9 AM – 5 PM",
    previewLocation: "Clark Hall",
    badges: ["Support"],
    fullDescription:
      "Connect with emergency support resources for financial hardship, housing insecurity, and referrals to campus and community services.",
    details: [
      { label: "Location", value: "Clark Hall" },
      { label: "Hours", value: "Mon–Fri 9 AM – 5 PM" },
      { label: "Services", value: "Emergency grants, case management, referrals" }
    ]
  },
  {
    icon: "🥫",
    title: "Spartan Food Pantry",
    desc: "Free groceries for students.",
    previewHours: "Mon–Fri 10 AM – 5 PM",
    previewLocation: "Student Union",
    badges: ["Basic Needs"],
    fullDescription:
      "Pick up groceries and access basic needs support designed to help students stay focused on academics and well-being.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri 10 AM – 5 PM" },
      { label: "Services", value: "Fresh food, groceries, nutrition help, basic needs support" }
    ]
  },
  {
    icon: "📚",
    title: "Peer Connections",
    desc: "Tutoring and mentoring services.",
    previewHours: "Varies",
    previewLocation: "Student Services Center",
    badges: ["Student Only"],
    fullDescription:
      "Connect with qualified peer tutors and mentors for academic support, study help, and learning guidance across many subjects.",
    details: [
      { label: "Location", value: "Student Services Center" },
      { label: "Hours", value: "Varies" },
      { label: "Services", value: "Tutoring, mentoring, workshops" }
    ]
  },
  {
    icon: "♿",
    title: "Accessible Education Center",
    desc: "Support for students with disabilities.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["Accessibility"],
    fullDescription:
      "Get disability-related academic accommodations, assistive technology support, and guidance for creating an accessible learning experience.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Accommodations, assistive tech, exam support" }
    ]
  },
  {
    icon: "💰",
    title: "Financial Aid Office",
    desc: "Help with financial aid and scholarships.",
    previewHours: "Mon–Fri 9 AM – 4 PM",
    previewLocation: "SSC",
    badges: ["Funding"],
    fullDescription:
      "Get help understanding aid packages, FAFSA, grants, scholarships, and financial planning for your education.",
    details: [
      { label: "Location", value: "SSC" },
      { label: "Hours", value: "Mon–Fri 9 AM – 4 PM" },
      { label: "Services", value: "FAFSA, grants, loans, scholarship guidance, counseling" }
    ]
  },
  {
    icon: "🏦",
    title: "Bursar’s Office",
    desc: "Handles payments and billing.",
    previewHours: "Mon–Fri 9 AM – 4 PM",
    previewLocation: "SSC",
    badges: ["Billing"],
    fullDescription:
      "Manage tuition payments, account balances, and billing-related questions through the university’s payment office.",
    details: [
      { label: "Location", value: "SSC" },
      { label: "Hours", value: "Mon–Fri 9 AM – 4 PM" },
      { label: "Services", value: "Tuition payments, billing, account services" }
    ]
  },
  {
    icon: "🏛️",
    title: "MLK Library",
    desc: "Main campus library.",
    previewHours: "Varies",
    previewLocation: "Center Campus",
    badges: ["Study Space"],
    fullDescription:
      "Use library resources for research, quiet study, group work, technology borrowing, and academic support.",
    details: [
      { label: "Location", value: "Center Campus" },
      { label: "Hours", value: "Varies" },
      { label: "Services", value: "Study rooms, research help, equipment borrowing" }
    ]
  },
  {
    icon: "✍️",
    title: "Writing Center",
    desc: "Academic writing support.",
    previewHours: "Mon–Fri",
    previewLocation: "Clark Hall",
    badges: ["Academic Support"],
    fullDescription:
      "Improve essays, research papers, and writing skills through feedback sessions and writing support workshops.",
    details: [
      { label: "Location", value: "Clark Hall" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Essay help, writing feedback, workshops" }
    ]
  },
  {
    icon: "🖨️",
    title: "Print & Tech Center",
    desc: "Printing and tech services.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["Technology"],
    fullDescription:
      "Access printing, repair help, and device-related support for everyday academic needs.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Printing, laptop repair, rentals" }
    ]
  },
  {
    icon: "🎉",
    title: "Student Involvement",
    desc: "Clubs and campus events.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["Community"],
    fullDescription:
      "Explore clubs, leadership opportunities, and campus events that help you build community and get involved.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Clubs, leadership programs, events" }
    ]
  },
  {
    icon: "🌍",
    title: "MOSAIC Center",
    desc: "Diversity and cultural support.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["Inclusion"],
    fullDescription:
      "Find programs, events, and support centered around identity, inclusion, and cultural belonging.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Cultural events, identity support, inclusion programs" }
    ]
  },
  {
    icon: "🏳️‍🌈",
    title: "PRIDE Center",
    desc: "LGBTQ+ support space.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["Community"],
    fullDescription:
      "Access a welcoming space for LGBTQ+ community support, advocacy, and campus engagement.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Community events, advocacy, support" }
    ]
  },
  {
    icon: "🌐",
    title: "ISSS",
    desc: "International student support.",
    previewHours: "Mon–Fri",
    previewLocation: "Student Union",
    badges: ["International"],
    fullDescription:
      "Get help with visa guidance, immigration processes, and academic support resources for international students.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri" },
      { label: "Services", value: "Visa help, CPT/OPT guidance, international support" }
    ]
  },
  {
    icon: "🏋️",
    title: "Spartan Recreation",
    desc: "Fitness and recreation center.",
    previewHours: "Varies",
    previewLocation: "7th Street",
    badges: ["Fitness"],
    fullDescription:
      "Stay active with gym access, recreation programs, and fitness classes that support student well-being.",
    details: [
      { label: "Location", value: "7th Street" },
      { label: "Hours", value: "Varies" },
      { label: "Services", value: "Gym, sports, classes" }
    ]
  },
  {
    icon: "💻",
    title: "IT Help Desk",
    desc: "Technical support for campus systems and devices.",
    previewHours: "Mon–Fri 8 AM – 6 PM",
    previewLocation: "MLK Library",
    badges: ["Technology"],
    fullDescription:
      "Get help with WiFi, account access, software installation, and general campus technology troubleshooting.",
    details: [
      { label: "Location", value: "MLK Library" },
      { label: "Hours", value: "Mon–Fri 8 AM – 6 PM" },
      { label: "Services", value: "WiFi issues, account access, software setup, troubleshooting" }
    ]
  },
  {
    icon: "🧑‍🏫",
    title: "Academic Advising",
    desc: "Guidance for course planning and graduation.",
    previewHours: "Mon–Fri 9 AM – 5 PM",
    previewLocation: "Student Services Center",
    badges: ["Academic Support"],
    fullDescription:
      "Meet with advisors for course planning, degree progress review, and graduation pathway guidance.",
    details: [
      { label: "Location", value: "Student Services Center" },
      { label: "Hours", value: "Mon–Fri 9 AM – 5 PM" },
      { label: "Services", value: "Class planning, degree progress, major exploration, graduation support" }
    ]
  },
  {
    icon: "🔬",
    title: "Science Labs",
    desc: "Hands-on lab facilities for science courses.",
    previewHours: "Class Hours",
    previewLocation: "Science Building",
    badges: ["Academic Use"],
    fullDescription:
      "Use specialized lab spaces and equipment that support practical learning in science courses.",
    details: [
      { label: "Location", value: "Science Building" },
      { label: "Hours", value: "Class Hours" },
      { label: "Services", value: "Biology, chemistry, and physics lab learning" }
    ]
  },
  {
    icon: "🎨",
    title: "Art Studios",
    desc: "Creative spaces for artistic work.",
    previewHours: "Mon–Fri 9 AM – 6 PM",
    previewLocation: "Art Building",
    badges: ["Creative Space"],
    fullDescription:
      "Access studio spaces and creative work areas for visual arts, design projects, and artistic practice.",
    details: [
      { label: "Location", value: "Art Building" },
      { label: "Hours", value: "Mon–Fri 9 AM – 6 PM" },
      { label: "Services", value: "Painting, drawing, design projects, creative workspace" }
    ]
  },
  {
    icon: "🎵",
    title: "Music Practice Rooms",
    desc: "Private spaces for music practice.",
    previewHours: "8 AM – 10 PM",
    previewLocation: "Music Building",
    badges: ["Creative Space"],
    fullDescription:
      "Reserve quiet practice spaces for instruments, vocals, and focused rehearsal sessions.",
    details: [
      { label: "Location", value: "Music Building" },
      { label: "Hours", value: "8 AM – 10 PM" },
      { label: "Services", value: "Individual or group practice, rehearsal space" }
    ]
  },
  {
    icon: "🚌",
    title: "Campus Shuttle",
    desc: "Transportation across campus.",
    previewHours: "7 AM – 10 PM",
    previewLocation: "Campus Stops",
    badges: ["Transportation"],
    fullDescription:
      "Use the campus shuttle to move conveniently between major campus locations throughout the day.",
    details: [
      { label: "Location", value: "Campus Stops" },
      { label: "Hours", value: "7 AM – 10 PM" },
      { label: "Services", value: "On-campus transportation between key stops" }
    ]
  },
  {
    icon: "🚲",
    title: "Bike Repair Station",
    desc: "Self-service bike maintenance tools.",
    previewHours: "24/7",
    previewLocation: "Near Parking Garage",
    badges: ["Transportation"],
    fullDescription:
      "Use repair tools and air pumps to handle quick bike maintenance and keep commuting smoothly.",
    details: [
      { label: "Location", value: "Near Parking Garage" },
      { label: "Hours", value: "24/7" },
      { label: "Services", value: "Air pumps, basic repair tools, quick maintenance" }
    ]
  },
  {
    icon: "🧘",
    title: "Meditation Room",
    desc: "Quiet space for relaxation and reflection.",
    previewHours: "8 AM – 8 PM",
    previewLocation: "Wellness Center",
    badges: ["Wellness"],
    fullDescription:
      "Find a quiet, calming environment for meditation, reflection, or stress relief during the day.",
    details: [
      { label: "Location", value: "Wellness Center" },
      { label: "Hours", value: "8 AM – 8 PM" },
      { label: "Services", value: "Meditation, prayer, quiet reflection, relaxation" }
    ]
  },
  {
    icon: "⚖️",
    title: "Legal Aid Services",
    desc: "Free legal guidance for students.",
    previewHours: "Mon–Fri 10 AM – 4 PM",
    previewLocation: "Student Union",
    badges: ["Student Support"],
    fullDescription:
      "Access basic legal guidance on housing, employment, and personal matters through student-focused support services.",
    details: [
      { label: "Location", value: "Student Union" },
      { label: "Hours", value: "Mon–Fri 10 AM – 4 PM" },
      { label: "Services", value: "Housing questions, employment guidance, legal referrals" }
    ]
  },
  {
    icon: "📦",
    title: "Lost and Found",
    desc: "Recover lost personal items.",
    previewHours: "Mon–Fri 9 AM – 5 PM",
    previewLocation: "Campus Police",
    badges: ["Campus Service"],
    fullDescription:
      "Report or recover lost belongings through the campus lost and found system.",
    details: [
      { label: "Location", value: "Campus Police" },
      { label: "Hours", value: "Mon–Fri 9 AM – 5 PM" },
      { label: "Services", value: "Lost item reporting, found item retrieval, property support" }
    ]
  }
];

function renderResources() {
  const container = document.getElementById('resources-container');

  container.innerHTML = resources.map((r, index) => `
    <div class="info-card resource-card" data-index="${index}">
      <div class="icon-chip blue">${r.icon}</div>
      <h3>${r.title}</h3>
      <p class="resource-card-desc">${r.desc}</p>
      <div class="resource-card-meta">
        <span><strong>Hours:</strong> ${r.previewHours}</span>
        <span><strong>Location:</strong> ${r.previewLocation}</span>
      </div>
    </div>
  `).join('');

  const modal = document.getElementById('resource-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadges = document.getElementById('modal-badges');
  const modalDesc = document.getElementById('modal-desc');
  const modalDetails = document.getElementById('modal-details');

  document.querySelectorAll('.resource-card').forEach((card) => {
    card.addEventListener('click', () => {
      const resource = resources[Number(card.dataset.index)];

      modalTitle.textContent = resource.title;
      modalBadges.innerHTML = (resource.badges || [])
        .map((badge) => `<span class="badge">${badge}</span>`)
        .join('');
      modalDesc.textContent = resource.fullDescription || resource.desc;
      modalDetails.innerHTML = (resource.details || [])
        .map((detail) => `
          <div class="resource-modal-detail-block">
            <div class="resource-modal-detail-label">${detail.label}</div>
            <div class="resource-modal-detail-value">${detail.value}</div>
          </div>
        `).join('');

      modal.classList.add('open');
    });
  });
}

function init() {
  injectLayout('Resources');

  setContent(`
    <section class="container section resources-page">
      <h1 class="page-title">Resources</h1>
      <p class="page-subtitle">Explore important campus resources for SJSU students.</p>
      <div id="resources-container" class="resources-grid"></div>
    </section>

    <div id="resource-modal" class="modal">
      <div class="modal-panel resource-modal-panel">
        <button id="modal-close" class="modal-close" type="button" aria-label="Close">✕</button>
        <h2 id="modal-title" class="resource-modal-title"></h2>
        <div id="modal-badges" class="badge-row resource-badge-row"></div>
        <p id="modal-desc" class="resource-modal-desc"></p>
        <div class="resource-modal-divider"></div>
        <div id="modal-details" class="resource-modal-details-grid"></div>
      </div>
    </div>
  `);

  renderResources();

  document.getElementById('modal-close').onclick = () => {
    document.getElementById('resource-modal').classList.remove('open');
  };

  window.onclick = (e) => {
    if (e.target.id === 'resource-modal') {
      e.target.classList.remove('open');
    }
  };
}

init();