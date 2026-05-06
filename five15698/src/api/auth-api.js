/**
 * @fileoverview HTTP клиент для запросов аутентификации.
 * Базовый URL указывает на локальный сервер разработки.
 */

/** 
 * Базовый URL API сервера.
 * @constant {string}
 */
const BASE_URL = "http://localhost:4000/api";

/**
 * Универсальная обёртка над fetch.
 * Читает JSON тело ошибки и пробрасывает message от сервера.
 * Это позволяет показать пользователю точное сообщение — 
 * например "Email уже занят" вместо "Ошибка сервера: 409".
 *
 * @param {string} endpoint - путь: "/signup", "/signin", "/users/me"
 * @param {RequestInit} options - опции fetch
 * @returns {Promise<any>} - распарсенный JSON ответ
 * @throws {Error} - с message от сервера при статусе не 2xx
 */
const request = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  // Читаем JSON тела ответа в любом случае
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Берём message от сервера или формируем из статуса
    // Это ключевое место — именно здесь 409 превращается
    // в "Пользователь с таким email уже существует"
    throw new Error(data.message || `Ошибка сервера: ${res.status}`);
  }

  return data;
};

/**
 * Объект с методами API аутентификации.
 * Используется в хуке useAuth.
 */
export const authApi = {
  /**
   * Регистрация нового пользователя.
   * POST /api/signup
   *
   * @param {{ name: string, email: string, password: string }} userData
   * @returns {Promise<{ user: object }>}
   * @throws {Error} - 409 если email занят, 400 если данные невалидны
   */
  register: (userData) =>
    request("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }),

  /**
   * Вход в аккаунт.
   * POST /api/signin
   *
   * @param {{ email: string, password: string }} userData
   * @returns {Promise<{ token: string, user: object }>}
   * @throws {Error} - 401 если email или пароль неверный
   */
  login: (userData) =>
    request("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }),

  /**
   * Получение данных текущего пользователя по токену.
   * GET /api/users/me
   *
   * @param {string} token - JWT токен из localStorage
   * @returns {Promise<object>} - объект пользователя { _id, name, email, role }
   * @throws {Error} - 401 если токен невалидный или истёк
   */
  getMe: (token) =>
    request("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
