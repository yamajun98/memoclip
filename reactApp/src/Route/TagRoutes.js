// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'
const Tag = Loadable(lazy(() => import('../Components/User_Views/Tag/index')));

const mypageRoute = [
    { path: '/tag/:name', element: <AdminGuard><Tag/></AdminGuard> },
];

export default mypageRoute;
