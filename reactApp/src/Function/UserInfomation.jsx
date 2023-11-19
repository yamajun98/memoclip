import { useLocation,useParams } from "react-router-dom";
import axios from 'axios';



export function Logout(){
    console.log("-logout-")
    localStorage.setItem('accessToken', "false");
}

export function GetItem(value){
   return localStorage.getItem(value);
}
 
export const useTabNum =()=>{
    console.log("URL取得")
    const pathname = useLocation().pathname
    console.log(pathname)
    if(pathname.indexOf("/register/")==0 || 
    pathname.indexOf("/tags/")==0 || 
    pathname.indexOf("/user/")==0 ||
    pathname.indexOf("/article/edit/")==0 ||
    pathname.indexOf("/chat/")==0
    ){
        return 0
    }
    const url =[
        {name:"/",num:0},
        {name:"/login",num:0},
        {name:"/MemberRegister",num:0},
        
        {name:"/chat",num:1},
        {name:"/mypage",num:2},
        {name:"/makearticle",num:3}
    ]
    const num = url.find((v) => pathname == v.name);
    return num.num;
}





