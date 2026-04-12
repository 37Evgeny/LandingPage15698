import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../Logo/logo";
import "./index.css";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            position: "relative",
            // 1. ЖЕСТКО ФИКСИРУЕМ ВЫСОТУ ШАПКИ (например, 64px)
            minHeight: "64px !important",
            height: "64px",
          }}
        >
          {/* === ЛЕВАЯ ЧАСТЬ (Группа с анимацией) === */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              animation: "fadeInLeft 1s ease-out forwards",
              opacity: 0,
            }}
          >
            {/* 2. ОГРАНИЧИВАЕМ РАЗМЕР ЛОГОТИПА, чтобы он не распирал шапку */}
            <Box
              sx={{
                width: 45, // Задайте нужную ширину логотипа
                height: 45, // Задайте нужную высоту логотипа
                display: "flex",
                alignItems: "center",
                "& img": { width: "100%", height: "auto", maxHeight: "100%" },
                "& svg": { width: "100%", height: "100%" },
              }}
            >
              <Logo />
            </Box>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 2,
                display: { xs: "flex", md: "flex" },
                fontFamily: '"Roboto", sans-serif',
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Мира 54
            </Typography>
          </Box>

          {/* === ЦЕНТРАЛЬНАЯ ЧАСТЬ (Приветствие) === */}
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",

              fontFamily: '"Roboto", sans-serif',
              fontWeight: 400,
              letterSpacing: ".05rem",
              color: "inherit",
              textDecoration: "none",

              animation: "fadeInDown 1s ease-out forwards",
              opacity: 0,
              animationDelay: "0.3s",

              display: { xs: "none", md: "flex" },
            }}
          >
            Добро пожаловать
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
