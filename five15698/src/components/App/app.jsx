import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useState } from "react";
import "../../index.css";

import useCards from "../../hooks/useCards.js";
import useSnackbar from "../../hooks/useSnackbar.js";
import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import CardList from "../CardList/card-list";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import SkeletonList from "../SkeletonCard/skeleton-list";
import Snackbar from "../Snackbar/snackbar.jsx";

function App() {
  const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

  const { cards, isLoading, error, handleAdd, handleEdit, handleDelete } =
    useCards({
      onSuccess: showSuccess,
      onError: showError,
    });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    cardId: null,
    cardName: "",
  });

  // Открытие диалога создания
  const handleOpenCreate = () => {
    setEditingCard(null);
    setIsDialogOpen(true);
  };

  // Открытие диалога редактирования
  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setIsDialogOpen(true);
  };

  // Закрытие диалога создания/редактирования
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCard(null);
  };

  // Сабмит формы — создание или редактирование
  const handleSubmit = (formData) => {
    const action = editingCard
      ? handleEdit(editingCard._id, formData)
      : handleAdd(formData);

    action
      .then(() => handleCloseDialog())
      .catch(() => {});
  };

  // Открытие диалога подтверждения удаления
  const handleOpenConfirm = (card) => {
    setConfirmDialog({
      open: true,
      cardId: card._id,
      cardName: card.name,
    });
  };

  // Закрытие диалога подтверждения
  const handleCloseConfirm = () => {
    setConfirmDialog({ open: false, cardId: null, cardName: "" });
  };

  // Подтверждение удаления
  const handleConfirmDelete = () => {
    handleDelete(confirmDialog.cardId)
      .then(() => handleCloseConfirm())
      .catch(() => {});
  };

  const renderContent = () => {
    if (isLoading) return <SkeletonList count={8} />;
    if (error) return (
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    );
    return (
      <CardList
        cardsAll={cards}
        onDelete={handleOpenConfirm}
        onEdit={handleOpenEdit}
        onAdd={handleOpenCreate} // ✅ Для Empty State
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Container sx={{ flexGrow: 1, py: "20px" }}>
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

        {renderContent()}
      </Container>

      <Footer />

      {/* Диалог создания / редактирования */}
      <AddCardDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
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
