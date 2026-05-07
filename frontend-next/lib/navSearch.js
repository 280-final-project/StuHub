// Site-wide search index used by the navbar's search-as-you-type box.
// Pure data + scoring so the navbar component only handles UI.

export const SEARCH_ITEMS = [
  { label: "Home", url: "/home", type: "Page", keywords: ["landing", "main", "dashboard", "studenthub", "student hub"] },
  { label: "Events", url: "/events", type: "Page", keywords: ["activities", "campus events", "upcoming"] },
  { label: "Resources", url: "/resources", type: "Page", keywords: ["student support", "services", "help"] },
  { label: "Deals", url: "/deals", type: "Page", keywords: ["discounts", "offers", "student deals"] },
  { label: "Add Event", url: "/events/new", type: "Page", keywords: ["submit event", "create event", "post event"] },
  { label: "About", url: "/about", type: "Page", keywords: ["features", "what is", "about us"] },
  { label: "Contact", url: "/contact", type: "Page", keywords: ["support", "help", "feedback", "email", "contact us"] },
  { label: "Career Center", url: "/resources", type: "Resource", keywords: ["resume", "interview", "jobs"] },
  { label: "Student Wellness Center", url: "/resources", type: "Resource", keywords: ["health", "mental health"] },
  { label: "Spotify Premium Student", url: "/deals", type: "Deal", keywords: ["music", "spotify"] },
  { label: "Amazon Prime Student", url: "/deals", type: "Deal", keywords: ["amazon", "prime", "shopping"] },
];

export function scoreSearchItem(item, query) {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords || []).join(" ").toLowerCase();
  let score = 0;
  if (label === query) score += 100;
  if (label.startsWith(query)) score += 60;
  if (label.includes(query)) score += 40;
  if (keywords.includes(query)) score += 20;
  const parts = query.split(" ").filter(Boolean);
  parts.forEach((part) => {
    if (label.startsWith(part)) score += 20;
    else if (label.includes(part)) score += 10;
    if (keywords.includes(part)) score += 6;
  });
  if (item.type === "Page") score += 3;
  return score;
}

export function searchNavItems(query, limit = 7) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_ITEMS
    .map((item) => ({ ...item, score: scoreSearchItem(item, q) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
