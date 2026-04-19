import { useState } from "react";

function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  // ✅ Показать уведомление
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ✅ Закрыть уведомление
  const hideSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // ✅ Готовые методы для каждого типа
  const showSuccess = (message) => showSnackbar(message, "success");
  const showError = (message) => showSnackbar(message, "error");
  const showWarning = (message) => showSnackbar(message, "warning");
  const showInfo = (message) => showSnackbar(message, "info");

  return {
    snackbar,
    hideSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
}

export default useSnackbar;
