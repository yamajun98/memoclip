// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'
const Search = Loadable(lazy(() => import('../Components/User_Views/Search/index')));
const SearchContent = Loadable(lazy(() => import('../Components/User_Views/Search/content')));
const ChatRoomInit = Loadable(lazy(() => import('../Components/User_Views/Chat/ChatRoomInit')));

const mypageRoute = [
    { path: '/search', element: <AdminGuard><Search/></AdminGuard>,
        children:[ 
            { index:true, element: <></> },
        ] 
    },
   
];

export default mypageRoute;
