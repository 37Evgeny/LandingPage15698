import Grid from "@mui/material/Grid";
import SkeletonCard from "./skeleton-card";

// ✅ Показываем N заглушек пока грузятся данные
function SkeletonList({ count = 8 }) {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <SkeletonCard />
        </Grid>
      ))}
    </Grid>
  );
}

export default SkeletonList;
