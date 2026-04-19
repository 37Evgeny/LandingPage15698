import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import useImageUrl from "../../hooks/use-image-url.js"; // ✅ новый хук

const INITIAL_FORM_STATE = {
  name: "",
  pictures: "",
  description: "",
};

// ✅ Стиль теперь функция — меняет цвет при ошибке
const darkInputStyle = (hasError) => ({
  "& .MuiOutlinedInput-root": {
    color: "var(--text-primary)",
    "& fieldset": {
      borderColor: hasError ? "#f44336" : "var(--border-color)",
    },
    "&:hover fieldset": {
      borderColor: hasError ? "#f44336" : "var(--text-secondary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: hasError ? "#f44336" : "var(--accent-main)",
    },
  },
  "& .MuiInputLabel-root": {
    color: hasError ? "#f44336" : "var(--text-secondary)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: hasError ? "#f44336" : "var(--accent-main)",
  },
  "& .MuiFormHelperText-root": {
    color: "#f44336",
  },
});

function AddCardDialog({ open, onClose, onAdd, initialData = null }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // ✅ Подключаем хук валидации и превью
  const {
    validationError,
    showPreview,
    imageError,
    imageLoaded,
    setImageError,
    setImageLoaded,
  } = useImageUrl(formData.pictures);

  useEffect(() => {
    if (open) {
      setFormData(initialData ?? INITIAL_FORM_STATE);
      setImageError(false);
      setImageLoaded(false);
    }
  }, [open, initialData]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === "pictures") {
      setImageError(false);
      setImageLoaded(false);
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM_STATE);
    setImageError(false);
    setImageLoaded(false);
    onClose();
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData(INITIAL_FORM_STATE);
  };

  // ✅ Блокируем если есть ошибка валидации
  const isSubmitDisabled =
    !formData.name.trim() ||
    !formData.pictures.trim() ||
    !!validationError;

  const title = initialData ? "Редактировать карточку" : "Создать новую карточку";
  const submitLabel = initialData ? "Сохранить изменения" : "Сохранить";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: "var(--bg-paper)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          backgroundImage: "none",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.5rem" }}>
        {title}
      </DialogTitle>

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 1,
          minWidth: { xs: "280px", sm: "400px" },
        }}
      >
        {/* Название */}
        <TextField
          label="Название"
          variant="outlined"
          value={formData.name}
          onChange={handleChange("name")}
          sx={darkInputStyle(false)}
        />

        {/* ✅ URL с валидацией */}
        <TextField
          label="Ссылка на картинку (URL)"
          variant="outlined"
          value={formData.pictures}
          onChange={handleChange("pictures")}
          error={!!validationError}
          helperText={validationError}
          sx={darkInputStyle(!!validationError)}
        />

        {/* ✅ Превью картинки */}
        {showPreview && (
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "var(--text-secondary)", mb: 1, display: "block" }}
            >
              Превью:
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: 200,
                borderRadius: 1,
                overflow: "hidden",
                border: `1px solid ${imageError ? "#f44336" : "var(--border-color)"}`,
                bgcolor: "var(--bg-paper)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {imageError && (
                <Typography
                  variant="body2"
                  sx={{ color: "#f44336", textAlign: "center", px: 2 }}
                >
                  🖼️ Не удалось загрузить картинку.
                  <br />
                  Проверьте URL
                </Typography>
              )}

              {!imageError && (
                <Fade in={imageLoaded} timeout={400}>
                  <Box
                    component="img"
                    src={formData.pictures}
                    alt="Превью"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageError(true);
                      setImageLoaded(false);
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                </Fade>
              )}

              {!imageLoaded && !imageError && (
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  Загрузка...
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Описание */}
        <TextField
          label="Описание"
          variant="outlined"
          multiline
          rows={3}
          value={formData.description}
          onChange={handleChange("description")}
          sx={darkInputStyle(false)}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={handleClose} sx={{ color: "var(--text-secondary)" }}>
          Отмена
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitDisabled}
          sx={{
            bgcolor: "var(--accent-main)",
            "&:hover": { bgcolor: "var(--accent-light)" },
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCardDialog;
