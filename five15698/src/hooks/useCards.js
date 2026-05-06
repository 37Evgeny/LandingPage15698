import { useCallback, useEffect, useState } from 'react';
import { cardsApi } from '../api/cards-api';

/**
 * Хук управления карточками с пагинацией.
 *
 * Логика пагинации:
 * - Монтирование       → loadFirstPage() → page 1
 * - Кнопка "Ещё"       → loadMore()      → page++, cards = [...prev, ...new]
 * - После add/delete   → loadFirstPage() → сброс к странице 1
 * - Edit / Like        → точечное обновление в массиве без перезагрузки
 *
 * @param {object}   params
 * @param {function} params.onSuccess - колбэк успешного уведомления
 * @param {function} params.onError   - колбэк уведомления об ошибке
 */
function useCards({ onSuccess, onError }) {
  /** Массив загруженных карточек — накапливается при пагинации */
  const [cards, setCards] = useState([]);

  /** true при первой загрузке страницы — показываем скелетоны */
  const [isLoading, setIsLoading] = useState(true);

  /** true при загрузке следующей страницы — спиннер на кнопке */
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  /** Текст ошибки или null */
  const [error, setError] = useState(null);

  /** Текущая страница пагинации */
  const [page, setPage] = useState(1);

  /** Общее количество карточек в БД */
  const [total, setTotal] = useState(0);

  /** Есть ли ещё карточки для загрузки */
  const [hasMore, setHasMore] = useState(false);

  /** Количество карточек на одной странице */
  const LIMIT = 12;

  /**
   * Обновляет состояние пагинации из ответа сервера.
   * Выделено чтобы не дублировать в loadFirstPage и loadMore.
   *
   * @param {object} data - ответ сервера { cards, total, page, totalPages, hasMore }
   */
  const applyPaginationData = (data) => {
    setTotal(data.total);
    setHasMore(data.hasMore);
    setPage(data.page);
  };

  /**
   * Загружает первую страницу карточек.
   * Полностью заменяет текущий список.
   * Вызывается при монтировании и после add/delete.
   */
  const loadFirstPage = useCallback(() => {
    setIsLoading(true);
    setError(null);

    cardsApi
      .getAll(1, LIMIT)
      .then((data) => {
        // Полностью заменяем массив — убираем дубликаты
        setCards(data.cards);
        applyPaginationData(data);
      })
      .catch((err) => {
        console.error('Ошибка загрузки карточек:', err);
        setError('Не удалось загрузить карточки');
        onError('Не удалось загрузить карточки');
      })
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Загружает следующую страницу карточек.
   * Добавляет новые карточки к существующим.
   * Дедупликация по _id защищает от повторных карточек.
   */
  const loadMore = useCallback(() => {
    if (!hasMore || isLoadingMore) return;

    const nextPage = page + 1;
    setIsLoadingMore(true);

    cardsApi
      .getAll(nextPage, LIMIT)
      .then((data) => {
        setCards((prev) => {
          // Собираем Set существующих ID для быстрой проверки
          const existingIds = new Set(prev.map((c) => c._id));

          // Фильтруем новые карточки — исключаем уже существующие
          const newCards = data.cards.filter((c) => !existingIds.has(c._id));

          return [...prev, ...newCards];
        });

        applyPaginationData(data);
      })
      .catch((err) => {
        console.error('Ошибка загрузки страницы:', err);
        onError('Не удалось загрузить карточки');
      })
      .finally(() => setIsLoadingMore(false));
  }, [hasMore, isLoadingMore, page]);

  // ✅ ИСПРАВЛЕНО: useEffect вместо useState для загрузки при монтировании
  useEffect(() => {
    loadFirstPage();
  }, []);

  /**
   * Добавить новую карточку.
   * После создания перезагружаем с первой страницы —
   * новая карточка окажется вверху (сортировка по дате).
   *
   * @param {object} formData - { name, pictures, description }
   */
  const handleAdd = (formData) => {
    return cardsApi
      .create(formData)
      .then(() => {
        loadFirstPage();
        onSuccess('Карточка успешно добавлена! 🎉');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /**
   * Обновить карточку.
   * Точечное обновление в массиве — не перезагружаем пагинацию.
   *
   * @param {string} id       - ID карточки
   * @param {object} formData - новые данные
   */
  const handleEdit = (id, formData) => {
    return cardsApi
      .update(id, formData)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((card) =>
            card._id === updatedCard._id ? updatedCard : card
          )
        );
        onSuccess('Карточка успешно обновлена! ✏️');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /**
   * Удалить карточку.
   * Убираем из локального массива и уменьшаем total.
   * Перезагружаем первую страницу чтобы заполнить пробел.
   *
   * @param {string} id - ID карточки
   */
  const handleDelete = (id) => {
    return cardsApi
      .remove(id)
      .then(() => {
        // Убираем карточку локально сразу
        setCards((prev) => prev.filter((card) => card._id !== id));
        setTotal((prev) => prev - 1);
        onSuccess('Карточка удалена 🗑️');
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  /**
   * Переключить лайк на карточке.
   * Точечное обновление — заменяем карточку в массиве на ответ сервера.
   *
   * @param {string} id - ID карточки
   */
  const handleLike = (id) => {
    return cardsApi
      .toggleLike(id)
      .then((updatedCard) => {
        setCards((prev) =>
          prev.map((card) =>
            card._id === updatedCard._id ? updatedCard : card
          )
        );
      })
      .catch((err) => {
        onError(err.message);
        throw err;
      });
  };

  return {
    cards,          // Массив загруженных карточек
    isLoading,      // true при первой загрузке
    isLoadingMore,  // true при загрузке следующей страницы
    error,          // Текст ошибки или null
    hasMore,        // Есть ли ещё карточки
    total,          // Общее количество в БД
    page,           // Текущая страница
    loadMore,       // Загрузить следующую страницу
    handleAdd,
    handleEdit,
    handleDelete,
    handleLike,
  };
}

export default useCards;
