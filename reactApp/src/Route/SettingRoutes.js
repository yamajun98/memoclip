// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'

const Setting = Loadable(lazy(() => import('../Components/User_Views/Setting/index')));

const mypageRoute = [{ path: '/setting', element: <AdminGuard><Setting /></AdminGuard> }];

export default mypageRoute;
