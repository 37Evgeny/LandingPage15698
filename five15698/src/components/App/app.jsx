import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useState } from "react";
import "../../index.css";

import useCards from "../../hooks/useCards.js";
import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import CardList from "../CardList/card-list";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx"; // ← импорт
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Spinner from "../Spinner/spinner";

function App() {
  const { cards, isLoading, error, handleAdd, handleEdit, handleDelete } = useCards();

  // Состояние диалога добавления/редактирования
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // ✅ Состояние диалога подтверждения удаления
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

  // Сабмит формы
  const handleSubmit = (formData) => {
    const action = editingCard
      ? handleEdit(editingCard._id, formData)
      : handleAdd(formData);

    action
      .then(() => handleCloseDialog())
      .catch(() => {});
  };

  // ✅ Открытие диалога подтверждения удаления
  const handleOpenConfirm = (card) => {
    setConfirmDialog({
      open: true,
      cardId: card._id,
      cardName: card.name,
    });
  };

  // ✅ Закрытие диалога подтверждения
  const handleCloseConfirm = () => {
    setConfirmDialog({
      open: false,
      cardId: null,
      cardName: "",
    });
  };

  // ✅ Подтверждение удаления
  const handleConfirmDelete = () => {
    handleDelete(confirmDialog.cardId)
      .then(() => handleCloseConfirm())
      .catch(() => {});
  };

  const renderContent = () => {
    if (isLoading) return <Spinner />;
    if (error) return (
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    );
    return (
      <CardList
        cardsAll={cards}
        onDelete={handleOpenConfirm} // ✅ Теперь открывает диалог
        onEdit={handleOpenEdit}
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

      {/* ✅ Диалог подтверждения удаления */}
      <ConfirmDialog
        open={confirmDialog.open}
        onClose={handleCloseConfirm}
        onConfirm={handleConfirmDelete}
        cardName={confirmDialog.cardName}
      />
    </Box>
  );
}

export default App;
