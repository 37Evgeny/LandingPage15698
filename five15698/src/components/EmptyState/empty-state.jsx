import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import StyleIcon from "@mui/icons-material/Style";
import { Box, Button, Typography } from "@mui/material";

/**
 * Компонент заглушки для пустых состояний.
 * Три варианта:
 * 1. Нет карточек вообще        — предлагает добавить
 * 2. Ничего не найдено по поиску — предлагает сбросить поиск
 * 3. Пустое избранное            — предлагает добавить в избранное
 *
 * @param {object}   props
 * @param {function} props.onAdd            - открыть диалог добавления карточки
 * @param {boolean}  props.isSearching      - активен ли поиск
 * @param {boolean}  props.isFavoritesMode  - активен ли фильтр избранного
 * @param {function} props.onClearFavorites - сбросить фильтр избранного
 */
const EmptyState = ({
  onAdd,
  isSearching,
  isFavoritesMode,
  onClearFavorites,
}) => {
  // ── Пустое избранное ────────────────────────────────────────
  if (isFavoritesMode) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 10,
          gap: 2,
          color: "var(--text-secondary)",
        }}
      >
        <FavoriteBorderIcon sx={{ fontSize: 64, color: "#e91e63", opacity: 0.5 }} />

        <Typography variant="h6" fontWeight={600}>
          Нет избранных карточек
        </Typography>

        <Typography variant="body2" sx={{ textAlign: "center", maxWidth: 300 }}>
          Нажми на сердечко на любой карточке чтобы добавить в избранное
        </Typography>

        <Button
          variant="outlined"
          onClick={onClearFavorites}
          sx={{
            borderColor: "#e91e63",
            color: "#e91e63",
            "&:hover": {
              borderColor: "#c2185b",
              bgcolor: "rgba(233,30,99,0.08)",
            },
          }}
        >
          Показать все карточки
        </Button>
      </Box>
    );
  }

  // ── Пустой поиск ────────────────────────────────────────────
  if (isSearching) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 10,
          gap: 2,
          color: "var(--text-secondary)",
        }}
      >
        <SearchOffIcon sx={{ fontSize: 64, opacity: 0.5 }} />

        <Typography variant="h6" fontWeight={600}>
          Ничего не найдено
        </Typography>

        <Typography variant="body2">
          Попробуй другой запрос
        </Typography>
      </Box>
    );
  }

  // ── Нет карточек вообще ─────────────────────────────────────
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
        color: "var(--text-secondary)",
      }}
    >
      <StyleIcon sx={{ fontSize: 64, opacity: 0.5 }} />

      <Typography variant="h6" fontWeight={600}>
        Карточек пока нет
      </Typography>

      <Typography variant="body2">
        Добавь первую карточку!
      </Typography>

      <Button
        variant="contained"
        onClick={onAdd}
        sx={{
          bgcolor: "var(--accent-main)",
          "&:hover": { bgcolor: "var(--accent-light)" },
        }}
      >
        + Добавить карточку
      </Button>
    </Box>
  );
};

export default EmptyState;
