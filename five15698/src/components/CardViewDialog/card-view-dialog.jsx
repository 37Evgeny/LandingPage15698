import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {
    Avatar,
    Box,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';

/**
 * Модальное окно просмотра карточки.
 * Показывает увеличенное изображение и все детали.
 *
 * @param {object}   props
 * @param {object}   props.card          - объект карточки или null
 * @param {boolean}  props.open          - открыто ли окно
 * @param {function} props.onClose       - закрытие окна
 * @param {boolean}  props.isFavorite    - в избранном ли карточка
 * @param {function} props.onToggleFav   - переключить избранное
 * @param {string}   props.currentUserId - ID текущего пользователя
 */
const CardViewDialog = ({
  card,
  open,
  onClose,
  isFavorite,
  onToggleFav,
  currentUserId,
}) => {
  // Защита от рендера без карточки
  if (!card) return null;

  /**
   * Форматирует дату создания в читаемый вид.
   * @param {string} dateStr - ISO строка даты
   * @returns {string} - например "15 января 2025"
   */
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  /** Количество лайков */
  const likesCount = card.likes?.length ?? 0;

  /** Лайкнул ли текущий пользователь */
  const isLikedByMe = currentUserId
    ? card.likes?.some((id) => id.toString() === currentUserId)
    : false;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'var(--bg-paper)',
          color: 'var(--text-primary)',
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Кнопка закрытия */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 10,
          bgcolor: 'rgba(0,0,0,0.5)',
          color: '#fff',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 0 }}>
        {/* Увеличенное изображение */}
        <Box
          sx={{
            width: '100%',
            maxHeight: 420,
            overflow: 'hidden',
            bgcolor: 'var(--bg-main)',
          }}
        >
          <Box
            component="img"
            src={card.pictures}
            alt={card.name}
            onError={(e) => {
              // Placeholder при ошибке загрузки
              e.target.src =
                'https://via.placeholder.com/800x400?text=No+Image';
            }}
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: 420,
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>

        {/* Информация о карточке */}
        <Box sx={{ p: 3 }}>
          {/* Заголовок и кнопка избранного */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h5" fontWeight={700} sx={{ flex: 1, pr: 2 }}>
              {card.name}
            </Typography>

            {/* Кнопка избранного */}
            <Tooltip title={isFavorite ? 'Убрать из избранного' : 'В избранное'}>
              <IconButton
                onClick={() => onToggleFav(card._id)}
                sx={{
                  color: isFavorite ? '#e91e63' : 'var(--text-secondary)',
                  transition: 'transform 0.2s, color 0.2s',
                  '&:hover': { transform: 'scale(1.2)' },
                }}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          {/* Описание */}
          {card.description && (
            <Typography
              variant="body1"
              sx={{ color: 'var(--text-secondary)', mb: 3, lineHeight: 1.7 }}
            >
              {card.description}
            </Typography>
          )}

          {/* Нижняя панель — автор, дата, лайки */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              pt: 2,
              borderTop: '1px solid var(--border-color)',
            }}
          >
            {/* Автор */}
            {card.owner && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'var(--accent-main)', fontSize: 14 }}>
                  {card.owner.name?.[0]?.toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {card.owner.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--text-secondary)' }}>
                    {formatDate(card.createdAt)}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Лайки */}
            <Chip
              icon={
                <ThumbUpIcon
                  sx={{
                    fontSize: 16,
                    color: isLikedByMe
                      ? 'var(--accent-main) !important'
                      : 'inherit',
                  }}
                />
              }
              label={likesCount}
              variant="outlined"
              sx={{
                color: isLikedByMe ? 'var(--accent-main)' : 'var(--text-secondary)',
                borderColor: isLikedByMe ? 'var(--accent-main)' : 'var(--border-color)',
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CardViewDialog;
