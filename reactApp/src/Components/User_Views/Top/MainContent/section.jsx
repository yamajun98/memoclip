import {useContext,useEffect,useLayoutEffect,useState} from "react"
import { useLocation,Link,useParams } from "react-router-dom";
import { useProvide } from "../../../../provider/UserpageProvide";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Article from "../../Article/article";
import {api} from '../../../../Function/api';
import Button from '@mui/material/Button';

  const StyledItem = styled('div')(({ theme }) => ({
    border: 'none',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    borderRadius: '4px',
    textAlign:'center',
    }));
    
  const StyledButton =  styled(Button)(() =>({
      color: 'black',
      '&:hover':{
        background: '#fff',
        textDecorationLine: 'underline',
      }
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

export default function Section(props) {
  // latest favorite　を受ける
  const {name} = props
  const [article, setData] = useState([]);
  const [toggle, setToggle] = useState(true);


  // 記事一覧データ取得
  useEffect(() => {
        console.log('記事取得--top['+name+']--');
        (async() => {
          const result = await api.post('article/get',new URLSearchParams({"page":1,"keyword":name,"id":localStorage.getItem("id")}))
          console.log(result)
          setData(result.data)
        })()
  },[]);

  return(
      <> 
        {article?.map(value =>   
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
            <StyledButton>{name}をもっと見る➡︎</StyledButton>
          </StyledItem>
        </Grid>
      </>
  )
}