-- Migration: 2026-05-03 AI features
--
-- Two additive changes to the items table:
--   1. ai_summary VARCHAR(280) — populated on insert/update by the
--      AI summarizer (backend/src/utils/summarizeText.js). Nullable so
--      a failed/skipped LLM call doesn't block writes.
--   2. approval_status TEXT NOT NULL DEFAULT 'pending' — the live Neon
--      DB was missing this column even though the schema dump in
--      studenthub.sql expected it. Adding it here so the items
--      controller's filter (WHERE approval_status = 'approved') works.
--
-- The UPDATE statement backfills any existing rows to 'approved' so
-- they remain visible on /events. Drop it if you want pre-existing
-- rows to be re-reviewed.

ALTER TABLE items ADD COLUMN IF NOT EXISTS ai_summary VARCHAR(280);

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending';

UPDATE items SET approval_status = 'approved' WHERE approval_status = 'pending';
