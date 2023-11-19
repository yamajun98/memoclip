import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import Avatar from '@mui/material/Avatar'; 


export default function FavoriteList($props) {
    const {datas} = $props
  return(
    <>
      <List>
        {datas.map((value)=>(
            <ListItem key={value.id} disablePadding divider={true}>
            <ListItemButton>
              <Avatar 
                    style={{marginTop:"3px",marginLeft:"0px"}}
                    src={"/image/"+value.FavoriteArticle.User.image}
                    type="button"
                    sx={{ width: 30, height: 30 }}>
                </Avatar>
                <div style={{display:"flex"}}>
                    <div style={{width:"287px"}}>
                        {/* ユーザーネーム */}
                        <p  style={{marginLeft:"10px",marginBottom:"1px",marginTop:"1px"}}>{value.FavoriteArticle.User.name} </p>
                        {/* タイトル */}
                        <p style={{marginLeft:"10px",marginBottom:"1px",marginTop:"1px"}} >{value.FavoriteArticle.title}</p>
                    </div>
                    <div>
                        <Button>保存</Button>
                    </div>
                    
                </div>
                
            </ListItemButton>
            
          </ListItem>
          
        ))}
      </List> 
    </>
  );
}