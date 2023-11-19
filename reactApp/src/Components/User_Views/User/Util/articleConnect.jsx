import {useContext,useEffect,useLayoutEffect,useState} from "react"
import axios from 'axios';
import { useLocation,Link,useParams } from "react-router-dom";
import { useProvide } from "../../../../provider/UserpageProvide";
import Article from "../../Article/article";
import Grid from '@mui/material/Unstable_Grid2';
import { api } from "../../../../Function/api";
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const StyledItem = styled('div')(({ theme }) => ({
  border: 'none',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  borderRadius: '4px',
    }));

function Section(props) {
  const {num} = props
  const url = useLocation()
  const pram = useParams()
  const  state =  url?.state;   
  const [article, setData] = useState([]);
  const [count, setCount] = useState(0);
  const {reload,setReload} = useProvide()
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);

  // 記事一覧データ取得
  useEffect(() => {
    (async()=>{
      if(url.pathname == "/mypage"){
          console.log('記事取得--mypage--')
          const result = await api.post('article/get/mypage',new URLSearchParams({"id":localStorage.getItem("id"),"page":page,"status":num}))
          console.log(result.data[0].value)
          setData(result.data[0].value)
          setCount(result.data[1].num)
      }else if(url.pathname == "/user/"+pram.userId){
        console.log('ユーザー記事取得--'+pram.userId+'--')
        const result = await api.post('article/get/partner',new URLSearchParams({"id":localStorage.getItem("id"),"user_id":state.Id,"page":page,"status":num}))
        setData(result.data[0].value)
        setCount(result.data[1].num)
      }
    })()
  },[page,num,state?.bloom,reload]);

  return(   
    <Grid container spacing={1} >
      <Grid container spacing={2} xs={12} lg={12} style={{height: 'fit-content'}}>  
          {article?.map(value => 
                <Article 
                    key={value.id}
                    id={value.id}
                    title= {value.title} 
                    tags ={value.Tags} 
                    user={value.Users}
                    createdAt ={value.createdAt}
                    favorite={value.favoriteArticle_article}
                    >  
                </Article>
          )}
        </Grid>
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
                  state={{ Id:state?.Id}}
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