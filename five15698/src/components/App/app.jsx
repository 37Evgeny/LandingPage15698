import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useState } from "react";
import "../../index.css";

import useCards from "../../hooks/useCards.js";
import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import CardList from "../CardList/card-list";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import SkeletonList from "../SkeletonCard/skeleton-list"; // ← импорт

function App() {
  const { cards, isLoading, error, handleAdd, handleEdit, handleDelete } = useCards();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    cardId: null,
    cardName: "",
  });

  const handleOpenCreate = () => {
    setEditingCard(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCard(null);
  };

  const handleSubmit = (formData) => {
    const action = editingCard
      ? handleEdit(editingCard._id, formData)
      : handleAdd(formData);

    action
      .then(() => handleCloseDialog())
      .catch(() => {});
  };

  const handleOpenConfirm = (card) => {
    setConfirmDialog({
      open: true,
      cardId: card._id,
      cardName: card.name,
    });
  };

  const handleCloseConfirm = () => {
    setConfirmDialog({
      open: false,
      cardId: null,
      cardName: "",
    });
  };

  const handleConfirmDelete = () => {
    handleDelete(confirmDialog.cardId)
      .then(() => handleCloseConfirm())
      .catch(() => {});
  };

  const renderContent = () => {
    // ✅ Skeleton вместо Spinner
    if (isLoading) return <SkeletonList count={8} />;
    if (error) return (
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    );
    return (
      <CardList
        cardsAll={cards}
        onDelete={handleOpenConfirm}
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
