import Article from "../Article/article";
import {useContext,useEffect,useLayoutEffect,useState} from "react"
import {api} from '../../../Function/api';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useLocation,Link,useParams,useSearchParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import useSearch from '../../../Setteing/useSearch';
import { useProvide } from "../../../provider/UserpageProvide";

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

  const [datas, setDatas] = useState([]);
  const {reload,setReload} = useProvide();
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);


  // 検索記事データ取得
  useEffect(() => {
    (async()=>{
        console.log('記事取得--'+searchParams.get("keyword")+'--')
        const result = await api.post('/article/get/search',new URLSearchParams({"page":page,"keyword":searchParams.get("keyword"),"id":localStorage.getItem("id")}))
        console.log(result)
        setDatas(result.data[0].value)
        setCount(result.data[1].num)
    })()
  },[page,reload,location]);

  return(
        <Grid container spacing={1} >
            <Grid xs={12} lg={12} >
                <StyledItem>
                <StyledTitle>
                    <StyledTitleH1>RESULT</StyledTitleH1>
                </StyledTitle>
                </StyledItem>
            </Grid>
                {datas?.map(value => 
                <Article 
                    key={value.id}
                    id={value.id}
                    title= {value.title} 
                    tags ={value.Tags} 
                    user={value.User}
                    createdAt ={value.createdAt}
                    favorite={value.favoriteArticle_article}
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
                        to={`${item.page === 1 ? `?keyword=${searchParams.get("keyword")}` : `?keyword=${searchParams.get("keyword")}&page=${item.page}`}`}
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