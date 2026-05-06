import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import ShieldIcon from "@mui/icons-material/Shield";
import StyleIcon from "@mui/icons-material/Style";
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardItem from "../../components/Card/card.jsx";
import useFavorites from "../../hooks/useFavorites.js";

/**
 * Страница профиля пользователя — маршрут /profile.
 * Показывает информацию о пользователе и его карточки.
 *
 * @param {object}   props
 * @param {object}   props.currentUser   - данные текущего пользователя
 * @param {Array}    props.cards         - все карточки (фильтруем по owner)
 * @param {function} props.onEdit        - редактировать карточку
 * @param {function} props.onDelete      - удалить карточку
 * @param {function} props.onLike        - лайкнуть карточку
 */
const ProfilePage = ({
  currentUser,
  cards,
  onEdit,
  onDelete,
  onLike,
}) => {
  const navigate = useNavigate();

  /** Хук избранного */
  const { toggleFavorite, isFavorite } = useFavorites();

  /**
   * Карточки принадлежащие текущему пользователю.
   * Фильтруем по owner._id === currentUser._id.
   */
  const myCards = cards.filter(
    (card) => card.owner?._id?.toString() === currentUser?._id?.toString()
  );

  /**
   * Форматирует дату регистрации.
   * @param {string} dateStr
   * @returns {string}
   */
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      {/* ─── Карточка профиля ──────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "var(--bg-paper)",
          border: "1px solid var(--border-color)",
          borderRadius: 3,
          p: 4,
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 3,
        }}
      >
        {/* Аватар */}
        <Avatar
          sx={{
            width: 88,
            height: 88,
            bgcolor: "var(--accent-main)",
            fontSize: 36,
            flexShrink: 0,
          }}
        >
          {currentUser?.name?.[0]?.toUpperCase()}
        </Avatar>

        {/* Информация */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Имя и роль */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h5" fontWeight={700}>
              {currentUser?.name}
            </Typography>

            {/* Бейдж роли */}
            <Chip
              icon={
                currentUser?.role === "admin"
                  ? <ShieldIcon fontSize="small" />
                  : <PersonIcon fontSize="small" />
              }
              label={currentUser?.role === "admin" ? "Администратор" : "Пользователь"}
              size="small"
              sx={{
                bgcolor: currentUser?.role === "admin"
                  ? "rgba(108,99,255,0.15)"
                  : "rgba(255,255,255,0.08)",
                color: currentUser?.role === "admin"
                  ? "var(--accent-light)"
                  : "var(--text-secondary)",
                border: "1px solid",
                borderColor: currentUser?.role === "admin"
                  ? "var(--accent-main)"
                  : "var(--border-color)",
              }}
            />
          </Box>

          {/* Email */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              mb: 0.5,
              color: "var(--text-secondary)",
            }}
          >
            <EmailIcon fontSize="small" />
            <Typography variant="body2">{currentUser?.email}</Typography>
          </Box>

          {/* Дата регистрации */}
          {currentUser?.createdAt && (
            <Typography
              variant="caption"
              sx={{ color: "var(--text-secondary)" }}
            >
              На сайте с {formatDate(currentUser.createdAt)}
            </Typography>
          )}
        </Box>
      </Box>

      {/* ─── Статистика ────────────────────────────────────── */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: "Карточек", value: myCards.length, icon: <StyleIcon /> },
        ].map((stat) => (
          <Grid item xs={12} sm={4} key={stat.label}>
            <Box
              sx={{
                bgcolor: "var(--bg-paper)",
                border: "1px solid var(--border-color)",
                borderRadius: 3,
                p: 2.5,
                textAlign: "center",
              }}
            >
              <Box sx={{ color: "var(--accent-main)", mb: 0.5 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" fontWeight={700}>
                {stat.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ borderColor: "var(--border-color)", mb: 4 }} />

      {/* ─── Мои карточки ──────────────────────────────────── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Мои карточки
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/cards")}
          sx={{
            borderColor: "var(--accent-main)",
            color: "var(--accent-main)",
            "&:hover": { borderColor: "var(--accent-light)" },
          }}
        >
          Все карточки
        </Button>
      </Box>

      {/* Список карточек пользователя */}
      {myCards.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "var(--text-secondary)",
          }}
        >
          <StyleIcon sx={{ fontSize: 48, opacity: 0.4, mb: 1 }} />
          <Typography>У вас пока нет карточек</Typography>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "var(--accent-main)",
              "&:hover": { bgcolor: "var(--accent-light)" },
            }}
            onClick={() => navigate("/cards")}
          >
            Добавить карточку
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {myCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card._id}>
              <CardItem
                card={card}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={() => navigate(`/cards/${card._id}`)}
                onLike={onLike}
                onToggleFav={toggleFavorite}
                isFavorite={isFavorite(card._id)}
                isLoggedIn={true}
                currentUserId={currentUser?._id}
                currentRole={currentUser?.role}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProfilePage;
