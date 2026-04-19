import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

function SearchBar({ searchQuery, onSearch, filteredCount, totalCount }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TextField
        placeholder="Поиск по названию или описанию..."
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        // ✅ Иконка поиска слева
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--text-secondary)" }} />
            </InputAdornment>
          ),
          // ✅ Кнопка очистки справа — показываем только если есть текст
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => onSearch("")}
                size="small"
                sx={{ color: "var(--text-secondary)" }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "var(--text-primary)",
            bgcolor: "var(--bg-paper)",
            "& fieldset": { borderColor: "var(--border-color)" },
            "&:hover fieldset": { borderColor: "var(--text-secondary)" },
            "&.Mui-focused fieldset": { borderColor: "var(--accent-main)" },
          },
          "& .MuiInputBase-input::placeholder": {
            color: "var(--text-secondary)",
            opacity: 1,
          },
        }}
      />

      {/* ✅ Счётчик результатов — показываем только при поиске */}
      {searchQuery.trim() && (
        <Typography
          variant="caption"
          sx={{ color: "var(--text-secondary)", pl: 1 }}
        >
          Найдено: {filteredCount} из {totalCount}
        </Typography>
      )}
    </Box>
  );
}

export default SearchBar;
