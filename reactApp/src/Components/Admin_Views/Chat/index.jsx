import React,{useState,useEffect } from "react";
import Avatar from '@mui/material/Avatar'; 
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { IconButton } from '@mui/material';
import { Outlet,Link } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { api } from "../../../Function/api";

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const formatDate = (dt) =>{
        if(dt.ChatText.length > 0){
            return new Date(dt.ChatText[0].createdAt).toLocaleString(); 
        }else{
                return new Date(dt.createdAt).toLocaleString(); 
        }
    };

    const ListBox = styled(Box)(() => ({
        display:'colum',
        width:'35%'
        }));
    const RightBox = styled(Box)(() => ({
        width:'65%'
        }));
    const SearchBox = styled(Box)(() => ({
        backgroundColor: '#484848',
        // margin:"4%",
        display:"flex",
        component:"form",
        height:'10%'
        }));
    const ListItemButtonBox = styled(ListItemButton)(() => ({
        margin:"0%",
        padding:'0px',
        height: '100%',
        '&:hover':{
            backgroundColor:"rgb(0 0 0 /0.1)",
        }
        }));

export default function Index(){
    const [lists,setList] = useState([]);
    const params = new URLSearchParams();
    
    useEffect(() => {
        params.append('id', localStorage.getItem('id'));
        (async()=>{
            const result = await api.post('/chat/get/userlist', params)
            console.log("-----チャットリスト取得-----")
            console.log(result)
            setList(result.data)
        })()  
      }, []);


    return (
        <Box sx={{ flexGrow: 1 }} >
                <Grid xs={12}>
                    <Item>
                        {/* ユーザー情報 */}
                        <div style={{display:'flex',height:"797px"}}>
                            <ListBox>
                                <SearchBox>
                                <Paper
                                    component="form"
                                    style={{margin: '4%',    backgroundColor: '#d8d8d8',borderRadius:'19px'}}
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 450 }}
                                >  
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 ,width: '15ch',height:'10ch'}}
                                            placeholder="Search"
                                            inputProps={{ 'aria-label': 'search' }}
                                            />
                                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                            <SearchIcon />
                                            </IconButton>    
                                    </Paper>    
                                </SearchBox>
                                <List sx={{  bgcolor: 'background.paper',paddingTop:'0px' }}>
                                {lists?.map((value,index)=>
                                    <div key={index}>  
                                        <ListItem style={{height:'76px',padding:'0px'}} alignItems="flex-start"  >
                                            <ListItemButtonBox  component={Link} to={value?.Users.name}   state={{ id: value.id,roomName:value?.roomName }}>
                                                <Avatar alt="Cindy Baker" src={"/image/"+value.Users.image} sx={{ width: 56, height: 56 }}/>
                                                <ListItemText
                                                style={{marginLeft:"4%",marginRight: '4%'}}
                                                primary={
                                                <div style={{display:"flex"}}>
                                                    <div style={{fontFamily: 'HiraKakuProN-W6',color:'#000',fontSize:'larger'}}>
                                                        {value.Users.name}
                                                    </div>
                                                    <div style={{marginLeft:"auto"}}>
                                                        {formatDate(value)} 
                                                    </div>
                                                </div> 
                                                }
                                                secondary={
                                                    <div style={{fontFamily: 'HiraKakuProN-W6'}}> 
                                                            {value.ChatText[0]?.text}
                                                    </div>
                                                }
                                                /> 
                                            </ListItemButtonBox>
                                        </ListItem> 
                                    </div>
                                )} 
                                </List>                            
                            </ListBox>       
                            <RightBox>
                                <Outlet></Outlet>
                            </RightBox>       
                                
                        </div>

                    </Item>
                </Grid> 
        </Box> 
    )
}