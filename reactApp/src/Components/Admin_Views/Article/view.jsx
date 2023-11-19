import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import MDEditor from "@uiw/react-md-editor";
import { Link, useParams} from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { useContentContext } from '../../../provider/MypageProvide';
import { Span } from '../../../Setteing/Typography';
import throttle from 'lodash.throttle';
import Outline from './outline';

    const inputlabel={
        style:{
            fontSize: 20,
            fontFamily:'IMPACT'
        }
    }
    const ContentBox = styled('div')(({ theme }) => ({
        margin: '20px',
        flexGrow: '1',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));
    const  RightBox =styled('div')(() => ({
        // height: '111px',
        position:'fixed'
    }))
    const StyledStack = styled(Stack)(({ theme }) => ({
        marginTop: '10px',
        '&:hover .h2css':{
            textDecoration: 'underline',
            // backgroundColor: 'rgb(0 0 0 /1%)',
        },
        }));
    
    const TagButton= styled(Button)(() => ({
        border: 'solid 2px ',
        // display:"flex",
        borderRadius:"0",
        fontSize: '12px',
        padding:'0px',
        margin: '3px 5px 2px 0px',
        height: 'fit-content',
        width: 'fit-content',
        color:' #ffffff',
        backgroundColor: '#837f7f',
        fontWeight: '900',
        '&:hover':{
            backgroundColor: '#000',
        }
        }));
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        boxShadow:'0px 0px 0px 1px rgb(0 0 0 / 10%)',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        }));

export default function SimpleDialog($props) {
    const { setOpen,open,value } = $props;
    const num = useParams()

    const formatDate = (dt) =>{
            return new Date(dt).toLocaleDateString();
        };


    const handleClose = () => {
            setOpen(false);
        };  


    
    return (
      <Dialog  open={open} >
        <DialogTitle style={{textAlign:"center",backgroundColor:'#000',fontFamily:'IMPACT',color:'white'}}>
            View
                        {/* アクションボタン */}
            <div style={{ position: 'absolute', right: '0px', top: '7px'}}>
                    <DialogActions>
                        <Button onClick={handleClose}>閉じる</Button>
                    </DialogActions>  
            </div>
        </DialogTitle>
    
            <div style={{margin:"15px",textAlign: "-webkit-center" }}>
                <ContentBox>
                <Grid container spacing={3} xs={12}>
                        <Grid xs={12}>
                            <Item>
                                <div style={{ padding: 15,textAlign: "initial" }}>
                                
                                    {/* タイトル */}
                                        <div style={{color:'#000',fontSize:'34px',fontFamily:'HiraKakuProN-W6'}}>
                                            {value.title}
                                        </div>
                                    {/* タグ */}
                                        <div style={{display:"flex"}}>
                                            {value.Tags?.map(value => 
                                            <TagButton key ={value.id} > {value.name} </TagButton>
                                            )} 
                                        </div>
                                    {/* ユーザー情報 */}
                                        <header>

                                                <StyledStack direction={"row"} spacing={2} >
                                                    <Avatar 
                                                    src={"/image/"+value.User?.image}
                                                    ></Avatar> 
                                                    <div>
                                                        <div className="h2css" style={{color:'#000'}}>{value.User?.name}</div>
                                                        <div style={{display:"flex"}}>
                                                            <p style={{marginBottom:"1px",marginTop:"2px",color:'#000'}}>投稿日：{formatDate(value.createdAt)}</p>
                                                            <p style={{marginBottom:"1px",marginTop:"2px",marginLeft:"10px",color:'#000'}}>更新日：{formatDate(value.updatedAt)}</p>
                                                        </div>
                                                    </div>
                                                </StyledStack>  
                                        </header>
                                </div>
                                <MDEditor.Markdown
                                    style={{ padding: 15,textAlign: "initial" }}
                                    source={value.body}
                                    linkTarget="_blank"
                                    previewOptions={{
                                        linkTarget: "_blank"
                                    }}
                                />  
                            </Item>
                        </Grid> 
                </Grid>
                </ContentBox>
            </div>
       
      </Dialog>
    );
  }




