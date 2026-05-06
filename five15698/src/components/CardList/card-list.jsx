import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import CardItem from "../Card/card";
import EmptyState from "../EmptyState/empty-state";

/**
 * Компонент списка карточек.
 *
 * @param {object}   props
 * @param {Array}    props.cardsAll          - массив карточек
 * @param {function} props.onDelete          - удалить
 * @param {function} props.onEdit            - редактировать
 * @param {function} props.onView            - просмотр
 * @param {function} props.onLike            - лайк
 * @param {function} props.onToggleFav       - избранное
 * @param {function} props.isFavorite        - проверить избранное
 * @param {function} props.onAdd             - добавить (для EmptyState)
 * @param {boolean}  props.isSearching       - активен ли поиск
 * @param {boolean}  props.isFavoritesMode   - активен ли фильтр избранного
 * @param {function} props.onClearFavorites  - сбросить фильтр избранного
 * @param {boolean}  props.isLoggedIn        - авторизован ли пользователь
 * @param {string}   props.currentUserId     - ID текущего пользователя
 * @param {string}   props.currentRole       - роль текущего пользователя
 */
function CardList({
  cardsAll,
  onDelete,
  onEdit,
  onView,
  onLike,
  onToggleFav,
  isFavorite,
  onAdd,
  isSearching,
  isFavoritesMode,
  onClearFavorites,
  isLoggedIn,
  currentUserId,
  currentRole,
}) {
  // Пустой список — показываем нужную заглушку
  if (cardsAll.length === 0) {
    return (
      <EmptyState
        onAdd={onAdd}
        isSearching={isSearching}
        isFavoritesMode={isFavoritesMode}
        onClearFavorites={onClearFavorites}
      />
    );
  }

  return (
    <Grid container spacing={3}>
      {cardsAll.map((card, index) => (
        <Grow key={card._id} in={true} timeout={300 + index * 50}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardItem
              card={card}
              onDelete={onDelete}
              onEdit={onEdit}
              onView={onView}
              onLike={onLike}
              onToggleFav={onToggleFav}
              isFavorite={isFavorite(card._id)}
              isLoggedIn={isLoggedIn}
              currentUserId={currentUserId}
              currentRole={currentRole}
            />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

export default CardList;
