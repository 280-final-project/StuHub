const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchJSON(path, options = {}) {
  const isFullUrl = path.startsWith("http://") || path.startsWith("https://");
  const url = isFullUrl ? path : `${API_BASE_URL}${path}`;

  const headers = { ...options.headers };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && !headers.Authorization) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  if (options.body && !(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || data.message || `Request failed (${response.status})`);
  }

  return response.json();
}

export function apiPost(path, body) {
  return fetchJSON(path, {
    method: "POST",
    body: body instanceof FormData ? body : JSON.stringify(body),
  });
}

export function apiPatch(path, body, extraHeaders = {}) {
  return fetchJSON(path, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: extraHeaders,
  });
}

export function apiDelete(path, extraHeaders = {}) {
  return fetchJSON(path, {
    method: "DELETE",
    headers: extraHeaders,
  });
}
