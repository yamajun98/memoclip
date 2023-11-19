import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {TagProvider} from './provider/TagProvide';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Switch, Route, Routes,Link,NavLink } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      {/* <TagProvider> */}
        <CssBaseline/>
        <App/>
      {/* </TagProvider> */}
  </BrowserRouter>
);
reportWebVitals();
