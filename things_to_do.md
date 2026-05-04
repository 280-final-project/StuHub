# Things To Do - StudentHub Project

> **Last updated:** 2026-05-04 (after Sprint 5 — AI features and polish push). Items shipped during that sprint are checked off below; see [Recently Shipped](#-recently-shipped-sprint-5) for a roll-up.

## 📋 Table of Contents
- [Recently Shipped (Sprint 5)](#-recently-shipped-sprint-5)
- [Backend - Missing/Incomplete](#backend---missingincomplete)
- [Frontend - Missing/Incomplete](#frontend---missingincomplete)
- [Quick Summary Table](#quick-summary-table)
- [Recommended Priority Order](#recommended-priority-order)

---

## 🚀 Recently Shipped (Sprint 5)

### AI features (new in Sprint 5)
- ✅ **AI Summary on events** — Gemini `gemini-2.5-flash` generates a one-sentence summary on item create/update; rendered as a `✨ AI summary` badge on event cards and detail pages. See [`backend/src/utils/summarizeText.js`](backend/src/utils/summarizeText.js).
- ✅ **AI Chat Assistant** — floating "✨ Ask AI" widget mounted globally; cross-type Q&A across events, deals, and resources; returns typed `Event #N` / `Deal #N` / `Resource #N` chip links. See [`backend/src/controllers/aiController.js`](backend/src/controllers/aiController.js) and [`frontend-next/components/ai/ChatWidget.jsx`](frontend-next/components/ai/ChatWidget.jsx).

### Schema (new in Sprint 5)
- ✅ Added `items.ai_summary VARCHAR(280)` column.
- ✅ Added `items.item_type` (enum) + `items.metadata JSONB` so events / deals / resources live in one table.
- ✅ Added `reviews.rating SMALLINT` (1-5, CHECK-constrained).
- ✅ Added `items.approval_status` to live DB (was missing — caused `GET /items` to 500).
- ✅ Migrations tracked in [`database/migrations/`](database/migrations).

### From the original list
- ✅ **Delete Reviews** — `DELETE /reviews/:id`, owner or admin only.
- ✅ **Search/Filter Events** — `GET /items?type=&q=&from=&to=&location=` (all stack).
- ✅ **Rate Limiting** — applied to `POST /ai/chat` (10 req/hr/IP). Still pending on signup/login/item-create.
- ✅ **User Profile Endpoints** — `GET /users/me`, `PATCH /users/me`, `GET /users/:id`.
- ✅ **Review Components** — `StarRating`, `ReviewCard`, `ReviewList`, `ReviewForm` with star ratings, aggregate average, owner/admin delete.
- ✅ **Connect Search/Filter to Backend** — debounced search input, date range, location dropdown on `/events`.
- ✅ **Deals Page Improvements** — `/deals` now fetches `GET /items?type=deal`, renders rich modal from `metadata`.
- ✅ **Resources Page Improvements** — `/resources` same pattern with `?type=resource`.
- ✅ **Toast Notification System** — `sonner` mounted globally; replaced 10 `alert()` calls.
- ✅ **Skeleton Loaders** — `Skeleton`, `CardSkeleton`, `ResourceCardSkeleton` used on `/events`, `/deals`, `/resources`, `/profile`.
- ✅ **User Profile Page** — `/profile` with avatar, inline edit-in-place name and bio, "My Events" with status pills, "My Reviews" with stars.
- ✅ **Demo seed data** — 8 events + 10 deals + 10 resources via [`backend/scripts/seed_demo_data.js`](backend/scripts/seed_demo_data.js).

---

## 🔧 Backend - Missing/Incomplete

### High Priority

- [x] **Delete Reviews** — `DELETE /reviews/:id` with owner-or-admin check.

- [x] **Search/Filter Events** — `GET /items` accepts `type`, `q`, `from`, `to`, `location` query params (all optional, stack with each other).

- [ ] **Pagination** - Add pagination to events list
  - Add `limit` and `offset` query parameters
  - Return metadata: `{ total, limit, offset, data }`
  - Update `getAllItems` and `getAllItemsForAdmin`

- [ ] **Better Error Handling** - Current `errorHandler.js` returns generic 500 errors
  - Create specific error types (ValidationError, NotFoundError, UnauthorizedError)
  - Return meaningful error messages
  - Include error codes for frontend to handle
  - *Note:* The AI chat handler now distinguishes 429 (rate limit) from 502 (other Gemini failures), but this pattern hasn't been generalized.

### Medium Priority

- [ ] **Input Validation** - Validate all request bodies
  - Use library like `joi` or `zod`
  - Validate: `item_name`, `item_desc`, `email`, `password`, etc.
  - Return 400 with validation errors
  - *Note:* Per-controller hand-written validation exists for `item_type`, `rating`, `message length`, and JSON `metadata` parsing — but no centralized library yet.

- [x] **Rate Limiting** *(partial)* — `express-rate-limit` is installed and applied to `POST /ai/chat` (10 req/hr/IP). **Still pending:**
  - Signup/login attempts
  - Event creation per user

- [ ] **Admin Routes Namespace** - Organize admin endpoints under `/admin/*`
  - Move `/items/admin/all` to `/admin/items`
  - Move `/items/:id/approval` to `/admin/items/:id/approval`
  - Update routes file

- [x] **User Profile Endpoints** — `GET /users/me` (with their items + reviews), `PATCH /users/me`, `GET /users/:id`.

### Low Priority

- [ ] **Email Verification** - Complete email confirmation for signups
  - Send verification email on signup
  - Create verification token table
  - Verify token on account activation
  - *Note:* Probably skippable since Google OAuth is the primary sign-in path and that handles identity verification.

- [ ] **Tests** - Add unit and integration tests
  - Test auth endpoints
  - Test item CRUD operations
  - Test reviews functionality
  - Test AI controllers (mock Gemini)
  - Use Jest or Mocha

- [ ] **Logging** - Add proper logging system
  - Log API requests, errors, important events
  - Use Winston or Bunyan

- [ ] **API Documentation** *(partial)* — README now has a complete endpoint table with auth/admin gating notes. Still missing: a proper Swagger/OpenAPI spec.

---

## 🎨 Frontend - Missing/Incomplete

### High Priority

- [x] **Review Components** — `StarRating`, `ReviewCard`, `ReviewList`, `ReviewForm` in [`components/reviews/`](frontend-next/components/reviews/). Show user avatar, name, formatted date, star rating, aggregate average above the list, and owner/admin delete.

- [ ] **Event Card Component** *(deferred)* — events still render inline in `app/events/page.js` and `app/events/[id]/page.js`. Refactoring into a reusable `<EventCard />` would be nice for consistency but isn't blocking. The `SummaryBadge` and review components were extracted as the more impactful pieces.

- [ ] **Event List/Grid Component** *(deferred)* — same reasoning as above.

- [x] **Connect Search/Filter to Backend** — `/events` builds a query string from filter state with `useMemo` and re-fetches on change.

### Medium Priority

- [x] **Event Filter Bar** *(adapted)* — implemented as a horizontal filter bar at the top of `/events` instead of a sidebar. Includes:
  - Debounced free-text search
  - From/to date range
  - Location dropdown
  - Clear button when any filter is active
  - *Note:* Sidebar layout was rejected because the page is content-narrow and a top bar is cleaner.

- [x] **Deals Page Improvements** — `/deals` fetches `GET /items?type=deal`, reads icon/badges/full-description/details from `metadata` JSONB. The static array of ~45 deals was retired.

- [x] **Resources Page Improvements** — `/resources` same pattern with `?type=resource`.

- [ ] **Error Boundaries** - Handle errors gracefully
  - Create `components/ui/ErrorBoundary.jsx`
  - Wrap page sections with error boundary
  - Display user-friendly error messages
  - Add fallback UI

- [x] **Toast/Notification System** — `sonner` mounted in `ClientProviders`; replaced all `alert()` calls; added success toasts at create/edit/delete/review/admin-moderate.

- [x] **Skeleton Loaders** — `Skeleton`, `CardSkeleton`, `ResourceCardSkeleton`, `CardGridSkeleton` in [`components/ui/Skeleton.jsx`](frontend-next/components/ui/Skeleton.jsx). Used on `/events`, `/deals`, `/resources`, and `/profile`.

### Low Priority

- [ ] **Event Detail Page Enhancements** *(partial)*
  - [x] Reviews now show count and average rating
  - [ ] Related events section
  - [ ] Share event functionality (social media)
  - [ ] Add to calendar feature

- [ ] **Responsive Design** - Ensure mobile-friendly
  - Test on mobile devices
  - Adjust layouts for small screens
  - Mobile navigation menu
  - Touch-friendly buttons

- [ ] **Dark Mode** *(partial)* - Implement ThemeContext fully
  - Theme toggle button exists in the navbar (`🌙` / `☀️`)
  - CSS variables defined for `html[data-theme="dark"]` in `globals.css`
  - **Still pending:** verify every component reads from theme variables (some have hardcoded colors); confirm persistence; test all surfaces in dark mode

- [x] **User Profile Page** — `/profile` page with avatar/initials, inline edit name and bio, "My Events" grid (any approval status, with status pills), "My Reviews" list with stars. Navbar link added for logged-in users.

- [ ] **Admin Dashboard Enhancements** *(partial)*
  - [x] Type chip (event/deal/resource) on the manage page
  - [x] Fixed broken approve/reject/delete buttons that were reading `event._id` (now `event.id`)
  - [ ] Statistics/dashboard cards (total events, pending count, total users)
  - [ ] Event analytics
  - [ ] User management

---

## 📊 Quick Summary Table

| Feature | Backend | Frontend | Status |
|---------|---------|----------|--------|
| **Authentication** | ✓ | ✓ | Complete |
| **Events (CRUD)** | ✓ | ✓ | Complete |
| **Reviews (CR)** | ✓ | ✓ | Complete |
| **Delete Reviews** | ✓ | ✓ | Complete |
| **Star Ratings** | ✓ | ✓ | Complete |
| **Event Approval** | ✓ | ✓ | Complete |
| **Image Upload** | ✓ | ✓ | Complete |
| **Admin Dashboard** | ✓ | ✓ (basic) | Partial — missing analytics |
| **Search/Filter Events** | ✓ | ✓ | Complete |
| **Typed Items (event/deal/resource)** | ✓ | ✓ | Complete |
| **AI Summary** | ✓ | ✓ | Complete |
| **AI Chat Assistant** | ✓ | ✓ | Complete |
| **Deals (from DB)** | ✓ | ✓ | Complete |
| **Resources (from DB)** | ✓ | ✓ | Complete |
| **User Profiles** | ✓ | ✓ | Complete |
| **Toast Notifications** | – | ✓ | Complete |
| **Skeleton Loaders** | – | ✓ | Complete |
| **Rate Limiting** | Partial (chat only) | – | Partial |
| **Pagination** | ✗ | ✗ | Missing |
| **Error Handling** | Partial | Partial | Incomplete |
| **Input Validation** | Partial (hand-written) | – | Incomplete |
| **Error Boundaries** | – | ✗ | Missing |
| **Dark Mode** | – | Partial | Incomplete |
| **Responsive Design** | – | Not verified | Unknown |
| **Tests** | ✗ | ✗ | Missing |
| **API Docs** | Partial (README) | – | Partial |
| **Logging** | ✗ | – | Missing |

---

## 🎯 Recommended Priority Order

> Phases 1-3 of the original roadmap have largely shipped. What follows is the post-Sprint-5 view.

### Phase A — Production-readiness hygiene

**Backend:**
1. [ ] Pagination on `/items` (matters once the dataset grows past a few dozen)
2. [ ] Better error handling — typed errors, structured responses
3. [ ] Rate limiting on signup/login/item-create (chat is already covered)
4. [ ] Centralized input validation (joi or zod)

**Frontend:**
1. [ ] Error boundaries around major page sections
2. [ ] Dark mode coverage check across all components

### Phase B — Polish

**Frontend:**
1. [ ] Event detail extras (related events, share, add-to-calendar)
2. [ ] Responsive design pass (mobile-friendly verification)
3. [ ] Refactor inline event JSX into `<EventCard />` if it gets reused elsewhere

**Backend:**
1. [ ] Admin routes namespace under `/admin/*`

### Phase C — Confidence

**Backend:**
1. [ ] Tests (auth + items + reviews + AI controllers with mocked Gemini)
2. [ ] Structured logging (Winston / Bunyan)
3. [ ] OpenAPI/Swagger spec from the README endpoint table

**Frontend:**
1. [ ] Component tests (React Testing Library) for review components, ChatWidget, filter bar
2. [ ] Admin dashboard analytics cards

### Phase D — Deferred

- Email verification (Google OAuth handles identity for the primary sign-in path)
- Streaming responses on AI chat
- Caching popular AI chat queries

---

## 📝 Notes

- The AI features doc that drove Sprint 5 is at [`AI_FEATURES_PLAN.md`](AI_FEATURES_PLAN.md) (historical — the implementation diverged in places, see commit history on `main`).
- Each phase builds on the previous; pick from one phase at a time rather than cherry-picking across.
- Frontend features can be built in parallel with backend work.
- Migrations should land as `.sql` files under [`database/migrations/`](database/migrations) so the team has a clear apply order.
- Add TypeScript on the frontend when there's a quiet sprint — moving incrementally is fine, Next.js supports mixed `.js` / `.tsx` files.
