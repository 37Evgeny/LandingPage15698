import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '../Logo/logo';
import './index.css';

const Footer = () => (
  <Box 
    component="footer" 
    sx={{ 
      p: 2, 
      bgcolor: 'var(--bg-header)', 
      color: 'var(--text-secondary)', 
      mt: 'auto',
      display: 'flex',
      justifyContent: 'center',
      borderTop: '1px solid var(--border-color)',
      
      // === ДОБАВЛЯЕМ АНИМАЦИЮ СЮДА ===
      animation: 'fadeInUp 1s ease-out forwards',
      opacity: 0,              // Скрываем до начала анимации
      animationDelay: '0.5s',  // Задержка полсекунды (чтобы появился после Header)
    }}
  >
    
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      
      <Box sx={{ 
        width: 60, height: 60, mr: 2, 
        display: 'flex', alignItems: 'center',
        '& img': { width: '100%', height: 'auto' },
        '& svg': { width: '100%', height: '100%', fill: 'var(--accent-main)' }
      }}>
        <Logo />
      </Box>

      <Typography 
        variant="body1" 
        sx={{ 
          fontSize: 'var(--font-lg)', 
          fontWeight: 500,
          letterSpacing: '0.05rem'
        }}
      >
        Заволжск ул.Мира д. 54б
      </Typography>
      
    </Box>
  </Box>
);

export default Footer;
