import React,{useState,useEffect, Fragment} from "react";
import Avatar from '@mui/material/Avatar'; 
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Paragraph, Span } from '../../../../../Setteing/Typography';
import { useContentContext } from '../../../../../provider/MypageProvide';
import axios from 'axios';
import useAuth from "../../../../../Auth/useAuth";

const ContentBox = styled(Box)(() => ({
    margin: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottom: 'solid 1px',
    borderTop: 'solid 1px',
  }));

const ItemBox = styled(Box)((width,heigth) => ({
    height: heigth,
    margin: '5px',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'space-around',
  }));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 80,
    height: 80,
    type: 'button',
    margin:'auto',
    border: `2px solid ${theme.palette.background.paper}`,
    src:'/image/userIcon.jpeg'
}));

const StyledText = styled(Span)(({ mode }) => ({
    display : 'block',
    fontFamily:'impact',
    heigth :'10px',
    width : 'auto',
    fontSize: '0.95rem',
    textAlign: 'center',
    // display: mode === 'compact' && 'none',
  }));

function ProfileIndex() {

    const {open,setOpen,value} = useContentContext();
    const {isGuest} = useAuth(); 

    return (
                <ContentBox>
                        {/* ユーザー情報 */}
                        {value.image == undefined ?
                        <SmallAvatar src={"/image/userIcon.jpeg"}/>
                          :
                          <SmallAvatar src={"/image/"+ value?.image}/>
                          }
                            
                            <ItemBox>
                                <StyledText >
                                  {value?.name}
                                </StyledText>
                            </ItemBox>
                        {/* フォロー、フォロワー */}
                        {
                          isGuest != 'true' &&  
                            <ItemBox heigth = {'30px'} width = {'auto'}>
                              <div style={{display:'table-column'}}>
                                <StyledText > FOLLOW</StyledText>
                                <StyledText > {value.Follow?.length}</StyledText>                            
                              </div>
                              <div style={{display:'table-column'}}>
                                <StyledText > FOLLOWER</StyledText>
                                <StyledText > {value.Follower?.length}</StyledText>                            
                              </div>
                            </ItemBox>
                        }
 
                </ContentBox>     

    )
  };
  
  export default React.memo(ProfileIndex);