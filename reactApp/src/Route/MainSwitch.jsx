import useAuth from "../Auth/useAuth";
import AdminMain from "../Components/Admin_Views/Main/MatxLayout";
import Main from "../Components/Main/MatxLayout";

export default  function MainSwitch(props){
    const {isAdmin} = useAuth() 
    console.log(isAdmin)
    return(
        <> 
            {isAdmin == "true" ?
                <AdminMain/>
            :
                <Main></Main> 
            }
        </>
    )
}