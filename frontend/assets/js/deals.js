import { injectLayout, setContent } from './app.js';

const deals = [
  {
    icon: "🎓",
    title: "UNiDAYS",
    desc: "Student discount platform.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Student Only", "Online"],
    fullDescription:
      "Free platform that verifies student status and unlocks discounts on brands like Nike, Apple, ASOS, and more across clothing, tech, and lifestyle categories.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Clothing, tech, lifestyle, brand discounts" }
    ]
  },
  {
    icon: "🎓",
    title: "Student Beans",
    desc: "Student deals and discounts.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Student Only", "Online"],
    fullDescription:
      "Another student verification platform offering exclusive discounts on fashion, tech, food, and subscriptions, often overlapping with UNiDAYS but sometimes providing unique deals.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Fashion, tech, food, subscriptions" }
    ]
  },
  {
    icon: "🍎",
    title: "Apple Education Store",
    desc: "Discounted Apple products.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Tech", "Student Pricing"],
    fullDescription:
      "Offers special student pricing on MacBooks, iPads, and accessories, often bundled with gift cards during back-to-school promotions for additional savings.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "MacBooks, iPads, accessories" }
    ]
  },
  {
    icon: "💻",
    title: "Microsoft Student",
    desc: "Free Office and discounts.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Tech", "Free Software"],
    fullDescription:
      "Provides free access to Office 365 and discounts on Microsoft Surface devices, along with cloud storage and productivity tools for academic use.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Office 365, Surface devices, cloud tools" }
    ]
  },
  {
    icon: "🎨",
    title: "Adobe Creative Cloud",
    desc: "Discounted design software.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Creative Tools", "Student Pricing"],
    fullDescription:
      "Students receive major discounts on Adobe apps like Photoshop, Illustrator, and Premiere Pro, making professional creative tools affordable for academic and personal projects.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Photoshop, Illustrator, Premiere Pro" }
    ]
  },
  {
    icon: "🎵",
    title: "Spotify Student",
    desc: "Discounted music streaming.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Subscription", "Entertainment"],
    fullDescription:
      "Student plan offers Spotify Premium at a reduced price, often bundled with Hulu and Showtime, giving access to music, shows, and entertainment.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Music streaming and bundled entertainment" }
    ]
  },
  {
    icon: "📦",
    title: "Amazon Prime Student",
    desc: "Discounted Prime membership.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Subscription", "Student Pricing"],
    fullDescription:
      "Includes a six-month free trial followed by discounted membership, offering fast shipping, streaming content, exclusive deals, and student-focused savings.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Shipping, streaming, student-exclusive savings" }
    ]
  },
  {
    icon: "💻",
    title: "GitHub Student Pack",
    desc: "Free developer tools.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Free", "Developer Tools"],
    fullDescription:
      "Provides free access to premium developer tools, hosting services, domain names, and software like Canva Pro to support coding and technical projects.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Coding, hosting, domains, software perks" }
    ]
  },
  {
    icon: "📝",
    title: "Notion Student Plan",
    desc: "Free productivity tool.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Free", "Productivity"],
    fullDescription:
      "Students get free access to Notion’s premium features for organizing notes, projects, and tasks, helping manage academic and personal workflows efficiently.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Notes, tasks, organization, project planning" }
    ]
  },
  {
    icon: "🎨",
    title: "Canva Pro",
    desc: "Free design platform.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Free", "Creative Tools"],
    fullDescription:
      "Available free through education or GitHub pack, offering advanced design tools, templates, and assets for presentations, resumes, and creative work.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Presentations, resumes, graphics, templates" }
    ]
  },
  {
    icon: "👕",
    title: "Nike Student Discount",
    desc: "Discount on apparel and shoes.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Clothing", "Shoes"],
    fullDescription:
      "Students receive around 10 percent off on Nike products including shoes, clothing, and accessories through verified student discount platforms.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Shoes, clothing, accessories" }
    ]
  },
  {
    icon: "👟",
    title: "Adidas Student Discount",
    desc: "Discount on sportswear.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Clothing", "Shoes"],
    fullDescription:
      "Offers approximately 15 percent off for students on a wide range of apparel, footwear, and sports gear purchased online.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Sportswear, footwear, sports gear" }
    ]
  },
  {
    icon: "👖",
    title: "Levi’s Student Discount",
    desc: "Discount on jeans and apparel.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Clothing"],
    fullDescription:
      "Students can save around 15 percent on Levi’s clothing, making it more affordable to purchase quality denim and everyday wear.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Jeans, denim, everyday apparel" }
    ]
  },
  {
    icon: "🧢",
    title: "ASOS Student Discount",
    desc: "Fashion discount platform.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Clothing", "Fashion"],
    fullDescription:
      "Provides 10 to 20 percent off trendy clothing and accessories, with frequent sales and exclusive student promotions available year-round.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Fashion, accessories, trend-based shopping" }
    ]
  },
  {
    icon: "💻",
    title: "Dell Student Discount",
    desc: "Laptop and tech deals.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Tech", "Student Pricing"],
    fullDescription:
      "Offers student pricing and seasonal discounts on laptops, monitors, and accessories, making it easier to purchase reliable academic technology.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Laptops, monitors, accessories" }
    ]
  },
  {
    icon: "💻",
    title: "Lenovo Student Store",
    desc: "Discounted laptops.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Tech", "Student Pricing"],
    fullDescription:
      "Provides strong discounts on ThinkPads and other laptops, often combined with seasonal sales for significant savings on high-performance devices.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "ThinkPads, laptops, student tech" }
    ]
  },
  {
    icon: "🛍️",
    title: "Best Buy Student Deals",
    desc: "Exclusive tech discounts.",
    previewHours: "24/7 Online",
    previewLocation: "Online",
    badges: ["Tech", "Student Pricing"],
    fullDescription:
      "Students can access exclusive pricing on electronics, including laptops, headphones, and appliances, through a verified student account.",
    details: [
      { label: "Where", value: "Online" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Electronics, laptops, headphones, appliances" }
    ]
  },
  {
    icon: "🍔",
    title: "McDonald’s App Deals",
    desc: "Daily food discounts.",
    previewHours: "Varies",
    previewLocation: "On / Near Campus",
    badges: ["Food", "App Deals"],
    fullDescription:
      "Mobile app provides daily coupons and discounts on meals, making it an affordable option for students looking for quick and budget-friendly food.",
    details: [
      { label: "Where", value: "On / Near Campus" },
      { label: "Availability", value: "Varies" },
      { label: "Best For", value: "Quick meals, app coupons, budget food" }
    ]
  },
  {
    icon: "🌯",
    title: "Chipotle Student Deals",
    desc: "Occasional promos.",
    previewHours: "Varies",
    previewLocation: "Near Campus",
    badges: ["Food"],
    fullDescription:
      "Offers occasional student promotions, free delivery deals, and rewards through the app, helping students save on meals.",
    details: [
      { label: "Where", value: "Near Campus" },
      { label: "Availability", value: "Varies" },
      { label: "Best For", value: "Promos, app rewards, food savings" }
    ]
  },
  {
    icon: "🍕",
    title: "Domino’s Coupons",
    desc: "Online pizza deals.",
    previewHours: "24/7 Online",
    previewLocation: "Online / Near Campus",
    badges: ["Food", "Coupons"],
    fullDescription:
      "Frequent online coupons and bundle deals make Domino’s one of the most affordable food delivery options for students.",
    details: [
      { label: "Where", value: "Online / Near Campus" },
      { label: "Availability", value: "24/7 Online" },
      { label: "Best For", value: "Pizza deals, bundles, low-cost delivery" }
    ]
  },
  {
    icon: "🎂",
    title: "Starbucks Birthday Reward",
    desc: "Free birthday drink.",
    previewHours: "Birthday",
    previewLocation: "In-store / App",
    badges: ["Birthday", "Freebie"],
    fullDescription:
      "Rewards members receive a free drink or food item on their birthday when signed up in advance through the Starbucks rewards program.",
    details: [
      { label: "Where", value: "In-store / App" },
      { label: "Availability", value: "Birthday" },
      { label: "Best For", value: "Free birthday drink or food item" }
    ]
  },
  {
    icon: "🎁",
    title: "Sephora Birthday Gift",
    desc: "Free birthday product.",
    previewHours: "Birthday Month",
    previewLocation: "In-store / Online",
    badges: ["Birthday", "Beauty"],
    fullDescription:
      "Beauty Insider members receive a free birthday gift each year, with options that vary from skincare to makeup products.",
    details: [
      { label: "Where", value: "In-store / Online" },
      { label: "Availability", value: "Birthday Month" },
      { label: "Best For", value: "Free birthday beauty gift" }
    ]
  },
  {
    icon: "🥞",
    title: "IHOP Birthday Deal",
    desc: "Free birthday pancakes.",
    previewHours: "Birthday",
    previewLocation: "In-store",
    badges: ["Birthday", "Food"],
    fullDescription:
      "Members of IHOP rewards program receive a free stack of pancakes during their birthday period when signed up beforehand.",
    details: [
      { label: "Where", value: "In-store" },
      { label: "Availability", value: "Birthday" },
      { label: "Best For", value: "Free birthday pancakes" }
    ]
  },
  {
    icon: "🎬",
    title: "AMC Student Tickets",
    desc: "Discounted movie tickets.",
    previewHours: "Varies",
    previewLocation: "In-theater",
    badges: ["Entertainment"],
    fullDescription:
      "Students can get discounted movie tickets at participating theaters by showing a valid student ID, making entertainment more affordable.",
    details: [
      { label: "Where", value: "In-theater" },
      { label: "Availability", value: "Varies" },
      { label: "Best For", value: "Discounted student movie tickets" }
    ]
  },
  {
    icon: "🎓",
    title: "Student Transit Pass",
    desc: "Discounted public transport.",
    previewHours: "Varies",
    previewLocation: "Local Transit",
    badges: ["Transportation"],
    fullDescription:
      "Many campuses provide free or discounted transit passes, allowing students to travel around the city conveniently without additional transportation costs.",
    details: [
      { label: "Where", value: "Local Transit" },
      { label: "Availability", value: "Varies" },
      { label: "Best For", value: "Bus and transit savings" }
    ]
  },
  {
  icon: "🎓",
  title: "Coursera / edX",
  desc: "Free courses and discounted certificates.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Learning", "Online"],
  fullDescription:
    "Access thousands of courses from top universities. Many are free to audit, and students often get discounts on certificates.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Skill building, certifications, career learning" }
  ]
},
{
  icon: "👕",
  title: "Urban Outfitters Student Discount",
  desc: "Discount on fashion items.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Clothing"],
  fullDescription:
    "Students can get discounts on Urban Outfitters clothing and accessories via Student Beans or similar platforms.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Trendy clothing and accessories" }
  ]
},
{
  icon: "👟",
  title: "Puma Student Discount",
  desc: "Discount on sportswear.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Clothing"],
  fullDescription:
    "Students receive around 20 percent off Puma products including shoes and apparel through verified platforms.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Shoes, sportswear" }
  ]
},
{
  icon: "👟",
  title: "New Balance Student Deals",
  desc: "Occasional student discounts.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Clothing"],
  fullDescription:
    "Occasional student discounts and seasonal sales on shoes and athletic gear.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Athletic footwear" }
  ]
},
{
  icon: "💻",
  title: "HP Education Store",
  desc: "Discounted laptops and tech.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Tech"],
  fullDescription:
    "Offers student pricing on HP laptops, printers, and accessories for academic use.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Affordable laptops and printers" }
  ]
},
{
  icon: "💻",
  title: "Back Market",
  desc: "Refurbished tech deals.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Tech"],
  fullDescription:
    "Buy refurbished laptops, phones, and electronics at discounted prices with warranty.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Budget tech purchases" }
  ]
},
{
  icon: "🌯",
  title: "Subway Student Deals",
  desc: "Discounted meal combos.",
  previewHours: "Varies",
  previewLocation: "Near Campus",
  badges: ["Food"],
  fullDescription:
    "Some locations offer student combo deals or discounts with student ID.",
  details: [
    { label: "Where", value: "Near campus locations" },
    { label: "Best For", value: "Cheap meal options" }
  ]
},
{
  icon: "🎁",
  title: "Ulta Birthday Gift",
  desc: "Free birthday product.",
  previewHours: "Birthday Month",
  previewLocation: "In-store / Online",
  badges: ["Birthday"],
  fullDescription:
    "Ulta members receive a free beauty product during their birthday month.",
  details: [
    { label: "Where", value: "In-store / Online" },
    { label: "Best For", value: "Free beauty products" }
  ]
},
{
  icon: "☕",
  title: "Dunkin’ Birthday Reward",
  desc: "Free birthday drink.",
  previewHours: "Birthday",
  previewLocation: "In-store",
  badges: ["Birthday"],
  fullDescription:
    "Rewards members receive a free drink on their birthday.",
  details: [
    { label: "Where", value: "In-store" },
    { label: "Best For", value: "Free coffee or drink" }
  ]
},
{
  icon: "🥪",
  title: "Jersey Mike’s Birthday Deal",
  desc: "Free birthday sandwich.",
  previewHours: "Birthday",
  previewLocation: "In-store",
  badges: ["Birthday"],
  fullDescription:
    "Members receive a free sandwich during their birthday period.",
  details: [
    { label: "Where", value: "In-store" },
    { label: "Best For", value: "Free meal" }
  ]
},
{
  icon: "🐔",
  title: "Chick-fil-A Rewards",
  desc: "Free birthday item (varies).",
  previewHours: "Birthday",
  previewLocation: "In-store / App",
  badges: ["Birthday"],
  fullDescription:
    "Rewards members often receive a free item during their birthday.",
  details: [
    { label: "Where", value: "App / In-store" },
    { label: "Best For", value: "Free food item" }
  ]
},
{
  icon: "🎬",
  title: "Regal Student Tickets",
  desc: "Discounted movie tickets.",
  previewHours: "Varies",
  previewLocation: "In-theater",
  badges: ["Entertainment"],
  fullDescription:
    "Students can get discounted movie tickets with valid ID at Regal theaters.",
  details: [
    { label: "Where", value: "In-theater" },
    { label: "Best For", value: "Movie discounts" }
  ]
},
{
  icon: "🎵",
  title: "Apple Music Student",
  desc: "Discounted music subscription.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Subscription"],
  fullDescription:
    "Student plan offers Apple Music at a reduced monthly cost.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Music streaming" }
  ]
},
{
  icon: "📺",
  title: "Hulu Student",
  desc: "Cheap streaming plan.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Subscription"],
  fullDescription:
    "Students can subscribe to Hulu at a heavily discounted price.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "TV shows and movies" }
  ]
},
{
  icon: "📺",
  title: "YouTube Premium Student",
  desc: "Discounted premium plan.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Subscription"],
  fullDescription:
    "Students receive a discounted YouTube Premium subscription.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Ad-free videos, music" }
  ]
},
{
  icon: "🚗",
  title: "Zipcar Student Membership",
  desc: "Reduced membership fees.",
  previewHours: "Varies",
  previewLocation: "City",
  badges: ["Transportation"],
  fullDescription:
    "Students can access Zipcar with reduced membership fees for short-term car rentals.",
  details: [
    { label: "Where", value: "City-wide" },
    { label: "Best For", value: "Short-term car rentals" }
  ]
},
{
  icon: "✈️",
  title: "StudentUniverse",
  desc: "Discounted flights.",
  previewHours: "24/7 Online",
  previewLocation: "Online",
  badges: ["Travel"],
  fullDescription:
    "Offers discounted flights and travel deals exclusively for students.",
  details: [
    { label: "Where", value: "Online" },
    { label: "Best For", value: "Cheap flights and travel deals" }
  ]
},
{
  icon: "💻",
  title: "Student Software Licenses",
  desc: "Free academic software.",
  previewHours: "Varies",
  previewLocation: "School Portal",
  badges: ["Free"],
  fullDescription:
    "Many universities provide free access to software like MATLAB, AutoCAD, and more through student portals.",
  details: [
    { label: "Where", value: "School portal" },
    { label: "Best For", value: "Academic and technical software" }
  ]
}
];

function renderDeals() {
  const container = document.getElementById('deals-container');

  container.innerHTML = deals.map((d, index) => `
    <div class="info-card resource-card" data-index="${index}">
      <div class="icon-chip blue">${d.icon}</div>
      <h3>${d.title}</h3>
      <p class="resource-card-desc">${d.desc}</p>
      <div class="resource-card-meta">
        <span><strong>Availability:</strong> ${d.previewHours}</span>
        <span><strong>Where:</strong> ${d.previewLocation}</span>
      </div>
    </div>
  `).join('');

  const modal = document.getElementById('deal-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBadges = document.getElementById('modal-badges');
  const modalDesc = document.getElementById('modal-desc');
  const modalDetails = document.getElementById('modal-details');

  document.querySelectorAll('.resource-card').forEach((card) => {
    card.addEventListener('click', () => {
      const deal = deals[Number(card.dataset.index)];

      modalTitle.textContent = deal.title;
      modalBadges.innerHTML = (deal.badges || [])
        .map((badge) => `<span class="badge">${badge}</span>`)
        .join('');
      modalDesc.textContent = deal.fullDescription || deal.desc;
      modalDetails.innerHTML = (deal.details || [])
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
  injectLayout('Deals');

  setContent(`
    <section class="container section resources-page">
      <h1 class="page-title">Deals</h1>
      <p class="page-subtitle">Explore student discounts, freebies, and birthday deals available online and near campus.</p>
      <div id="deals-container" class="resources-grid"></div>
    </section>

    <div id="deal-modal" class="modal">
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

  renderDeals();

  document.getElementById('modal-close').onclick = () => {
    document.getElementById('deal-modal').classList.remove('open');
  };

  window.onclick = (e) => {
    if (e.target.id === 'deal-modal') {
      e.target.classList.remove('open');
    }
  };
}

init();