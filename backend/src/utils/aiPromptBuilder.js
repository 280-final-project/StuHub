const MAX_DESC_CHARS = 240;
const MAX_ITEMS = 80;

const TYPE_LABEL = {
  event: "EVENT",
  deal: "DEAL",
  resource: "RESOURCE",
  place: "PLACE",
};

function formatItem(item) {
  const type = TYPE_LABEL[item.item_type] || "ITEM";
  const head = `[#${item.item_id}] (${type}) ${item.item_name}` +
    (item.timeframe ? ` — ${item.timeframe}` : "") +
    (item.loc_content ? ` @ ${item.loc_content}` : "");
  const desc = item.item_desc
    ? `\n   ${item.item_desc.slice(0, MAX_DESC_CHARS)}${item.item_desc.length > MAX_DESC_CHARS ? "…" : ""}`
    : "";
  return head + desc;
}

function buildChatPrompt(userMessage, items) {
  const trimmed = items.slice(0, MAX_ITEMS);
  const itemsText = trimmed.length
    ? trimmed.map(formatItem).join("\n\n")
    : "(no approved items available)";

  const systemInstruction =
    "You are a helpful campus assistant for SJSU StudentHub. " +
    "You can answer questions about three kinds of things, all listed below: " +
    "EVENTS (campus events with dates), DEALS (student discounts), and RESOURCES (campus services). " +
    "Answer ONLY using the items provided. If a question can't be answered from the list, say so politely. " +
    "Keep responses concise (2-3 sentences).\n\n" +
    "OUTPUT FORMAT (REQUIRED — every response must end with this line):\n" +
    "  <your 2-3 sentence answer>\n" +
    "  [items: <id>:<type>, <id>:<type>]\n\n" +
    "Type values must be exactly one of: event, deal, resource. " +
    "Use [items:] (empty) when no items were referenced. " +
    "Examples:\n" +
    "  Question: 'free pizza events?'\n" +
    "  Answer:   'There are two free pizza events: Code Night on May 9 and the Cyber Panel on May 15.\n" +
    "             [items: 5:event, 2:event]'\n\n" +
    "  Question: 'what is 2+2?'\n" +
    "  Answer:   'I can only answer questions about campus events, deals, and resources.\n" +
    "             [items:]'\n\n" +
    "AVAILABLE ITEMS:\n" +
    itemsText;

  return { systemInstruction, userPrompt: userMessage };
}

const TYPE_SET = new Set(["event", "deal", "resource", "place"]);

function parseChatResponse(text) {
  const match = text.match(/\[items:\s*([^\]]*)\]\s*$/);
  if (!match) return { response: text.trim(), relatedItems: [] };

  const relatedItems = match[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const [idStr, type] = pair.split(":").map((p) => p.trim());
      const id = parseInt(idStr, 10);
      return Number.isFinite(id) && TYPE_SET.has(type) ? { id, type } : null;
    })
    .filter(Boolean);

  const response = text.replace(match[0], "").trim();
  return { response, relatedItems };
}

module.exports = { buildChatPrompt, parseChatResponse };
