import React,{useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ArticleTab from "./ArticleTab";
import ButtonGroup from "../Util/buttonGroup";
import { Button } from "@mui/material";
import Profile from "./Profile/edit";
import IconAria from '../Util/IconAria';
import { useContentContext } from '../../../../provider/MypageProvide';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation,Link } from "react-router-dom";

    const TagButton= styled(Button)(({ theme }) => ({
        border: 'solid 2px ',
        borderRadius:"0",
        fontSize: '12px',
        padding:'0px',
        margin: '10px 2px 2px 5px',
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
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const ContentBox = styled('div')(({ theme }) => ({
            margin: '30px',
            [theme.breakpoints.down('sm')]: { margin: '16px' },
        }));
    const ItemBox = styled('div')(({ theme }) => ({
            display:"flex",
            '&.left':{
                display:"table-column",
                width: '30%',
            }, 
            '&.right':{
                display:"table-column",
                marginTop:"2%" ,
                width: '70%',
            },
        }));
  
    const SetteingButton = styled(Button)(( ) => ({
            '&.setteing:hover .jun':{
                transform:'rotate(180deg)',
                transition: '0.5s linear',   
            },
            '&.setteing:hover ':{
                background:"white"
            },
        }));

export default function Index(){

    const {open,setOpen,value} = useContentContext();
    const [bloom,setBloom] = useState(false);

    const handleClickOpen = () => {
        setBloom(true);
      };
    
      const handleClose = () => {
        setBloom(false);
      };
    return(
        <ContentBox>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Item>
                            {/* ユーザー情報 */}
                            <ItemBox className="main">
                                <ItemBox className="left">
                                        <div style={{position:"absolute",left: '26%',top: '18%'}}>
                                            <SetteingButton disableRipple={true} className="setteing" onClick={handleClickOpen}><SettingsIcon className="jun " style={{color:"black"}}/></SetteingButton>
                                        </div>
                                    <IconAria image={value?.image} name={value?.name} UserId={value?.UserId}/>
                                    <ButtonGroup 
                                        article={value.Article}
                                        follow = {value.Follow}
                                        follower = {value.Follower}
                                        favorite={value.FavoriteArticle}
                                    />
                                    <div style={{textAlign: "left",margin:"6px 8% 10px 8%"}}>
                                        <h1 style={{borderBottom:'solid'}}>ABOUT ME</h1>
                                            <p>{value?.introduction }</p>
                                        <h1 style={{borderBottom:'solid'}}>SKILLS</h1>
                                         
                                        {value.UserTags?.map(value => 
                                            <TagButton 
                                                key ={value.id} 
                                                component={Link}  
                                                to={'/tag/' + value?.name}
                                                state={{ Id: value.id }}   
                                                >
                                                {value.name}
                                                
                                            </TagButton>
                                        )}  
                                    </div>  
                                             
                                        <Profile open={bloom} onClose={handleClose}/>
        
                                </ItemBox>
                                <ItemBox className="right">
                                    {/*　タブ  */}
                                    <ArticleTab/>
                                </ItemBox>
                            </ItemBox>
                        </Item>
                    </Grid> 
                </Grid>
            </Box> 
        </ContentBox>
    )
}


