import { Avatar, Hidden,Button, Icon,InputAdornment, MenuItem, useMediaQuery,TextField,IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { Box, styled, useTheme, } from '@mui/system';
// import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from '../../Theme/themeColors';
// import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from '../../../Auth/useAuth';
import useSettings from '../../../Setteing/useSettings';
import { topBarHeight } from '../../Theme/constant';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import useSearch from '../../../Setteing/useSearch';
// import { Span } from '../../../components/Typography';
// import NotificationBar from '../../NotificationBar/NotificationBar';
// import ShoppingCart from '../../ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Logout';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  // color: theme.palette.text.primary,
  color:'black',
  '&:hover': {
      color: '#fff',
  },
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[2],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));
const StyledItem = styled('div')(({ theme }) => ({
  border: 'none',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  borderRadius: '4px',
  '&.title_box':{
    // borderBottom: 'solid 2px', 
    borderRadius: '0px',
    textAlign: 'center',
}
}));

const SearchBox = styled(Box)(() => ({
  marginLeft:"14%",
  display:"flex",
  component:"form",
  borderBottom: 'solid 1px'
}));

const ItemBox = styled(Box)(() => ({
  display: 'flex',
  '&.LeftBox':{
    border: '3px solid #000',
    backgroundColor:'#fff',
    '&:hover': {
      backgroundColor: '#000',
      transition:' all 0.3s',
      '&.leftbutton':{
        color: '#fff',
      }
    },
  }
}));

const StyledButton = styled(Button)(() => ({
'&.btn':{
  transition: 'height 0.2s',
  border:' none',
  borderRadius: '0px',
  fontFamily:' inherit',
  fontSize:' inherit',
  cursor:' pointer',
  // padding:' 25px 80px',
  display:' inline-block',
  margin:' 5px 5px',
  textTransform:' uppercase',
  letterSpacing:' 1px',
  fontWeight:' 700',
  outline:' none',
  position:' relative',
  transition:' all 0.3s', 
  '&.high' :{
    height: '300px'
  },
  '&:after':{
      content:'""',
      position:'absolute',
      background:' rgba(255,255,255,0.1)',
      zIndex:'-1',
      transition:' all 0.3s',
    },
   '&.btn-3' :{
    border: '3px solid #000',
    color:' #000',
      '&:hover': {
        color: '#fff',
        background: '#000',
      },
    
    },

  },
}));

const MainTopbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  const [searchKeyword, updateKeyword] = React.useState('');
  const { logout, isGuest } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
        leftSidebar: { ...sidebarSettings } ,
    });
  };
  
  const handleSidebarToggle = () => {
    let { leftSidebar } = settings;
    let mode;
    if (isMdScreen) {
      mode =leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };// サイドバー切り替え

  const onClickSignout = () => {
    logout()
  }
  const onClickSignin = () => {
    logout()
    navigate('/session/signin')
  }
  const CreateArticleLink = () => {
    navigate('/article/create')
  }
  console.log(typeof isGuest);
 
  return (
    <TopbarRoot>
      <TopbarContainer>

        <ItemBox className='LeftBox'>
          <StyledIconButton className='leftbutton' onClick={handleSidebarToggle} >
            <DensityMediumIcon/>
          </StyledIconButton>
        </ItemBox>

        <SearchBox>
          <InputBase
            sx={{ ml: 1, flex: 1 ,width: '40ch'}}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            value = {searchKeyword}
            onChange={(event) => updateKeyword(event.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
              type="button" 
              sx={{ p: '10px' }} 
              aria-label="search" 
              component={Link}  
              to={`search?keyword=${searchKeyword}`} 
              onClick={() => updateKeyword('')}
              disabled={searchKeyword.length == 0}
            >
              <SearchIcon />
            </IconButton>    
         </SearchBox>

        <ItemBox>
          
          { isGuest == 'true' ? 
              <StyledButton  tyledButton className="btn btn-3  " onClick={onClickSignin}>
                LogIn
              </StyledButton>
            :
            <>
              <StyledButton className="btn btn-3  " onClick={onClickSignout}>
                LogOut
              </StyledButton> 
              <StyledButton className="btn btn-3  " onClick={CreateArticleLink}>
                POST
              </StyledButton>         
            </>

          }
          

        </ItemBox>

      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(MainTopbar);
