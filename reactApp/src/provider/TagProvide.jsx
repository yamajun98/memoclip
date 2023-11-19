import React,{useState,createContext,useContext} from "react";
import  {useTabNum} from "../Function/UserInfomation"
import { useLocation,useParams } from "react-router-dom";

const NumContext = createContext({});

export const TagProvider = props => {
  const [num,setNum] = useState(useTabNum());
  const [value,setValue] = useState('')
  const [bloom,setBloom] = useState(false)
  return(
    <NumContext.Provider value={{num,setNum,value,setValue,bloom,setBloom}}>
      {props.children}
    </NumContext.Provider>
  )
};

export const useContentContext = () => useContext(NumContext);