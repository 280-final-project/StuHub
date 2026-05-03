# AI Features Implementation Plan

## 📋 Overview
This document outlines the implementation plan for two AI features:
1. **AI Chat Assistant** - Chatbot for querying events and deals
2. **AI Summary for Events** - Auto-generate short summaries for event descriptions

---

## 🎯 Feature 1: AI Chat Assistant

### Purpose
Users can ask natural language questions about events and deals, and the AI returns contextual answers by searching through the database.

### Example Interactions
- "What events are happening this week?"
- "Any food deals near campus?"
- "Tell me about upcoming tech talks"
- "Are there any free events tomorrow?"

### Architecture

```
User Input (Frontend)
    ↓
Frontend Component (ChatWidget)
    ↓
POST /api/ai/chat (Backend)
    ↓
Fetch Events + Deals from Database
    ↓
Send to LLM with User Query + Context
    ↓
LLM Generates Response
    ↓
Return Answer to Frontend
    ↓
Display in Chat UI
```

### Technology Stack

| Component | Technology | Reason |
|-----------|-----------|--------|
| **LLM Provider** | OpenAI GPT-4 (or Claude 3.5 Sonnet) | Low cost, reliable, good context window |
| **Backend** | Node.js/Express | Already in use |
| **Frontend** | React (Next.js) | Already in use |
| **Storage** | PostgreSQL | Existing database |

### Implementation Details

#### Backend Changes

**New Controller: `/backend/src/controllers/aiController.js`**
```javascript
// Functions needed:
- getChatResponse(userMessage, filters)
  - Fetch relevant events from DB
  - Fetch relevant deals from DB
  - Build prompt with context
  - Call OpenAI API
  - Parse and return response

- summarizeText(text)
  - Take event description
  - Call OpenAI API
  - Return short summary
```

**New Route: `/backend/src/routes/aiRoutes.js`**
```javascript
POST /api/ai/chat
  - Body: { message: string, filters?: {date, category} }
  - Auth: Optional (can be anonymous or logged in)
  - Returns: { response: string, relatedItems: [] }

POST /api/ai/summarize
  - Body: { text: string }
  - Auth: Optional
  - Returns: { summary: string }
```

**New Utility: `/backend/src/utils/aiPromptBuilder.js`**
```javascript
- buildChatContext(events, deals)
  - Format database results into clean context
  - Prepare system prompt for LLM
  - Handle context window limits

- buildSummaryPrompt(eventDescription)
  - Create concise prompt for summarization
```

#### Environment Variables
Add to `/backend/.env`:
```
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4-mini  # Cheaper than gpt-4
AI_CHAT_ENABLED=true
AI_SUMMARY_ENABLED=true
```

#### Database Changes
**No schema changes needed** — Only read from existing `items` (events/deals) and `reviews` tables.

#### Frontend Changes

**New Component: `/frontend-next/components/ai/ChatAssistant.jsx`**
- Chat widget interface
- Message input field
- Message history display
- Suggested quick questions
- Loading states

**New Component: `/frontend-next/components/ai/EventSummary.jsx`**
- Display AI-generated summary with ✨ badge
- Show on event cards/detail pages

**New Hook: `/frontend-next/hooks/useAiChat.js`**
- Manage chat state
- Call `/api/ai/chat` endpoint
- Handle streaming (optional)

**New API Method: `/frontend-next/lib/api.js`**
```javascript
export async function sendChatMessage(message, filters)
export async function generateSummary(text)
```

### Data Flow Example

```
User types: "What events are happening this week?"
        ↓
Frontend sends POST /api/ai/chat
{
  message: "What events are happening this week?",
  filters: { startDate: "2026-05-03", endDate: "2026-05-10" }
}
        ↓
Backend:
  1. Query DB: SELECT * FROM items WHERE category = 'event' AND created_at >= startDate
  2. Build context: "Here are upcoming events: [Event 1], [Event 2], ..."
  3. Call OpenAI with:
     - System: "You are a helpful campus assistant..."
     - Context: [Events list]
     - User message: "What events are happening this week?"
        ↓
OpenAI returns: "Here are upcoming events on campus: [personalized answer]"
        ↓
Backend returns:
{
  response: "Here are upcoming events...",
  relatedItems: [
    { id: 1, name: "Tech Talk", date: "2026-05-05" },
    { id: 2, name: "Career Fair", date: "2026-05-08" }
  ]
}
        ↓
Frontend displays answer + clickable event links
```

### Estimated Costs (Monthly)
- **OpenAI GPT-4 mini**: ~$0.05-0.10 per query
- **100 chats/day**: ~$150-300/month (if heavily used)
- **Alternative**: Claude 3.5 Sonnet via Anthropic (cheaper)

### API Quota Considerations
- Implement rate limiting: 10 chats per user per hour
- Cache popular queries (Redis optional)
- Add query filtering to avoid sending entire database

---

## 🎯 Feature 2: AI Summary for Events

### Purpose
Auto-generate short 1-2 line summaries from event descriptions. Display on event cards with "✨ AI Summary" badge to make UI feel modern.

### Example
**Original**: "Join us for an exciting panel discussion on cybersecurity trends, featuring industry experts from Google, Microsoft, and Apple..."

**Summary**: "Industry panel on cybersecurity trends featuring experts from Google, Microsoft & Apple"

### Architecture

```
Event Description (DB)
    ↓
Generate Summary (On-demand or Batch)
    ↓
Store in Database
    ↓
Display on Frontend with Badge
```

### Implementation Details

#### Option A: On-Demand Generation
**Trigger**: When user views event card
- Pro: Fresh summaries, no pre-processing
- Con: Slower UX (requires API call), higher costs

#### Option B: Batch Generation (Recommended)
**Trigger**: When admin creates/updates event
- Pro: Fast UX, lower costs
- Con: Needs to run when new events are added

**Recommended**: **Option B (Batch)** - Generate at creation/edit time

#### Backend Changes

**Update Event Controller: `/backend/src/controllers/itemsController.js`**
```javascript
const createItem = async (req, res) => {
  // ... existing validation ...
  
  // NEW: Generate AI summary
  let aiSummary = null;
  if (item_desc && req.body.item_name) {
    aiSummary = await generateSummary(req.body.item_name + ". " + item_desc);
  }
  
  // Store in DB
  const result = await pool.query(
    `INSERT INTO items (item_name, item_desc, ai_summary, ...) 
     VALUES ($1, $2, $3, ...)`,
    [item_name, item_desc, aiSummary, ...]
  );
  
  res.json(result.rows[0]);
};
```

**Update Event Edit Controller: `/backend/src/controllers/itemsController.js`**
```javascript
const updateItem = async (req, res) => {
  // If description is being updated, regenerate summary
  if (req.body.item_desc) {
    const newSummary = await generateSummary(req.body.item_name + ". " + req.body.item_desc);
    // Include in update query
  }
  // ...
};
```

#### Database Changes

**New Column in `items` table:**
```sql
ALTER TABLE items ADD COLUMN ai_summary VARCHAR(200);
```

Or include in migration if fresh setup:
```sql
CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) NOT NULL,
  item_desc TEXT,
  ai_summary VARCHAR(200),  -- NEW
  ...
);
```

#### Frontend Changes

**Update Event Card Component: `/frontend-next/components/events/EventCard.jsx`**
```javascript
export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <h3>{event.item_name}</h3>
      
      {/* NEW: AI Summary Badge */}
      {event.ai_summary && (
        <div className="ai-summary">
          <span>✨ AI Summary</span>
          <p>{event.ai_summary}</p>
        </div>
      )}
      
      {/* Toggle full description */}
      <details>
        <summary>Full Description</summary>
        <p>{event.item_desc}</p>
      </details>
    </div>
  );
}
```

**Add CSS: `/frontend-next/assets/css/styles.css`**
```css
.ai-summary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 12px;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  margin: 10px 0;
}

.ai-summary span {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
```

### Data Flow

```
Admin creates event with description
    ↓
Backend receives POST /api/items
    ↓
Generate summary via OpenAI API
    ↓
Insert item + ai_summary into DB
    ↓
Frontend fetches GET /api/items
    ↓
Event card displays with "✨ AI Summary" badge
```

### Estimated Costs
- **Per event**: ~$0.001-0.002 (very cheap)
- **1000 events**: ~$2-4
- **Minimal cost** for batch processing

---

## 🛠️ Implementation Roadmap

### Phase 1: Setup & Preparation (Week 1)
- [ ] Choose LLM provider (OpenAI or Claude)
- [ ] Set up API keys and accounts
- [ ] Add environment variables
- [ ] Install dependencies: `npm install openai` (backend)

### Phase 2: AI Summary (Week 2) - **Easier, Start Here**
- [ ] Create `/backend/src/utils/summarizeText.js`
- [ ] Add `ai_summary` column to DB
- [ ] Update `createItem` controller
- [ ] Update `updateItem` controller
- [ ] Update event card component to display summary
- [ ] Test with sample events

### Phase 3: AI Chat (Week 3-4) - **More Complex**
- [ ] Create `/backend/src/controllers/aiController.js`
- [ ] Create `/backend/src/routes/aiRoutes.js`
- [ ] Create `/backend/src/utils/aiPromptBuilder.js`
- [ ] Add rate limiting middleware
- [ ] Create frontend chat component
- [ ] Create chat hook and API methods
- [ ] Add chat UI to layout (sidebar or floating widget)
- [ ] Test with various queries

### Phase 4: Polish & Optimization (Week 5)
- [ ] Add caching for popular queries
- [ ] Add streaming for better UX
- [ ] Performance testing
- [ ] Cost monitoring
- [ ] User analytics

---

## 📊 LLM Provider Comparison

| Feature | OpenAI GPT-4 | OpenAI GPT-4 Mini | Claude 3.5 Sonnet |
|---------|-------------|-------------------|-------------------|
| **Cost** | High | Low (~$0.01/1K tokens) | Low (~$0.003/1K tokens) |
| **Speed** | Fast | Fast | Fast |
| **Context Window** | 8K-128K | 128K | 200K |
| **Quality** | Excellent | Good | Excellent |
| **Best for** | Chat | Chat + Summarize | Chat + Summarize |

**Recommendation**: Start with **OpenAI GPT-4 Mini** for chat, can switch to Claude for cost savings later.

---

## 🔒 Security & Rate Limiting

### Rate Limiting Strategy
```javascript
// Backend middleware
const rateLimit = require('express-rate-limit');

const aiChatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 requests per hour
  message: 'Too many chat requests, try again later'
});

app.post('/api/ai/chat', aiChatLimiter, chatController);
```

### Cost Protection
- Set API spending limits in OpenAI dashboard
- Monitor token usage weekly
- Add feature flag to disable AI if costs spike

### Data Privacy
- Don't log user messages with PII
- Summarization doesn't require authentication
- Chat can be anonymous but optional login

---

## 📝 Testing Checklist

### AI Summary Tests
- [ ] Summary generates for new events
- [ ] Summary updates when event description changes
- [ ] Summary displays correctly on frontend
- [ ] Summary is concise (1-2 lines)
- [ ] Summary handles edge cases (very short/long descriptions)

### AI Chat Tests
- [ ] Chat returns relevant events
- [ ] Chat returns relevant deals
- [ ] Chat handles invalid queries gracefully
- [ ] Chat respects date filters
- [ ] Rate limiting works
- [ ] Chat maintains conversation context
- [ ] Chat doesn't expose sensitive data

---

## 💡 Future Enhancements

1. **Conversation Memory** - Remember previous messages in chat
2. **Personalization** - "Show me computer science events"
3. **Notifications** - "Notify me about similar events"
4. **Admin Tools** - AI-powered moderation
5. **Analytics** - Track popular questions
6. **Multi-language** - Translate summaries

---

## 📂 File Structure (After Implementation)

```
backend/
├── src/
│   ├── controllers/
│   │   ├── aiController.js        [NEW]
│   │   └── itemsController.js     [UPDATED]
│   ├── routes/
│   │   ├── aiRoutes.js            [NEW]
│   │   └── itemsRoutes.js
│   ├── middleware/
│   │   └── rateLimiter.js         [NEW]
│   ├── utils/
│   │   ├── aiPromptBuilder.js     [NEW]
│   │   └── summarizeText.js       [NEW]
│   └── app.js                      [UPDATED]
│
frontend-next/
├── components/
│   ├── ai/                         [NEW FOLDER]
│   │   ├── ChatAssistant.jsx      [NEW]
│   │   └── EventSummary.jsx       [NEW]
│   ├── events/
│   │   └── EventCard.jsx          [UPDATED]
│   └── layout/
│       └── Navbar.jsx             [UPDATED - Add chat widget]
├── hooks/
│   └── useAiChat.js               [NEW]
├── lib/
│   └── api.js                      [UPDATED - Add AI methods]
└── styles/
    └── ai-features.css            [NEW]
```

---

## 🚀 Next Steps

1. Review this plan with the team
2. Finalize LLM provider choice
3. Set up API keys
4. Create implementation tickets for each phase
5. Begin Phase 2 (AI Summary) first for quick wins

