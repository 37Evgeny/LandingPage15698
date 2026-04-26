const BASE_URL = "http://127.0.0.1:4000/api";

const request = (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then((res) => {
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
    return res.json();
  });
};

export const authApi = {
  // POST /api/signup
  register: (userData) =>
    request("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }),

  // POST /api/signin
  login: (userData) =>
    request("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }),

  // GET /api/users/me
  getMe: (token) =>
    request("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
