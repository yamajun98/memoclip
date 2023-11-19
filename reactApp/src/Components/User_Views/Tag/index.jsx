import Box from '@mui/material/Box';
import { Avatar, Hidden,Button, Icon,InputAdornment, MenuItem, useMediaQuery,TextField,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useLocation,useParams,Link,useNavigate,useSearchParams } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import  Article from './content';
import  TagHeader from './header';

const ContentBox = styled('div')(({ theme }) => ({
        margin: '3px 30px 30px 30px',
        position: 'relative',
        // top: '33%',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));

const CustomBox = styled('div')(() => ({
        // backgroundColor: 'rgb(0 0 0 /5%)',
    }));

const SearchBox = styled(Box)(() => ({
        // marginLeft:"14%",
        display:"flex",
        component:"form",
        border: 'solid 1px',
        borderRadius: '22px',
        width: '100%',
    }));
const AccordionDetailsbox = styled(AccordionDetails)(() =>({
    '&::before':{
        content: '""',
        position: 'absolute',
        left: '0',
        right: '0',
        width: '100%',
        height: '1px',
        margin: '0 auto',
        textAlign: 'center',
        background: '#FFF' ,/*この部分は後にlinear-gradientへ*/
        backgroundImage: '-webkit-linear-gradient(left, transparent, #000 40%, #000 60%, transparent)',
        backgroundImage: 'linear-gradient(to right, transparent, #000 40%, #000 60%, transparent)',
        backgroundPosition: 'center',
        backgroundRepeat:' no-repeat',
    },
    '&::after':{
        content: '""',
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        height: '1px',
        margin: '0 auto',
        textAlign: 'center',
        background: '#FFF' ,/*この部分は後にlinear-gradientへ*/
        backgroundImage: '-webkit-linear-gradient(left, transparent, #000 40%, #000 60%, transparent)',
        backgroundImage: 'linear-gradient(to right, transparent, #000 40%, #000 60%, transparent)',
        backgroundPosition: 'center',
        backgroundRepeat:' no-repeat',
    }
}))

const AccordionSummarybox = styled(AccordionSummary)(() => ({
    '&.Mui-focusVisible':{
        backgroundColor: 'rgb(0 0 0 /0%)',
    },
    '&.css-o4b71y-MuiAccordionSummary-content +.Mui-expanded': {
        margin: '0px', 
    }
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

function Index(){ 

   return(
        <ContentBox>
            <TagHeader></TagHeader>
            <Article></Article>
        </ContentBox>    
    ) 
}

 export default Index;
