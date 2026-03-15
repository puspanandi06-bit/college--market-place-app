const API_BASE_URL = "https://college-market-place-app.vercel.app";

async function request(path, { method = "GET", body, token, headers = {} } = {}) {
  const finalHeaders = {
    Accept: "application/json",
    ...headers,
  };

  let finalBody = body;
  if (body && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: finalBody,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || data?.error || "Request failed";
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }

  return data;
}

export const authApi = {
  login: (email, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  signup: (name, email, password) =>
    request("/api/auth/signup", {
      method: "POST",
      body: { name, email, password },
    }),
  me: (token) =>
    request("/api/auth/me", {
      method: "GET",
      token,
    }),
};

export const listingsApi = {
  list: (category) =>
    request(
      category && category !== "All"
        ? `/api/listings?category=${encodeURIComponent(category)}`
        : "/api/listings"
    ),

  create: (formData, token) =>
    request("/api/listings", {
      method: "POST",
      body: formData,
      token,
    }),

  mine: (token) =>
    request("/api/listings/mine", {
      method: "GET",
      token,
    }),
};

export default {
  auth: authApi,
  listings: listingsApi,
};

