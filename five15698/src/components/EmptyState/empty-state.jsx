import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// ✅ Два режима: нет карточек / ничего не найдено
function EmptyState({ onAdd, isSearching = false }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        py: 10,
      }}
    >
      <Box
        sx={{
          fontSize: "5rem",
          lineHeight: 1,
          filter: "grayscale(1)",
          opacity: 0.5,
        }}
      >
        {isSearching ? "🔍" : "🖼️"}
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          fontWeight={600}
          sx={{ color: "var(--text-primary)", mb: 1 }}
        >
          {isSearching ? "Ничего не найдено" : "Карточек пока нет"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "var(--text-secondary)" }}
        >
          {isSearching
            ? "Попробуйте изменить поисковый запрос"
            : "Добавьте первую карточку — нажмите кнопку ниже"}
        </Typography>
      </Box>

      {/* ✅ Кнопку показываем только если нет карточек */}
      {!isSearching && (
        <Button
          variant="contained"
          size="large"
          onClick={onAdd}
          sx={{
            bgcolor: "var(--accent-main)",
            "&:hover": { bgcolor: "var(--accent-light)" },
            fontWeight: 600,
            letterSpacing: "0.05rem",
          }}
        >
          + Добавить первую карточку
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
