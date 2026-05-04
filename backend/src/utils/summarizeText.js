const genAI = require("./llmClient");

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_LEN = 280;

async function summarizeText(title, description) {
  if (process.env.AI_SUMMARY_ENABLED !== "true") return null;
  if (!description || !description.trim()) return null;

  try {
    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction:
        "You summarize campus events in one sentence under 25 words. " +
        "No emoji, no marketing fluff, no quotation marks. " +
        "Just the gist of what the event is and who it's for.",
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 90,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const result = await model.generateContent(
      `Title: ${title || "(untitled)"}\n\nDescription: ${description}`
    );
    const summary = result.response.text()?.trim();
    if (!summary) return null;
    return summary.length > MAX_LEN ? summary.slice(0, MAX_LEN - 1) + "…" : summary;
  } catch (err) {
    console.error("AI_SUMMARY_ERROR:", err.message);
    return null;
  }
}

module.exports = summarizeText;
