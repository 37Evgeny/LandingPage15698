import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "../../index.css";

import useAuth from "../../hooks/useAuth.js";
import useCards from "../../hooks/useCards.js";
import useFavorites from "../../hooks/useFavorites.js";
import useSearch from "../../hooks/useSearch.js";
import useSnackbar from "../../hooks/useSnackbar.js";

import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import AuthDialog from "../AuthDialog/auth-dialog.jsx";
import CardList from "../CardList/card-list.jsx";
import CardViewDialog from "../CardViewDialog/card-view-dialog.jsx";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx";
import FavoritesFilter from "../FavoritesFilter/favorites-filter.jsx";
import Footer from "../Footer/footer.jsx";
import Header from "../Header/header.jsx";
import SearchBar from "../SearchBar/search-bar.jsx";
import SkeletonList from "../SkeletonCard/skeleton-list.jsx";
import Snackbar from "../Snackbar/snackbar.jsx";
import SortBar from "../SortBar/sort-bar.jsx";

/**
 * Корневой компонент приложения.
 *
 * Отвечает за:
 * - Инициализацию всех хуков
 * - Состояние всех диалогов
 * - Передачу данных и обработчиков вниз по дереву
 * - Рендер основного layout
 */
function App() {
  // ─── Уведомления ─────────────────────────────────────────────
  /**
   * Хук управления Snackbar уведомлениями.
   * showSuccess / showError используются во всех хуках ниже.
   */
  const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

  // ─── Авторизация ─────────────────────────────────────────────
  /**
   * Хук авторизации.
   * currentUser  — объект { _id, name, email, role } или null
   * isAuthLoading — true пока проверяем токен при старте
   * isLoggedIn   — true если пользователь авторизован
   */
  const {
    currentUser,
    isAuthLoading,
    isLoggedIn,
    handleRegister,
    handleLogin,
    handleLogout,
  } = useAuth({ onSuccess: showSuccess, onError: showError });

  // ─── Карточки ────────────────────────────────────────────────
  /**
   * Хук управления карточками.
   * Загружает карточки при монтировании.
   * Предоставляет CRUD методы и toggleLike.
   */
  const {
    cards,
    isLoading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    handleLike,
  } = useCards({ onSuccess: showSuccess, onError: showError });

  // ─── Избранное ───────────────────────────────────────────────
  /**
   * Хук избранного.
   * Хранит список ID в localStorage.
   * isFavorite(id) — проверить находится ли карточка в избранном.
   */
  const {
    toggleFavorite,
    isFavorite,
    favoritesCount,
  } = useFavorites();

  // ─── Поиск и сортировка ──────────────────────────────────────
  /**
   * Хук поиска, сортировки и фильтрации.
   * Принимает isFavorite для фильтра избранного.
   * Возвращает отфильтрованный и отсортированный массив filteredCards.
   */
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

  // ─── Состояние диалогов ──────────────────────────────────────

  /**
   * Диалог авторизации — вход и регистрация.
   * Открывается при клике на "Войти" в Header
   * или при попытке неавторизованного пользователя
   * добавить карточку / поставить лайк.
   */
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  /**
   * Диалог добавления/редактирования карточки.
   * Если editingCard !== null — режим редактирования.
   * Если editingCard === null — режим создания.
   */
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);

  /**
   * Карточка которую редактируем.
   * null при создании новой карточки.
   */
  const [editingCard, setEditingCard] = useState(null);

  /**
   * Состояние диалога подтверждения удаления.
   * open     — открыт ли диалог
   * cardId   — ID карточки которую удаляем
   * cardName — название карточки для отображения в диалоге
   */
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    cardId: null,
    cardName: "",
  });

  /**
   * Карточка открытая в модальном окне просмотра.
   * null если окно закрыто.
   */
  const [viewingCard, setViewingCard] = useState(null);

  // ─── Обработчики диалога карточки ────────────────────────────

  /**
   * Открывает диалог создания карточки.
   * Если пользователь не авторизован — открывает диалог входа.
   */
  const handleOpenCreate = () => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
      return;
    }
    setEditingCard(null);
    setIsCardDialogOpen(true);
  };

  /**
   * Открывает диалог редактирования карточки.
   * @param {object} card - карточка для редактирования
   */
  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setIsCardDialogOpen(true);
  };

  /**
   * Закрывает диалог карточки и сбрасывает editingCard.
   */
  const handleCloseCardDialog = () => {
    setIsCardDialogOpen(false);
    setEditingCard(null);
  };

  /**
   * Обработчик отправки формы карточки.
   * Определяет режим — создание или редактирование — по наличию editingCard.
   * После успешного сохранения закрывает диалог.
   *
   * @param {object} formData - данные из формы { name, pictures, description }
   */
  const handleSubmit = (formData) => {
    const action = editingCard
      ? handleEdit(editingCard._id, formData)
      : handleAdd(formData);

    action
      .then(() => handleCloseCardDialog())
      .catch(() => {
        // Ошибка уже показана через Snackbar в useCards
      });
  };

  // ─── Обработчики удаления ─────────────────────────────────────

  /**
   * Открывает диалог подтверждения удаления.
   * @param {object} card - карточка для удаления
   */
  const handleOpenConfirm = (card) => {
    setConfirmDialog({
      open: true,
      cardId: card._id,
      cardName: card.name,
    });
  };

  /**
   * Закрывает диалог подтверждения без удаления.
   */
  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, cardId: null, cardName: "" });
  };

  /**
   * Выполняет удаление карточки после подтверждения.
   * Закрывает диалог только при успехе.
   */
  const handleConfirmDelete = () => {
    handleDelete(confirmDialog.cardId)
      .then(() => handleCloseConfirm())
      .catch(() => {});
  };

  // ─── Обработчик лайка ────────────────────────────────────────

  /**
   * Переключает лайк на карточке.
   * Если пользователь не авторизован — открывает диалог входа.
   *
   * @param {string} cardId - ID карточки
   */
  const handleLikeClick = (cardId) => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
      return;
    }
    handleLike(cardId);
  };

  // ─── Обработчик просмотра ────────────────────────────────────

  /**
   * Открывает модальное окно просмотра карточки.
   * При лайке в окне просмотра — обновляем viewingCard
   * чтобы счётчик лайков обновился без закрытия окна.
   *
   * @param {object} card - карточка для просмотра
   */
  const handleViewCard = (card) => {
    setViewingCard(card);
  };

  /**
   * Лайк из модального окна просмотра.
   * После успешного лайка обновляем viewingCard актуальными данными.
   *
   * @param {string} cardId - ID карточки
   */
  const handleLikeFromView = (cardId) => {
    if (!isLoggedIn) {
      setIsAuthDialogOpen(true);
      return;
    }
    handleLike(cardId).then(() => {
      // Находим обновлённую карточку в массиве cards
      // и обновляем viewingCard чтобы лайк отобразился в модалке
      const updated = cards.find((c) => c._id === cardId);
      if (updated) setViewingCard(updated);
    }).catch(() => {});
  };

  // ─── Рендер основного контента ───────────────────────────────

  /**
   * Возвращает основной контент страницы.
   * Порядок проверок важен:
   * 1. Загрузка — показываем скелетоны
   * 2. Ошибка   — показываем сообщение
   * 3. Данные   — показываем список карточек
   */
  const renderContent = () => {
    // Ждём проверки токена И загрузки карточек
    if (isAuthLoading || isLoading) {
      return <SkeletonList count={8} />;
    }

    // Ошибка загрузки карточек
    if (error) {
      return (
        <Typography
          color="error"
          textAlign="center"
          sx={{ py: 10 }}
        >
          {error}
        </Typography>
      );
    }

    return (
      <CardList
        cardsAll={filteredCards}
        onDelete={handleOpenConfirm}
        onEdit={handleOpenEdit}
        onView={handleViewCard}
        onLike={handleLikeClick}
        onToggleFav={toggleFavorite}
        isFavorite={isFavorite}
        onAdd={handleOpenCreate}
        isSearching={!!searchQuery.trim()}
        isFavoritesMode={showFavoritesOnly}
        onClearFavorites={() => setShowFavoritesOnly(false)}
        isLoggedIn={isLoggedIn}
        currentUserId={currentUser?._id}
        currentRole={currentUser?.role}
      />
    );
  };

  // ─── JSX ─────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "var(--bg-main)",
        color: "var(--text-primary)",
      }}
    >
      {/* Шапка сайта */}
      <Header
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        favoritesCount={favoritesCount}
        onAuthOpen={() => setIsAuthDialogOpen(true)}
        onLogout={handleLogout}
      />

      <Container sx={{ flexGrow: 1, py: "20px" }}>

        {/* Кнопка добавления карточки */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleOpenCreate}
            sx={{
              bgcolor: "var(--accent-main)",
              "&:hover": { bgcolor: "var(--accent-light)" },
              fontWeight: 600,
              letterSpacing: "0.05rem",
            }}
          >
            + Добавить карточку
          </Button>
        </Box>

        {/*
          Панель поиска, фильтра избранного и сортировки.
          Показываем только если карточки загружены и они есть.
        */}
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
            {/* Поле поиска — занимает всё свободное место */}
            <Box sx={{ flexGrow: 1 }}>
              <SearchBar
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </Box>

            {/* Фильтр избранного */}
            <FavoritesFilter
              active={showFavoritesOnly}
              onToggle={() => setShowFavoritesOnly((prev) => !prev)}
              favoritesCount={favoritesCount}
            />

            {/* Сортировка */}
            <SortBar sortBy={sortBy} onSort={setSortBy} />
          </Box>
        )}

        {/* Основной контент — скелетоны / ошибка / список */}
        {renderContent()}
      </Container>

      <Footer />

      {/* ─── Диалоги ──────────────────────────────────────────── */}

      {/* Диалог авторизации */}
      <AuthDialog
        open={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      {/* Диалог создания / редактирования карточки */}
      <AddCardDialog
        open={isCardDialogOpen}
        onClose={handleCloseCardDialog}
        onAdd={handleSubmit}
        initialData={
          editingCard
            ? {
                name: editingCard.name,
                pictures: editingCard.pictures,
                description: editingCard.description,
              }
            : null
        }
      />

      {/* Диалог подтверждения удаления */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        cardName={confirmDialog.cardName}
      />

      {/* Модальное окно просмотра карточки */}
      <CardViewDialog
        card={viewingCard}
        open={Boolean(viewingCard)}
        onClose={() => setViewingCard(null)}
        isFavorite={viewingCard ? isFavorite(viewingCard._id) : false}
        onToggleFav={toggleFavorite}
        onLike={handleLikeFromView}
        currentUserId={currentUser?._id}
        isLoggedIn={isLoggedIn}
      />

      {/* Snackbar уведомления */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={hideSnackbar}
      />
    </Box>
  );
}

export default App;
