
const API_BASE_URL = 'https://fogeapi-backend.onrender.com/api';

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  let res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  });

  // If unauthenticated (401), try to refresh token
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_BASE_URL}/user/refreshToken`, {
      method: 'POST',
      credentials: 'include',
    });
    if (refreshRes.ok) {
      // Try original request again after refresh
      res = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      });
    } else {
      // If refresh fails, throw/error/redirect to login
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

