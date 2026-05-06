import GitHubIcon from "@mui/icons-material/GitHub";
import PaletteIcon from "@mui/icons-material/Palette";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Box, Container, IconButton, Link, Tooltip, Typography } from "@mui/material";

/**
 * Навигационные ссылки футера.
 * @constant {Array<{label: string, href: string}>}
 */
const NAV_LINKS = [
  { label: "Галерея", href: "#" },
  { label: "О проекте", href: "#" },
  { label: "Контакты", href: "#" },
];

/**
 * Ссылки на социальные сети.
 * @constant {Array<{label: string, href: string, icon: JSX.Element}>}
 */
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/37Evgeny",
    icon: <GitHubIcon fontSize="small" />,
  },
  {
    label: "Telegram",
    href: "https://t.me/",
    icon: <TelegramIcon fontSize="small" />,
  },
];

/**
 * Футер приложения.
 * Минималистичный дизайн — одна строка с тремя зонами:
 * - Левая:  навигационные ссылки
 * - Центр:  копирайт с логотипом
 * - Правая: иконки социальных сетей
 *
 * На мобильных устройствах переключается в колонку.
 */
const Footer = () => {
  /** Текущий год для копирайта — обновляется автоматически */
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: "1px solid var(--border-color)",
        bgcolor: "var(--bg-paper)",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 3, sm: 0 },
            py: 3,
          }}
        >

          {/* ─── Левая зона — навигация ──────────────────────── */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                underline="none"
                sx={{
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "var(--accent-light)",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* ─── Центр — логотип и копирайт ──────────────────── */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {/* Логотип */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                color: "var(--accent-main)",
              }}
            >
              <PaletteIcon sx={{ fontSize: 18 }} />
              <Typography
                variant="body2"
                fontWeight={700}
                sx={{
                  letterSpacing: "0.05rem",
                  color: "var(--accent-main)",
                }}
              >
                Drawing Contest
              </Typography>
            </Box>

            {/* Копирайт */}
            <Typography
              variant="caption"
              sx={{
                color: "var(--text-secondary)",
                letterSpacing: "0.03rem",
              }}
            >
              © {currentYear} Evgeny. All rights reserved.
            </Typography>
          </Box>

          {/* ─── Правая зона — социальные сети ───────────────── */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {SOCIAL_LINKS.map((social) => (
              <Tooltip key={social.label} title={social.label}>
                <IconButton
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: "var(--text-secondary)",
                    transition: "color 0.2s, transform 0.2s",
                    "&:hover": {
                      color: "var(--accent-light)",
                      transform: "translateY(-2px)",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
