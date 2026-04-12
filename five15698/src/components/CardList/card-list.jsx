import Grid from "@mui/material/Grid";
import CardItem from "../Card/card";

function CardList({ cardsAll, onDelete, onEdit }) {
  return (
    // ✅ В MUI v7 контейнер использует spacing напрямую
    <Grid container spacing={3}>
      {cardsAll.map((card) => (
        // ✅ item, xs, sm, md, lg — убраны, теперь используем size
        <Grid key={card._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CardItem
            card={card}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;
