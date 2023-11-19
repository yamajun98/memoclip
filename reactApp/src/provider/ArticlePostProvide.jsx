import React,{createContext,useContext} from "react";
import { useForm, } from 'react-hook-form';

 const ArticleContext = createContext({});

export const ArticlePostProvider = props => {
  const {control,handleSubmit,setValue,getValues} = useForm({
    defaultValues: { id:localStorage.getItem('id'),name: '' ,tag:[],body:'',status:0}
  })
  const resetValue =()=>{
    setValue("name",``)
    setValue("tag",[])
    setValue("body",``)
    setValue("status",0)
  }
  return(
    <ArticleContext.Provider value={{control,handleSubmit,setValue,resetValue,getValues}}>
      {props.children}
    </ArticleContext.Provider>
  )
};

export const useArticleContext = () => useContext(ArticleContext);