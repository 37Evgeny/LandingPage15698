import Alert from "@mui/material/Alert";
import MuiSnackbar from "@mui/material/Snackbar";

function Snackbar({ open, message, severity, onClose }) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={3000} // ✅ Закрывается через 3 секунды
      onClose={onClose}
      // ✅ Позиция — снизу по центру
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          minWidth: "280px",
          fontWeight: 500,
          // ✅ Цвета под тёмную тему
          "& .MuiAlert-icon": { fontSize: "1.2rem" },
        }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
}

export default Snackbar;
