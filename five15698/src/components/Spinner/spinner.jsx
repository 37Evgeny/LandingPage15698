import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}
    >
      {/* Цвет берем из нашей CSS-переменной */}
      <CircularProgress size={80} sx={{ color: 'var(--accent-main)' }} />
    </Box>
  );
};

export default Spinner;
