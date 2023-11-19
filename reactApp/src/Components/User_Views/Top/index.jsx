import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import TagList from './SubContent/tagList';
import UserList from './SubContent/userList';
import Content from "./MainContent/content";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Title  from './title';
import './CSS/circle.css';

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const StyledItem = styled('div')(({ theme }) => ({
        border: 'none',
        borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
        borderRadius: '4px',
        height: '100%',
            overflow: 'hidden',
        '&.title_box':{
            borderBottom: 'solid 1px',  
            borderRadius: '0px',
            textAlign: 'center',
        }
    }));

    const EmptyBox = styled('div')(({ theme }) => ({
        height:'16px',
        width:'10%'
    }));

    const ContentBox = styled('div')(({ theme }) => ({
        margin: '3px 30px 30px 30px',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));

    const ImageBox = styled('div')(({url}) => ({
        '&.image1':{
            width: '400px',  
            height: '300px', 
            marginLeft: 'auto',
            marginRight: '10%',
            marginTop: '60px',
            backgroundImage: 'url('+url+')',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat:' no-repeat',   
        },    
        '&.image2':{
            width: '400px',  
            height: '150px', 
            marginTop: '60px',
            zIndex: '1',
            top: '-61%',
            left: '23%',
            position: 'relative',
            backgroundImage: 'url('+url+')',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center center',
            backgroundRepeat:' no-repeat',   
        }
    }));

    const Btnripple = styled('div')(({url}) => ({}));

export default function Index(){ 
    return(
        <ContentBox>
            <Box sx={{ flexGrow: 1 }}> 
                <Grid container spacing={1}>{/* タイトルコンテンツ  */}
                    <Grid xs={12} lg={12} >
                        <StyledItem className='title_box'>
                            <Title></Title>
                            <Btnripple className='btnripple'></Btnripple>
                            <Btnripple className='btnripple2'></Btnripple>
                            <Btnripple className='btnripple3'></Btnripple>
                        </StyledItem>
                    </Grid>             
                    <Grid xs={3} lg={3} >{/* サブコンテンツ  */}
                        <StyledItem>
                            <TagList></TagList>
                            <EmptyBox></EmptyBox>
                            <UserList></UserList>
                        </StyledItem>
                    </Grid>
                    <Grid container xs={9} lg={9} style={{height: 'fit-content'}}> {/* メインコンテンツ  */}
                            <Content></Content>
                    </Grid> 
                </Grid>
            </Box>
        </ContentBox>    
    ) 
};
