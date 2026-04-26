import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { useState } from "react";

function ImagePlaceholder() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        bgcolor: "var(--border-color)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ fontSize: "2.5rem" }}>🖼️</Typography>
      <Typography variant="caption" sx={{ color: "var(--text-secondary)" }}>
        Изображение недоступно
      </Typography>
    </Box>
  );
}

// ✅ Принимаем isLoggedIn
function CardItem({ card, onDelete, onEdit, isLoggedIn }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Card
      sx={{
        bgcolor: "var(--bg-paper)",
        color: "var(--text-primary)",
        border: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        },
      }}
    >
      {imgError ? (
        <ImagePlaceholder />
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={card.pictures}
          alt={card.name}
          onError={() => setImgError(true)}
          sx={{ objectFit: "cover" }}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {card.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
          {card.description}
        </Typography>
      </CardContent>

      {/* ✅ Кнопки только для авторизованных */}
      {isLoggedIn && (
        <CardActions sx={{ justifyContent: "flex-end", p: 1 }}>
          <Tooltip title="Редактировать">
            <IconButton
              onClick={() => onEdit(card)}
              sx={{
                color: "var(--text-secondary)",
                "&:hover": {
                  color: "var(--accent-main)",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Удалить">
            <IconButton
              onClick={() => onDelete(card)}
              sx={{
                color: "var(--text-secondary)",
                "&:hover": {
                  color: "#f44336",
                  bgcolor: "rgba(244,67,54,0.05)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
}

export default CardItem;
