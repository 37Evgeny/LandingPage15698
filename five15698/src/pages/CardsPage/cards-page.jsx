import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import useFavorites from "../../hooks/useFavorites.js";
import useSearch from "../../hooks/useSearch.js";

import CardList from "../../components/CardList/card-list.jsx";
import FavoritesFilter from "../../components/FavoritesFilter/favorites-filter.jsx";
import LoadMore from "../../components/LoadMore/load-more.jsx";
import SearchBar from "../../components/SearchBar/search-bar.jsx";
import SkeletonList from "../../components/SkeletonCard/skeleton-list.jsx";
import SortBar from "../../components/SortBar/sort-bar.jsx";

/**
 * Страница списка карточек — маршрут /cards.
 *
 * @param {object}   props
 * @param {Array}    props.cards          - загруженные карточки
 * @param {boolean}  props.isLoading      - первичная загрузка
 * @param {boolean}  props.isAuthLoading  - проверка токена
 * @param {boolean}  props.isLoadingMore  - загрузка следующей страницы
 * @param {string}   props.error          - ошибка загрузки
 * @param {boolean}  props.hasMore        - есть ли ещё карточки
 * @param {number}   props.total          - всего карточек в БД
 * @param {function} props.onLoadMore     - загрузить следующую страницу
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
  isLoadingMore,
  error,
  hasMore,
  total,
  onLoadMore,
  onAdd,
  onEdit,
  onDelete,
  onLike,
  isLoggedIn,
  currentUserId,
  currentRole,
}) => {
  const navigate = useNavigate();

  const { toggleFavorite, isFavorite, favoritesCount } = useFavorites();

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

  const handleViewCard = (card) => {
    navigate(`/cards/${card._id}`);
  };

  // ── Рендер контента ────────────────────────────────────────
  const renderContent = () => {
    // Первичная загрузка — скелетоны
    if (isAuthLoading || isLoading) {
      return <SkeletonList count={12} />;
    }

    if (error) {
      return (
        <Typography color="error" textAlign="center" sx={{ py: 10 }}>
          {error}
        </Typography>
      );
    }

    return (
      <>
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

        {/*
          Кнопка "Загрузить ещё" показывается только:
          - когда не активен поиск (ищем по уже загруженным)
          - когда не активен фильтр избранного
        */}
        {!searchQuery.trim() && !showFavoritesOnly && (
          <LoadMore
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={onLoadMore}
            loadedCount={cards.length}
            total={total}
          />
        )}
      </>
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
