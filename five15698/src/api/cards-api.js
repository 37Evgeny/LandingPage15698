/**
 * @fileoverview HTTP клиент для CRUD операций с карточками.
 * Автоматически добавляет JWT токен из localStorage в каждый запрос.
 */

/** Базовый URL для эндпоинтов карточек */
const BASE_URL = 'http://localhost:4000/api/cards';

/**
 * Читает JWT токен из localStorage.
 * @returns {string|null}
 */
const getToken = () => localStorage.getItem('token');

/**
 * Универсальная обёртка над fetch.
 * Автоматически добавляет Authorization заголовок.
 * Читает JSON тела ошибки и пробрасывает message от сервера.
 *
 * @param {string} endpoint
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
const request = async (endpoint, options = {}) => {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Ошибка сервера: ${res.status}`);
  }

  return data;
};

export const cardsApi = {
  /** GET /api/cards — все карточки */
  getAll: () => request("/"),

  /**
   * GET /api/cards/:id — одна карточка по ID.
   * Используется на детальной странице /cards/:id.
   *
   * @param {string} id - MongoDB ObjectId
   * @returns {Promise<object>} - карточка с populate owner
   */
  getById: (id) => request(`/${id}`),

  /** POST /api/cards */
  create: (cardData) =>
    request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    }),

  /** PATCH /api/cards/:id */
  update: (id, cardData) =>
    request(`/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    }),

  /** DELETE /api/cards/:id */
  remove: (id) => request(`/${id}`, { method: "DELETE" }),

  /** PUT /api/cards/:id/likes */
  toggleLike: (id) => request(`/${id}/likes`, { method: "PUT" }),
};