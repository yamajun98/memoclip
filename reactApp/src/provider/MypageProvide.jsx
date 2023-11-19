import React,{useState,createContext,useContext} from "react";
import  {useTabNum} from "../Function/UserInfomation"
import { useLocation,useParams } from "react-router-dom";
import { useForm, } from 'react-hook-form';
import {api} from '../Function/api'

const MypageContext = createContext({});

export const MypageProvider = ({ children }) => {
  const [value,setData] = useState([])
  const [update,setUpdate] = useState(true)
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const params = new URLSearchParams();

    const {control,handleSubmit,setValue,getValues} = useForm({
      defaultValues: { id:localStorage.getItem('id'),image:'',name: '' ,introduction:'',tag:[]}
    })
    const resetValue =()=>{
      setValue("name",``)
      setValue("tag",[])
      setValue("introduction",``)
    }


    const change = async(data,file) =>{
      const formData = new FormData();
      if(file != undefined){
          formData.append('file',file,encodeURIComponent(file.name))
          console.log( formData.get('file')); 
      }
      formData.append('data',JSON.stringify(data)); 
      try{
         const result = await api.post('user/edit/update', formData)
         setUpdate(!update)
      }catch{

      }
    }

    const  updateProfile = ()=>{
      setUpdate(!update)
    }

    const  updateOpen= ()=>{
      setOpen(!open)
    }

    React.useEffect(()=>{ 
      params.append('id', localStorage.getItem('id'));
      (async () => {       
        try{
            const result = await api.post('user/get', params)
            console.log(result)
            setData(result.data)
            setValue("image",result.data.image)
            setValue("name",result.data.name)
            setValue("tag",result.data.UserTags)
            setValue("introduction",result.data.introduction)
          }catch(err){
            console.log("error!!");
          }
      })()
    },[location,update]);
  

  return(
    <MypageContext.Provider value={{open,setOpen,value,change,updateProfile,updateOpen,control,handleSubmit,setValue,getValues}}>
      {children}
    </MypageContext.Provider>
  )

};

export const useContentContext = () => useContext(MypageContext);