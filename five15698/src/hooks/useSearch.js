import { useMemo, useState } from "react";

/**
 * Хук поиска, сортировки и фильтрации карточек.
 * Добавлен фильтр showFavoritesOnly — показывать только избранные.
 *
 * @param {Array}    cards     - исходный массив всех карточек
 * @param {function} isFavorite - функция проверки избранного из useFavorites
 * @returns {object} - состояние и отфильтрованные карточки
 */
function useSearch(cards, isFavorite) {
  /** Строка поискового запроса */
  const [searchQuery, setSearchQuery] = useState("");

  /** Режим сортировки */
  const [sortBy, setSortBy] = useState("newest");

  /**
   * Флаг фильтра избранного.
   * true — показывать только карточки из избранного.
   */
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  /**
   * Итоговый массив карточек после всех фильтраций и сортировки.
   * Пересчитывается только когда меняются зависимости.
   */
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // ── Шаг 1: Фильтр избранного ──────────────────────────────
    if (showFavoritesOnly && isFavorite) {
      result = result.filter((card) => isFavorite(card._id));
    }

    // ── Шаг 2: Поиск по названию и описанию ───────────────────
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (card) =>
          card.name?.toLowerCase().includes(query) ||
          card.description?.toLowerCase().includes(query)
      );
    }

    // ── Шаг 3: Сортировка ─────────────────────────────────────
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          // Новые первыми — больший timestamp выше
          return new Date(b.createdAt) - new Date(a.createdAt);

        case "oldest":
          // Старые первыми
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "az":
          // По названию А → Я
          return a.name.localeCompare(b.name, "ru");

        case "za":
          // По названию Я → А
          return b.name.localeCompare(a.name, "ru");

        default:
          return 0;
      }
    });

    return result;
  }, [cards, searchQuery, sortBy, showFavoritesOnly, isFavorite]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    showFavoritesOnly,
    setShowFavoritesOnly,
    filteredCards,
    totalCount: cards.length,
    filteredCount: filteredCards.length,
  };
}

export default useSearch;
