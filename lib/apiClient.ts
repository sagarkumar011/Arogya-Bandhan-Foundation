// ===============================================================
// AROGYA BANDHAN FOUNDATION - CENTRALIZED API CLIENT
// Routes requests to Render backend with automatic failover fallback
// ===============================================================

export function getApiBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl || envUrl.trim() === "") return "";
  
  const clean = envUrl.trim().replace(/\/+$/, "");
  
  // Ignore unconfigured placeholder strings
  if (
    clean.includes("YOUR-") ||
    clean.includes("your-") ||
    clean.includes("placeholder") ||
    clean === "https://" ||
    clean === "http://"
  ) {
    return "";
  }
  
  return clean;
}

export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${cleanPath}` : cleanPath;
}

export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();
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

  // 1. If an external backend URL is configured, try it first
  if (baseUrl) {
    const targetUrl = `${baseUrl}${cleanPath}`;
    try {
      const res = await fetch(targetUrl, options);
      return res;
    } catch (networkErr: any) {
      console.warn(
        `External backend at ${baseUrl} unreachable (${networkErr.message}). Automatically failing over to local route: ${cleanPath}`
      );
      // Fall through to same-origin relative fetch
    }
  }

  // 2. Same-origin relative fetch (Vercel Serverless Function or local Next.js dev server)
  return fetch(cleanPath, options);
}
