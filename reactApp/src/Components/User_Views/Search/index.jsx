import Box from '@mui/material/Box';
import { Avatar, Hidden,Button, Icon,InputAdornment, MenuItem, useMediaQuery,TextField,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useLocation,useParams,Link,useNavigate,useSearchParams } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import React from "react";
import SearchContent from './content';
import TagContent from './Tag/tagContent';

    const ContentBox = styled('div')(({ theme }) => ({
        margin: '3px 30px 30px 30px',
        position: 'relative',
        [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));

    const SearchBox = styled(Box)(() => ({
        display:"flex",
        component:"form",
        border: 'solid 1px',
        borderRadius: '22px',
        width: '70%',
        margin:'10px auto 10px auto',
    }));


	

export default function Index(){ 

    const pathname = useLocation().pathname
    const pram = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKeyword, updateKeyword] = React.useState('');

    React.useEffect(() => {
        updateKeyword(searchParams.get("keyword"));
    },[searchParams.get("keyword")]);

   return(
        <ContentBox>
            <SearchBox> {/* 検索ボックス */}
                <InputBase
                    sx={{ ml: 1, flex: 1 ,width: '30ch'}}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    value = {searchKeyword}
                    onChange={(event) => updateKeyword(event.target.value)}
                    />
                    <Divider sx={{ height: 36, m: 0.5 }} orientation="vertical" />
                    <IconButton
                        type="button" 
                        sx={{ p: '10px' }} 
                        aria-label="search"
                        component={Link}  
                        to={searchKeyword?.length == 0 ||searchKeyword == null  ? `/search`:`?keyword=${searchKeyword}`}   
                    >
                    <SearchIcon />
                    </IconButton>    
            </SearchBox>
            {
             searchParams?.get("keyword") == null ? <TagContent/> : <SearchContent/>
            }
        </ContentBox>    
    ) 
}
