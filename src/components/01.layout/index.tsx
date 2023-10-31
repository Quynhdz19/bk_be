import React from 'react';
import './styles.scss';

interface ILayoutProps {
  children?: React.ReactNode;
}

const LayoutDefault: React.FC<ILayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default LayoutDefault;
