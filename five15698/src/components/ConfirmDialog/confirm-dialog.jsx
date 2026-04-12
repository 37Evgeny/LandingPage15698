import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

function ConfirmDialog({ open, onClose, onConfirm, cardName }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: "var(--bg-paper)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          backgroundImage: "none",
          minWidth: { xs: "280px", sm: "400px" },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.5rem" }}>
        Удалить карточку?
      </DialogTitle>

      <DialogContent>
        <Typography sx={{ color: "var(--text-secondary)" }}>
          Карточка{" "}
          {/* ✅ Выделяем название карточки */}
          <Typography
            component="span"
            sx={{ color: "var(--text-primary)", fontWeight: 600 }}
          >
            "{cardName}"
          </Typography>{" "}
          будет удалена безвозвратно.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{ color: "var(--text-secondary)" }}
        >
          Отмена
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            bgcolor: "#f44336",
            "&:hover": { bgcolor: "#d32f2f" },
            fontWeight: 600,
          }}
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;

