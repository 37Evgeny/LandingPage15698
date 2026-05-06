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
  /**
   * GET /api/cards?page=1&limit=12
   * Возвращает объект с пагинацией.
   *
   * @param {number} page  - номер страницы
   * @param {number} limit - карточек на странице
   * @returns {Promise<{
   *   cards: Array,
   *   total: number,
   *   page: number,
   *   totalPages: number,
   *   hasMore: boolean
   * }>}
   */
  getAll: (page = 1, limit = 12) =>
    request(`/?page=${page}&limit=${limit}`),

  /**
   * GET /api/cards/:id — одна карточка по ID.
   * @param {string} id
   */
  getById: (id) => request(`/${id}`),

  /**
   * POST /api/cards — создать карточку.
   * @param {{ name: string, pictures: string, description: string }} cardData
   */
  create: (cardData) =>
    request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    }),

  /**
   * PATCH /api/cards/:id — обновить карточку.
   * @param {string} id
   * @param {object} cardData
   */
  update: (id, cardData) =>
    request(`/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardData),
    }),

  /**
   * DELETE /api/cards/:id — удалить карточку.
   * @param {string} id
   */
  remove: (id) => request(`/${id}`, { method: 'DELETE' }),

  /**
   * PUT /api/cards/:id/likes — toggle лайк.
   * @param {string} id
   */
  toggleLike: (id) => request(`/${id}/likes`, { method: 'PUT' }),
};
