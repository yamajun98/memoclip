import { useContext } from 'react'
import AuthContext from '../../Auth/JWTAuthContext'
import { Navigate, useLocation } from 'react-router-dom';

/*
ログイン状態確認
　　true →  main
　　false → /session/signin
*/
const AdminGuard = ({ children }) => {
  
  let { isAdmin } = useContext(AuthContext);
  
  //URLパス取得 
  const { pathname } = useLocation();
  const isAdminjugde= ()=>{
    if(typeof(isAdmin) === 'string'){
      return(isAdmin == 'true');
    }
  return isAdmin;
  } 
  return (
    <>
      { isAdminjugde()  ? (
        children
      ) : (
        <Navigate replace to="/notaccess" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AdminGuard;
