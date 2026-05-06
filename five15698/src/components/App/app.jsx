import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Navigate, Route, Routes } from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";
import useCards from "../../hooks/useCards.js";
import useSnackbar from "../../hooks/useSnackbar.js";

import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import AuthDialog from "../AuthDialog/auth-dialog.jsx";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx";
import Footer from "../Footer/footer.jsx";
import Header from "../Header/header.jsx";
import ProtectedRoute from "../ProtectedRoute/protected-route.jsx";
import Snackbar from "../Snackbar/snackbar.jsx";

import CardDetailPage from "../../pages/CardDetailPage/card-detail-page.jsx";
import CardsPage from "../../pages/CardsPage/cards-page.jsx";
import NotFoundPage from "../../pages/NotFoundPage/not-found-page.jsx";
import ProfilePage from "../../pages/ProfilePage/profile-page.jsx";

import { useState } from "react";
import "../../index.css";

/**
 * Корневой компонент приложения.
 * Содержит роутинг, глобальные диалоги и хуки верхнего уровня.
 * Страницы получают данные через пропсы — не дублируют логику.
 */
function App() {
  // ─── Уведомления ─────────────────────────────────────────────
  const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

  // ─── Авторизация ─────────────────────────────────────────────
  const {
    currentUser,
    isAuthLoading,
    isLoggedIn,
    handleRegister,
    handleLogin,
    handleLogout,
  } = useAuth({ onSuccess: showSuccess, onError: showError });

  // ─── Карточки ────────────────────────────────────────────────
  const {
    cards,
    isLoading,
    error,
    handleAdd,
    handleEdit,
    handleDelete,
    handleLike,
  } = useCards({ onSuccess: showSuccess, onError: showError });

  // ─── Диалоги ─────────────────────────────────────────────────

  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    cardId: null,
    cardName: "",
  });

  // ─── Обработчики ─────────────────────────────────────────────

  const handleOpenCreate = () => {
    if (!isLoggedIn) { setIsAuthDialogOpen(true); return; }
    setEditingCard(null);
    setIsCardDialogOpen(true);
  };

  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setIsCardDialogOpen(true);
  };

  const handleCloseCardDialog = () => {
    setIsCardDialogOpen(false);
    setEditingCard(null);
  };

  const handleSubmit = (formData) => {
    const action = editingCard
      ? handleEdit(editingCard._id, formData)
      : handleAdd(formData);
    action.then(() => handleCloseCardDialog()).catch(() => {});
  };

  const handleOpenConfirm = (card) => {
    setConfirmDialog({ open: true, cardId: card._id, cardName: card.name });
  };

  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, cardId: null, cardName: "" });
  };

  const handleConfirmDelete = () => {
    handleDelete(confirmDialog.cardId)
      .then(() => handleCloseConfirm())
      .catch(() => {});
  };

  const handleLikeClick = (cardId) => {
    if (!isLoggedIn) { setIsAuthDialogOpen(true); return; }
    handleLike(cardId);
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
      <Header
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onAuthOpen={() => setIsAuthDialogOpen(true)}
        onLogout={handleLogout}
      />

      <Container sx={{ flexGrow: 1, py: "20px" }}>
        <Routes>

          {/* / → редирект на /cards */}
          <Route path="/" element={<Navigate to="/cards" replace />} />

          {/* /cards — список карточек */}
          <Route
            path="/cards"
            element={
              <CardsPage
                cards={cards}
                isLoading={isLoading}
                isAuthLoading={isAuthLoading}
                error={error}
                onAdd={handleOpenCreate}
                onEdit={handleOpenEdit}
                onDelete={handleOpenConfirm}
                onLike={handleLikeClick}
                isLoggedIn={isLoggedIn}
                currentUserId={currentUser?._id}
                currentRole={currentUser?.role}
              />
            }
          />

          {/* /cards/:id — детальная страница */}
          <Route
            path="/cards/:id"
            element={
              <CardDetailPage
                onLike={handleLikeClick}
                onEdit={handleOpenEdit}
                onDelete={handleOpenConfirm}
                isLoggedIn={isLoggedIn}
                currentUserId={currentUser?._id}
                currentRole={currentUser?.role}
              />
            }
          />

          {/* /profile — защищённый маршрут */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthLoading={isAuthLoading}
              >
                <ProfilePage
                  currentUser={currentUser}
                  cards={cards}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenConfirm}
                  onLike={handleLikeClick}
                />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Container>

      <Footer />

      {/* ─── Глобальные диалоги ───────────────────────────────── */}

      <AuthDialog
        open={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

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

      <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        cardName={confirmDialog.cardName}
      />

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
