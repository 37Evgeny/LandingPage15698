import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import useFavorites from "../../hooks/useFavorites.js";
import useSearch from "../../hooks/useSearch.js";

import CardList from "../../components/CardList/card-list.jsx";
import FavoritesFilter from "../../components/FavoritesFilter/favorites-filter.jsx";
import SearchBar from "../../components/SearchBar/search-bar.jsx";
import SkeletonList from "../../components/SkeletonCard/skeleton-list.jsx";
import SortBar from "../../components/SortBar/sort-bar.jsx";

/**
 * Страница списка карточек — маршрут /cards.
 * Получает данные и обработчики из App через пропсы.
 * Не содержит собственного состояния — только UI.
 *
 * @param {object}   props
 * @param {Array}    props.cards          - все карточки
 * @param {boolean}  props.isLoading      - загрузка карточек
 * @param {boolean}  props.isAuthLoading  - загрузка авторизации
 * @param {string}   props.error          - ошибка загрузки
 * @param {function} props.onAdd          - открыть диалог добавления
 * @param {function} props.onEdit         - открыть диалог редактирования
 * @param {function} props.onDelete       - открыть диалог удаления
 * @param {function} props.onLike         - переключить лайк
 * @param {boolean}  props.isLoggedIn     - авторизован ли пользователь
 * @param {string}   props.currentUserId  - ID текущего пользователя
 * @param {string}   props.currentRole    - роль текущего пользователя
 */
const CardsPage = ({
  cards,
  isLoading,
  isAuthLoading,
  error,
  onAdd,
  onEdit,
  onDelete,
  onLike,
  isLoggedIn,
  currentUserId,
  currentRole,
}) => {
  /** Навигация — для перехода на детальную страницу */
  const navigate = useNavigate();

  /** Хук избранного */
  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  /** Хук поиска и сортировки */
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    showFavoritesOnly,
    setShowFavoritesOnly,
    filteredCards,
    totalCount,
    filteredCount,
  } = useSearch(cards, isFavorite);

  /**
   * Переход на детальную страницу карточки.
   * @param {object} card - карточка
   */
  const handleViewCard = (card) => {
    navigate(`/cards/${card._id}`);
  };

  // ── Рендер контента ────────────────────────────────────────
  const renderContent = () => {
    if (isAuthLoading || isLoading) {
      return <SkeletonList count={8} />;
    }

    if (error) {
      return (
        <Typography color="error" textAlign="center" sx={{ py: 10 }}>
          {error}
        </Typography>
      );
    }

    return (
      <CardList
        cardsAll={filteredCards}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={handleViewCard}
        onLike={onLike}
        onToggleFav={toggleFavorite}
        isFavorite={isFavorite}
        onAdd={onAdd}
        isSearching={!!searchQuery.trim()}
        isFavoritesMode={showFavoritesOnly}
        onClearFavorites={() => setShowFavoritesOnly(false)}
        isLoggedIn={isLoggedIn}
        currentUserId={currentUserId}
        currentRole={currentRole}
      />
    );
  };

  return (
    <Box>
      {/* Кнопка добавления */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onAdd}
          sx={{
            bgcolor: "var(--accent-main)",
            "&:hover": { bgcolor: "var(--accent-light)" },
            fontWeight: 600,
          }}
        >
          + Добавить карточку
        </Button>
      </Box>

      {/* Панель поиска и фильтров */}
      {!isAuthLoading && !isLoading && !error && cards.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 4,
            alignItems: { xs: "stretch", sm: "center" },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <SearchBar
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </Box>

          <FavoritesFilter
            active={showFavoritesOnly}
            onToggle={() => setShowFavoritesOnly((prev) => !prev)}
            favoritesCount={favoritesCount}
          />

          <SortBar sortBy={sortBy} onSort={setSortBy} />
        </Box>
      )}

      {renderContent()}
    </Box>
  );
};

export default CardsPage;
