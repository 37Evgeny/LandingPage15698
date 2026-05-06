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
  getAll: () => request('/'),

  /** POST /api/cards — создать карточку */
  create: (cardData) =>
    request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    }),

  /** PATCH /api/cards/:id — обновить карточку */
  update: (id, cardData) =>
    request(`/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    }),

  /** DELETE /api/cards/:id — удалить карточку */
  remove: (id) =>
    request(`/${id}`, { method: 'DELETE' }),

  /**
   * PUT /api/cards/:id/likes — переключить лайк.
   * Сервер сам определяет добавить или убрать лайк.
   *
   * @param {string} id - ID карточки
   * @returns {Promise<object>} - обновлённая карточка с актуальным likes[]
   */
  toggleLike: (id) =>
    request(`/${id}/likes`, { method: 'PUT' }),
};
