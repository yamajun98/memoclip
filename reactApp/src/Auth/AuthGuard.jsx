import { useContext } from 'react'
import AuthContext from './JWTAuthContext'
import { Navigate, useLocation } from 'react-router-dom';

/*
ログイン状態確認
　　true →  main
　　false → /session/signin
*/
const AuthGuard = ({ children }) => {
  
  let { isAuthenticated,isGuest } = useContext(AuthContext);
  
  //URLパス取得 
  const { pathname } = useLocation();
  
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
