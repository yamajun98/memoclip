// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'

const User = Loadable(lazy(() => import('../Components/User_Views/User/Userpage/index')));

const mypageRoute = [
    { path: '/user/:userId', element: <AdminGuard><User/></AdminGuard> },
];

export default mypageRoute;
