-- Migration: 2026-05-03 typed items + metadata
--
-- Lets a single items table hold events, deals, and resources, with
-- enough room for type-specific extra fields (badges, "details" pairs,
-- emoji icon, full description) without cramming them into item_desc.
--
--   1. Extend item_type enum with 'deal' (it had event/place/resource).
--   2. Add items.item_type column, default 'event' so existing rows
--      keep behaving like before.
--   3. Add items.metadata JSONB for per-type extras such as
--      { icon, badges, fullDescription, details: [{label, value}] }.
--      Nullable; events typically don't need it.

ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'deal';

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS item_type item_type NOT NULL DEFAULT 'event';

ALTER TABLE items
  ADD COLUMN IF NOT EXISTS metadata JSONB;
