# 🎬 Demo Users

Pre-seeded accounts for walking through the app. All three are seeded in the live Neon DB by [`backend/scripts/seed_demo_users.js`](backend/scripts/seed_demo_users.js).

> Use these for **email/password** sign-in (the form on `/login`). Don't use the **"Continue with Google"** button — Google sign-in only accepts real `@sjsu.edu` accounts.

---

## 🔑 Credentials

| Role | Email | Password | What they can do |
|---|---|---|---|
| 👑 **Admin** | `demo.admin@stuhub.app` | `Admin@2026` | Approve / reject community-submitted events, edit and delete any event, see the **Admin** tab in the navbar, see pending and rejected items everywhere |
| 🧑‍🎓 **Student (community)** | `demo.student@stuhub.app` | `Student@2026` | Browse, post events, write star-rated reviews, edit and delete their own content, use AI chat |
| 🧑‍🎓 **Second student** | `demo.poster@stuhub.app` | `Poster@2026` | Same as above; useful for showing cross-user behavior — e.g. one user posts, the other reviews |

> The admin email is whitelisted in [`frontend-next/context/AuthContext.js`](frontend-next/context/AuthContext.js) (`ADMIN_EMAILS`). To add another admin, append to that array and redeploy.

---

## 🚀 Where to log in

Live frontend: **https://stu-hub-phi.vercel.app/login**

1. Enter the email and password from the table above.
2. Click **Login** (the email/password form, _not_ the "Continue with Google" button).
3. Admin lands on `/admin`, regular users land on `/home`.

> **First request to the backend after a long idle is slow** (~30s) because Render's free tier sleeps. Hit `/health` once first or just be patient on the first login.

---

## 🎬 Suggested 3-minute demo flow

### 1. Browse as a guest (no login, ~30s)
- Open https://stu-hub-phi.vercel.app
- Click **Events** in the nav → point at the AI summary badges on event cards
- Click any event → show the bigger summary above the description, plus the reviews section
- Click **Deals** → show the rich modal (badges, "How to Access" details)
- Click **Resources** → show the SJSU campus services pulled from the DB
- Click the **✨ Ask AI** pill bottom-right → ask **"What free food events are there this week?"** → show the typed Event chips

### 2. Sign in as a student (~60s)
- `/login` → enter `demo.student@stuhub.app` / `Student@2026`
- Lands on `/home`
- Click **Profile** in the nav → show "My Events" and "My Reviews" sections (initially empty)
- Click **Add Event** → fill out a new event:
  - Title: *Demo Tech Talk*
  - Date: any future date
  - Building: *Engineering Building*
  - Description: a couple of sentences
- Submit → toast confirms it's submitted for approval
- Open an existing event detail page → leave a star-rated review (1-5 stars + title + body)
- Toast confirms; the review appears with the average rating chip

### 3. Sign in as admin (~60s)
- Logout, then `/login` with `demo.admin@stuhub.app` / `Admin@2026`
- Lands on `/admin` → notice the **Admin** tab in the nav
- Go to **Manage Events** → see the *Demo Tech Talk* you just posted as a `pending` row with a yellow chip
- Click **Approve** → toast, status flips to `approved`
- Open the events list as a guest (or in another tab) → confirm *Demo Tech Talk* now appears

### 4. Show AI cross-type chat (~30s)
- From any page, open the chat widget
- Ask **"Where can I get help with my resume?"** → answer cites both **Career Center** (resource) and **Resume Review Drop-In** (event); each chip is clickable

---

## 🛠 Re-seeding

The script is idempotent — re-running won't create duplicates:

```bash
cd backend
node scripts/seed_demo_users.js
```

To remove a demo user (e.g. to test signup with the same email), delete the row directly:

```sql
DELETE FROM users WHERE email = 'demo.student@stuhub.app';
```

Then re-run the seed script.
