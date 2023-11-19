import AuthGuard from '../Auth/AuthGuard';
import dashboardRoutes from './TopRoutes';
import mypageRoutes  from './MypageRoutes';
import chatsRoutes  from './ChatsRoutes';
import ArticlesRoutes  from './ArticlesRoutes';
import UsersRoutes from './UsersRoutes';
import NotFound from '../View/sessions/NotFound';
import NotAccess from '../View/sessions/NotAccess';
import sessionRoutes from '../View/sessions/SessionRoutes.js';
import { Navigate } from 'react-router-dom';
// import Main from '../Components/Main/MatxLayout';
import MainSwitch from './MainSwitch'
import SettingsRoutes from './SettingRoutes';
import SearchRoutes from './SearchRoutes';
import TagRoutes from './TagRoutes';
import AdminRoutes from './Admin/AdminRoutes';


const routes = [
  {
    element: (
      <AuthGuard>
        <MainSwitch/>
      </AuthGuard>
    ),
    children: [
        ...dashboardRoutes,
        ...mypageRoutes,
        ...chatsRoutes,
        ...ArticlesRoutes,
        ...UsersRoutes,
        ...SettingsRoutes,
        ...SearchRoutes,
        ...TagRoutes,
        ...AdminRoutes,
      ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="/" /> },
  { path: '*', element: <NotFound /> },
  { path: '/notaccess', element: <NotAccess /> },
];

export default routes;
