import { useEffect, useState } from 'react';
import { cardsApi } from '../api/cards-api';

/**
 * Хук управления карточками.
 * CRUD операции + toggle лайка.
 *
 * @param {object} params
 * @param {function} params.onSuccess
 * @param {function} params.onError
 */
function useCards({ onSuccess, onError }) {
  /** Массив всех карточек */
  const [cards, setCards] = useState([]);

  /** Флаг загрузки при первом получении карточек */
  const [isLoading, setIsLoading] = useState(true);

  /** Текст ошибки загрузки или null */
  const [error, setError] = useState(null);

  // Загружаем карточки при монтировании
  useEffect(() => {
    setIsLoading(true);
    cardsApi
      .getAll()
      .then((data) => setCards(data))
      .catch((err) => {
        console.error('Ошибка загрузки карточек:', err);
        setError('Не удалось загрузить карточки');
        onError('Не удалось загрузить карточки');
      })
      .finally(() => setIsLoading(false));
  }, []);

  /** Добавить новую карточку */
  const handleAdd = (formData) => {
    return cardsApi
      .create(formData)
      .then((createdCard) => {
        setCards((prev) => [createdCard, ...prev]);
        onSuccess('Карточка успешно добавлена! 🎉');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /** Обновить карточку */
  const handleEdit = (id, formData) => {
    return cardsApi
      .update(id, formData)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((card) => card._id === updatedCard._id ? updatedCard : card)
        );
        onSuccess('Карточка успешно обновлена! ✏️');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /** Удалить карточку */
  const handleDelete = (id) => {
    return cardsApi
      .remove(id)
      .then(() => {
        setCards((prev) => prev.filter((card) => card._id !== id));
        onSuccess('Карточка удалена 🗑️');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /**
   * Переключить лайк на карточке.
   * Оптимистичного обновления нет — ждём ответ сервера
   * и заменяем карточку в массиве на актуальную версию.
   *
   * @param {string} id - ID карточки
   */
  const handleLike = (id) => {
    return cardsApi
      .toggleLike(id)
      .then((updatedCard) => {
        // Заменяем карточку в массиве на обновлённую с сервера
        setCards((prev) =>
          prev.map((card) => card._id === updatedCard._id ? updatedCard : card)
        );
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  return {
    cards,
    isLoading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    handleLike, // новый метод
  };
}

export default useCards;
