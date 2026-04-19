import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import { useState } from "react";
import "../../index.css";

import useCards from "../../hooks/useCards.js";
import useSearch from "../../hooks/useSearch.js"; // ✅ новый хук
import useSnackbar from "../../hooks/useSnackbar.js";
import AddCardDialog from "../AddCardDialog/add-card-dialog.jsx";
import CardList from "../CardList/card-list";
import ConfirmDialog from "../ConfirmDialog/confirm-dialog.jsx";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import SearchBar from "../SearchBar/search-bar.jsx"; // ✅ новый компонент
import SkeletonList from "../SkeletonCard/skeleton-list";
import Snackbar from "../Snackbar/snackbar.jsx";
import SortBar from "../SortBar/sort-bar.jsx"; // ✅ новый компонент

function App() {
  const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

  const { cards, isLoading, error, handleAdd, handleEdit, handleDelete } =
    useCards({
      onSuccess: showSuccess,
      onError: showError,
    });

  // ✅ Подключаем хук поиска и сортировки
  const {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredCards,
    totalCount,
    filteredCount,
  } = useSearch(cards);

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
    setConfirmDialog({ open: false, cardId: null, cardName: "" });
  };

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
        // ✅ Передаём отфильтрованные карточки
        cardsAll={filteredCards}
        onDelete={handleOpenConfirm}
        onEdit={handleOpenEdit}
        onAdd={handleOpenCreate}
        // ✅ Передаём флаг поиска для Empty State
        isSearching={!!searchQuery.trim()}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Container sx={{ flexGrow: 1, py: "20px" }}>
        {/* Кнопка добавления */}
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

        {/* ✅ Поиск и сортировка — показываем только если есть карточки */}
        {!isLoading && !error && cards.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 4,
              alignItems: { xs: "stretch", sm: "center" },
            }}
          >
            {/* Поиск занимает всё доступное место */}
            <Box sx={{ flexGrow: 1 }}>
              <SearchBar
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </Box>

            {/* Сортировка справа */}
            <SortBar sortBy={sortBy} onSort={setSortBy} />
          </Box>
        )}

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
