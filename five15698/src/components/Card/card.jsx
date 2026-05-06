import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Box,
  CardContent,
  CardMedia,
  IconButton,
  Card as MuiCard,
  Tooltip,
  Typography,
} from '@mui/material';

/**
 * Компонент карточки.
 * Клик по карточке открывает просмотр.
 * Клик по кнопкам действий — не всплывает к карточке.
 *
 * @param {object}   props
 * @param {object}   props.card           - данные карточки
 * @param {function} props.onDelete       - удалить карточку
 * @param {function} props.onEdit         - редактировать карточку
 * @param {function} props.onView         - открыть просмотр
 * @param {function} props.onLike         - переключить лайк
 * @param {function} props.onToggleFav    - переключить избранное
 * @param {boolean}  props.isFavorite     - в избранном ли карточка
 * @param {boolean}  props.isLoggedIn     - авторизован ли пользователь
 * @param {string}   props.currentUserId  - ID текущего пользователя
 * @param {string}   props.currentRole    - роль текущего пользователя
 */
const Card = ({
  card,
  onDelete,
  onEdit,
  onView,
  onLike,
  onToggleFav,
  isFavorite,
  isLoggedIn,
  currentUserId,
  currentRole,
}) => {
  /** Количество лайков */
  const likesCount = card.likes?.length ?? 0;

  /** Лайкнул ли текущий пользователь эту карточку */
  const isLikedByMe = currentUserId
    ? card.likes?.some((id) => id.toString() === currentUserId)
    : false;

  /** Может ли текущий пользователь редактировать/удалять */
  const canEdit =
    isLoggedIn &&
    (currentRole === 'admin' ||
      card.owner?._id?.toString() === currentUserId);

  /**
   * Останавливает всплытие события к родительской карточке.
   * Используется на всех кнопках в нижней панели.
   * @param {React.MouseEvent} e
   */
  const stopBubbling = (e) => {
    e.stopPropagation();
  };

  return (
    <MuiCard
      onClick={() => onView(card)}
      sx={{
        bgcolor: 'var(--bg-paper)',
        color: 'var(--text-primary)',
        borderRadius: 3,
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        },
      }}
    >
      {/* Изображение карточки */}
      <CardMedia
        component="img"
        height="200"
        image={card.pictures}
        alt={card.name}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
        }}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Название */}
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {card.name}
        </Typography>

        {/* Описание */}
        {card.description && (
          <Typography
            variant="body2"
            sx={{
              color: 'var(--text-secondary)',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {card.description}
          </Typography>
        )}
      </CardContent>

      {/*
        ✅ ИСПРАВЛЕНО: onClick вынесен как проп компонента Box,
        НЕ внутри объекта sx.
        stopPropagation останавливает всплытие к MuiCard
        и предотвращает открытие просмотра при клике на кнопки.
      */}
      <Box
        onClick={stopBubbling}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          pb: 1,
        }}
      >
        {/* Левая часть — лайк и избранное */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

          {/* Кнопка лайка — только для авторизованных */}
          {isLoggedIn && (
            <Tooltip title={isLikedByMe ? 'Убрать лайк' : 'Лайк'}>
              <IconButton
                size="small"
                onClick={() => onLike(card._id)}
                sx={{
                  color: isLikedByMe
                    ? 'var(--accent-main)'
                    : 'var(--text-secondary)',
                  transition: 'transform 0.15s, color 0.15s',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              >
                {isLikedByMe
                  ? <ThumbUpIcon fontSize="small" />
                  : <ThumbUpOutlinedIcon fontSize="small" />
                }
              </IconButton>
            </Tooltip>
          )}

          {/* Счётчик лайков — виден всем */}
          <Typography
            variant="caption"
            sx={{ color: 'var(--text-secondary)', minWidth: 12 }}
          >
            {likesCount}
          </Typography>

          {/* Кнопка избранного — для всех */}
          <Tooltip title={isFavorite ? 'Убрать из избранного' : 'В избранное'}>
            <IconButton
              size="small"
              onClick={() => onToggleFav(card._id)}
              sx={{
                color: isFavorite ? '#e91e63' : 'var(--text-secondary)',
                transition: 'transform 0.15s, color 0.15s',
                '&:hover': { transform: 'scale(1.2)' },
              }}
            >
              {isFavorite
                ? <FavoriteIcon fontSize="small" />
                : <FavoriteBorderIcon fontSize="small" />
              }
            </IconButton>
          </Tooltip>
        </Box>

        {/* Правая часть — просмотр, редактирование, удаление */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>

          {/* Просмотр — для всех */}
          <Tooltip title="Подробнее">
            <IconButton
              size="small"
              onClick={() => onView(card)}
              sx={{ color: 'var(--text-secondary)' }}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Редактирование и удаление — владелец или админ */}
          {canEdit && (
            <>
              <Tooltip title="Редактировать">
                <IconButton
                  size="small"
                  onClick={() => onEdit(card)}
                  sx={{ color: 'var(--text-secondary)' }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Удалить">
                <IconButton
                  size="small"
                  onClick={() => onDelete(card)}
                  sx={{ color: '#f44336' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </MuiCard>
  );
};

export default Card;
