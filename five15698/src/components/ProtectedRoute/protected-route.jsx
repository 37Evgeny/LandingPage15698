import { Navigate } from "react-router-dom";

/**
 * Компонент защищённого маршрута.
 * Если пользователь не авторизован — редиректит на /login.
 * Если авторизован — рендерит дочерний компонент.
 *
 * Использование:
 * <Route path="/profile" element={
 *   <ProtectedRoute isLoggedIn={isLoggedIn} isAuthLoading={isAuthLoading}>
 *     <ProfilePage />
 *   </ProtectedRoute>
 * } />
 *
 * @param {object}    props
 * @param {boolean}   props.isLoggedIn    - авторизован ли пользователь
 * @param {boolean}   props.isAuthLoading - идёт ли проверка токена
 * @param {ReactNode} props.children      - защищённый компонент
 */
const ProtectedRoute = ({ isLoggedIn, isAuthLoading, children }) => {
  // Пока проверяем токен — не редиректим
  // Показываем null чтобы не было мигания
  if (isAuthLoading) return null;

  // Не авторизован — редирект на логин
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Авторизован — рендерим страницу
  return children;
};

export default ProtectedRoute;
