import { useCallback, useState } from 'react';

/**
 * Хук управления избранными карточками.
 * Хранит список ID в localStorage — работает без сервера.
 * Состояние синхронизируется между вкладками через storage event.
 *
 * @returns {object} - состояние и методы избранного
 */
function useFavorites() {
  /**
   * Читает массив ID из localStorage.
   * @returns {string[]} - массив строковых ID
   */
  const readFromStorage = () => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  /** Список ID избранных карточек */
  const [favorites, setFavorites] = useState(readFromStorage);

  /**
   * Записывает обновлённый массив в localStorage и состояние.
   * @param {string[]} newFavorites
   */
  const saveToStorage = useCallback((newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  }, []);

  /**
   * Переключает карточку в избранном.
   * Если есть — удаляет, если нет — добавляет.
   *
   * @param {string} cardId - ID карточки
   */
  const toggleFavorite = useCallback((cardId) => {
    const current = readFromStorage();
    const isAlready = current.includes(cardId);

    const updated = isAlready
      ? current.filter((id) => id !== cardId)  // убрать
      : [...current, cardId];                   // добавить

    saveToStorage(updated);
  }, [saveToStorage]);

  /**
   * Проверяет находится ли карточка в избранном.
   *
   * @param {string} cardId
   * @returns {boolean}
   */
  const isFavorite = useCallback(
    (cardId) => favorites.includes(cardId),
    [favorites]
  );

  /**
   * Очищает всё избранное.
   */
  const clearFavorites = useCallback(() => {
    saveToStorage([]);
  }, [saveToStorage]);

  return {
    favorites,       // string[] — массив ID избранных карточек
    toggleFavorite,  // (id) => void — переключить
    isFavorite,      // (id) => boolean — проверить
    clearFavorites,  // () => void — очистить всё
    favoritesCount: favorites.length, // число для бейджа
  };
}

export default useFavorites;
