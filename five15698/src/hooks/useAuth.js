import { useEffect, useState } from "react";
import { authApi } from "../api/auth-api";

function useAuth({ onSuccess, onError }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Проверяем токен при загрузке
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    authApi
      .getMe(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        // Токен невалидный — чистим
        localStorage.removeItem("token");
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

  // Регистрация
  const handleRegister = (formData) => {
    return authApi
      .register(formData)
      .then(() => {
        // После регистрации сразу логиним
        return authApi.login({
          email: formData.email,
          password: formData.password,
        });
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        onSuccess("Добро пожаловать! 🎉");
      })
      .catch((err) => {
        console.error("Ошибка регистрации:", err);
        onError("Ошибка регистрации. Попробуйте снова");
        throw err;
      });
  };

  // Вход
  const handleLogin = (formData) => {
    return authApi
      .login(formData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        onSuccess(`С возвращением! 👋`);
      })
      .catch((err) => {
        console.error("Ошибка входа:", err);
        onError("Неверный email или пароль");
        throw err;
      });
  };

  // Выход
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setIsLoggedIn(false);
    onSuccess("Вы вышли из аккаунта");
  };

  return {
    currentUser,
    isAuthLoading,
    isLoggedIn,
    handleRegister,
    handleLogin,
    handleLogout,
  };
}

export default useAuth;
