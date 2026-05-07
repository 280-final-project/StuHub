// Demo seed fixtures: system user + curated events / deals / resources.
// Imported by seed_demo_data.js. Pure data; no DB or AI calls.

const SYSTEM_USER = {
  user_name: "StuHub",
  email: "system@stuhub.local",
  pfp_url: null,
  bio: "Curated demo content for the StuHub platform",
};

const EVENTS = [
  {
    item_name: "Cybersecurity Industry Panel",
    item_desc:
      "Join us for a panel discussion on cybersecurity trends featuring industry experts from Google, Microsoft, and Apple. We'll cover zero-trust architecture, post-quantum cryptography, and the latest threat landscape. Free pizza for all attendees.",
    is_timed: true,
    timeframe: "2026-05-15 6:00 PM",
    loc_content: "Engineering Building, Room 189",
    img_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800",
  },
  {
    item_name: "Spring Hackathon: AI for Good",
    item_desc:
      "48-hour hackathon focused on AI applications for social impact. Build solutions in healthcare, education, accessibility, or sustainability. $5,000 in prizes, free meals, and mentorship from industry pros. Open to all SJSU students — no experience required.",
    is_timed: true,
    timeframe: "2026-05-22 5:00 PM",
    loc_content: "Student Union Ballroom",
    img_url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
  },
  {
    item_name: "Spring Career & Internship Fair",
    item_desc:
      "Connect with 100+ employers hiring for full-time roles, internships, and co-ops across tech, finance, healthcare, and engineering. Bring your resume and your Tower Card. Business casual recommended.",
    is_timed: true,
    timeframe: "2026-05-08 11:00 AM",
    loc_content: "Event Center",
    img_url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
  },
  {
    item_name: "Free Pizza & Code Night",
    item_desc:
      "Casual coding night hosted by the SJSU Computer Science Club. Work on personal projects, get help debugging, or just hang out with fellow CS students. Free pizza and drinks while supplies last.",
    is_timed: true,
    timeframe: "2026-05-09 7:00 PM",
    loc_content: "Duncan Hall, Room 250",
    img_url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800",
  },
  {
    item_name: "Founders Talk: Building a Startup in College",
    item_desc:
      "Three SJSU alumni who founded successful startups (one acquired by Salesforce, two YC-backed) share their journey. Q&A and networking after the talk. Hosted by the SJSU Entrepreneurship Society.",
    is_timed: true,
    timeframe: "2026-05-12 5:30 PM",
    loc_content: "Lucas Business School, Room 301",
    img_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
  },
  {
    item_name: "Wellness Wednesday: Stress Management Workshop",
    item_desc:
      "Drop-in workshop on managing finals stress with guided meditation, breathing exercises, and practical study-break routines. Run by the Student Wellness Center. Free tea and snacks.",
    is_timed: true,
    timeframe: "2026-05-14 12:00 PM",
    loc_content: "Student Wellness Center",
    img_url: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800",
  },
  {
    item_name: "International Food Festival",
    item_desc:
      "SJSU's annual cultural celebration with food, music, and performances from 30+ student cultural organizations. Try cuisine from around the world for $1-3 per dish. All proceeds support cultural clubs.",
    is_timed: true,
    timeframe: "2026-05-16 5:00 PM",
    loc_content: "Tower Lawn",
    img_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  },
  {
    item_name: "Resume Review Drop-In",
    item_desc:
      "No appointment needed — bring your resume (printed or digital) for one-on-one feedback from career coaches. Average review takes 15-20 minutes. Walk-ins welcome until 4:30 PM.",
    is_timed: true,
    timeframe: "2026-05-07 1:00 PM",
    loc_content: "Career Center, Admin Building Room 154",
    img_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800",
  },
];

const DEALS = [
  {
    item_name: "GitHub Student Pack",
    item_desc:
      "Free developer tools, cloud credits, domains, and more — valued at thousands of dollars.",
    timeframe: "Online — always available",
    loc_content: "education.github.com/pack",
    metadata: {
      icon: "🐙",
      badges: ["Free", "$200k+ in Tools"],
      fullDescription:
        "The GitHub Student Developer Pack bundles free access to dozens of premium developer tools, cloud services, and learning platforms. Includes GitHub Pro, cloud credits, free domains, CI/CD tools, and more.",
      details: [
        { label: "How to Access", value: "Apply at education.github.com/pack with your school email or student ID." },
        { label: "Top Perks", value: "GitHub Pro, DigitalOcean credits, Namecheap free domain, JetBrains IDEs, and more." },
        { label: "Value", value: "Over $200,000 worth of tools and services, all free while you're a student." },
      ],
    },
  },
  {
    item_name: "Apple Education Store",
    item_desc: "Save on Mac, iPad, and accessories through Apple's education pricing.",
    timeframe: "Online — always available",
    loc_content: "apple.com/shop/education",
    metadata: {
      icon: "🍎",
      badges: ["Up to $300 Off", "Free AirPods Promo"],
      fullDescription:
        "Apple offers special education pricing on Mac and iPad products. During the annual Back to School promotion, students can also receive free AirPods with qualifying purchases.",
      details: [
        { label: "How to Access", value: "Visit apple.com/shop/education and sign in with your .edu email or UNiDAYS." },
        { label: "Eligible Products", value: "MacBook Air, MacBook Pro, iMac, iPad Pro, iPad Air, and accessories." },
        { label: "Savings", value: "Up to $300 off Mac, up to $100 off iPad, and free AirPods during Back to School." },
      ],
    },
  },
  {
    item_name: "Spotify Student",
    item_desc: "Get Spotify Premium, Hulu, and SHOWTIME bundled for just $5.99/mo.",
    timeframe: "Online — always available",
    loc_content: "spotify.com/student",
    metadata: {
      icon: "🎵",
      badges: ["$5.99/mo", "Hulu Included"],
      fullDescription:
        "The Spotify Premium Student plan gives you ad-free music streaming, offline downloads, plus access to Hulu (ad-supported) and SHOWTIME — all for one low monthly price.",
      details: [
        { label: "How to Access", value: "Go to spotify.com/student and verify enrollment through SheerID." },
        { label: "Price", value: "$5.99/mo (regularly $10.99/mo for Premium alone)." },
        { label: "Includes", value: "Spotify Premium, Hulu (ad-supported), and SHOWTIME streaming." },
      ],
    },
  },
  {
    item_name: "Amazon Prime Student",
    item_desc:
      "6-month free trial then 50% off Prime — free shipping, Prime Video, and more.",
    timeframe: "Online — always available",
    loc_content: "amazon.com/primestudent",
    metadata: {
      icon: "📦",
      badges: ["6 Months Free", "50% Off After"],
      fullDescription:
        "Amazon Prime Student offers a generous 6-month free trial, then half-price Prime membership. Enjoy free two-day shipping, Prime Video, Prime Music, Prime Reading, and exclusive student deals.",
      details: [
        { label: "How to Access", value: "Sign up at amazon.com/primestudent with your .edu email." },
        { label: "Price", value: "Free for 6 months, then $7.49/mo or $69/year (regular Prime is $14.99/mo)." },
        { label: "Benefits", value: "Free shipping, Prime Video, Prime Music, Prime Reading, exclusive deals, and more." },
      ],
    },
  },
  {
    item_name: "Adobe Creative Cloud Student",
    item_desc: "Get the full Creative Cloud suite at over 60% off the regular price.",
    timeframe: "Online — always available",
    loc_content: "adobe.com/creativecloud/plans",
    metadata: {
      icon: "🎨",
      badges: ["60%+ Off", "All Apps Included"],
      fullDescription:
        "Adobe offers its complete Creative Cloud suite — including Photoshop, Illustrator, Premiere Pro, After Effects, and more — at a steep student discount. Perfect for design, video, and photography coursework.",
      details: [
        { label: "How to Access", value: "Visit adobe.com and select the Students & Teachers plan. Verify with SheerID." },
        { label: "Price", value: "Around $19.99/mo for the full All Apps plan (regularly $54.99/mo)." },
        { label: "Included Apps", value: "Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, Lightroom, and 20+ more." },
      ],
    },
  },
  {
    item_name: "Notion Student Plan",
    item_desc: "Get the Notion Plus plan completely free with your student email.",
    timeframe: "Online — always available",
    loc_content: "notion.so/students",
    metadata: {
      icon: "📝",
      badges: ["Free Plus Plan", "Unlimited Blocks"],
      fullDescription:
        "Notion offers its Plus plan (normally $8/mo) entirely free to students. Organize notes, projects, wikis, and databases with unlimited blocks and file uploads.",
      details: [
        { label: "How to Access", value: "Sign up at notion.so with your .edu email — the Plus plan is applied automatically." },
        { label: "Features", value: "Unlimited blocks, unlimited file uploads, 30-day version history, and guest collaborators." },
        { label: "Use Cases", value: "Class notes, project management, personal wiki, habit tracking, and team collaboration." },
      ],
    },
  },
  {
    item_name: "Microsoft Student Office 365",
    item_desc: "Get Office 365 free and save up to 10% on Surface devices.",
    timeframe: "Online — always available",
    loc_content: "microsoft.com/en-us/education",
    metadata: {
      icon: "💻",
      badges: ["Free Office 365", "Surface Discounts"],
      fullDescription:
        "Microsoft provides free Office 365 Education to students with a valid school email, plus discounts on Surface laptops and accessories through the Microsoft Education Store.",
      details: [
        { label: "How to Access", value: "Go to microsoft.com/education and sign up with your school email." },
        { label: "Free Software", value: "Office 365 including Word, Excel, PowerPoint, OneNote, Teams, and 1 TB OneDrive." },
        { label: "Hardware Discounts", value: "Up to 10% off Surface Pro, Surface Laptop, and accessories." },
      ],
    },
  },
  {
    item_name: "UNiDAYS",
    item_desc: "Verify your student status and unlock exclusive discounts at hundreds of brands.",
    timeframe: "Online — always available",
    loc_content: "unidays.com",
    metadata: {
      icon: "🎓",
      badges: ["Free to Join", "Hundreds of Brands"],
      fullDescription:
        "UNiDAYS is a free student verification service that connects you with exclusive discounts from top brands in fashion, tech, food, and more. Simply verify your student email and start saving.",
      details: [
        { label: "How to Access", value: "Sign up at unidays.com with your .edu email to verify student status." },
        { label: "Popular Brands", value: "Apple, Nike, Samsung, ASOS, Spotify, and many more." },
        { label: "Discount Range", value: "Typically 10–25% off, with occasional higher flash deals." },
      ],
    },
  },
  {
    item_name: "VTA Student Transit Pass",
    item_desc: "Discounted VTA transit passes included with SJSU enrollment fees.",
    timeframe: "Active during enrollment",
    loc_content: "VTA / SJSU Campus",
    metadata: {
      icon: "🚌",
      badges: ["Included with Fees", "Unlimited Rides"],
      fullDescription:
        "SJSU students receive a SmartPass (VTA transit pass) funded through student fees. It provides unlimited rides on VTA buses and light rail throughout the semester.",
      details: [
        { label: "How to Access", value: "Activate your SmartPass through the Clipper card system with your SJSU Tower Card." },
        { label: "Coverage", value: "Unlimited rides on all VTA bus and light rail routes." },
        { label: "Note", value: "Valid during fall and spring semesters while enrolled. Summer availability may vary." },
      ],
    },
  },
  {
    item_name: "Chipotle Student Deals",
    item_desc: "Chipotle Rewards earn free food — students can stack with BOGO promos.",
    timeframe: "Varies by location",
    loc_content: "Chipotle App",
    metadata: {
      icon: "🌯",
      badges: ["Rewards Program", "Free Entrées"],
      fullDescription:
        "Chipotle's loyalty program earns you 10 points per $1 spent, with free food and extras as rewards. Students can also catch limited-time BOGO and free-delivery promos throughout the semester.",
      details: [
        { label: "How to Access", value: "Download the Chipotle app and join Chipotle Rewards (free)." },
        { label: "How It Works", value: "Earn 10 points per $1 spent. 1,250 points = free entrée." },
        { label: "Student Promos", value: "Watch for BOGO events, free delivery codes, and limited-time challenges." },
      ],
    },
  },
];

const RESOURCES = [
  {
    item_name: "MLK Library",
    item_desc: "Study spaces, research databases, equipment checkout, and more.",
    timeframe: "Mon–Thu 8 AM – 10 PM",
    loc_content: "Martin Luther King Jr. Library",
    metadata: {
      icon: "📚",
      badges: ["Study Spaces", "Research Tools"],
      fullDescription:
        "The Dr. Martin Luther King Jr. Library is a joint SJSU/San José Public Library facility offering extensive study spaces, research databases, equipment checkout, printing, and special collections.",
      details: [
        { label: "Services", value: "Study rooms, research databases, interlibrary loan, equipment checkout, printing, and workshops." },
        { label: "Hours", value: "Monday – Thursday 8 AM – 10 PM, Friday 8 AM – 6 PM, Saturday 9 AM – 6 PM, Sunday 1 PM – 8 PM." },
        { label: "Tip", value: "Reserve study rooms online through the library website up to 7 days in advance." },
      ],
    },
  },
  {
    item_name: "Career Center",
    item_desc: "Resume help, mock interviews, job fairs, and career counseling.",
    timeframe: "Mon–Fri 8 AM – 5 PM",
    loc_content: "Admin Building, Room 154",
    metadata: {
      icon: "💼",
      badges: ["Free", "Walk-Ins Welcome"],
      fullDescription:
        "The SJSU Career Center helps students explore career paths, improve resumes and cover letters, prepare for interviews, and connect with employers through job fairs and networking events.",
      details: [
        { label: "Services", value: "Resume reviews, mock interviews, career counseling, job fairs, employer info sessions, and Handshake access." },
        { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM (some evening events available)." },
        { label: "How to Book", value: "Schedule through Handshake or walk in during drop-in hours." },
      ],
    },
  },
  {
    item_name: "Student Wellness Center",
    item_desc: "Counseling, health services, and wellness programs for all students.",
    timeframe: "Mon–Fri 8 AM – 5 PM",
    loc_content: "Student Wellness Center Building",
    metadata: {
      icon: "🧠",
      badges: ["Confidential", "No Extra Cost"],
      fullDescription:
        "The Student Wellness Center provides comprehensive health and counseling services including individual therapy, group counseling, crisis support, health education, and primary care.",
      details: [
        { label: "Services", value: "Individual counseling, group therapy, crisis intervention, health screenings, immunizations, and wellness workshops." },
        { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
        { label: "How to Book", value: "Call the Wellness Center or schedule through MySJSU portal." },
      ],
    },
  },
  {
    item_name: "Spartan Food Pantry",
    item_desc: "Free groceries and essentials for any enrolled SJSU student.",
    timeframe: "Mon–Thu 9 AM – 4 PM",
    loc_content: "Dinh & Mai Lam Family Student Union",
    metadata: {
      icon: "🍎",
      badges: ["Free", "No Questions Asked"],
      fullDescription:
        "The Spartan Food Pantry provides free groceries, snacks, hygiene products, and essentials to all enrolled SJSU students. No income verification required — just bring your Tower Card.",
      details: [
        { label: "What's Available", value: "Canned goods, pasta, rice, fresh produce (when available), snacks, hygiene products, and more." },
        { label: "Hours", value: "Monday – Thursday, 9:00 AM – 4:00 PM (hours may vary during breaks)." },
        { label: "How to Access", value: "Bring your SJSU Tower Card. No appointment needed." },
      ],
    },
  },
  {
    item_name: "Peer Connections",
    item_desc: "Free tutoring, mentoring, and supplemental instruction from fellow students.",
    timeframe: "Mon–Fri varies",
    loc_content: "Student Services Center, Room 600",
    metadata: {
      icon: "🤝",
      badges: ["Free Tutoring", "Peer Mentoring"],
      fullDescription:
        "Peer Connections offers free peer tutoring, mentoring, and Supplemental Instruction (SI) for a wide range of courses. Connect with trained student tutors who have excelled in the same classes.",
      details: [
        { label: "Services", value: "One-on-one tutoring, group study sessions, SI sections, and peer mentoring." },
        { label: "Subjects", value: "Math, science, engineering, business, writing, and more." },
        { label: "How to Book", value: "Schedule through the Peer Connections portal on the SJSU website." },
      ],
    },
  },
  {
    item_name: "SJSU Cares",
    item_desc: "Emergency assistance for housing, food, and financial crises.",
    timeframe: "Mon–Fri 8 AM – 5 PM",
    loc_content: "Student Services Center",
    metadata: {
      icon: "❤️",
      badges: ["Emergency Aid", "Confidential"],
      fullDescription:
        "SJSU Cares provides immediate support and resources for students facing unexpected hardships — housing insecurity, food insecurity, financial crises, or other emergencies.",
      details: [
        { label: "Services", value: "Emergency grants, temporary housing referrals, food resources, CalFresh enrollment, and case management." },
        { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
        { label: "How to Access", value: "Submit a referral form online or walk in to the Student Services Center." },
      ],
    },
  },
  {
    item_name: "Writing Center",
    item_desc: "One-on-one writing consultations for any assignment or project.",
    timeframe: "Mon–Fri varies",
    loc_content: "Clark Hall, Room 126",
    metadata: {
      icon: "✏️",
      badges: ["Free", "All Subjects"],
      fullDescription:
        "The Writing Center offers free one-on-one consultations to help students at any stage of the writing process — brainstorming, drafting, revising, or polishing any type of writing.",
      details: [
        { label: "Services", value: "One-on-one writing consultations for essays, research papers, personal statements, and more." },
        { label: "Hours", value: "Monday – Friday, hours vary by semester. Check the Writing Center website." },
        { label: "How to Book", value: "Schedule online through the Writing Center's booking system." },
      ],
    },
  },
  {
    item_name: "Spartan Recreation",
    item_desc: "Gym access, fitness classes, intramural sports, and outdoor adventures.",
    timeframe: "Mon–Fri 6 AM – 10 PM",
    loc_content: "Spartan Recreation & Aquatic Center",
    metadata: {
      icon: "🏋️",
      badges: ["Included with Fees", "50+ Classes"],
      fullDescription:
        "Spartan Recreation offers a state-of-the-art gym, group fitness classes, intramural sports leagues, outdoor adventure trips, and an aquatic center — all included in student fees.",
      details: [
        { label: "Facilities", value: "Weight room, cardio floor, basketball courts, pool, climbing wall, and group fitness studios." },
        { label: "Hours", value: "Monday – Friday 6 AM – 10 PM, Saturday – Sunday 9 AM – 5 PM." },
        { label: "Programs", value: "50+ group fitness classes, intramural sports, personal training, and outdoor adventures." },
      ],
    },
  },
  {
    item_name: "IT Help Desk",
    item_desc: "Tech support for SJSU accounts, Wi-Fi, software, and devices.",
    timeframe: "Mon–Fri 8 AM – 5 PM",
    loc_content: "MLK Library / Hugh Gillis Hall",
    metadata: {
      icon: "🖥️",
      badges: ["Free Support", "Walk-In"],
      fullDescription:
        "The SJSU IT Help Desk provides technical support for student accounts, campus Wi-Fi, software installations, email, and device troubleshooting.",
      details: [
        { label: "Services", value: "Account support, Wi-Fi setup, software downloads, email help, and general troubleshooting." },
        { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
        { label: "How to Contact", value: "Walk in, call, email, or submit a support ticket through the IT website." },
      ],
    },
  },
  {
    item_name: "Financial Aid Office",
    item_desc: "Scholarships, grants, loans, and work-study program information.",
    timeframe: "Mon–Fri 8 AM – 5 PM",
    loc_content: "Student Services Center",
    metadata: {
      icon: "💰",
      badges: ["FAFSA Help", "Scholarships"],
      fullDescription:
        "The Financial Aid Office helps students navigate FAFSA, scholarships, grants, loans, and work-study opportunities. They also provide financial literacy workshops and emergency aid referrals.",
      details: [
        { label: "Services", value: "FAFSA assistance, scholarship search, loan counseling, work-study, and financial literacy." },
        { label: "Hours", value: "Monday – Friday, 8:00 AM – 5:00 PM." },
        { label: "How to Contact", value: "Visit in person, call, or submit questions through the MySJSU portal." },
      ],
    },
  },
];

module.exports = { SYSTEM_USER, EVENTS, DEALS, RESOURCES };
