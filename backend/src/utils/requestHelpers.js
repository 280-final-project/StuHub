function parseAdminFlag(req) {
  return req.headers["x-admin"] === "true";
}

function ensureOwnerOrAdmin(res, { ownerId, requesterId, isAdmin, action }) {
  if (isAdmin) return true;
  if (ownerId === requesterId) return true;
  res.status(403).json({ error: `Not authorized to ${action}` });
  return false;
}

function serverError(res, err, label) {
  if (label) {
    console.error(`${label}:`, err);
  } else {
    console.error(err);
  }
  return res.status(500).json({ error: "Server error" });
}

function parseMetadata(rawMetadata) {
  if (rawMetadata === undefined) {
    return { ok: true, value: undefined };
  }
  if (rawMetadata === null || rawMetadata === "") {
    return { ok: true, value: null };
  }
  try {
    const value = typeof rawMetadata === "string" ? JSON.parse(rawMetadata) : rawMetadata;
    return { ok: true, value };
  } catch {
    return { ok: false, error: "metadata must be valid JSON" };
  }
}

function parseIsTimed(value) {
  if (value === true || value === "true") return { ok: true, value: true };
  if (value === false || value === "false") return { ok: true, value: false };
  if (value === undefined || value === null || value === "") return { ok: true, value: null };
  return { ok: false, error: "is_timed must be true or false" };
}

function parseRating(value) {
  if (value === undefined || value === null || value === "") {
    return { ok: true, value: null };
  }
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 5) {
    return { ok: false, error: "rating must be an integer between 1 and 5" };
  }
  return { ok: true, value: n };
}

module.exports = {
  parseAdminFlag,
  parseMetadata,
  parseIsTimed,
  parseRating,
  serverError,
  ensureOwnerOrAdmin,
};
