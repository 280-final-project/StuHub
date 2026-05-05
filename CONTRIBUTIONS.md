# 👥 Individual Contributions

**Project:** Student Hub
**Course:** CMPE-280 Web Design (Final Project)
**Team size:** 5

Work was divided along **feature lines** rather than by tier (frontend/backend), so each member owned a coherent slice of the product end-to-end — schema, API, UI, and integration. The split keeps responsibilities balanced (~20% each) and ensures every member touched both server-side and client-side code.

---

## 📊 Roll-up

| Member | Primary area | Approx. share |
|---|---|---|
| **Harishita Gupta** | AI integration, backend infra & deployment | 20% |
| **Indraneel Sarode** | Frontend deployment, layout & shared UI | 20% |
| **Nishan Paudel** | Authentication & Reviews | 20% |
| **Ashish Bhusal** | Events & Discovery (search/filter, admin moderation) | 20% |
| **Janhvi Kedia** | Profiles, Registrations, Deals & Resources | 20% |

---

## 1. Harishita Gupta — AI Integration, Backend Infra & Deployment

**AI features** (the differentiator of the project):
- Designed the AI strategy doc and led the OpenAI → Google Gemini provider swap to land on a free-tier-viable stack.
- Implemented the shared LLM client at [`backend/src/utils/llmClient.js`](backend/src/utils/llmClient.js).
- Implemented [`backend/src/utils/summarizeText.js`](backend/src/utils/summarizeText.js) — Gemini-based one-sentence event summaries with graceful failure handling.
- Built the AI chat handler ([`aiController.js`](backend/src/controllers/aiController.js)), the structured prompt builder ([`aiPromptBuilder.js`](backend/src/utils/aiPromptBuilder.js)) with the `[items: id:type, ...]` trailer contract, and the `gemini-2.5-flash-lite` choice for chat to maximize free-tier rate limits.
- Wired AI summary generation into item create/update inside [`itemsController.js`](backend/src/controllers/itemsController.js).
- Implemented the rate-limit middleware ([`rateLimiter.js`](backend/src/middleware/rateLimiter.js)) and applied it to `/ai/chat` (10 req/hr/IP).

**Backend infra:**
- Maintained [`backend/src/app.js`](backend/src/app.js) — routing structure, CORS, error handling, route mount order.
- Owned environment/config management (`.env` schema for AI keys, model overrides, kill-switch flags).

**Deployment:**
- Stood up the Render web service for the backend at https://stuhub-sm73.onrender.com — runtime config, health-check path, env var injection.
- Documented the production deploy contract in the Deployment section of [`README.md`](README.md).

**Migrations contributed:** [`2026-05-03_ai_features.sql`](database/migrations/2026-05-03_ai_features.sql) (ai_summary column).

---

## 2. Indraneel Sarode — Frontend Deployment, Layout & Shared UI

**Frontend deployment:**
- Stood up the Vercel project for the frontend at https://stu-hub-phi.vercel.app — Next.js auto-detection, root directory configuration, environment variables (`NEXT_PUBLIC_*`), Google OAuth authorized-origins setup.

**Global layout & design system:**
- Owned [`app/layout.js`](frontend-next/app/layout.js) — root metadata, provider stack, font loading.
- Built [`globals.css`](frontend-next/app/globals.css) — CSS custom properties for the design system, light/dark theme variables, responsive breakpoints.
- Built the [`Navbar`](frontend-next/components/layout/Navbar.jsx) — three-group flex layout (brand+links / search / auth+theme), search-as-you-type with scoring, profile avatar, theme toggle.
- Built [`Footer`](frontend-next/components/layout/Footer.jsx) and [`ClientProviders`](frontend-next/components/layout/ClientProviders.jsx).

**Theme system:**
- [`ThemeContext`](frontend-next/context/ThemeContext.js) for light/dark mode with localStorage persistence.

**Shared UI primitives:**
- [`Skeleton`](frontend-next/components/ui/Skeleton.jsx) — `Skeleton`, `CardSkeleton`, `ResourceCardSkeleton`, `CardGridSkeleton` with shimmer animation; applied across listing pages.
- Toast notification setup — `sonner` mounted globally so any feature page can call `toast.success()` / `toast.error()` without threading a context.

**Landing & marketing pages:**
- [`app/page.js`](frontend-next/app/page.js) — public landing with typewriter hero animation.
- [`app/home/page.js`](frontend-next/app/home/page.js) — authenticated home hero + Quick Access cards.

---

## 3. Nishan Paudel — Authentication & Reviews

**Authentication backend:**
- Built the entire auth flow in [`authController.js`](backend/src/controllers/authController.js):
  - Google OAuth verification (`@sjsu.edu` domain restriction)
  - Email/password signup (bcrypt hashing, 6-char minimum)
  - Email/password login
- JWT issuance for both flows.
- [`authMiddleware.js`](backend/src/middleware/authMiddleware.js) (`requireAuth`) and the optional-auth middleware [`optionalAuth.js`](backend/src/middleware/optionalAuth.js).
- [`authRoutes.js`](backend/src/routes/authRoutes.js).

**Authentication frontend:**
- [`AuthContext`](frontend-next/context/AuthContext.js) — token persistence, isAdmin derivation from `ADMIN_EMAILS`, login/signup/logout helpers.
- [`(auth)/login/page.js`](frontend-next/app/(auth)/login/page.js) and [`(auth)/signup/page.js`](frontend-next/app/(auth)/signup/page.js).
- [`GoogleAuthButton`](frontend-next/components/auth/GoogleAuthButton.jsx).

**Reviews — full stack:**
- Reviews backend: [`reviewsController.js`](backend/src/controllers/reviewsController.js) and [`reviewsRoutes.js`](backend/src/routes/reviewsRoutes.js) — rating validation (1-5), formatted response shape, delete endpoint with owner/admin check.
- Frontend review components: [`StarRating`](frontend-next/components/reviews/StarRating.jsx), [`ReviewCard`](frontend-next/components/reviews/ReviewCard.jsx), [`ReviewList`](frontend-next/components/reviews/ReviewList.jsx) (with aggregate average), [`ReviewForm`](frontend-next/components/reviews/ReviewForm.jsx).
- Integration of review components into the event detail page.

**Migrations contributed:** [`2026-05-04_review_rating.sql`](database/migrations/2026-05-04_review_rating.sql).

---

## 4. Ashish Bhusal — Events & Discovery

**Items / Events backend:**
- Built [`itemsController.js`](backend/src/controllers/itemsController.js) — full CRUD: `getAllItems` with `?type=`, `?q=`, `?from=`, `?to=`, `?location=` filter stack; `getItemById` with registration count + is_registered; `createItem`, `updateItem`, `deleteItem` with owner/admin authorization; admin-only `getPendingItems`, `updateItemApprovalStatus`, `getAllItemsForAdmin`.
- [`itemsRoutes.js`](backend/src/routes/itemsRoutes.js) — route mounting and middleware composition.
- Image upload pipeline: [`upload.js`](backend/src/middleware/upload.js) middleware + [`config/cloudinary.js`](backend/src/config/cloudinary.js).

**Typed items system:**
- Designed and shipped the `item_type` enum (event / deal / resource / place) and `metadata JSONB` column so a single table backs three product surfaces.

**Events frontend — list & detail:**
- [`events/page.js`](frontend-next/app/events/page.js) — search + filter bar (debounced text search, date range, location dropdown), AI summary badges on cards, blends DB events with the live SJSU events feed (Localist API).
- [`events/[id]/page.js`](frontend-next/app/events/[id]/page.js) — hero, summary badge, register/cancel toggle, reviews integration, edit/delete actions.
- [`events/new/page.js`](frontend-next/app/events/new/page.js) — community submit form with image upload.
- [`events/[id]/edit/page.js`](frontend-next/app/events/[id]/edit/page.js) — edit existing events.
- [`events/sjsu/page.js`](frontend-next/app/events/sjsu/page.js) — fallback view for external SJSU events.

**Admin moderation:**
- [`admin/page.js`](frontend-next/app/admin/page.js) — admin home.
- [`admin/events/manage/page.js`](frontend-next/app/admin/events/manage/page.js) — pending/approved/rejected filters, type chips, approve/reject/delete actions.
- [`admin/events/new/page.js`](frontend-next/app/admin/events/new/page.js) — admin event creation (auto-approved).

**Migrations contributed:** [`2026-05-03_typed_items_and_metadata.sql`](database/migrations/2026-05-03_typed_items_and_metadata.sql) (item_type + metadata).

---

## 5. Janhvi Kedia — Profiles, Registrations, Deals & Resources

**User profile — full stack:**
- Backend: [`usersController.js`](backend/src/controllers/usersController.js) and [`usersRoutes.js`](backend/src/routes/usersRoutes.js) — `GET /users/me` (with posted items + reviews + registrations), `PATCH /users/me` (name + bio with COALESCE), `GET /users/:id` (public profile + approved items only).
- Frontend: [`profile/page.js`](frontend-next/app/profile/page.js) — avatar with initial fallback, inline edit-in-place for name and bio, "My Events" with status pills, "Registered Events" with cancel button, "My Reviews" with stars.

**Event Registrations — full stack:**
- Backend: [`registrationsController.js`](backend/src/controllers/registrationsController.js) — `POST /items/:id/register` (idempotent via `ON CONFLICT DO NOTHING`), `DELETE /items/:id/register`, both return `{count, registered}`.
- Updated `getItemById` to include `registration_count` and `is_registered` (using optional auth for the latter).
- Register / Cancel button + attendee count panel on the event detail page.

**Deals (DB-backed):**
- [`deals/page.js`](frontend-next/app/deals/page.js) — replaced ~650 lines of hardcoded deals with `GET /items?type=deal`. Rich modal pulled from the `metadata` JSONB blob (icon, badges, fullDescription, details).

**Resources (DB-backed):**
- [`resources/page.js`](frontend-next/app/resources/page.js) — same pattern with `?type=resource`.

**Marketing pages:**
- [`about/page.js`](frontend-next/app/about/page.js) — product-focused rewrite with a 6-tile feature grid.
- [`contact/page.js`](frontend-next/app/contact/page.js) — dummy support email + Send-Us-A-Message form.

**Demo seeding:**
- [`backend/scripts/seed_demo_data.js`](backend/scripts/seed_demo_data.js) — 8 events + 10 deals + 10 resources with realistic SJSU content; idempotent.
- [`backend/scripts/seed_demo_users.js`](backend/scripts/seed_demo_users.js) + [`DEMO_USERS.md`](DEMO_USERS.md) — admin and student demo accounts for grading.

**Migrations contributed:** [`2026-05-04_event_registrations.sql`](database/migrations/2026-05-04_event_registrations.sql).

---

## 🤝 Shared / Pair Work

A handful of decisions and reviews were made by the whole team and are worth noting:

- **Schema design reviews** for each migration — the team reviewed every `database/migrations/*.sql` before it was applied to the live Neon DB.
- **API contract reviews** — request/response shapes for the public endpoints were reviewed in pull requests so frontend and backend stayed aligned.
- **UX consistency reviews** — toasts, loading states, error messages, and copy tone reviewed across pages so the app feels coherent.
- **Final demo prep & documentation** — [`README.md`](README.md), [`things_to_do.md`](things_to_do.md), and this `CONTRIBUTIONS.md` were collaboratively edited before submission.

---

## 🎓 Learning highlights

Each member ended the project with hands-on experience across the full stack:

- **Database**: writing migrations, idempotent seed scripts, JSONB for type-flexible data, FK + unique constraint design.
- **Backend**: Express 5, JWT auth, Google OAuth verification, parameterized SQL with `pg`, middleware composition, rate limiting.
- **Frontend**: Next.js 16 App Router, React 19, Tailwind v4, headless toast/skeleton primitives, controlled forms with debounced state.
- **AI**: Provider-neutral wrapper design, structured-output prompting with regex-parsed trailers, free-tier rate-limit handling.
- **DevOps**: Public deployment of a 3-tier app across Render, Vercel, and Neon; OAuth origin management; environment promotion.
