import { useMemo, useState } from "react";

function useSearch(cards) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | a-z | z-a

  // ✅ Фильтрация по поисковому запросу
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // Фильтрация по названию и описанию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (card) =>
          card.name.toLowerCase().includes(query) ||
          card.description?.toLowerCase().includes(query)
      );
    }

    // Сортировка
    switch (sortBy) {
      case "newest":
        // Новые карточки в начале (по умолчанию — порядок из БД)
        result = [...result];
        break;
      case "oldest":
        result = [...result].reverse();
        break;
      case "a-z":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name, "ru")
        );
        break;
      case "z-a":
        result = [...result].sort((a, b) =>
          b.name.localeCompare(a.name, "ru")
        );
        break;
      default:
        break;
    }

    return result;
  }, [cards, searchQuery, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCards,
    totalCount: cards.length,
    filteredCount: filteredCards.length,
  };
}

export default useSearch;
