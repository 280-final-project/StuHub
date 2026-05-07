// Static preview content for the authenticated home page.
// These are demo placeholders — the real Events / Resources / Deals
// pages pull their content from the backend.

export const HOME_EVENTS = [
  {
    id: 1,
    title: "Spring Career Fair",
    date: "Apr 18, 2025",
    location: "Student Union",
    icon: "💼",
    category: "Career",
    description:
      "Connect with top employers at SJSU's largest career fair. Bring your resume and dress professionally. Over 100 companies attending.",
  },
  {
    id: 2,
    title: "Hackathon 2025",
    date: "May 3, 2025",
    location: "Engineering Building",
    icon: "💻",
    category: "Tech",
    description:
      "48-hour hackathon with prizes, mentors, and free food. Open to all skill levels. Form teams of up to 4.",
  },
  {
    id: 3,
    title: "Cultural Night",
    date: "May 10, 2025",
    location: "Event Center",
    icon: "🎭",
    category: "Culture",
    description:
      "Celebrate diversity with performances, food, and activities from cultures around the world. Free entry for SJSU students.",
  },
];

export const HOME_RESOURCES = [
  {
    id: 1,
    title: "Writing Center",
    icon: "✍️",
    category: "Academic",
    description:
      "Free tutoring for essays, research papers, and more. Walk-ins welcome.",
  },
  {
    id: 2,
    title: "Peer Mentoring",
    icon: "🤝",
    category: "Support",
    description:
      "One-on-one mentoring from upper-division students in your major.",
  },
  {
    id: 3,
    title: "Library Reserves",
    icon: "📚",
    category: "Academic",
    description:
      "Access course reserves, study rooms, and digital databases at King Library.",
  },
];

export const HOME_DEALS = [
  {
    id: 1,
    title: "Philz Coffee — 20% Off",
    icon: "☕",
    category: "Food",
    description:
      "Show your SJSU ID at Philz Coffee downtown for 20% off any drink.",
  },
  {
    id: 2,
    title: "Campus Bookstore — BOGO",
    icon: "📖",
    category: "Shopping",
    description:
      "Buy one, get one 50% off all SJSU apparel this week only at the Spartan Bookstore.",
  },
  {
    id: 3,
    title: "Adobe Creative Cloud — Free",
    icon: "🎨",
    category: "Software",
    description:
      "All SJSU students get free access to Adobe Creative Cloud through the university.",
  },
];

export const QUICK_CARDS = [
  {
    title: "Events",
    icon: "📅",
    desc: "Browse upcoming campus events, RSVP, and add to your calendar.",
    href: "/events",
    color: "var(--primary-soft)",
    iconColor: "var(--primary)",
  },
  {
    title: "Resources",
    icon: "📚",
    desc: "Academic support, tutoring, libraries, and more — all in one place.",
    href: "/resources",
    color: "var(--accent-soft)",
    iconColor: "#b45309",
  },
  {
    title: "Deals",
    icon: "🏷️",
    desc: "Exclusive student discounts from local businesses and online services.",
    href: "/deals",
    color: "#dcfce7",
    iconColor: "#15803d",
  },
];
