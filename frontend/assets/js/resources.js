import { injectLayout, setContent } from './app.js';

const resources = [
  {
    title: "Career Center",
    desc: "Helps students with career development including resume building, interview prep, internships, and job search support.",
    details: `
      <strong>Hours:</strong> Mon–Fri: 9:00 AM – 4:30 PM<br>
      <strong>Location:</strong> Administration Building, Room 255<br>
      <strong>Accessibility:</strong> Walk-in, appointments, and online resources (Handshake, workshops)<br>
      <strong>More Services:</strong>
      <ul>
        <li>Free professional headshots</li>
        <li>Career Closet (free professional clothing)</li>
        <li>Career fairs & networking events</li>
      </ul>
    `
  },
  {
    title: "Student Wellness Center",
    desc: "Provides healthcare services including medical, mental health, and wellness support.",
    details: `
      <strong>Hours:</strong> Mon–Thurs: 8:30 AM – 5:00 PM<br>Fri: 8:30 AM – 4:30 PM<br>
      <strong>Location:</strong> 7th Street (across Event Center)<br>
      <strong>Accessibility:</strong> Appointments + same-day urgent care for students<br>
      <strong>More Services:</strong>
      <ul>
        <li>Counseling & Psychological Services (CAPS)</li>
        <li>Lab tests, pharmacy, nutrition support</li>
      </ul>
    `
  },
  {
    title: "SJSU Cares",
    desc: "Supports students facing financial, food, or housing insecurity.",
    details: `
      <strong>Hours:</strong> Mon–Fri: 9:00 AM – 5:00 PM<br>
      <strong>Location:</strong> Clark Hall, Room 140<br>
      <strong>Accessibility:</strong> Email, referrals, in-person visits<br>
      <strong>More Services:</strong>
      <ul>
        <li>Emergency grants</li>
        <li>Case management</li>
        <li>Basic needs assistance</li>
      </ul>
    `
  },
  {
    title: "Spartan Food Pantry",
    desc: "Provides free groceries and food assistance to students in need.",
    details: `
      <strong>Hours:</strong> Mon–Fri: 10:00 AM – 5:00 PM<br>
      <strong>Location:</strong> Behind Student Union (near Engineering Building)<br>
      <strong>Accessibility:</strong> Eligibility-based access via student verification<br>
      <strong>More Services:</strong>
      <ul>
        <li>Fresh produce & refrigerated items</li>
        <li>Nutrition support resources</li>
      </ul>
    `
  },
  {
    title: "Peer Connections (Tutoring & Mentoring)",
    desc: "Offers free tutoring, mentoring, and academic support by fellow students.",
    details: `
      <strong>Hours:</strong> Varies (appointments + sessions)<br>
      <strong>Location:</strong> Student Services Center (under North Garage)<br>
      <strong>Accessibility:</strong> Online booking + walk-ins<br>
      <strong>More Services:</strong>
      <ul>
        <li>Supplemental instruction sessions</li>
        <li>Academic skill workshops</li>
      </ul>
    `
  },
  {
    title: "Accessible Education Center (AEC)",
    desc: "Provides accommodations for students with disabilities (testing, learning support).",
    details: `
      <strong>Hours:</strong> Mon–Tues: 9 AM – 5 PM<br>Wed: 10 AM – 5 PM<br>Thurs–Fri: 9 AM – 4 PM<br>
      <strong>Location:</strong> College of Professional and Global Education (Student Union) 2nd floor<br>
      <strong>Accessibility:</strong> Application + documentation required<br>
      <strong>More Services:</strong>
      <ul>
        <li>Assistive technology</li>
        <li>Note-taking services</li>
        <li>Exam accommodations</li>
      </ul>
    `
  },
  {
    title: "Financial Aid & Scholarship Office",
    desc: "Helps students secure financial aid, scholarships, and grants.",
    details: `
      <strong>Hours:</strong> Mon–Fri: 9:00 AM – 4:00 PM<br>
      <strong>Location:</strong> Student Services Center<br>
      <strong>Accessibility:</strong> Online portal, email, in-person<br>
      <strong>More Services:</strong>
      <ul>
        <li>FAFSA guidance</li>
        <li>Loan counseling</li>
      </ul>
    `
  },
  {
    title: "Bursar’s Office",
    desc: "Handles tuition payments, billing, and financial transactions.",
    details: `
      <strong>Hours:</strong> Mon–Fri: 9:00 AM – 4:00 PM<br>
      <strong>Location:</strong> Student Services Center<br>
      <strong>Accessibility:</strong> In-person + online payments<br>
      <strong>More Services:</strong>
      <ul>
        <li>Payment plans</li>
        <li>Student ID services</li>
      </ul>
    `
  },
  {
    title: "Dr. Martin Luther King Jr. Library",
    desc: "Main academic library for study, research, and resources.",
    details: `
      <strong>Hours:</strong> Varies (extended hours during exams)<br>
      <strong>Location:</strong> Central campus<br>
      <strong>Accessibility:</strong> Open to students + public<br>
      <strong>More Services:</strong>
      <ul>
        <li>Study rooms</li>
        <li>Research help</li>
        <li>Media & equipment access</li>
      </ul>
    `
  },
  {
    title: "Writing Center",
    desc: "Provides writing support for essays, reports, and academic work.",
    details: `
      <strong>Hours:</strong> Mon - Fri 10:00 - 3:00 p.m<br>
      <strong>Location:</strong> Clark Hall<br>
      <strong>Accessibility:</strong> Appointments + walk-ins<br>
      <strong>More Services:</strong>
      <ul>
        <li>Graduate writing support</li>
        <li>Workshops</li>
      </ul>
    `
  },
  {
    title: "AS Print & Technology Center",
    desc: "Offers printing, copying, and tech services.",
    details: `
      <strong>Hours:</strong> Mon - Thurs 9:00 - 5:00 p.m.<br>Fri 9:00 - 4:00 p.m<br>
      <strong>Location:</strong> Student Union 2nd floor<br>
      <strong>Accessibility:</strong> Walk-in<br>
      <strong>More Services:</strong>
      <ul>
        <li>Laptop rentals</li>
        <li>Device repair</li>
        <li>Data backup</li>
      </ul>
    `
  },
  {
    title: "Student Involvement (Clubs & Organizations)",
    desc: "Supports student clubs, leadership programs, and campus events.",
    details: `
      <strong>Hours:</strong> Mon–Fri 9:00 - 5:00 p.m<br>
      <strong>Location:</strong> Student Union<br>
      <strong>Accessibility:</strong> Online portal + in-person<br>
      <strong>More Services:</strong>
      <ul>
        <li>Leadership training</li>
        <li>Event funding</li>
      </ul>
    `
  },
  {
    title: "MOSAIC Cross Cultural Center",
    desc: "Promotes diversity, inclusion, and cultural engagement.",
    details: `
      <strong>Hours:</strong> Mon - Thurs 9:00 - 6:00 p.m.<br>Fri 9:00 - 5:00 p.m<br>
      <strong>Location:</strong> Student Union<br>
      <strong>Accessibility:</strong> Open to all students<br>
      <strong>More Services:</strong>
      <ul>
        <li>Cultural events</li>
        <li>Identity-based support</li>
      </ul>
    `
  },
  {
    title: "PRIDE Center",
    desc: "Supports LGBTQ+ students and promotes inclusive campus climate.",
    details: `
      <strong>Hours:</strong> Mon - Thurs 10:00 - 6:00 p.m.<br>Fri 10:00 - 4:00 p.m<br>
      <strong>Location:</strong> Student Union<br>
      <strong>Accessibility:</strong> Open drop-in space<br>
      <strong>More Services:</strong>
      <ul>
        <li>Advocacy</li>
        <li>Community events</li>
      </ul>
    `
  },
  {
    title: "International Student & Scholar Services (ISSS)",
    desc: "Supports international students with visas, OPT/CPT, and immigration guidance.",
    details: `
      <strong>Hours:</strong> Mon–Fri 9:00AM - 4:30PM<br>
      <strong>Location:</strong> College of Professional and Global Education (Student Union)<br>
      <strong>Accessibility:</strong> Appointments, email, walk-in<br>
      <strong>More Services:</strong>
      <ul>
        <li>Workshops on employment</li>
        <li>Travel guidance</li>
      </ul>
    `
  },
  {
    title: "Spartan Recreation & Aquatic Center",
    desc: "Fitness and recreation facility for student wellness.",
    details: `
      <strong>Hours:</strong> Varies (check https://spartanrecreation.com/hours )<br>
      <strong>Location:</strong> On campus on 7th Street<br>
      <strong>Accessibility:</strong> Student membership (included in fees)<br>
      <strong>More Services:</strong>
      <ul>
        <li>Fitness classes</li>
        <li>Intramural sports</li>
        <li>Climbing wall</li>
      </ul>
    `
  }
];

function renderResources() {
  const container = document.getElementById('resources-container');
  const modal = document.getElementById('resource-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalDetails = document.getElementById('modal-details');
  const modalClose = document.getElementById('modal-close');

  resources.forEach((resource) => {
    const card = document.createElement('div');
    card.className = 'info-card resource-card';
    card.innerHTML = `
      <div class="icon-chip blue">📘</div>
      <h3>${resource.title}</h3>
      <p>${resource.desc}</p>
    `;

    card.addEventListener('click', () => {
      modalTitle.textContent = resource.title;
      modalDesc.textContent = resource.desc;
      modalDetails.innerHTML = resource.details;
      modal.classList.add('open');
    });

    container.appendChild(card);
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

function init() {
  injectLayout('Resources');

  setContent(`
    <section class="container section">
      <div class="page-header resources-header">
        <h1 class="page-title">Resources</h1>
        <p class="page-subtitle">Explore important campus resources for SJSU students.</p>
      </div>

      <div id="resources-container" class="resources-grid"></div>
    </section>

    <div id="resource-modal" class="modal">
      <div class="modal-panel resource-modal-panel">
        <button class="modal-close" id="modal-close">✕</button>
        <h2 id="modal-title"></h2>
        <p id="modal-desc"></p>
        <div id="modal-details" class="resource-modal-details"></div>
      </div>
    </div>
  `);

  renderResources();
}

init();