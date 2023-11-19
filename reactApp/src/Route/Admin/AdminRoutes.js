// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'
const User = Loadable(lazy(() => import('../../Components/Admin_Views/User/index')));
const Tag = Loadable(lazy(() => import('../../Components/Admin_Views/Tag/index')));
const Article = Loadable(lazy(() => import('../../Components/Admin_Views/Article/index')));
const Chat = Loadable(lazy(() => import('../../Components/Admin_Views/Chat/index')));
const ChatRoom = Loadable(lazy(() => import('../../Components/Admin_Views/Chat/ChatRoom')));
const ChatRoomInit = Loadable(lazy(() => import('../../Components/Admin_Views/Chat/ChatRoomInit')));


const adminLoginRoute = [
    { path: '/admin/user', element: <AdminGuard><User/></AdminGuard> },
    { path: '/admin/tag', element: <AdminGuard><Tag/></AdminGuard> },
    { path: '/admin/article', element: <AdminGuard><Article/></AdminGuard> },
    { path: '/admin/chat', element:<AdminGuard><Chat/></AdminGuard> ,
    children:[ 
        { index:true, element: <><ChatRoomInit/> </>},
        { path: '/admin/chat/:roomName', element: <AdminGuard><ChatRoom/></AdminGuard> }
    ] 
},
];
export default adminLoginRoute;
