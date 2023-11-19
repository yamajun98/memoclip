import MDEditor from "@uiw/react-md-editor";
import { Link, useParams} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect,useRef,useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { api } from "../../../../Function/api";
import { List } from "@mui/material";
import throttle from 'lodash.throttle';
import Outline from './outline';

const ContentBox = styled(Box)(({ theme }) => ({
    margin: '30px',
    flexGrow: '1',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    }));

const  RightBox =styled('div')(() => ({
    // height: '111px',
    position:'fixed'
}))

const TagButton= styled(Button)(() => ({
    border: 'solid 2px ',
    // display:"flex",
    borderRadius:"0",
    fontSize: '12px',
    padding:'0px',
    margin: '3px 5px 2px 0px',
    height: 'fit-content',
    width: 'fit-content',
    color:' #ffffff',
    backgroundColor: '#837f7f',
    fontWeight: '900',
    '&:hover':{
        backgroundColor: '#000',
    }
    }));
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    boxShadow:'0px 0px 0px 1px rgb(0 0 0 / 10%)',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    }));

const StyledStack = styled(Stack)(({ theme }) => ({
    marginTop: '10px',
    '&:hover .h2css':{
        textDecoration: 'underline',
        // backgroundColor: 'rgb(0 0 0 /1%)',
    },
    }));
    

export default function Article(){
    const num = useParams()
    const [value,setValue]=React.useState([])
    const [elements,setElements]=React.useState([]);

    const [contents,setContents]=React.useState([]);

    const Url =()=>{
            if(value.User?.id == localStorage.getItem("id")){
                return  '/mypage'
            }else{
                return  '/user/'+value.User?.userId
            }
        }
        useEffect(() => { 
            console.log(window.scrollY)
        },[window.scrollY])
    const formatDate = (dt) =>{
            return new Date(dt).toLocaleDateString();
        };

    useEffect(()=>{
         console.log("記事詳細取得");
        (async()=>{
            const result = await api.post('/article', new URLSearchParams(num))
            setValue(result.data)
        })()
    },[]);

    useEffect(()=>{
        const element = Array.from(document.querySelectorAll("h1,h2"))
            .map((elem) => ({
                id: elem.id,
                text: elem.innerText,
                level: Number(elem.nodeName.charAt(1))
            }))
        // console.log(element);
        setElements(element)
       setContents(Array.from(document.querySelectorAll("h1,h2")))
    },[value]);

    useIntersectionObserver(contents);
    return(
        <ContentBox>
            <Grid container spacing={3} xs={12}>
                    <Grid xs={10}>
                        <Item>
                            <div style={{ padding: 15,textAlign: "initial" }}>
                               
                                {/* タイトル */}
                                    <div style={{color:'#000',fontSize:'34px',fontFamily:'HiraKakuProN-W6'}}>
                                        {value.title}
                                    </div>
                                {/* タグ */}
                                    <div style={{display:"flex"}}>
                                        {value.Tags?.map(value => 
                                            <TagButton 
                                                key ={value.id} 
                                                component={Link}  
                                                to={'/tags/' + value?.name}   
                                                >
                                                {value.name}
                                            </TagButton>
                                        )} 
                                    </div>
                                {/* ユーザー情報 */}
                                    <header>
                                        <Link to={Url()}   state={{ Id: value.User?.id }}>
                                            <StyledStack direction={"row"} spacing={2} >
                                                <Avatar 
                                                src={"/image/"+value.User?.image}
                                                ></Avatar> 
                                                <div>
                                                    <div className="h2css" style={{color:'#000'}}>{value.User?.name}</div>
                                                    <div style={{display:"flex"}}>
                                                        <p style={{marginBottom:"1px",marginTop:"2px",color:'#000'}}>投稿日：{formatDate(value.createdAt)}</p>
                                                        <p style={{marginBottom:"1px",marginTop:"2px",marginLeft:"10px",color:'#000'}}>更新日：{formatDate(value.updatedAt)}</p>
                                                    </div>
                                                </div>
                                            </StyledStack>  
                                        </Link>
                                    </header>
                            </div>
                            <MDEditor.Markdown
                                style={{ padding: 15,textAlign: "initial" }}
                                source={value.body}
                                linkTarget="_blank"
                                previewOptions={{
                                    linkTarget: "_blank"
                                }}
                            />  
                        </Item>
                    </Grid> 
                    <Grid xs = {2}>
                        <RightBox>
                            <Outline values ={elements} ></Outline>
                        </RightBox>
                    </Grid>
            </Grid>
        </ContentBox>
    )
}



const useIntersectionObserver = (refs) => {
    const state = useScrollPosition()
    console.log(state)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && state == 'down') {
                            // IntersectionObserver で設定された条件を満たした時に実行する処理
                            // 要素に active クラスを適用する
                            // entry.target.classList.add(styles.active)
                                Array.from(document.querySelectorAll(".class1, .class2"))
                                    .map((elem) => (
                                        elem.classList.remove('active')
                                    ))
                                document.querySelector("."+entry.target.id).classList.add('active') 
                            }else if(entry.isIntersecting && state == 'up'){    
                                    Array.from(document.querySelectorAll(".class1, .class2"))
                                    .map((elem) => (
                                        elem.classList.remove('active')
                                    ))
                                document.querySelector("."+entry.target.id).classList.add('active')
                            }else if(state == 'up'){
                                refs.forEach((ref,index) => {
                                   if(ref.id == entry.target.id && index != 0){      
                                        Array.from(document.querySelectorAll(".class1, .class2"))
                                            .map((elem) => (
                                                elem.classList.remove('active')
                                            ))
                                        document.querySelector("."+refs[index-1]?.id).classList.add('active') 
                                   }
                                }) 
                            }
                        })
                    }, {rootMargin: "0px 0px -50% 0px"})
        refs.forEach((ref) => {
            observer.observe(ref)
        })    
        return () => {
            refs.forEach((ref) => {
                observer.unobserve(ref)
            })  
        }
    })
  }


const useScrollPosition = () => {
    const [direction, setDirection] = useState('')
    const initY = useRef(0)

    useEffect(() => {
    const handler = throttle((event) => {
        if(document.querySelector(".scroll").scrollTop > initY.current){
            setDirection('down')
            initY.current = document.querySelector(".scroll").scrollTop
        }else{
            setDirection('up')
            initY.current = document.querySelector(".scroll").scrollTop
        }
    }, 100)
    // スクロールイベントの登録
    document.querySelector(".scroll").addEventListener('scroll', handler)
    return () => {
        // スクロールイベントの解除
        document.querySelector(".scroll").removeEventListener('scroll', handler)
    }
    }, [])

    return direction;
}
