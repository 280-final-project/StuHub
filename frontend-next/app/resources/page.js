"use client";

import { useState } from "react";

const resources = [
  {
    icon: "💼",
    title: "Career Center",
    desc: "Resume help, mock interviews, job fairs, and career counseling.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Admin Building, Room 154",
    badges: ["Free", "Walk-Ins Welcome"],
    fullDescription:
      "The SJSU Career Center helps students explore career paths, improve resumes and cover letters, prepare for interviews, and connect with employers through job fairs and networking events.",
    details: [
      { label: "Services", value: "Resume reviews, mock interviews, career counseling, job fairs, employer info sessions, and Handshake access." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM (some evening events available)." },
      { label: "How to Book", value: "Schedule through Handshake or walk in during drop-in hours." },
    ],
  },
  {
    icon: "🧠",
    title: "Student Wellness Center",
    desc: "Counseling, health services, and wellness programs for all students.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Wellness Center Building",
    badges: ["Confidential", "No Extra Cost"],
    fullDescription:
      "The Student Wellness Center provides comprehensive health and counseling services including individual therapy, group counseling, crisis support, health education, and primary care.",
    details: [
      { label: "Services", value: "Individual counseling, group therapy, crisis intervention, health screenings, immunizations, and wellness workshops." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Book", value: "Call the Wellness Center or schedule through MySJSU portal." },
    ],
  },
  {
    icon: "❤️",
    title: "SJSU Cares",
    desc: "Emergency assistance for housing, food, and financial crises.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Services Center",
    badges: ["Emergency Aid", "Confidential"],
    fullDescription:
      "SJSU Cares provides immediate support and resources for students facing unexpected hardships — housing insecurity, food insecurity, financial crises, or other emergencies.",
    details: [
      { label: "Services", value: "Emergency grants, temporary housing referrals, food resources, CalFresh enrollment, and case management." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Access", value: "Submit a referral form online or walk in to the Student Services Center." },
    ],
  },
  {
    icon: "🍎",
    title: "Spartan Food Pantry",
    desc: "Free groceries and essentials for any enrolled SJSU student.",
    previewHours: "Mon–Thu 9 AM – 4 PM",
    previewLocation: "Dinh & Mai Lam Family Student Union",
    badges: ["Free", "No Questions Asked"],
    fullDescription:
      "The Spartan Food Pantry provides free groceries, snacks, hygiene products, and essentials to all enrolled SJSU students. No income verification required — just bring your Tower Card.",
    details: [
      { label: "What's Available", value: "Canned goods, pasta, rice, fresh produce (when available), snacks, hygiene products, and more." },
      { label: "Hours", value: "Monday – Thursday, 9:00 AM – 4:00 PM (hours may vary during breaks)." },
      { label: "How to Access", value: "Bring your SJSU Tower Card. No appointment needed." },
    ],
  },
  {
    icon: "🤝",
    title: "Peer Connections",
    desc: "Free tutoring, mentoring, and supplemental instruction from fellow students.",
    previewHours: "Mon–Fri varies",
    previewLocation: "Student Services Center, Room 600",
    badges: ["Free Tutoring", "Peer Mentoring"],
    fullDescription:
      "Peer Connections offers free peer tutoring, mentoring, and Supplemental Instruction (SI) for a wide range of courses. Connect with trained student tutors who have excelled in the same classes.",
    details: [
      { label: "Services", value: "One-on-one tutoring, group study sessions, SI sections, and peer mentoring." },
      { label: "Subjects", value: "Math, science, engineering, business, writing, and more." },
      { label: "How to Book", value: "Schedule through the Peer Connections portal on the SJSU website." },
    ],
  },
  {
    icon: "♿",
    title: "Accessible Education Center",
    desc: "Academic accommodations and support for students with disabilities.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Admin Building, Room 110",
    badges: ["Accommodations", "Support Services"],
    fullDescription:
      "The Accessible Education Center (AEC) provides academic accommodations, assistive technology, and support services for students with documented disabilities.",
    details: [
      { label: "Services", value: "Exam accommodations, note-taking assistance, assistive technology, sign language interpreters, and more." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Register", value: "Submit documentation and complete an intake appointment through the AEC website." },
    ],
  },
  {
    icon: "💰",
    title: "Financial Aid Office",
    desc: "Scholarships, grants, loans, and work-study program information.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Services Center",
    badges: ["FAFSA Help", "Scholarships"],
    fullDescription:
      "The Financial Aid Office helps students navigate FAFSA, scholarships, grants, loans, and work-study opportunities. They also provide financial literacy workshops and emergency aid referrals.",
    details: [
      { label: "Services", value: "FAFSA assistance, scholarship search, loan counseling, work-study, and financial literacy." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Contact", value: "Visit in person, call, or submit questions through the MySJSU portal." },
    ],
  },
  {
    icon: "🏦",
    title: "Bursar's Office",
    desc: "Tuition payments, fee waivers, refunds, and billing questions.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Services Center",
    badges: ["Billing", "Payments"],
    fullDescription:
      "The Bursar's Office handles tuition and fee payments, refunds, payment plans, and billing inquiries. They can also help with fee waivers and third-party billing arrangements.",
    details: [
      { label: "Services", value: "Tuition payments, refund processing, payment plans, fee waivers, and 1098-T tax forms." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Pay", value: "Pay online through MySJSU, in person, or set up a payment plan." },
    ],
  },
  {
    icon: "📚",
    title: "MLK Library",
    desc: "Study spaces, research databases, equipment checkout, and more.",
    previewHours: "Mon–Thu 8 AM – 10 PM, Fri–Sun varies",
    previewLocation: "Martin Luther King Jr. Library",
    badges: ["Study Spaces", "Research Tools"],
    fullDescription:
      "The Dr. Martin Luther King Jr. Library is a joint SJSU/San José Public Library facility offering extensive study spaces, research databases, equipment checkout, printing, and special collections.",
    details: [
      { label: "Services", value: "Study rooms, research databases, interlibrary loan, equipment checkout, printing, and workshops." },
      { label: "Hours", value: "Monday – Thursday 8 AM – 10 PM, Friday 8 AM – 6 PM, Saturday 9 AM – 6 PM, Sunday 1 PM – 8 PM." },
      { label: "Tip", value: "Reserve study rooms online through the library website up to 7 days in advance." },
    ],
  },
  {
    icon: "✏️",
    title: "Writing Center",
    desc: "One-on-one writing consultations for any assignment or project.",
    previewHours: "Mon–Fri varies",
    previewLocation: "Clark Hall, Room 126",
    badges: ["Free", "All Subjects"],
    fullDescription:
      "The Writing Center offers free one-on-one consultations to help students at any stage of the writing process — brainstorming, drafting, revising, or polishing any type of writing.",
    details: [
      { label: "Services", value: "One-on-one writing consultations for essays, research papers, personal statements, and more." },
      { label: "Hours", value: "Monday – Friday, hours vary by semester. Check the Writing Center website." },
      { label: "How to Book", value: "Schedule online through the Writing Center's booking system." },
    ],
  },
  {
    icon: "🖨️",
    title: "Print & Tech Center",
    desc: "Printing, scanning, and computer access across campus locations.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Multiple Campus Locations",
    badges: ["Low Cost", "Color & B/W"],
    fullDescription:
      "SJSU's print and tech centers provide affordable printing, scanning, and computer access at multiple locations across campus. Students receive a print allotment each semester.",
    details: [
      { label: "Services", value: "Black & white printing, color printing, scanning, large-format printing, and computer access." },
      { label: "Locations", value: "MLK Library, Student Union, and various computer labs across campus." },
      { label: "Pricing", value: "Students receive free print credits each semester. Additional pages at low per-page rates." },
    ],
  },
  {
    icon: "🎉",
    title: "Student Involvement",
    desc: "Clubs, organizations, Greek life, and leadership opportunities.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Union, Room 312",
    badges: ["400+ Clubs", "Leadership"],
    fullDescription:
      "Student Involvement connects you with 400+ registered student organizations, Greek life, leadership programs, and campus events. Get involved and build your network.",
    details: [
      { label: "Services", value: "Club directory, org registration, leadership workshops, Greek life, and event planning support." },
      { label: "How to Explore", value: "Browse organizations on SpartanLink or visit the Student Involvement office." },
      { label: "Tip", value: "Attend the annual Student Org Fair at the start of each semester to explore clubs." },
    ],
  },
  {
    icon: "🌍",
    title: "MOSAIC Center",
    desc: "Cultural programming and support for multicultural and underrepresented students.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Union",
    badges: ["Inclusive", "Community Space"],
    fullDescription:
      "The MOSAIC Cross-Cultural Center provides a welcoming space for students of all backgrounds. They offer cultural programming, identity-based support groups, mentoring, and community events.",
    details: [
      { label: "Services", value: "Cultural events, identity support groups, mentoring, study space, and community building." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM (events may extend beyond hours)." },
      { label: "Programs", value: "Dialogue & Discovery, Cultural Heritage celebrations, and social justice workshops." },
    ],
  },
  {
    icon: "🏳️‍🌈",
    title: "PRIDE Center",
    desc: "Resources, support, and community for LGBTQ+ students.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Student Union",
    badges: ["Safe Space", "Community"],
    fullDescription:
      "The PRIDE Center provides a safe and affirming space for LGBTQ+ students and allies. They offer support services, educational programming, community events, and referrals.",
    details: [
      { label: "Services", value: "Peer support, identity resources, pronoun guides, community events, and referrals." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "Programs", value: "Lavender Graduation, Queer & Trans Summit, and weekly community gatherings." },
    ],
  },
  {
    icon: "🌐",
    title: "International Student Services (ISSS)",
    desc: "Immigration advising, cultural adjustment, and support for international students.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Admin Building, Room 223",
    badges: ["Visa Support", "International"],
    fullDescription:
      "ISSS supports international students with immigration compliance, visa advising, work authorization (CPT/OPT), cultural adjustment, and community events.",
    details: [
      { label: "Services", value: "F-1/J-1 visa advising, CPT/OPT processing, travel signatures, tax workshops, and orientation." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Contact", value: "Visit during walk-in hours or schedule an appointment through the ISSS website." },
    ],
  },
  {
    icon: "🏋️",
    title: "Spartan Recreation",
    desc: "Gym access, fitness classes, intramural sports, and outdoor adventures.",
    previewHours: "Mon–Fri 6 AM – 10 PM, Sat–Sun 9 AM – 5 PM",
    previewLocation: "Spartan Recreation & Aquatic Center",
    badges: ["Included with Fees", "50+ Classes"],
    fullDescription:
      "Spartan Recreation offers a state-of-the-art gym, group fitness classes, intramural sports leagues, outdoor adventure trips, and an aquatic center — all included in student fees.",
    details: [
      { label: "Facilities", value: "Weight room, cardio floor, basketball courts, pool, climbing wall, and group fitness studios." },
      { label: "Hours", value: "Monday – Friday 6 AM – 10 PM, Saturday – Sunday 9 AM – 5 PM (hours vary during breaks)." },
      { label: "Programs", value: "50+ group fitness classes, intramural sports, personal training, and outdoor adventures." },
    ],
  },
  {
    icon: "🖥️",
    title: "IT Help Desk",
    desc: "Tech support for SJSU accounts, Wi-Fi, software, and devices.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "MLK Library / Hugh Gillis Hall",
    badges: ["Free Support", "Walk-In"],
    fullDescription:
      "The SJSU IT Help Desk provides technical support for student accounts, campus Wi-Fi, software installations, email, and device troubleshooting.",
    details: [
      { label: "Services", value: "Account support, Wi-Fi setup, software downloads, email help, and general troubleshooting." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
      { label: "How to Contact", value: "Walk in, call, email, or submit a support ticket through the IT website." },
    ],
  },
  {
    icon: "📋",
    title: "Academic Advising",
    desc: "Degree planning, course selection, and graduation requirement guidance.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "Varies by College",
    badges: ["By Appointment", "Degree Planning"],
    fullDescription:
      "Academic advisors help students plan their degree path, select courses, understand graduation requirements, and navigate academic policies. Each college has its own advising center.",
    details: [
      { label: "Services", value: "Degree audits, course planning, major/minor declarations, academic standing, and graduation checks." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM (varies by college)." },
      { label: "How to Book", value: "Schedule through MySJSU or your college's advising portal." },
    ],
  },
  {
    icon: "🔬",
    title: "Science Labs",
    desc: "Open lab hours for biology, chemistry, and physics courses.",
    previewHours: "Varies by department",
    previewLocation: "Science Building / Duncan Hall",
    badges: ["Open Hours", "TA Assistance"],
    fullDescription:
      "SJSU science departments offer open lab hours where students can complete lab work, practice techniques, and get help from teaching assistants outside of scheduled lab sections.",
    details: [
      { label: "Departments", value: "Biology, Chemistry, Physics, and Geology labs." },
      { label: "Hours", value: "Vary by department and semester. Check with your lab instructor or department website." },
      { label: "Tip", value: "Open lab hours are less crowded early in the week — plan ahead for better TA availability." },
    ],
  },
  {
    icon: "🎨",
    title: "Art Studios",
    desc: "Open studio hours for art majors and students enrolled in art courses.",
    previewHours: "Varies by studio",
    previewLocation: "Art Building / Industrial Studies",
    badges: ["Open Studio", "Equipment Access"],
    fullDescription:
      "SJSU Art & Design provides open studio hours for students enrolled in art courses. Access ceramics, printmaking, sculpture, painting, and digital labs outside of class time.",
    details: [
      { label: "Studios", value: "Ceramics, printmaking, sculpture, painting, photography darkroom, and digital design labs." },
      { label: "Hours", value: "Vary by studio and semester. Check posted schedules or the Art Department website." },
      { label: "Requirements", value: "Must be enrolled in a related art course. Some studios require safety training." },
    ],
  },
  {
    icon: "🎵",
    title: "Music Practice Rooms",
    desc: "Reservable practice rooms for music students and enrolled musicians.",
    previewHours: "Mon–Fri 8 AM – 9 PM",
    previewLocation: "Music Building",
    badges: ["Reservable", "Soundproof"],
    fullDescription:
      "The School of Music & Dance provides soundproof practice rooms for students enrolled in music courses. Rooms can be reserved or used on a first-come, first-served basis.",
    details: [
      { label: "Rooms", value: "Individual practice rooms, ensemble rehearsal rooms, and piano practice rooms." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 9:00 PM (may vary during breaks)." },
      { label: "How to Reserve", value: "Sign up at the Music Building front desk or check the online reservation system." },
    ],
  },
  {
    icon: "🚌",
    title: "Campus Shuttle",
    desc: "Free shuttle service connecting campus to nearby transit hubs and parking.",
    previewHours: "Mon–Fri during semester",
    previewLocation: "Multiple Campus Stops",
    badges: ["Free", "Regular Schedule"],
    fullDescription:
      "SJSU operates free shuttle routes connecting campus to nearby transit hubs, parking facilities, and student housing areas during the academic semester.",
    details: [
      { label: "Routes", value: "Park & Ride lots to campus, and campus to local transit connections." },
      { label: "Hours", value: "Monday – Friday during fall and spring semesters. Check SJSU Transportation for exact schedules." },
      { label: "How to Ride", value: "Just show up at a shuttle stop — no Tower Card or registration needed." },
    ],
  },
  {
    icon: "🚲",
    title: "Bike Repair Station",
    desc: "Self-service bike repair stations with tools and air pumps across campus.",
    previewHours: "24/7 access",
    previewLocation: "Multiple Campus Locations",
    badges: ["Free", "Self-Service"],
    fullDescription:
      "SJSU has self-service bike repair stations located around campus. Each station includes common tools (wrenches, screwdrivers, tire levers) and an air pump — free for all students.",
    details: [
      { label: "Tools Available", value: "Allen wrenches, screwdrivers, tire levers, and air pump." },
      { label: "Locations", value: "Near the Student Union, Science Building, and Engineering Building." },
      { label: "Tip", value: "For major repairs, visit a local bike shop. For quick fixes, the stations have everything you need." },
    ],
  },
  {
    icon: "🧘",
    title: "Meditation Room",
    desc: "Quiet space for meditation, prayer, and reflection open to all students.",
    previewHours: "Mon–Fri 8 AM – 8 PM",
    previewLocation: "Student Union, Room 235",
    badges: ["Quiet Space", "All Faiths"],
    fullDescription:
      "The SJSU Meditation Room is a quiet, multi-faith space for students to meditate, pray, or simply take a break. The room is open to students of all backgrounds and beliefs.",
    details: [
      { label: "Amenities", value: "Prayer mats, meditation cushions, and a quiet environment." },
      { label: "Hours", value: "Monday – Friday, 8:00 AM – 8:00 PM." },
      { label: "Guidelines", value: "Silence is observed. No food or loud conversations. Shoes may be removed at the door." },
    ],
  },
  {
    icon: "⚖️",
    title: "Legal Aid Services",
    desc: "Free legal consultations for students on housing, employment, and civil matters.",
    previewHours: "By appointment",
    previewLocation: "Student Union",
    badges: ["Free Consultation", "Confidential"],
    fullDescription:
      "Associated Students provides free legal consultations for SJSU students on issues including housing disputes, employment questions, family law, immigration, and more.",
    details: [
      { label: "Services", value: "Legal consultations on housing, employment, family law, immigration, and civil matters." },
      { label: "Hours", value: "By appointment — typically available several days per week." },
      { label: "How to Book", value: "Schedule through Associated Students or the Student Union front desk." },
    ],
  },
  {
    icon: "📦",
    title: "Lost and Found",
    desc: "Report or retrieve lost items found on campus.",
    previewHours: "Mon–Fri 8 AM – 5 PM",
    previewLocation: "University Police Department",
    badges: ["Free", "UPD Office"],
    fullDescription:
      "SJSU's Lost and Found is managed by the University Police Department. Report lost items or check for retrieved items at the UPD office during business hours.",
    details: [
      { label: "How to Report", value: "Visit the UPD office in person or call to report a lost item." },
      { label: "How to Retrieve", value: "Bring a valid ID to claim your item at the UPD Lost and Found desk." },
      { label: "Tip", value: "Items not claimed within 90 days may be donated or disposed of." },
    ],
  },
];

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openModal(resource) {
    setSelectedResource(resource);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedResource(null);
  }

  return (
    <div className="container resources-page">
      <div className="page-header">
        <h1 className="page-title">Resources</h1>
        <p className="page-subtitle">
          Explore important campus resources for SJSU students.
        </p>
      </div>

      <div className="resources-grid">
        {resources.map((resource, i) => (
          <div
            key={i}
            className="info-card resource-card"
            onClick={() => openModal(resource)}
          >
            <div className="icon-chip blue">{resource.icon}</div>
            <h3>{resource.title}</h3>
            <p className="resource-card-desc">{resource.desc}</p>
            <div className="resource-card-meta" style={{ marginTop: "0.75rem" }}>
              <span>🕐 {resource.previewHours}</span>
              <span>📍 {resource.previewLocation}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedResource && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-panel resource-modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2 className="resource-modal-title">{selectedResource.title}</h2>
            <div className="badge-row resource-badge-row">
              {selectedResource.badges.map((b, j) => (
                <span key={j} className="badge">
                  {b}
                </span>
              ))}
            </div>
            <p className="resource-modal-desc">
              {selectedResource.fullDescription}
            </p>
            <hr className="resource-modal-divider" />
            <div className="resource-modal-details-grid">
              {selectedResource.details.map((d, k) => (
                <div key={k} className="resource-modal-detail-block">
                  <span className="resource-modal-detail-label">
                    {d.label}
                  </span>
                  <span className="resource-modal-detail-value">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
