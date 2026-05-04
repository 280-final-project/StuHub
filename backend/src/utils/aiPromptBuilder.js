const MAX_DESC_CHARS = 300;
const MAX_EVENTS = 50;

function formatEvent(e) {
  const head = `[${e.item_id}] ${e.item_name}` +
    (e.timeframe ? ` — ${e.timeframe}` : "") +
    (e.loc_content ? ` @ ${e.loc_content}` : "");
  const desc = e.item_desc
    ? `\n   ${e.item_desc.slice(0, MAX_DESC_CHARS)}${e.item_desc.length > MAX_DESC_CHARS ? "…" : ""}`
    : "";
  return head + desc;
}

function buildChatPrompt(userMessage, events) {
  const trimmed = events.slice(0, MAX_EVENTS);
  const eventsText = trimmed.length
    ? trimmed.map(formatEvent).join("\n\n")
    : "(no approved events available)";

  const systemInstruction =
    "You are a helpful campus events assistant for SJSU StudentHub. " +
    "Answer questions about campus events using ONLY the events listed below. " +
    "If a question cannot be answered from the list, say so politely instead of guessing. " +
    "Keep responses concise (2-3 sentences). " +
    "End your response with a single line in the format: [ids: <comma-separated-ids>] " +
    "listing the IDs of events you referenced (or [ids:] if you didn't reference any).\n\n" +
    "EVENTS:\n" +
    eventsText;

  return { systemInstruction, userPrompt: userMessage };
}

function parseChatResponse(text) {
  const match = text.match(/\[ids:\s*([0-9,\s]*)\]\s*$/);
  if (!match) return { response: text.trim(), relatedItemIds: [] };
  const ids = match[1]
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n));
  const response = text.replace(match[0], "").trim();
  return { response, relatedItemIds: ids };
}

module.exports = { buildChatPrompt, parseChatResponse };
