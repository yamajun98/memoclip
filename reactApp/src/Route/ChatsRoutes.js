// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'

const Chat = Loadable(lazy(() => import('../Components/User_Views/Chat/index')));
const ChatRoom = Loadable(lazy(() => import('../Components/User_Views/Chat/ChatRoom')));
const ChatRoomInit = Loadable(lazy(() => import('../Components/User_Views/Chat/ChatRoomInit')));

const mypageRoute = [
    { path: '/chat', element:<AdminGuard><Chat/></AdminGuard> ,
        children:[ 
            { index:true, element: <><ChatRoomInit/> </>},
            { path: '/chat/:roomName', element: <AdminGuard><ChatRoom/></AdminGuard> }
        ] 
    },
   
];

export default mypageRoute;
