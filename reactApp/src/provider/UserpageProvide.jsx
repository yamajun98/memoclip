import React,{useState,createContext,useContext} from "react";
import  {useTabNum} from "../Function/UserInfomation"
import { useLocation,useParams } from "react-router-dom";

const UserpageContext = createContext({});

export const UserpageProvider = props => {
    const [reload, setReload] = React.useState(false);
    const onChange = () =>{
    setReload(!reload)
    }

  return(
    <UserpageContext.Provider value={{reload,setReload,onChange}}>
      {props.children}
    </UserpageContext.Provider>
  )
};

export const useProvide = () => useContext(UserpageContext);