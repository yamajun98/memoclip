import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteButton  from './deleteButton';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useLocation,Link } from "react-router-dom";
import FavoriteButton from './favoriteButton'
import Grid from '@mui/material/Unstable_Grid2';

    const StyledItem = styled('div')(({ theme }) => ({
        '&.jun':{
            borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
            borderRadius: '0px',
            padding:'5%',
        }
        }));

    const ImageBox = styled('div')(({ url }) => ({
        '&.imagearea':{
            width: '98%',  
            height: '180px', 
            boxShadow:  '5px 6px 3px black', 
            overflow:'hidden',
            position: 'relative',
            textAlign: 'center',
            cursor: 'pointer',
            '&::after': {
                content:'""',
                position:'absolute',
                top:' 0',
                left:' 0',
                zIndex:' 0',
                transition:' all 0.1s ease-in-out',
                display:' block',
                width:' 100%',
                height:' 100%',
                opacity:'0',
                background:' rgba(255,255,255, 0.7)',
                backgroundSize:' 50px',
            },  
            '&:hover::after':{
                zIndex:'2',
                opacity:'1',
            },
        },
        '&.image':{
                width: '100%',  
                height: '180px', 
                margin: 'auto',
                backgroundImage: 'url('+url+')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat:' no-repeat',
                zIndex: '1',
                position: 'relative',
            },
        }));

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

    const Section= styled('section')(({ theme }) => ({
        borderBottom:' solid 1px #d4d4d4',
        '&:hover':{
            backgroundColor: 'rgb(0 0 0 /1%)',
            '&:hover .imagearea::after':{
                zIndex:'2',
                opacity:'1',
            },
            '&:hover .image':{
                transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
                transform: 'scale(1.2)',
            },
            '&:hover .h2css':{
                textDecoration: 'underline',
            },
        }
        }));
    const UserBox= styled(Button)(({ theme }) => ({
        textAlign:"left",
        display:'flex',
        justifyContent: 'left',
        '&:hover':{
            backgroundColor: 'rgb(0 0 0 /5%)',
            },
        '&:hover .username':{
            textDecoration: 'underline',
            },
        }));

    const UserNameBox= styled('div')(({ theme }) => ({ 
        overflow: 'hidden',
        display: '-webkit-box',
        webkitBoxOrient: 'vertical',
        margin:'5px 7px 5px 7px',
        webkitLineClamp: '2',
        fontSize:'x-large',
        fontFamily:'HiraKakuProN-W6',
        }));

function Article(props) {
    const tags = props.tags
    const user = props.user
    const url = useLocation()
    const formatDate = (dt) =>{
        return new Date(dt).toLocaleDateString();
    };
      
    const Url=(id)=>{
        if(id == localStorage.getItem("id")){
            return  '/mypage'
        }else{
            return  '/user/' + user?.userId
        }
    }
    return(
        <Grid xs={6} lg={4} md={6} >
            <StyledItem className='jun'>
                <Section>
                    <a href={'/article/item/' + props.id}  style={{textDecoration:"auto"}}>
                        <ImageBox className='imagearea'>
                            <ImageBox className='image' url={"/image.jpeg"} />
                        </ImageBox>
                    </a>   
                    <div style={{height:'30%'}}>
                         <a href={'/article/item/' + props.id}  style={{textDecoration:"auto"}}>
                        <UserNameBox className='h2css' >
                           {props.title}
                        </UserNameBox>
                        </a> 
                            <UserBox   component={Link}  to={Url(user?.id)}   state={{ Id:user?.id}}>
                                <Avatar style={{marginTop:"3px"}}
                                    src={"/image/"+user?.image}>
                                </Avatar> 
                                <div style={{display:'colum',marginLeft:'5%',color: '#585858'}}>
                                    <div className='username' style={{fontSize: '15px',fontFamily:'HiraKakuProN-W6',}}>{user?.name}</div>
                                    <div>{formatDate(props.createdAt)}</div>
                                </div>
                            </UserBox>
                        <footer>
                            <div style={{display:"flex",marginTop:'6px'}}>
                                {tags.map(value => 
                                    <TagButton 
                                        key ={value.id} 
                                        // className="button" 
                                        component={Link}  
                                        to={'/tag/' + value?.name} 
                                        state={{ Id: value.id, image:value?.image }}  
                                        >
                                        {value.name}
                                    </TagButton>
                                )}      
                                <div  style={{marginLeft:"auto"}}>
                                    {  user?.id == localStorage.getItem("id") ? 
                                                                        
                                        <> 
                                            {url.pathname == "/mypage" && 
                                                <>  
                                                    <IconButton variant="outlined" component={Link}  to={'/article/edit/' + props.title}   state={{ id: props.id }}> 
                                                        <EditIcon></EditIcon>
                                                    </IconButton>
                                                    <DeleteButton id={props.id}/>
                                                </>
                                            }
                                        </>
                                    :  
                                        <FavoriteButton id = {props.id} favorite = {props.favorite}/>     
                                    }
                                </div>
                            </div>  
                        </footer>   
                    </div>
                </Section>
            </StyledItem>
        </Grid>
    );
}
  

export default Article;