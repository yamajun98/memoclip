import * as React from 'react';
import io from "socket.io-client";
import { useEffect, useState,useRef }  from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { useLocation,Link,useParams,useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const socket = io('http://localhost:3002/');

const ContentBox = styled('div')(({ theme }) => ({
        width:'100%',
        height:'100%',
        borderLeft:'solid 2px #484848'
    }));

function ChatRoom(){
    const [messe,setMesse] = useState([]);
    const [text,setText] = useState("")
    const navigate =useNavigate();
    const url = useLocation()
    const  state =  url?.state; 

    const changeText = (data)=>{
        setText(data.target.value)
    }

    const onClick =()=>{
        if(text!=""){
            socket.emit('message', {
                roomName:state.roomName,
                roomId:state.id,
                userId:localStorage.getItem("id"),
                comment: text
            });
            setText("")
        }

    }


    useEffect(() => {
        var params = new URLSearchParams();
        params.append('chat_id', state.id);
        socket.emit('room', {
            roomName:state.roomName,
        });
        
        axios  
        .post('/chat/get', params)
        .then(function(data){
            console.log("-----メッセージ取得-----")
            console.log(data.data)
            setMesse(data.data)
        });

        socket.on('connect', () => {
          console.log('socket connected');

        });

        return () => {
                socket.off('messege')
                socket.off('connect')
            } ;
    }, [url]);

        const navi=()=>{
            navigate("/chat")
        }
        socket.on("message", (message) => {
        console.log("受信:")
        setMesse([...messe,message])
    });    
    
    return (
            <ContentBox>
                <div style={{display:"flex",backgroundColor: "#484848"}}>
                    <IconButton variant="outlined" onClick={navi} style={{color:'white'}}> 
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                    <h1 style={{color:'white'}}>チャット画面</h1>
                </div>


                <div> 
                <List sx={{  bgcolor: '#f7f7f7',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 650,
                        '& ul': { padding: 0 }, }}
                >
                    {messe?.map((value,index)=>
                        // <p key={index}>{value}</p>
                        <div key={index}> 
                            {chat(value)}
                        </div>
                    )} 
                    </List>
                {/* <p>{messe}</p> */}

                </div> 
                <div style={{display:"flex",margin:'2%'}}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 ,width: '15ch',height:'5ch'}}
                                        placeholder="MESSAGE"
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={text}
                                        onChange={changeText}
                                        multiline
                                        rows={1}
                                        />
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                                        <IconButton type="button" sx={{ p: '10px' }} onClick={onClick} aria-label="search">
                                        <SearchIcon />
                                        </IconButton>    
                    {/* <TextField style={{width:"90%"}} id="standard-basic" value={text}  onChange={changeText} label="メッセージ" variant="standard" />
                    <Button onClick={onClick}>送信</Button>  */}
                </div>     
            </ContentBox>

    )
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const chat =(value)=>{
    const formatDate = (dt) =>{
        return new Date(dt).toLocaleDateString();
    };

    if(value.User.id == localStorage.getItem("id")){
           return(
            // 自分
            <>
                <ListItem alignItems="flex-start"  style={{textAlign:"right"}}>
                    <ListItemText
                    style={{marginRight:"20px"}}
                    secondary={
                        <React.Fragment >
                            <div style={{display:"flex"}}>
                                <div style={{marginLeft:"auto"}}>
                                    <p>{formatDate(value.createdAt)}</p>
                                </div>
                                <div style={{borderRadius:"10px",backgroundColor: "aliceblue",
                                width: "fit-content",
                                padding: "10px"}}>
                              {value.text}  
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    />
                     <Avatar alt="Cindy Baker" src={"/image/"+value.User.image} style={{marginTop:"10px"}}/>
                </ListItem>            
            </>
            ) 
    }else{
        return(
            // 相手
            <>
                <ListItem alignItems="flex-start"  >
                    <Avatar alt="Cindy Baker" src={"/image/"+value.User.image} style={{marginTop:"10px"}}/>
                    <ListItemText
                    style={{marginLeft:"20px"}}
                    primary={value.User.name}
                    secondary={
                        <React.Fragment>
                             <div style={{display:"flex"}}>
                                <div style={{borderRadius:"10px",backgroundColor: "aliceblue",
                                width: "fit-content",
                                padding: "10px"}}>
                                {value.text}    
                                </div>
                                <div>
                                    <p>{formatDate(value.createdAt)}</p>
                                </div>                                
                             </div>

                        </React.Fragment>
                    }
                    /> 
                </ListItem>            
            </>
            ) 
    }

}

export default ChatRoom
