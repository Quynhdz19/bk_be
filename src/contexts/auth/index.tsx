import jwt_decode from 'jwt-decode';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getStorageJwtToken,
  hasStorageJwtToken,
  removeStorageJwtToken,
} from 'src/helpers/storage';
import { setUserInfo } from 'src/store/actions/user';

type JWT_DECODE = {
  exp: number;
  iat: number;
  role: number;
  sub: number;
};

export const authContext = React.createContext<
  | {
      isAuthChecking: boolean;
      isAuth: boolean;
      signOut: VoidFunction;
      hasSigned: VoidFunction;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [userLogined, setUserLogined] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(handleExpireDate, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleExpireDate() {
    const isLogined = hasStorageJwtToken();
    let isExpired = false;
    if (isLogined) {
      const decoded = jwt_decode<JWT_DECODE>(getStorageJwtToken() as string);
      const expiredTimeServer = moment(decoded?.exp * 1000);
      isExpired = moment().isAfter(expiredTimeServer);
      if (isExpired) {
        removeStorageJwtToken();
        dispatch(setUserInfo(''));
      }
      setUserLogined(isExpired ? false : true);
    } else {
      setUserLogined(isLogined);
    }
  }

  function signOut() {
    removeStorageJwtToken();
  }

  function hasSigned() {
    handleExpireDate();
    setUserLogined(true);
  }

  return (
    <authContext.Provider
      value={{
        isAuthChecking: true,
        isAuth: userLogined,
        signOut,
        hasSigned,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
