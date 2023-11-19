import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Avatar from '@mui/material/Avatar'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContentContext } from '../../../../../../provider/MypageProvide';
import { api } from '../../../../../../Function/api';


export default function UserListFollow($props) {
    const {datas} = $props
    const Url =(id)=>{
      if(id == localStorage.getItem("id")){
          return  '/mypage'
      }else{
          return  '/user/' + id
      }
    }
  return(
    <>
      <List>
        {datas.map((value)=>(
            <ListItem key={value.id} disablePadding divider={true}>
            <ListItemButton 
                component={Link}  
                to={Url(value?.Follower.id)}
                state={{ Id:value?.Follower.id}}
              >
              <Avatar 
                    style={{marginTop:"3px",marginLeft:"0px"}}
                    src={"/image/"+value.Follower?.image }
                    type="button"
                    sx={{ width: 40, height: 40 }}>
                </Avatar>
                <div style={{display:"flex",width:"200px"}}>
                    <div style={{width:"60%"}}>
                        {/* ユーザーネーム */}
                        <p  style={{marginLeft:"10px",marginBottom:"1px",marginTop:"1px"}}>{value.Follower?.name} </p>
                        {/* タイトル */}
                        {/* <p style={{marginLeft:"10px",marginBottom:"1px",marginTop:"1px"}} >{value.FavoriteArticle.title}</p> */}
                    </div>
                </div>
            </ListItemButton>
              {value.Follower.id != localStorage.getItem("id") ?   
              <CustomBtutton value={value}></CustomBtutton>    
                  : <></>
                }                
          </ListItem>
          
        ))}
      </List> 
    </>
  );
}

const CustomBtutton = (props) =>{
    const {value} = props
    const {updateOpen,updateProfile} = useContentContext();
    const [bloom,setBloom] = React.useState(value.Follower?.Follower.length === 0)

    const handleClickOpen = (value) => {
    (async()=>{
      if(bloom){
          // 保存
          await api.post('/user/follow',new URLSearchParams({"user_id":value.Follower?.id,"follower_id":localStorage.getItem("id")}))
      }else{
          // 解除
          await api.post('/user/unfollow',new URLSearchParams({"user_id":value.Follower?.id,"follower_id":localStorage.getItem("id")}))     
      }       
    })()
    setBloom(!bloom)
    updateProfile()
    // setTimeout(()=> {updateOpen()},500);
  };  

  return(
    <div style={{padding:"10px"}}>
      <Button 
        variant="outlined" 
        style={{padding:"3px",paddingRight: "inherit",paddingLeft: "inherit"}} 
        endIcon={< ArrowForwardIcon/>}  
        onClick={() =>handleClickOpen(value)}
      >
          <p style={{fontSize:"x-small"}}>
          {bloom ?"フォロー":"フォロー中" }
          </p>
      </Button>
    </div> 
  )
}