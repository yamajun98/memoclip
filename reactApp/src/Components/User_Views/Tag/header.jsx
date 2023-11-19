import { styled } from '@mui/material/styles';
import {useParams,useLocation} from 'react-router-dom';

const ContentBox = styled('div')(({ theme }) => ({
    margin: '20px 30px 20px 30px',
    position: 'relative',
    display:'flex',
    // top: '33%',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
}));
const HeaderBox = styled('div')(({ theme }) => ({
    position: 'relative',
    paddingTop:'20px',
    paddingBottom:'20px',
}));
const Item = styled('div')(({ url }) => ({
    '&.logo':{
        width: '25%',
        height: '125px',      
        marginRight:'20px',
        borderRadius: '15px',  
        backgroundImage: 'url(/image/'+url+')',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat:' no-repeat',
    },
    '&.title':{
        width: '80%',
        height: '90px',     
        fontSize: '49px',
        lineHeight: '81px',   
    }

}));


function Header(){ 
    const { name } = useParams();
    const url = useLocation()
    const  state =  url?.state;  
    return(
        <HeaderBox>
                <ContentBox>
                        <Item className='logo' url={state.image}>
                        </Item>
                        <Item className='title'>{name}</Item>
                </ContentBox>    
        </HeaderBox>
    
     ) 
 }
 
  export default Header;