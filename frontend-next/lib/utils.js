export function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildMapEmbedUrl(location) {
  if (!location) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
}

export function splitTimeframe(timeframe = "") {
  const [datePart = "", timePart = ""] = timeframe.split(" • ");
  let startTime = "";
  let endTime = "";

  if (timePart.includes(" - ")) {
    const parts = timePart.split(" - ");
    startTime = parts[0] || "";
    endTime = parts[1] || "";
  } else {
    startTime = timePart || "";
  }

  return { eventDate: datePart, startTime, endTime };
}

export function splitLocation(location = "") {
  const match = location.match(/^(.*?)(?:,\s*Room\s*(.*))?$/i);
  return {
    building: match?.[1]?.trim() || "",
    room: match?.[2]?.trim() || "",
  };
}

export function getMinDateStr(daysAhead = 3) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
}
