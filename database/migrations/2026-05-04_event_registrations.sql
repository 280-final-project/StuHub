-- Migration: 2026-05-04 event registrations
--
-- Lets students RSVP / register for events. One row per (user_id,
-- item_id) — the UNIQUE constraint enforces idempotency at the DB
-- level so a double-click on Register doesn't blow up.
--
-- Indexes are tuned for the two common reads:
--   - "how many people registered for this event?"   → idx on item_id
--   - "what events did this user register for?"      → idx on user_id
--
-- ⚠️ Pre-fix: the live users table had no PK on user_id (despite what
-- studenthub.sql implies). The FK below requires one, so we add the
-- PK first. Safe — no duplicates or nulls were present.

ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

CREATE TABLE IF NOT EXISTS event_registrations (
  registration_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  item_id INT NOT NULL REFERENCES items(item_id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, item_id)
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_item_id ON event_registrations (item_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_user_id ON event_registrations (user_id);
