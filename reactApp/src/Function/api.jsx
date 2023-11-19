import { useLocation,useParams ,useNavigate} from "react-router-dom";
import axios from 'axios';
import * as React from 'react';

//axiosの共通処理

export const api = axios.create({
    baseURL:'http://localhost:3002/',
})

export  const AxiosErrorHandleProvider = ({ children }) => {
    const navigate = useNavigate(); // Hooksが使用できる！！
    React.useEffect(() => {
      // axiosの共通エラーハンドリング記述
      api.interceptors.response.use(
        response => {
            return response
        },
        (error) => {
          switch (error.response?.status) {
            case 404:
              navigate('/404'); // navigateを使用してリダイレクト
              return Promise.reject(error.response?.data);
          }
        }
      );
    }, []);
    return(
        <>{children}</>
    ) 
  };


api.interceptors.response.use(
    response => {
        return response
    },
    function(error) {
        switch(error.response.status) {
            case 400:
            case 401:
                console.log('認証エラーです');
            case 404:
                console.log('URL先がないです');
            default:

        }
    }
)

api.interceptors.request.use(
    request => {
        console.log(request.url)
        return request
    }
)





