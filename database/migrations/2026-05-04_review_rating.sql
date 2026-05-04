-- Migration: 2026-05-04 review rating
--
-- Adds a 1-5 star rating to reviews. Nullable so existing rows keep
-- working — they just don't have a rating until edited. CHECK
-- constraint enforces the 1-5 range at the DB level so the controller
-- can be lazy about it (or so a misconfigured client can't poison
-- the data with rating=99).

ALTER TABLE reviews
  ADD COLUMN IF NOT EXISTS rating SMALLINT CHECK (rating BETWEEN 1 AND 5);
