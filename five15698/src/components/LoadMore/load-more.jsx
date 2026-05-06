import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

/**
 * Компонент кнопки загрузки следующей страницы.
 * Показывает прогресс загрузки и счётчик карточек.
 *
 * @param {object}   props
 * @param {boolean}  props.hasMore       - есть ли ещё карточки
 * @param {boolean}  props.isLoadingMore - идёт ли загрузка следующей страницы
 * @param {function} props.onLoadMore    - загрузить следующую страницу
 * @param {number}   props.loadedCount   - сколько карточек уже загружено
 * @param {number}   props.total         - всего карточек в БД
 */
const LoadMore = ({
  hasMore,
  isLoadingMore,
  onLoadMore,
  loadedCount,
  total,
}) => {
  // Если больше нет карточек — показываем финальное сообщение
  if (!hasMore) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: "var(--text-secondary)" }}
        >
          Показано {loadedCount} из {total} карточек
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        py: 4,
      }}
    >
      {/* Счётчик загруженных карточек */}
      <Typography
        variant="body2"
        sx={{ color: "var(--text-secondary)" }}
      >
        Загружено {loadedCount} из {total} карточек
      </Typography>

      {/* Кнопка загрузки */}
      <Button
        variant="outlined"
        onClick={onLoadMore}
        disabled={isLoadingMore}
        startIcon={
          isLoadingMore
            ? <CircularProgress size={16} color="inherit" />
            : <ExpandMoreIcon />
        }
        sx={{
          borderColor: "var(--accent-main)",
          color: "var(--accent-main)",
          minWidth: 200,
          "&:hover": {
            borderColor: "var(--accent-light)",
            bgcolor: "rgba(108,99,255,0.08)",
          },
          "&:disabled": {
            borderColor: "var(--border-color)",
            color: "var(--text-secondary)",
          },
        }}
      >
        {isLoadingMore ? "Загружаем..." : "Загрузить ещё"}
      </Button>
    </Box>
  );
};

export default LoadMore;
