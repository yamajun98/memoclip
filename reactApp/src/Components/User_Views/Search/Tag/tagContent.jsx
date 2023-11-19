import {useContext,useEffect,useLayoutEffect,useState} from "react"
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation,Link,useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Tags from './tag';
import useSearch from '../../../../Setteing/useSearch';
import { api } from "../../../../Function/api";

    const StyledItem = styled('div')(({ theme }) => ({
        border: 'none',
        borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
        borderRadius: '4px',
    }));

    const StyledTitle = styled('div')(() => ({
        borderBottom: 'solid 4px',
        width:'100%',
        display:"flex",
    }));

    const StyledTitleH1 = styled('div')(() => ({
        width:' auto',
        minWidth: '20%',
        backgroundColor:' #000000',
        color:' #FFF',
        fontSize:' 18px',
        textAlign:' center',
        fontFamily:'Montserrat, Arial, sans-serif',
        fontWeight:' 700',
        padding:' 9px 2px 5px 2px',
        float:' left',
    }));

    const StyledGrid = styled(Grid)(() => ({
        height: '450px',
        padding:' 0px 6px 0px 6px',
        margin: '7px',
        '@media(max-width: 1500px)':{
            height: '370px',
        },
        '@media(max-width: 1200px)':{
            height: '330px',
            maxHeight: '330px',
        },
        '@media(max-width: 1000px)':{
            height: '270px',
        },
        '@media(max-width: 600px)':{
            height: '240px',
        },
        '&::before':{
            content: '""',
            position: 'absolute',
            right: '5px',
            zIndex:'2',
            width: '74%',
            height: '1px',
            margin: '0 auto',
            textAlign: 'center',
            background: '#FFF' ,/*この部分は後にlinear-gradientへ*/
            backgroundImage: '-webkit-linear-gradient(left, transparent, #000 10%, #000 90%, transparent)',
            backgroundImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
            backgroundPosition: 'center',
            backgroundRepeat:' no-repeat',
        },
        '&::after':{
            content: '""',
            position: 'absolute',
            zIndex:'2',
            right: '5px',
            width: '74%',
            height: '1px',
            margin: '0 auto',
            textAlign: 'center',
            background: '#FFF' ,/*この部分は後にlinear-gradientへ*/
            backgroundImage: '-webkit-linear-gradient(left, transparent, #000 10%, #000 90%, transparent)',
            backgroundImage: 'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
            backgroundPosition: 'center',
            backgroundRepeat:' no-repeat',
        }
    }));


export default function TagContent(props) { 
  const [count, setCount] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  const [prop, setData] = useState([]);

  // タグ一覧取得
  useEffect(() => {
    (async()=>{
        const result = await api.get('/tag/get', {responseType: "json"},{ ContentType: 'application/json'})
        setData(...prop,result.data);
    })()
  },[page]);

  return(
        <Grid container spacing={1} style={{width: '70%',margin: 'auto'}}>
            {/* タグ名 */}
                <Grid xs={12} lg={12} >
                    <StyledItem>
                    <StyledTitle>
                        <StyledTitleH1>TAGS</StyledTitleH1>
                    </StyledTitle>
                    </StyledItem>
                </Grid>
            {/* タグ表示 */}
                {prop?.map(value => 
                    <Tags 
                        key={value.id}
                        name={value.name}
                        id={value.id}
                        image={value.image}
                    /> 
                )}
            {/* ページネーション */}
                <Grid xs={12} lg={12} >
                    <StyledItem>
                        <Pagination
                            page={page}
                            count={count}
                            style={{marginLeft: "46%",height: 'min-content'}}
                            renderItem={(item) => (
                                <PaginationItem
                                component={Link}
                                to={`${item.page === 1 ? '' : `?page=${item.page}`}`}
                                {...item}
                            />
                            )}
                        />
                    </StyledItem>
                </Grid>        
        </Grid>
  );
}