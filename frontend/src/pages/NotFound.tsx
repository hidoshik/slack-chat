import { useTranslation, Trans } from 'react-i18next';
import notFoundImage from '../assets/404.svg';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t('page_not_found')}
        className="img-fluid h-25"
        src={notFoundImage}
        height="100vw"
        width="100vw"
      />
      <h1 className="h4 text-muted">{t('page_not_found')}</h1>
      <p className="text-muted">
        <Trans i18nKey="goToHomePage">
          Но вы можете перейти <a href="/">на главную страницу</a>
        </Trans>
      </p>
    </div>
  );
};

export default NotFound;
