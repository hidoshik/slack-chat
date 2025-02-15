import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigator = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');

    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <a href="/" className="navbar-brand">
          {t('platform_name')}
        </a>
        {window.localStorage.getItem('token') && (
          <button type="button" onClick={handleClick} className="btn btn-primary">
            {t('logout')}
          </button>
        )}
      </Container>
    </nav>
  );
};

export default Navigator;
