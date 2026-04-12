const BASE_URL = "http://127.0.0.1:4000/api/cards"; 

const request = (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, options).then((res) => {
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }
    return res;
  });
};

export const cardsApi = {
  getAll: () => request("/"),

  create: (cardData) =>
    request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    }),

  update: (id, cardData) =>
    request(`/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    }),

  remove: (id) =>
    request(`/${id}`, {
      method: "DELETE",
    }),
};
