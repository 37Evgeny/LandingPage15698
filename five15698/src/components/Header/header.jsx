import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

function Header({ currentUser, isLoggedIn, onAuthOpen, onLogout }) {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "var(--bg-paper)",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>

        {/* Логотип */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "var(--accent-main)", letterSpacing: "0.05rem" }}
        >
          🎨 Drawing Contest
        </Typography>

        {/* ✅ Авторизация */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isLoggedIn ? (
            <>
              {/* Имя пользователя */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccountCircleIcon sx={{ color: "var(--accent-main)" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "var(--text-primary)",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  {currentUser?.name}
                </Typography>
              </Box>

              {/* Кнопка выхода */}
              <Tooltip title="Выйти">
                <IconButton
                  onClick={onLogout}
                  sx={{
                    color: "var(--text-secondary)",
                    "&:hover": { color: "#f44336" },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            // Кнопка входа
            <Button
              variant="outlined"
              startIcon={<LoginIcon />}
              onClick={onAuthOpen}
              sx={{
                color: "var(--accent-main)",
                borderColor: "var(--accent-main)",
                "&:hover": {
                  borderColor: "var(--accent-light)",
                  bgcolor: "rgba(108,99,255,0.08)",
                },
              }}
            >
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
