import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

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

// ✅ Принимаем initialData — если передана, значит режим редактирования
function AddCardDialog({ open, onClose, onAdd, initialData = null }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // ✅ Когда открываем диалог — заполняем форму начальными данными
  useEffect(() => {
    if (open) {
      setFormData(initialData ?? INITIAL_FORM_STATE);
    }
  }, [open, initialData]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClose = () => {
    setFormData(INITIAL_FORM_STATE);
    onClose();
  };

  const handleSubmit = () => {
    onAdd(formData);
    setFormData(INITIAL_FORM_STATE);
  };

  const isSubmitDisabled = !formData.name.trim() || !formData.pictures.trim();

  // ✅ Заголовок меняется в зависимости от режима
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
      {/* ✅ Динамический заголовок */}
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
          {/* ✅ Динамический текст кнопки */}
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCardDialog;
