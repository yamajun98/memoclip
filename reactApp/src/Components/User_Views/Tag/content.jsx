import Article from "../Article/article";
import {useContext,useEffect,useLayoutEffect,useState} from "react"
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation,Link,useParams } from "react-router-dom";
// import { useContentContext } from '../../provider/TagProvide';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
// import Swiper from './slider'; 
import useSearch from '../../../Setteing/useSearch';
import { api } from "../../../Function/api";

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
        // bottom: '0',
        // left: '0',
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

function Section(props) {
  const url = useLocation()
  const pram = useParams()
  const  state =  url?.state;   
  const [article, setData] = useState([]);
  const [count, setCount] = useState(0);
  const { searchKeyword, updateKeyword } = useSearch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // 記事一覧データ取得
  useEffect(() => { 
        console.log('タグ記事取得--'+state.tag+'--');
        (async()=>{
            const result = await api.post('/article/get/tag',new URLSearchParams({"page":page,"tag_id":state.Id,"id":localStorage.getItem("id")}))
                console.log(result)
                setData(result.data.value)
                setCount(result.data.num)
        })()

      
  },[page,url]);

  return(
        <Grid container spacing={1} >
            <Grid xs={12} lg={12} >
                <StyledItem>
                <StyledTitle>
                    <StyledTitleH1>TAG ARTICLE</StyledTitleH1>
                </StyledTitle>
                </StyledItem>
            </Grid>
                {article?.map(value => 
                <Article 
                    key={value.Article_tag.id}
                    id={value.Article_tag.id}
                    title= {value.Article_tag.title} 
                    tags ={value.Article_tag.Tags} 
                    user={value.Article_tag.Users}
                    createdAt ={value.Article_tag.createdAt}
                    favorite={value.Article_tag.favoriteArticle_article}
                    >  
                </Article>
                )}
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
                        state={{ Id:state.Id}}
                        {...item}
                        />
                    )}
                    />
                </StyledItem>
            </Grid>        
        </Grid>
  );
}

export default Section;