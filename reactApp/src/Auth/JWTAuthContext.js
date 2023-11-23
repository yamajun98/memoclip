import React, { createContext, useEffect, useReducer } from 'react'
// import jwtDecode from 'jwt-decode'
import axios from '../axios.js'
// import { MatxLoading } from './MatxLoading'
import Loadable from '../Setteing/option/Loadable';
import { lazy } from 'react';
import { useLocation } from "react-router-dom";
import { api } from '../Function/api.jsx';

/*
    ログイン状態確認処理
    
*/
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    isGuest: false,
    isAdmin: false,
}
const MatxLoading = Loadable(lazy(() => import('../Setteing/option/Loading')));



const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    notlogin: () => Promise.resolve(),
    register: () => Promise.resolve(),
})

// const isValidToken = (accessToken) => {
//     if (!accessToken) {
//         return false
//     }

//     const decodedToken = jwtDecode(accessToken)
//     const currentTime = Date.now() / 1000
//     return decodedToken.exp > currentTime
// }

const setSession = (data,accessToken,isGuest) => {
    if (accessToken) {
        console.log("-login-")
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('id', data.id);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('name', data.name);
        localStorage.setItem('age', "");
        localStorage.setItem('sex', "");
        localStorage.setItem('image', data.image);
        localStorage.setItem('introduction',data.introduction);
        localStorage.setItem('isGuest',isGuest);
        localStorage.setItem('isAdmin',data.admin_flag);
    } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('id');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('age');
        localStorage.removeItem('sex');
        localStorage.removeItem('image');
        localStorage.removeItem('introduction')
        localStorage.setItem('isGuest',false);
        localStorage.setItem('isAdmin',false);
    }
}

//state:既存値 受け取った値:action (type payload)
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated,isGuest,isAdmin } = action.payload
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                isGuest:isGuest,
                isAdmin:isAdmin,
            }
        }
        case 'LOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                isGuest: false,
                isAdmin: false,
            }
        }
        case 'ADMINLOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                isGuest: false,
                isAdmin:true
            }
        }
        case 'NOTLOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                isGuest: true,
                isAdmin: false,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                isGuest: false,
                isAdmin: false,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: false,
            }
        }
        default: {
            return { ...state }
        }
    }
}



//ローカルストレージから取得
const getLocalStorage = (key) => {
  const ret = localStorage.getItem(key);
    if (ret) {
      return ret;
    }
    return null;
};


export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const location = useLocation();

    //ログイン→セッションに格納
    const login = async (data) => {
        const result = await api.post('/login', new URLSearchParams(data))
        console.log('login')
        console.log(result)
        const { accessToken, user } = result.data
        if(accessToken == 0){
            throw new Error('ログインできませんでした');
        }
        setSession(user,accessToken,false)
        dispatch({
            type: 'LOGIN',
        })
    }
    const adminlogin = async (data) => {
        const result = await api.post('/login', new URLSearchParams(data))
        const { accessToken, user } = result.data
        if(user.admin_flag == 0 || result == undefined){
            throw new Error('運営者ではありません');
        }
        setSession(user,accessToken,true)
        dispatch({
            type: 'ADMINLOGIN',
        })
    }
    const notlogin = async () => {
        const result = await api.post('/login', new URLSearchParams({"userId":'guest',"password":'guest'}))
        const { accessToken, user } = result.data
        setSession(user,accessToken,true)
        dispatch({
            type: 'NOTLOGIN',
        })
    }

    const userRegister = async (data) => {
        const response = await api.post('/user/create',new URLSearchParams(data))
        console.log(response)
        if(response.data.saccessToken == 0){
            throw new Error('作成できませんでした');
        }
        if(response.data.errors.length > 0){
            if(response.data.fields?.userId != undefined){
                throw new Error('IDが既に作成されています。');
            }else if(response.data.fields?.name != undefined){
                throw new Error('Nameが既に作成されています。');
            }
        }
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        // async 非同期関数の前につける(今回はクロージャー関数)
        (async () => {
            try {
                const accessToken = getLocalStorage('accessToken')
                const isGuest = getLocalStorage('isGuest')
                const isAdmin = getLocalStorage('isAdmin')
                if (accessToken == 'true') {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            isGuest: isGuest,
                            isAdmin: isAdmin,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            isGuest: isGuest,
                            isAdmin:isAdmin,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        isGuest: false,
                        isAdmin: false,
                    },
                })
            }
        })()
    }, [location])//linkでの子コンポーネントの更新には反応しないため

    if (!state.isInitialised) {
        return <MatxLoading />
    }    

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                notlogin,
                userRegister,
                adminlogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
