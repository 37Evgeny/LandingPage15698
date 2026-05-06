import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * Страница 404 — маршрут не найден.
 * Показывается при переходе на несуществующий URL.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 2,
        color: "var(--text-secondary)",
      }}
    >
      {/* Большая цифра 404 */}
      <Typography
        variant="h1"
        fontWeight={900}
        sx={{
          fontSize: { xs: "6rem", sm: "10rem" },
          color: "var(--accent-main)",
          opacity: 0.3,
          lineHeight: 1,
        }}
      >
        404
      </Typography>

      <Typography variant="h5" fontWeight={600} color="var(--text-primary)">
        Страница не найдена
      </Typography>

      <Typography variant="body2" textAlign="center">
        Такой страницы не существует или она была удалена
      </Typography>

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/cards")}
        sx={{
          mt: 2,
          bgcolor: "var(--accent-main)",
          "&:hover": { bgcolor: "var(--accent-light)" },
        }}
      >
        На главную
      </Button>
    </Box>
  );
};

export default NotFoundPage;
