import React,{useState} from "react";
import Avatar from '@mui/material/Avatar'; 
import { styled } from '@mui/material/styles';

const IconAvatar = styled(Avatar)(({ theme }) => ({
    width: '130px',
    height: '130px',
    margin:'3px  auto',
    marginLeft:'auto',
    border: `2px solid ${theme.palette.background.paper}`,
}));
  
function IconAria($props){
    const {image,name,userId} = $props
    return(
        <>  
            {/* ユーザー情報 */}
                {image == undefined ?
                <IconAvatar src={"/image/userIcon.jpeg"}/>
                :
                <IconAvatar src={"/image/"+image}/>
                }
                <div style={{margin:"6px auto",display:"flex",width:'fit-content'}}>
                    <span style={{width:'max-content'}}>{name}/@{userId}</span>
                    {/* <span>♂</span> */}
                </div>
        </>

    )
}

export default IconAria;

