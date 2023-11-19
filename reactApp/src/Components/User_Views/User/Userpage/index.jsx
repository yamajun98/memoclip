import React,{useState} from "react";
import Avatar from '@mui/material/Avatar'; 
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArticleTab from "./ArticleTab";
import ButtonGroup from "../Util/buttonGroup";
import { Button } from "@mui/material";
import { useLocation,Link,useParams,useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect } from "react";
import { useProvide } from "../../../../provider/UserpageProvide";
import IconAria from '../Util/IconAria'
import axios from 'axios';
import { api } from "../../../../Function/api";
import useAuth from "../../../../Auth/useAuth";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const ContentBox = styled(Box)(({ theme }) => ({
    margin: '30px',
    flexGrow: '1',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));
  
const StyledButton = styled(Button)(() => ({
    marginLeft:"10px",
    fontFamily: 'HiraKakuProN-W6',
    color: 'black',
    border:' solid 0px',
    backgroundColor: '#dedede',
    '&:hover':{
        border:' solid 0px',
        backgroundColor: '#000',
        color: 'white',
    }
}));
  
const ItemBox = styled('div')(({ theme }) => ({
    display:"flex",
    '&.left':{
        display:"table-column",
        // marginTop:"2%" ,
        width: '30%',
    }, 
    '&.right':{
        display:"table-column",
        marginTop:"2%" ,
        width: '70%',
    },

    }));

function Index(){
    const [value,setValue] = useState([])
    const {reload,setReload} = useProvide()
    const navigate =useNavigate()
    const url = useLocation()
    const  state =  url?.state;  
    const {isGuest} = useAuth();

    useEffect(()=>{ 
        var params = new URLSearchParams();
        params.append('id', state.Id);
        params.append('follower_id',localStorage.getItem("id"));
        (async()=>{  
            console.log("-----ユーザー情報取得-----")
            const userResult = await api.post('user/get/partner', params)
            setValue(userResult.data);
         })()
    },[reload]);

    const chatTo = (async()=>{

        var params = new URLSearchParams();
            params.append('user_id', state.Id);
            params.append('my_id',localStorage.getItem("id"));
            params.append('name',localStorage.getItem("name"));
        const result = await api.post('/chat/create', params)
        navigate("/chat",{state: { id: result.data.id, roomName: result.data.roomName}})
    });
    
    const handleClickOpen = () => {
        if(value.Follower?.length === 0){
            // 保存
            axios
            .post('/users/follow',new URLSearchParams({"user_id":state.Id,"follower_id":localStorage.getItem("id")}))
            .then(function(data){
                console.log(data.data)
                setReload(!reload);
            });
        }else{
            // 解除
            axios
            .post('/users/unfollow',new URLSearchParams({"user_id":state.Id,"follower_id":localStorage.getItem("id")}))
            .then(function(data){
                console.log(data.data)
                setReload(!reload);
            });
        }
    };

    return(
        <ContentBox>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Item>
                        {/* ユーザー情報 */}
                        <ItemBox className="main">
                            <ItemBox className="left">       
                                <IconAria image={value.image} name={value.name} UserId={value.UserId}/>

                                { isGuest != 'true' &&  
                                    <div style={{display:"flow-root",marginLeft:"5px"}}>
                                        <StyledButton variant="outlined" endIcon={< ArrowForwardIcon/>}  onClick={handleClickOpen}>
                                            {value.Follower?.length === 0?"フォロー":"フォロー中" }
                                        </StyledButton>
                                        <StyledButton variant="outlined"  onClick={chatTo} endIcon={<SendIcon />}>
                                            メッセージ
                                        </StyledButton>
                                    </div>
                                }

                                    <ButtonGroup 
                                        article={value.Article}
                                        follow = {value.Follow}
                                        follower = {value.Follower}
                                        favorite = {value.FavoriteArticle}
                                    ></ButtonGroup>
                                <div style={{textAlign: "left",margin:"6px 8% 10px 8%"}}>
                                    <h1 style={{borderBottom:'solid'}}>ABOUT ME</h1>
                                    <p>{value.introduction }</p>
                                    <h1 style={{borderBottom:'solid'}}>SKILLS</h1>
                                    <p>{value.introduction }</p>
                                </div>  
                            </ItemBox>
                            <ItemBox className="right">
                                {/*　タブ  */}
                                <ArticleTab/>
                            </ItemBox>
                        </ItemBox>
                    </Item>
                </Grid> 
            </Grid>
        </ContentBox> 
    )
}

export default Index;

