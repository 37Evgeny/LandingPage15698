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

const INITIAL_FORM_STATE = {
  name: "",
  pictures: "",
  description: "",
};

const darkInputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "var(--text-primary)",
    "& fieldset": { borderColor: "var(--border-color)" },
    "&:hover fieldset": { borderColor: "var(--text-secondary)" },
    "&.Mui-focused fieldset": { borderColor: "var(--accent-main)" },
  },
  "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--accent-main)" },
};

const FORM_FIELDS = [
  { id: "name", label: "Название", multiline: false, rows: 1 },
  { id: "pictures", label: "Ссылка на картинку (URL)", multiline: false, rows: 1 },
  { id: "description", label: "Описание", multiline: true, rows: 3 },
];

function AddCardDialog({ open, onClose, onAdd, initialData = null }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // ✅ Состояния превью
  const [previewError, setPreviewError] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(initialData ?? INITIAL_FORM_STATE);
      // ✅ Сбрасываем состояние превью при открытии
      setPreviewError(false);
      setPreviewLoaded(false);
    }
  }, [open, initialData]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // ✅ Сбрасываем ошибку превью при изменении URL
    if (field === "pictures") {
      setPreviewError(false);
      setPreviewLoaded(false);
    }
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM_STATE);
    setPreviewError(false);
    setPreviewLoaded(false);
    onClose();
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData(INITIAL_FORM_STATE);
    setPreviewError(false);
    setPreviewLoaded(false);
  };

  const isSubmitDisabled = !formData.name.trim() || !formData.pictures.trim();
  const title = initialData ? "Редактировать карточку" : "Создать новую карточку";
  const submitLabel = initialData ? "Сохранить изменения" : "Сохранить";

  // ✅ Показываем превью только если URL не пустой
  const showPreview = formData.pictures.trim().length > 0;

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
        {FORM_FIELDS.map((field) => (
          <TextField
            key={field.id}
            label={field.label}
            variant="outlined"
            multiline={field.multiline}
            rows={field.multiline ? field.rows : undefined}
            value={formData[field.id]}
            onChange={handleChange(field.id)}
            sx={darkInputStyle}
          />
        ))}

        {/* ✅ Блок превью картинки */}
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
                border: "1px solid var(--border-color)",
                bgcolor: "var(--bg-paper)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* ✅ Ошибка загрузки картинки */}
              {previewError && (
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)", textAlign: "center", px: 2 }}
                >
                  🖼️ Не удалось загрузить картинку.
                  <br />
                  Проверьте URL
                </Typography>
              )}

              {/* ✅ Картинка с анимацией появления */}
              {!previewError && (
                <Fade in={previewLoaded} timeout={400}>
                  <Box
                    component="img"
                    src={formData.pictures}
                    alt="Превью"
                    onLoad={() => setPreviewLoaded(true)}
                    onError={() => {
                      setPreviewError(true);
                      setPreviewLoaded(false);
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

              {/* ✅ Пока картинка грузится — показываем текст */}
              {!previewLoaded && !previewError && (
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
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          sx={{ color: "var(--text-secondary)" }}
        >
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
