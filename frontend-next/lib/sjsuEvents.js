// Helpers for working with the SJSU Localist events feed.
// The Localist API returns each event wrapped: { event: {...} }.

export function mapSjsuEvent(wrapper) {
  const e = wrapper?.event || wrapper;
  if (!e?.title) return null;

  const timeframe = e.first_date || e.last_date || e.date_utc || "";
  const location = e.location_name || e.location || "";

  const params = new URLSearchParams({
    url: e.localist_url || e.url || "",
    title: e.title || "",
    time: timeframe,
    location,
    image: e.photo_url || "",
  });

  return {
    source: "sjsu",
    id: `sjsu-${e.id}`,
    title: e.title,
    image: e.photo_url || "",
    user_name: "SJSU",
    pfp_url: "",
    timeframe,
    location,
    href: `/events/sjsu?${params.toString()}`,
  };
}

export function matchesSjsuFilters(event, { query, location, from, to }) {
  if (query && !(event.title?.toLowerCase().includes(query))) return false;
  if (location && !(event.location?.toLowerCase().includes(location))) return false;
  if (from && event.timeframe && event.timeframe < from) return false;
  if (to && event.timeframe && event.timeframe > to + "Z") return false;
  return true;
}
