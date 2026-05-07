function parseAdminFlag(req) {
  return req.headers["x-admin"] === "true";
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

module.exports = { parseAdminFlag, parseMetadata, parseIsTimed };
