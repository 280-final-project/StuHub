const pool = require("../config/db");
const genAI = require("../utils/llmClient");
const { buildChatPrompt, parseChatResponse } = require("../utils/aiPromptBuilder");

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const chatHandler = async (req, res) => {
  if (process.env.AI_CHAT_ENABLED !== "true") {
    return res.status(503).json({ error: "AI chat is currently disabled" });
  }

  const { message } = req.body || {};
  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "message is required" });
  }
  if (message.length > 1000) {
    return res.status(400).json({ error: "message too long (max 1000 chars)" });
  }

  try {
    const result = await pool.query(
      `SELECT item_id, item_name, item_desc, timeframe, loc_content
       FROM items
       WHERE approval_status = 'approved'
       ORDER BY created_at DESC
       LIMIT 50`
    );

    const { systemInstruction, userPrompt } = buildChatPrompt(message, result.rows);

    const model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction,
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 500,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const completion = await model.generateContent(userPrompt);
    const text = completion.response.text()?.trim() || "";
    const { response, relatedItemIds } = parseChatResponse(text);

    res.json({ response, relatedItemIds });
  } catch (err) {
    console.error("AI_CHAT_ERROR:", err.message);
    res.status(502).json({ error: "AI chat is temporarily unavailable" });
  }
};

module.exports = { chatHandler };
