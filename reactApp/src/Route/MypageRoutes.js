// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'

const Mypage = Loadable(lazy(() => import('../Components/User_Views/User/Mypage/index')));

const mypageRoute = [{ path: '/mypage', element: <AdminGuard><Mypage /></AdminGuard> }];

export default mypageRoute;
