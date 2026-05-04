# StuHub 🎓

A web-based platform for San Jose State University students to discover **events**, **student deals**, and **campus resources**, leave reviews, and chat with an AI assistant — all in one place. The app is branded **CampusHub** in the UI.

---

## 👥 Team
- Nishan Paudel
- Ashish Bhusal
- Janhvi Kedia
- Harishita Gupta
- Indraneel Sarode

---

## ✨ Features

### Discover
- **Events feed** with full-text search, date range, and location filters
- Live SJSU events feed (https://events.sjsu.edu) blended with community-posted events
- **Student deals** with rich modal (badges, full description, how-to-access details)
- **Campus resources** with hours and contact info

### AI-powered
- **AI summaries** on every event card and detail page — one-sentence Gemini-generated summary, marked with a `✨ AI summary` badge
- **AI chat assistant** — floating bottom-right widget that answers natural-language questions across events, deals, and resources from the live DB. Returns typed `Event #N` / `Deal #N` / `Resource #N` chips that link straight to the source

### Community
- Sign in with your SJSU Google account
- Post events with image upload (stored on Cloudinary)
- **Star-rated reviews** on every event with aggregate average rating
- Owners and admins can edit or delete their own content

### Moderation
- Admin approval flow for community-submitted events
- Admin manage page with status filters and item-type chips
- Rate limiting on the AI chat endpoint (10 req/hr/IP)

### User experience
- Personal **profile page** — avatar, inline edit-in-place name and bio
- **My Events** with approval-status pills, **My Reviews** with stars
- Toast notifications throughout (no more browser `alert()` popups)
- Skeleton loaders on listing pages
- Light/dark theme variables in place (toggle present in navbar)

---

## 🛠 Tech Stack

### Frontend (`frontend-next/`)
- **Next.js 16** with the App Router and Turbopack
- **React 19**
- **Tailwind CSS v4**
- `@react-oauth/google` for Google sign-in
- `sonner` for toast notifications

### Backend (`backend/`)
- **Node.js 20+** with **Express 5**
- `pg` — PostgreSQL client
- `@google/generative-ai` — Gemini SDK
- `jsonwebtoken` — JWT-based auth
- `bcrypt` — password hashing for the email/password fallback
- `google-auth-library` — server-side verification of Google ID tokens
- `multer` + `multer-storage-cloudinary` + `cloudinary` — event image uploads
- `express-rate-limit` — throttle on the AI chat endpoint
- `dotenv`, `cors`, `nodemon`

### Database
- **PostgreSQL** (deployed on [Neon](https://neon.tech) for the live env)
- Incremental migrations tracked in [`database/migrations/`](database/migrations)

### AI
- **Google Gemini** (free tier)
  - `gemini-2.5-flash` for event summaries (single-shot, infrequent)
  - `gemini-2.5-flash-lite` for chat (higher free-tier rate limit, snappier responses)

### External services
- **Cloudinary** — image storage and CDN for event images
- **Google OAuth** — sign-in identity

---

## 🏗 Architecture

```
                ┌────────────────────────────┐
                │  Browser                   │
                │  Next.js 16 (port 3000)    │
                │  Tailwind • sonner • OAuth │
                └────────────┬───────────────┘
                             │ fetch w/ Bearer JWT
                             ▼
                ┌────────────────────────────┐
                │  Express API (port 5001)   │
                │  /auth /items /reviews     │
                │  /ai   /users   /health    │
                └─┬──────────┬─────────────┬─┘
                  │          │             │
                  ▼          ▼             ▼
           ┌───────────┐ ┌─────────┐ ┌──────────┐
           │ Postgres  │ │Cloudinary│ │ Gemini  │
           │ (Neon)    │ │  images  │ │   AI    │
           └───────────┘ └─────────┘ └──────────┘
```

3-tier client-server with two external services. The chat assistant pulls only **approved** items as context, never anything pending or rejected — so the model can't accidentally surface unmoderated content.

---

## 📁 Project Structure

```
StuHub/
├── backend/
│   ├── scripts/
│   │   └── seed_demo_data.js              # Idempotent demo seed
│   └── src/
│       ├── config/                         # db pool, cloudinary client
│       ├── controllers/                    # auth, items, reviews, ai, users
│       ├── middleware/                     # requireAuth, errorHandler, rateLimiter, upload
│       ├── routes/                         # one router per controller
│       ├── utils/                          # formatItem, llmClient, summarizeText, aiPromptBuilder
│       ├── app.js
│       └── server.js
├── frontend-next/
│   ├── app/                                # Next.js App Router pages
│   │   ├── (auth)/login, signup
│   │   ├── admin/                          # admin pages
│   │   ├── events/                         # list, detail, edit, new, sjsu
│   │   ├── deals/, resources/, profile/, home/, about/
│   │   └── globals.css                     # Tailwind + theme CSS variables
│   ├── components/
│   │   ├── ai/                             # ChatWidget, SummaryBadge
│   │   ├── auth/                           # GoogleAuthButton
│   │   ├── layout/                         # Navbar, Footer, ClientProviders
│   │   ├── reviews/                        # StarRating, ReviewCard, ReviewList, ReviewForm
│   │   └── ui/                             # Skeleton primitives
│   ├── context/                            # AuthContext, ThemeContext
│   └── lib/                                # api helpers, locations, utils
├── database/
│   ├── studenthub.sql                      # base schema dump
│   ├── studenthub_backup_*.sql             # historical backups
│   └── migrations/                         # incremental migrations
├── AI_FEATURES_PLAN.md                     # original AI design doc (historical)
├── things_to_do.md                         # backlog
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ (works on 23 with `EBADENGINE` warnings on one peer dep)
- A PostgreSQL database — easiest is a free [Neon](https://neon.tech) project
- A **Google OAuth Client ID** from Google Cloud Console
- A **Cloudinary** account (free tier) for image uploads
- A **Gemini API key** from https://aistudio.google.com/app/apikey (free tier is enough)

### 1. Clone and install

```bash
git clone https://github.com/280-final-project/StuHub.git
cd StuHub
(cd backend && npm install)
(cd frontend-next && npm install)
```

### 2. Configure environment

Create `backend/.env`:
```
PORT=5001
DATABASE_URL=postgresql://USER:PASS@HOST/DB?sslmode=require
JWT_SECRET=any-long-random-string

GOOGLE_CLIENT_ID=your-google-oauth-client-id

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
GEMINI_CHAT_MODEL=gemini-2.5-flash-lite
AI_SUMMARY_ENABLED=true
AI_CHAT_ENABLED=true
```

Create `frontend-next/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

> The Google Client ID **must match** in both files — the backend uses it to verify ID tokens that the frontend obtains.

### 3. Apply database migrations

```bash
psql $DATABASE_URL -f database/studenthub.sql                                # base schema
psql $DATABASE_URL -f database/migrations/2026-05-03_ai_features.sql
psql $DATABASE_URL -f database/migrations/2026-05-03_typed_items_and_metadata.sql
psql $DATABASE_URL -f database/migrations/2026-05-04_review_rating.sql
```

### 4. (Optional) Seed demo data

```bash
cd backend
node scripts/seed_demo_data.js
```

This inserts a `StuHub` system user plus 8 events, 10 deals, and 10 resources with realistic SJSU-flavored content. Events get AI summaries from Gemini; deals and resources skip the LLM call. The script is idempotent — safe to re-run.

### 5. Run the dev servers

```bash
# terminal 1
cd backend && npm run dev          # nodemon on http://localhost:5001

# terminal 2
cd frontend-next && npm run dev    # Next.js on http://localhost:3000
```

Open http://localhost:3000 in your browser.

---

## 🔌 API Endpoints

All paths are relative to `http://localhost:5001`. Routes marked **🔒** require an `Authorization: Bearer <jwt>` header. Routes marked **👑** require admin (verified via `x-admin: true` and a backing admin user).

### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/auth/google` | Exchange a Google ID token for an app JWT |
| POST | `/auth/signup` | Email/password signup |
| POST | `/auth/login` | Email/password login |

### Items — events, deals, resources
| Method | Path | Description |
|---|---|---|
| GET | `/items` | List approved items. Query params: `type` (`event` / `deal` / `resource`), `q`, `from`, `to`, `location` — all stack |
| GET | `/items/:id` | Item detail (approved only) |
| GET | `/items/pending` | 🔒👑 Pending items |
| GET | `/items/admin/all` | 🔒👑 All items regardless of status |
| POST | `/items` | 🔒 Create item (multipart for image upload) |
| PATCH | `/items/:id` | 🔒 Update item (owner or admin) |
| PATCH | `/items/:id/approval` | 🔒👑 Set approval status |
| DELETE | `/items/:id` | 🔒 Delete item (owner or admin) |

### Reviews
| Method | Path | Description |
|---|---|---|
| GET | `/items/:id/reviews` | All reviews for an item |
| POST | `/reviews` | 🔒 Create review with optional 1-5 rating |
| DELETE | `/reviews/:id` | 🔒 Delete review (owner or admin) |

### AI
| Method | Path | Description |
|---|---|---|
| POST | `/ai/chat` | Chat across events / deals / resources. Body: `{ message }`. Rate-limited to 10 req/hr/IP |

### Users
| Method | Path | Description |
|---|---|---|
| GET | `/users/me` | 🔒 Current user + posted items + posted reviews |
| PATCH | `/users/me` | 🔒 Update `user_name` and/or `bio` |
| GET | `/users/:id` | Public profile + approved items |

### Health
| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness probe |

---

## 🗄 Database Schema

### `items` — events, deals, resources in one table
| Column | Type | Notes |
|---|---|---|
| `item_id` | INT (PK) | identity |
| `item_name`, `item_desc` | TEXT | name required |
| `is_timed`, `timeframe` | BOOL, TEXT | for events |
| `loc_content` | TEXT | building / room / URL |
| `img_url` | TEXT | Cloudinary or external |
| `user_id` | INT | FK → `users` |
| `approval_status` | TEXT | `pending` / `approved` / `rejected` (default `pending`) |
| `item_type` | enum | `event` / `deal` / `resource` / `place` (default `event`) |
| `ai_summary` | VARCHAR(280) | Gemini-generated; nullable |
| `metadata` | JSONB | type-specific extras: `{ icon, badges, fullDescription, details }` |
| `created_at`, `updated_at` | TIMESTAMPTZ | |

### `users`
`user_id` (PK), `user_name`, `email`, `pfp_url`, `bio`, `verified_at`, `created_at`, `updated_at`.

### `reviews`
`review_id` (PK), `review_header`, `review_desc`, `rating SMALLINT CHECK (1..5)`, `user_id` (FK), `item_id` (FK, `ON DELETE CASCADE`), `created_at`, `updated_at`.

---

## 🤖 AI Feature Notes

- The **summarizer** runs synchronously inside `createItem` and `updateItem` for `item_type='event'`. It returns `null` on any LLM error so writes never block on Gemini availability. Deals and resources skip the LLM call — their descriptions are already short.
- The **chat handler** sends the ~80 most recently approved items to Gemini as labeled context (`[#5] (EVENT) Free Pizza & Code Night — May 9 …`) and instructs the model to answer **only** from the provided list. The model emits a `[items: 5:event, 12:deal]` trailer that the backend parses into typed chips for the frontend.
- The chat widget surfaces a small **privacy note** in its empty state: free-tier Gemini may use prompts/responses to improve their models, so users shouldn't paste personal info.
- Both AI surfaces respect the `AI_SUMMARY_ENABLED` and `AI_CHAT_ENABLED` env vars as kill switches.

### Try the chat
After seeding, the chat (✨ Ask AI bottom-right) handles cross-type questions like:
- *"What free food events are there this week?"* → events with free pizza/food
- *"Where can I get help with my resume?"* → Career Center (resource) **and** Resume Review event
- *"Any software discounts for students?"* → GitHub Pack, Adobe CC, Microsoft 365, Notion, Apple Education
- *"Where do I go if I'm food insecure?"* → Spartan Food Pantry, SJSU Cares
- *"What's the weather in Paris?"* → polite decline (out of scope)

---

## 🔐 Security
- Google ID tokens are verified server-side against `GOOGLE_CLIENT_ID`
- App-issued JWTs gate protected routes (`requireAuth` middleware)
- The legacy email/password path uses bcrypt for password hashing
- Rate limiter on `/ai/chat` caps free-tier Gemini usage
- Postgres connection enforces SSL (`?sslmode=require`)
- `.env` files are gitignored — credentials are never committed
- CORS is open in development; **tighten before deploying**

---

## 🗺 Sprint History

| Sprint | Focus | Highlights |
|---|---|---|
| 1 | Core foundation | DB schema, Express scaffold, item cards, navbar |
| 2 | Map & interface | Google Maps embed, sorting, filtering |
| 3 | Authentication | Google OAuth + JWT, route protection, image uploads |
| 4 | Reviews & launch | Review system, approval flow, admin dashboard |
| 5 | AI & polish | Gemini summary, chat assistant, typed items, search/filter, profile page, toast notifications, skeleton loaders, star-rated reviews |

---

## 📜 Future Work
See [`things_to_do.md`](things_to_do.md). Top of the backlog:
- Pagination on `/items` once the dataset grows
- Email verification step on signup
- Theme toggle polish (toggle exists, theming partially incomplete)
- Tests (unit + integration with Jest)
- Admin dashboard analytics (counts, top categories)
- Tighten CORS before deploy
