import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Badge, Button, Tooltip } from "@mui/material";

/**
 * Кнопка переключения фильтра избранного.
 * Показывает счётчик избранных карточек через Badge.
 * Активное состояние подсвечивается акцентным цветом.
 *
 * @param {object}   props
 * @param {boolean}  props.active         - активен ли фильтр
 * @param {function} props.onToggle       - переключить фильтр
 * @param {number}   props.favoritesCount - количество избранных карточек
 */
const FavoritesFilter = ({ active, onToggle, favoritesCount }) => {
  return (
    <Tooltip
      title={
        active
          ? "Показать все карточки"
          : `Показать избранное (${favoritesCount})`
      }
    >
      {/* Badge показывает количество избранных карточек */}
      <Badge
        badgeContent={favoritesCount}
        color="error"
        // Скрываем бейдж если фильтр активен — и так понятно
        invisible={active || favoritesCount === 0}
      >
        <Button
          variant={active ? "contained" : "outlined"}
          size="small"
          onClick={onToggle}
          startIcon={
            active
              ? <FavoriteIcon fontSize="small" />
              : <FavoriteBorderIcon fontSize="small" />
          }
          sx={{
            // Активный — акцентный цвет
            ...(active && {
              bgcolor: "#e91e63",
              borderColor: "#e91e63",
              "&:hover": { bgcolor: "#c2185b" },
            }),
            // Неактивный — граница цвета сердечка
            ...(!active && {
              borderColor: favoritesCount > 0
                ? "#e91e63"
                : "var(--border-color)",
              color: favoritesCount > 0
                ? "#e91e63"
                : "var(--text-secondary)",
              "&:hover": {
                borderColor: "#e91e63",
                color: "#e91e63",
                bgcolor: "rgba(233,30,99,0.08)",
              },
            }),
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}
        >
          {active ? "Избранное" : "Избранное"}
        </Button>
      </Badge>
    </Tooltip>
  );
};

export default FavoritesFilter;
