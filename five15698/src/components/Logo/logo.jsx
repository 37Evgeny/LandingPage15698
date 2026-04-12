import './index.css';
import logoSrc from './logo.png';

function Logo() {
  
  return (

        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    
  )
}

export default Logo;