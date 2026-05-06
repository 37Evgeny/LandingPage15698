import { useEffect, useState } from "react";
import { authApi } from "../api/auth-api";

/**
 * Хук управления авторизацией пользователя.
 *
 * Отвечает за:
 * - Проверку JWT токена при загрузке страницы через getMe
 * - Хранение данных текущего пользователя в состоянии
 * - Методы регистрации, входа и выхода
 *
 * @param {object} params
 * @param {function} params.onSuccess - колбэк для успешных уведомлений
 * @param {function} params.onError - колбэк для уведомлений об ошибках
 * @returns {object} - состояние и методы авторизации
 */
function useAuth({ onSuccess, onError }) {
  /** Данные текущего пользователя или null если не авторизован */
  const [currentUser, setCurrentUser] = useState(null);

  /** true пока идёт проверка токена при старте страницы */
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  /** Флаг авторизации — производный от currentUser */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ─── Проверка токена при загрузке страницы ─────────────────
  useEffect(() => {
    // Читаем токен — ключ "token" совпадает с cards-api.js
    const token = localStorage.getItem("token");

    if (!token) {
      // Токена нет — пользователь не авторизован
      setIsAuthLoading(false);
      return;
    }

    // Токен есть — проверяем его валидность на сервере
    authApi
      .getMe(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        // Токен невалидный или истёк — чистим хранилище
        localStorage.removeItem("token");
        setCurrentUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []); // Запускается один раз при монтировании

  // ─── Регистрация ───────────────────────────────────────────
  /**
   * Регистрирует нового пользователя.
   * После успешной регистрации автоматически выполняет вход.
   * При ошибке 409 — показывает "Email уже занят".
   *
   * @param {{ name: string, email: string, password: string }} formData
   * @returns {Promise<void>}
   * @throws {Error} - пробрасывает ошибку для обработки в компоненте
   */
  const handleRegister = (formData) => {
    return authApi
      .register(formData)
      .then(() => {
        // Регистрация успешна — сразу логиним
        return authApi.login({
          email: formData.email,
          password: formData.password,
        });
      })
      .then((data) => {
        // Сохраняем токен и обновляем состояние
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        onSuccess(`Добро пожаловать, ${data.user.name}! 🎉`);
      })
      .catch((err) => {
        console.error("Ошибка регистрации:", err);
        // ✅ ИСПРАВЛЕНО: err.message содержит текст от сервера
        // Например: "Пользователь с таким email уже существует"
        // вместо общего "Ошибка регистрации. Попробуйте снова"
        onError(err.message);
        throw err; // Пробрасываем чтобы диалог не закрылся
      });
  };

  // ─── Вход ──────────────────────────────────────────────────
  /**
   * Выполняет вход пользователя по email и паролю.
   * Сохраняет JWT токен в localStorage под ключом "token".
   *
   * @param {{ email: string, password: string }} formData
   * @returns {Promise<void>}
   * @throws {Error} - пробрасывает ошибку для обработки в компоненте
   */
  const handleLogin = (formData) => {
    return authApi
      .login(formData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        onSuccess(`С возвращением, ${data.user.name}! 👋`);
      })
      .catch((err) => {
        console.error("Ошибка входа:", err);
        // ✅ ИСПРАВЛЕНО: показываем точное сообщение от сервера
        onError(err.message);
        throw err;
      });
  };

  // ─── Выход ─────────────────────────────────────────────────
  /**
   * Выполняет выход пользователя.
   * Удаляет токен из localStorage и сбрасывает состояние.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    onSuccess("Вы вышли из аккаунта");
  };

  return {
    currentUser,    // Объект пользователя { _id, name, email, role } или null
    isAuthLoading,  // true пока проверяем токен при старте
    isLoggedIn,     // true если пользователь авторизован
    handleRegister, // Функция регистрации
    handleLogin,    // Функция входа
    handleLogout,   // Функция выхода
  };
}

export default useAuth;
