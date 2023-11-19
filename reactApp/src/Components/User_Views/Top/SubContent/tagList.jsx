import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {useEffect,useState} from "react"
import { BrowserRouter, Switch,Outlet, Route, Routes,Link,NavLink } from "react-router-dom";
import { api } from '../../../../Function/api';
import Avatar from '@mui/material/Avatar'; 

const StyledTitleH1 = styled('div')(() => ({
    width:'90%',
    minWidth: '20%',
    marginLeft: '5%',
    // backgroundColor:' #000000',
    borderBottom:'solid 2px',
    borderTop:'solid 2px',
    color:' #000',
    fontSize:' 18px',
    textAlign:' center',
    fontFamily:'Montserrat, Arial, sans-serif',
    fontWeight:' 700',
    padding:'14px 2px 14px 2px',
    float:' left',
    }));


export default function TagList(){
    const [prop, setData] = useState([]);
    const [bloom, setBloom] = useState(true);

    useEffect(()=>{
        (async()=>{
            const result = await api.get('/tag/get/ranking', {responseType: "json"},{ ContentType: 'application/json'})
            setData(...prop,result.data)
        })()
    },[]); 
    
    const onClick=()=>{
        setBloom(!bloom)
    }
    return(
            <List
              style={{backgroundColor:' #fafafa'}}
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                     <StyledTitleH1>-TAG RANKING-</StyledTitleH1> 
                }
            >
            {prop?.map(value => 
                <ListItemButton key={value.id} onClick={onClick} component={Link}  to={`/tag/`+value?.name}  state={{ tag: value.id,bloom:bloom,image:value.image }}>
                    <ListItemIcon>
                            <Avatar 
                                style={{marginTop:"3px"}}
                                src={"/image/"+value.image}
                                type="button"
                                sx={{ width: 30, height: 30 }}>
                            </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={value?.name} />
                    <ListItemText primary={value?.Tag_Article.length + "件"} />
                </ListItemButton>
            )}
            </List>
    )
}
