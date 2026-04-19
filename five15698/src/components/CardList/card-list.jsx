import Grid from "@mui/material/Grid";
import Grow from "@mui/material/Grow";
import CardItem from "../Card/card";
import EmptyState from "../EmptyState/empty-state";

function CardList({ cardsAll, onDelete, onEdit, onAdd, isSearching }) {
  if (cardsAll.length === 0) {
    return <EmptyState onAdd={onAdd} isSearching={isSearching} />;
  }

  return (
    <Grid container spacing={3}>
      {cardsAll.map((card, index) => (
        <Grow key={card._id} in={true} timeout={300 + index * 50}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardItem card={card} onDelete={onDelete} onEdit={onEdit} />
          </Grid>
        </Grow>
      ))}
    </Grid>
  );
}

export default CardList;
