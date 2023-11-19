
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import { useLocation,useParams } from "react-router-dom";




const ContentBox = styled('div')(({ theme }) => ({
margin: '3px 30px 30px 30px',
[theme.breakpoints.down('sm')]: { margin: '16px' },
}));




function Index(){ 
    const pathname = useLocation().pathname

   return(
    <>

        <ContentBox>
            <Box sx={{ flexGrow: 1 }}> 
                <div>パスワード変更</div>
                <div>画面カラーチェンジ</div>
            </Box>
        </ContentBox>    
    </>

    ) 
}

 export default Index;
