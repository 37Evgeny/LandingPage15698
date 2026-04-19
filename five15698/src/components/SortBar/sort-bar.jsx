import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// ✅ Конфигурация вариантов сортировки
const SORT_OPTIONS = [
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
  { value: "a-z", label: "По названию А-Я" },
  { value: "z-a", label: "По названию Я-А" },
];

function SortBar({ sortBy, onSort }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        variant="body2"
        sx={{
          color: "var(--text-secondary)",
          whiteSpace: "nowrap",
        }}
      >
        Сортировка:
      </Typography>

      <TextField
        select
        size="small"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        sx={{
          minWidth: 180,
          "& .MuiOutlinedInput-root": {
            color: "var(--text-primary)",
            bgcolor: "var(--bg-paper)",
            "& fieldset": { borderColor: "var(--border-color)" },
            "&:hover fieldset": { borderColor: "var(--text-secondary)" },
            "&.Mui-focused fieldset": { borderColor: "var(--accent-main)" },
          },
          // ✅ Стиль иконки стрелки
          "& .MuiSvgIcon-root": {
            color: "var(--text-secondary)",
          },
        }}
        // ✅ Стиль выпадающего меню
        SelectProps={{
          MenuProps: {
            PaperProps: {
              sx: {
                bgcolor: "var(--bg-paper)",
                border: "1px solid var(--border-color)",
                backgroundImage: "none",
                "& .MuiMenuItem-root": {
                  color: "var(--text-primary)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.05)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(108,99,255,0.15)",
                    "&:hover": {
                      bgcolor: "rgba(108,99,255,0.25)",
                    },
                  },
                },
              },
            },
          },
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default SortBar;
