import * as React from 'react';
import { Avatar, Hidden,Button, Icon,InputAdornment, MenuItem, useMediaQuery,TextField,IconButton } from '@mui/material';
import axios from 'axios';
import {api} from '../../../../../Function/api'
import FavoriteList from '../../Mypage/FavoriteList';
import UserListFollow from './List/UserListFollow';
import UserListFollower from './List/UserListFollower';
import { useContentContext } from '../../../../../provider/MypageProvide';
import { H1 } from '../../../../../Setteing/Typography';
import { Box, styled, useTheme, } from '@mui/system';
import { useLocation,Link,useParams,useNavigate } from "react-router-dom";

  const StyledButton = styled(Button)(() => ({
      '&.btn':{
        height:'28px',
        border:' none',
        fontFamily:' inherit',
        fontSize:' inherit',
        cursor:' pointer',
        padding:' 25px 80px',
        display:' inline-block',
        margin:' 24px 3px 0px 0px',
        textTransform:' uppercase',
        letterSpacing:' 1px',
        fontWeight:' 700',
        outline:' none',
        position:' relative',
        transition:' all 0.3s',
        '&.btn-3' :{
            background: '#000000',
            color: '#fff',
            '&:hover': {
              background: '#000000',
            },
            '&:active' :{
              background: '#000000',
              top: '2px',
            },
            '&:before' :{
              position:' absolute',
              height:' 100%',
              left:' 0',
              top:' -27px',
              lineHeight:'3',
              fontSize:'200%',
              width:' 22px',
            },
            '&:after': {
              content:'""',
              position:' absolute',
              transition:' all 0.3s',
            },
          },
          '&.btn-3e':{
            padding: '11px 49px 10px 18px',
            overflow: 'hidden',
            '&:hover:after':{
              width: '35%'
            },
            '&:before' :{
              left: 'auto',
              zindex: '2',
            },
            '&:after':{
              width:' 30%',
              height:' 200%',
              background:' rgba(255,255,255,0.1)',
              zIndex:' 1',
              right:' 0',
              top:' 0',
              margin:' -5px 0 0 -5px',
              transformOrigin:' 0 0',
              transform:' rotate(-20deg)',
            },
          },
          // アイコン追加
          '&.icon-arrow-right:before': {
            content: '"⬅︎"',
          }
        },
      }));
  const ContentBox = styled('div')(({ theme }) => ({
      margin: '0px 10px 10px 10px',
      role:"presentation",
      [theme.breakpoints.down('sm')]: { margin: '16px' },
      }))
  const TopBox = styled(Box)(({ theme }) => ({
          borderBottom: 'solid 2px',
          display:'flex',
      }))
  const StyledText = styled(H1)(() => ({
    fontFamily: 'impact',
    marginLeft: '25%',
    marginTop:'15px',
    }));

export default function TemporaryDrawer($props) {
    const {anchor,toggleDrawer,value} = $props
    const [datas,setDatas] = React.useState([]);
    const {open,setOpen,updateProfile} = useContentContext();
    const url = useLocation()
    const state =  url?.state; 

    React.useEffect(()=>{ 
        console.log("-----ユーザー情報取得-----");
      (async() => {
          if(url.pathname == "/mypage" ){
              const result = await api.post('userpage/'+value, new URLSearchParams({id:localStorage.getItem('id')}))
              setDatas(result.data)
              console.log(result.data)
          }else{
              const result = await api.post('userpage/'+value, new URLSearchParams({id:state.Id}))
              setDatas(result.data)
          }
        }
      )()
    },[open])

    const returnComponent=()=>{
        if(value == 'follower'){
        return (
            <UserListFollower datas={datas}></UserListFollower>
            )
        }else if(value == 'follow'){
            return (
                <UserListFollow datas={datas}></UserListFollow>
                )
        }else if(value == 'favorite'){
            return (
                <FavoriteList datas={datas}></FavoriteList>
            )
        }
    }

  return(
    <ContentBox sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }} onKeyDown={toggleDrawer}>
        <TopBox>
            <StyledButton onClick={()=>{
              toggleDrawer();
              updateProfile();
              }} className="btn btn-3 btn-3e icon-arrow-right"/>
        <StyledText className="sidenavHoverShow">
            {value}
        </StyledText>
        </TopBox>
        {returnComponent()}
    </ContentBox>    
  );
}