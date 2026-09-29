// ===============================================================
// AROGYA BANDHAN FOUNDATION - CENTRALIZED API CLIENT
// Routes requests to Render backend or local server dynamically
// ===============================================================

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim() !== "") {
    return envUrl.replace(/\/+$/, "");
  }
  return "";
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${cleanPath}` : cleanPath;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = buildApiUrl(path);
  const token = typeof window !== "undefined" ? localStorage.getItem("abf_auth_token") : null;

  const headers = new Headers(init.headers || {});
  
  if (init.body && typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const options: RequestInit = {
    ...init,
    headers,
    credentials: init.credentials || "include",
  };

  return fetch(url, options);
}
