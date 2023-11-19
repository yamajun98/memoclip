import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'
const Top = Loadable(lazy(() => import('../Components/User_Views/Top/index')));


const TopRoutes = [
  { path: '/', element:<AdminGuard><Top/></AdminGuard> },
];

export default TopRoutes;
