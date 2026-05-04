const openai = require("./openaiClient");

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_LEN = 280;

async function summarizeText(title, description) {
  if (process.env.AI_SUMMARY_ENABLED !== "true") return null;
  if (!description || !description.trim()) return null;

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      max_tokens: 90,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You summarize campus events in one sentence under 25 words. " +
            "No emoji, no marketing fluff, no quotation marks. " +
            "Just the gist of what the event is and who it's for.",
        },
        {
          role: "user",
          content: `Title: ${title || "(untitled)"}\n\nDescription: ${description}`,
        },
      ],
    });

    const summary = completion.choices?.[0]?.message?.content?.trim();
    if (!summary) return null;
    return summary.length > MAX_LEN ? summary.slice(0, MAX_LEN - 1) + "…" : summary;
  } catch (err) {
    console.error("AI_SUMMARY_ERROR:", err.message);
    return null;
  }
}

module.exports = summarizeText;
