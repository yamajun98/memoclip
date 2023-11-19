// import Top from "./components/Top/Top";
// import AdminTop from "./Admin/Layout/Top";
// import Login from "./components/login/index";
import { BrowserRouter, useRoutes,Switch, Route, Routes,Link,NavLink } from "react-router-dom";
// import Register from "./Register/index"
import * as React from 'react';
// import  Mypage   from './components/Mypage/index';
// import  MakeArticle  from './components/MakeArticles/index';
// import UserPage from './components/Userpage/index';
// import EditArticle from './components/MakeArticles/edit';
// import Chat from './components/Chat/index'
// import ChatRoom from './components/Chat/ChatRoom'
// import {MypageProvider} from './provider/MypageProvide'
// import {UserpageProvider } from "./provider/UserpageProvide";
import routes from './Route/route';
import  ThemeProvider  from './Components/Theme/MainTheme';
import { SettingsProvider } from './Setteing/contexts/SettingsContext';
import { SearchProvider } from './Setteing/contexts/SearchContext';
import { AuthProvider } from './Auth/JWTAuthContext';
import {AxiosErrorHandleProvider} from './Function/api'
function App() {
  const content = useRoutes(routes);
  return (
    <AxiosErrorHandleProvider>
      <SettingsProvider>
        <SearchProvider>
          <ThemeProvider>
            <AuthProvider>{content}</AuthProvider>
          </ThemeProvider>         
        </SearchProvider>
      </SettingsProvider>
    </AxiosErrorHandleProvider>
  );
}


export default App;
