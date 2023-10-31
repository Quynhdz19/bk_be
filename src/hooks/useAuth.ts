import React from 'react';
import { authContext } from 'src/contexts/auth';

export const useAuth = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
