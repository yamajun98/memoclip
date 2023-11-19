import * as React from 'react';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import {useEffect,useState} from "react"
import { BrowserRouter, Switch,Outlet, Route, Routes,Link,NavLink } from "react-router-dom";
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import { api } from '../../../../Function/api';

    const StyledTitleH1 = styled('div')(() => ({
        width:'90%',
        minWidth: '20%',
        marginLeft: '5%',
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

    const RankingBox = styled(Box)(() => ({
        color: '#e2e418',
        marginTop: '22px',
        borderBottom: '27px solid #000',
        borderRight: '15px solid transparent',
        height: '0',
        width: '50px',
    }));

export default function TagList(){
    const [prop, setData] = useState([]);
    const [bloom, setBloom] = useState(true);

    useEffect(()=>{
        (async()=>{
            const result = await api.get('/user/get/ranking', {responseType: "json"},{ ContentType: 'application/json'})
            setData(result.data)
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
                     <StyledTitleH1>-USER RANKING-</StyledTitleH1> 
                }
            >
            {prop?.map((value,index) => 
                <ListItemButton style={{margin:'0% 3% 0% 3%',height: '67px'}} key={value.id} onClick={onClick} component={Link}  to={'/user/' + value?.Follower.userId}    state={{ Id:value?.Follower.id}}>
                    
                    <div style={{borderBottom:'solid 2px',display:'flex',width: '100%',height:' 100%'}}>
                        <RankingBox><span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '12%',
                            fontFamily: 'Arial Black'}}>{index+1}</span></RankingBox>
                         
                    <ListItemIcon style={{margin:' 4px -7px 5px 4px'}}>
                    <Avatar style={{marginTop:"3px"}}
                             src={"/image/"+ value?.Follower.image}>
                            </Avatar> 
                    </ListItemIcon>
                    <Divider sx={{ height: 45, m: 0.5 }} orientation="vertical" />
                    <div style={{marginLeft:'2%'}}>
                    <ListItemText primary={value?.Follower.name} />
                    <ListItemText primary={"フォロワー数 :"+value?.totalAmount} /> 
                    </div>
                    </div>
                </ListItemButton>
            )}
            </List>
    )
}