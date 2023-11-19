// import { authRoles } from 'app/auth/authRoles';
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import AdminGuard from './AdminGuard'

const Article = Loadable(lazy(() => import('../Components/User_Views/Article/Detail/index')));
const ArticleEdit = Loadable(lazy(() => import('../Components/User_Views/Article/Edit/edit')));
const ArticleCreate = Loadable(lazy(() => import('../Components/User_Views/Article/Post/post')));

const mypageRoute = [
    { path: '/article/item/:id', element: <AdminGuard><Article/></AdminGuard> },
    { path: '/article/edit/:articleId' , element: <AdminGuard><ArticleEdit/></AdminGuard> },
    { path: '/article/create/' , element: <AdminGuard><ArticleCreate/></AdminGuard> }
];

export default mypageRoute;
