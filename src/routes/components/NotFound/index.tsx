import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NotFoundPage } from 'src/assets/icons';
import './not-found.scss';

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const userTheme = useSelector((state: any) => state.theme);

  return (
    <div className={`not-found-wrapper ${userTheme}`}>
      <div className="big-font">
        <img src={NotFoundPage} alt="404-icon" />
      </div>
      <div className="not-found-group">
        <div className="not-found-text">{t('NotFound.notFoundText')}</div>
        <div className="not-found-detail">
          {window?.location?.href ? window?.location?.href : ''}
          <span className="not-found-detail-highlight">{t('NotFound.wasNotFound')}</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
