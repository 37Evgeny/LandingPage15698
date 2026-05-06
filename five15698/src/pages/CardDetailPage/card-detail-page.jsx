import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    IconButton,
    Skeleton,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cardsApi } from "../../api/cards-api.js";
import useFavorites from "../../hooks/useFavorites.js";

/**
 * Детальная страница карточки — маршрут /cards/:id.
 * Загружает карточку по ID из URL параметра.
 * Показывает полную информацию — изображение, описание, автор, лайки.
 *
 * @param {object}   props
 * @param {function} props.onLike         - переключить лайк
 * @param {function} props.onEdit         - открыть диалог редактирования
 * @param {function} props.onDelete       - открыть диалог удаления
 * @param {boolean}  props.isLoggedIn     - авторизован ли пользователь
 * @param {string}   props.currentUserId  - ID текущего пользователя
 * @param {string}   props.currentRole    - роль текущего пользователя
 */
const CardDetailPage = ({
  onLike,
  onEdit,
  onDelete,
  isLoggedIn,
  currentUserId,
  currentRole,
}) => {
  /** ID карточки из URL параметра /cards/:id */
  const { id } = useParams();

  /** Навигация — для кнопки "Назад" */
  const navigate = useNavigate();

  /** Данные карточки */
  const [card, setCard] = useState(null);

  /** Флаг загрузки */
  const [isLoading, setIsLoading] = useState(true);

  /** Текст ошибки */
  const [error, setError] = useState(null);

  /** Хук избранного */
  const { toggleFavorite, isFavorite } = useFavorites();

  // Загружаем карточку по ID при монтировании
  useEffect(() => {
    setIsLoading(true);

    cardsApi
      .getById(id)
      .then((data) => setCard(data))
      .catch(() => setError("Карточка не найдена"))
      .finally(() => setIsLoading(false));
  }, [id]);

  /**
   * Форматирует дату в читаемый вид.
   * @param {string} dateStr - ISO строка
   * @returns {string} - "15 января 2025"
   */
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /** Может ли текущий пользователь редактировать/удалять */
  const canEdit =
    isLoggedIn &&
    card &&
    (currentRole === "admin" ||
      card.owner?._id?.toString() === currentUserId);

  /** Лайкнул ли текущий пользователь */
  const isLikedByMe =
    currentUserId && card
      ? card.likes?.some((id) => id.toString() === currentUserId)
      : false;

  // ── Скелетон загрузки ──────────────────────────────────────
  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Skeleton variant="rectangular" height={440} sx={{ borderRadius: 3, mb: 3 }} />
        <Skeleton variant="text" height={48} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} />
        <Skeleton variant="text" height={24} width="80%" />
      </Container>
    );
  }

  // ── Ошибка ────────────────────────────────────────────────
  if (error || !card) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Карточка не найдена"}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/cards")}
          sx={{ color: "var(--accent-main)" }}
        >
          Вернуться к галерее
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      {/* Кнопка назад */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          color: "var(--text-secondary)",
          mb: 3,
          "&:hover": { color: "var(--accent-light)" },
        }}
      >
        Назад
      </Button>

      {/* Изображение */}
      <Box
        sx={{
          width: "100%",
          borderRadius: 3,
          overflow: "hidden",
          mb: 3,
          bgcolor: "var(--bg-paper)",
          border: "1px solid var(--border-color)",
        }}
      >
        <Box
          component="img"
          src={card.pictures}
          alt={card.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
          }}
          sx={{
            width: "100%",
            maxHeight: 480,
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Основная информация */}
      <Box
        sx={{
          bgcolor: "var(--bg-paper)",
          borderRadius: 3,
          border: "1px solid var(--border-color)",
          p: 3,
        }}
      >
        {/* Заголовок и кнопки действий */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
            gap: 2,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {card.name}
          </Typography>

          {/* Кнопки редактирования и удаления */}
          {canEdit && (
            <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
              <Tooltip title="Редактировать">
                <IconButton
                  onClick={() => onEdit(card)}
                  sx={{ color: "var(--text-secondary)" }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton
                  onClick={() => onDelete(card)}
                  sx={{ color: "#f44336" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* Описание */}
        {card.description && (
          <Typography
            variant="body1"
            sx={{
              color: "var(--text-secondary)",
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {card.description}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            pt: 2,
            borderTop: "1px solid var(--border-color)",
          }}
        >
          {/* Автор и дата */}
          {card.owner && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                sx={{
                  bgcolor: "var(--accent-main)",
                  width: 40,
                  height: 40,
                  fontSize: 16,
                }}
              >
                {card.owner.name?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {card.owner.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  {formatDate(card.createdAt)}
                </Typography>
              </Box>
            </Box>
          )}

          {/* Лайк и избранное */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            {/* Кнопка лайка */}
            <Tooltip title={isLikedByMe ? "Убрать лайк" : "Лайк"}>
              <span>
                <IconButton
                  onClick={() => isLoggedIn && onLike(card._id)}
                  disabled={!isLoggedIn}
                  sx={{
                    color: isLikedByMe
                      ? "var(--accent-main)"
                      : "var(--text-secondary)",
                    transition: "transform 0.15s",
                    "&:hover": { transform: "scale(1.15)" },
                  }}
                >
                  {isLikedByMe
                    ? <ThumbUpIcon />
                    : <ThumbUpOutlinedIcon />
                  }
                </IconButton>
              </span>
            </Tooltip>

            {/* Счётчик лайков */}
            <Chip
              label={card.likes?.length ?? 0}
              size="small"
              variant="outlined"
              sx={{
                color: "var(--text-secondary)",
                borderColor: "var(--border-color)",
              }}
            />

            {/* Кнопка избранного */}
            <Tooltip
              title={
                isFavorite(card._id)
                  ? "Убрать из избранного"
                  : "В избранное"
              }
            >
              <IconButton
                onClick={() => toggleFavorite(card._id)}
                sx={{
                  color: isFavorite(card._id)
                    ? "#e91e63"
                    : "var(--text-secondary)",
                  transition: "transform 0.15s",
                  "&:hover": { transform: "scale(1.15)" },
                }}
              >
                {isFavorite(card._id)
                  ? <FavoriteIcon />
                  : <FavoriteBorderIcon />
                }
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CardDetailPage;
