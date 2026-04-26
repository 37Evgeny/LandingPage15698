import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";

// ✅ Начальные состояния форм
const INITIAL_LOGIN = { email: "", password: "" };
const INITIAL_REGISTER = { name: "", email: "", password: "", confirmPassword: "" };

const darkInputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "var(--text-primary)",
    "& fieldset": { borderColor: "var(--border-color)" },
    "&:hover fieldset": { borderColor: "var(--text-secondary)" },
    "&.Mui-focused fieldset": { borderColor: "var(--accent-main)" },
  },
  "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "var(--accent-main)" },
  "& .MuiFormHelperText-root": { color: "#f44336" },
};

function AuthDialog({ open, onClose, onLogin, onRegister }) {
  // ✅ Два таба — вход и регистрация
  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState(INITIAL_LOGIN);
  const [registerData, setRegisterData] = useState(INITIAL_REGISTER);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Сбрасываем формы при открытии
  useEffect(() => {
    if (open) {
      setLoginData(INITIAL_LOGIN);
      setRegisterData(INITIAL_REGISTER);
      setErrors({});
      setActiveTab(0);
    }
  }, [open]);

  // ✅ Валидация формы входа
  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.email.trim()) newErrors.email = "Введите email";
    if (!/\S+@\S+\.\S+/.test(loginData.email)) newErrors.email = "Некорректный email";
    if (!loginData.password.trim()) newErrors.password = "Введите пароль";
    if (loginData.password.length < 6) newErrors.password = "Минимум 6 символов";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Валидация формы регистрации
  const validateRegister = () => {
    const newErrors = {};
    if (!registerData.name.trim()) newErrors.name = "Введите имя";
    if (registerData.name.length < 2) newErrors.name = "Минимум 2 символа";
    if (!registerData.email.trim()) newErrors.email = "Введите email";
    if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = "Некорректный email";
    if (!registerData.password.trim()) newErrors.password = "Введите пароль";
    if (registerData.password.length < 6) newErrors.password = "Минимум 6 символов";
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginChange = (field) => (e) => {
    setLoginData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleRegisterChange = (field) => (e) => {
    setRegisterData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLoginSubmit = () => {
    if (!validateLogin()) return;
    setIsLoading(true);
    onLogin(loginData)
      .then(() => onClose())
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  const handleRegisterSubmit = () => {
    if (!validateRegister()) return;
    setIsLoading(true);
    onRegister(registerData)
      .then(() => onClose())
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

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
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.5rem", pb: 0 }}>
        {activeTab === 0 ? "Вход в аккаунт" : "Регистрация"}
      </DialogTitle>

      {/* ✅ Табы переключения */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => {
          setActiveTab(val);
          setErrors({});
        }}
        sx={{
          px: 3,
          "& .MuiTab-root": { color: "var(--text-secondary)" },
          "& .Mui-selected": { color: "var(--accent-main) !important" },
          "& .MuiTabs-indicator": { bgcolor: "var(--accent-main)" },
        }}
      >
        <Tab label="Войти" />
        <Tab label="Зарегистрироваться" />
      </Tabs>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>

        {/* ✅ Форма входа */}
        {activeTab === 0 && (
          <>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={loginData.email}
              onChange={handleLoginChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              sx={darkInputStyle}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              value={loginData.password}
              onChange={handleLoginChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              sx={darkInputStyle}
            />
          </>
        )}

        {/* ✅ Форма регистрации */}
        {activeTab === 1 && (
          <>
            <TextField
              label="Имя"
              variant="outlined"
              value={registerData.name}
              onChange={handleRegisterChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              sx={darkInputStyle}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={registerData.email}
              onChange={handleRegisterChange("email")}
              error={!!errors.email}
              helperText={errors.email}
              sx={darkInputStyle}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              value={registerData.password}
              onChange={handleRegisterChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              sx={darkInputStyle}
            />
            <TextField
              label="Подтвердите пароль"
              type="password"
              variant="outlined"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={darkInputStyle}
            />
          </>
        )}

      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, flexDirection: "column", gap: 1 }}>
        <Button
          fullWidth
          variant="contained"
          disabled={isLoading}
          onClick={activeTab === 0 ? handleLoginSubmit : handleRegisterSubmit}
          sx={{
            bgcolor: "var(--accent-main)",
            "&:hover": { bgcolor: "var(--accent-light)" },
            fontWeight: 600,
            py: 1.2,
          }}
        >
          {isLoading
            ? "Загрузка..."
            : activeTab === 0
            ? "Войти"
            : "Зарегистрироваться"}
        </Button>

        {/* ✅ Переключение между формами */}
        <Typography
          variant="body2"
          sx={{ color: "var(--text-secondary)", textAlign: "center" }}
        >
          {activeTab === 0 ? "Нет аккаунта? " : "Уже есть аккаунт? "}
          <Typography
            component="span"
            onClick={() => {
              setActiveTab(activeTab === 0 ? 1 : 0);
              setErrors({});
            }}
            sx={{
              color: "var(--accent-main)",
              cursor: "pointer",
              "&:hover": { color: "var(--accent-light)" },
            }}
          >
            {activeTab === 0 ? "Зарегистрироваться" : "Войти"}
          </Typography>
        </Typography>
      </DialogActions>
    </Dialog>
  );
}

export default AuthDialog;
