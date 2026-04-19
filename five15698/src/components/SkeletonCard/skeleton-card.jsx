import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

function SkeletonCard() {
  return (
    <Card
      sx={{
        bgcolor: "var(--bg-paper)",
        border: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Картинка */}
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{ bgcolor: "var(--border-color)" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Заголовок */}
        <Skeleton
          variant="text"
          width="60%"
          height={32}
          sx={{ bgcolor: "var(--border-color)", mb: 1 }}
        />
        {/* Описание — 3 строки */}
        <Skeleton
          variant="text"
          width="100%"
          sx={{ bgcolor: "var(--border-color)" }}
        />
        <Skeleton
          variant="text"
          width="100%"
          sx={{ bgcolor: "var(--border-color)" }}
        />
        <Skeleton
          variant="text"
          width="40%"
          sx={{ bgcolor: "var(--border-color)" }}
        />
      </CardContent>

      {/* Кнопки */}
      <CardActions sx={{ justifyContent: "flex-end", p: 1, gap: 1 }}>
        <Skeleton
          variant="circular"
          width={36}
          height={36}
          sx={{ bgcolor: "var(--border-color)" }}
        />
        <Skeleton
          variant="circular"
          width={36}
          height={36}
          sx={{ bgcolor: "var(--border-color)" }}
        />
      </CardActions>
    </Card>
  );
}

export default SkeletonCard;
