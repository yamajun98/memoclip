import { Autoplay, Pagination, Navigation } from "swiper";// モジュールをインポート
import { Swiper, SwiperSlide } from 'swiper/react';
import { styled } from '@mui/material/styles';

import 'swiper/css';
import 'swiper/css/navigation'; // スタイルをインポート
import 'swiper/css/pagination'; // スタイルをインポート
import './CSS/slider.css';

    const ImageBox = styled('div')(({ url }) => ({
    '&.image':{
            width: '100%',  
            height: '100%', 
            backgroundImage: 'url('+url+')',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat:' no-repeat',
            zIndex: '1',
            position: 'relative',
        },
    }));

    const Item = styled(SwiperSlide)(()=>({
        textAlign:'center',
        width:'500px',
        backgroundColor: '#f6f6f6',
        '&::after': {
            content:'""',
            position:'absolute',
            top:' 0',
            left:' 0',
            zIndex:' 0',
            transition:' all 0.1s ease-in-out',
            display:' block',
            width:' 100%',
            height:' 100%',
            opacity:'0',
            background:' rgba(0,0,0, 0.4)',
            backgroundSize:' 50px',

        },
        '&:hover .buttonbox':{
                // color: 'black'
                opacity:'1',
                transition: '1s all',
        },  
        '&:hover::after':{
            zIndex:'1',
            opacity:'1',
        }, 
    }))

    const ButtomBox = styled('div')(()=>({
        width: '22%',
        height:'9%',
        paddingTop: '5px',
        zIndex: '2',
        position: 'relative',
        textAlign: 'center', 
        bottom: '195px',
        border: 'solid 2px ',
        marginLeft: '39%', 
        color: 'azure',
        backgroundColor: 'black',
        opacity:'0',
    }))

export default function Swiper1() {
   
    //記事を取得する

  return (
        <div 
            className="slider__wrapper"
            style={{position: 'relative',width:' 90%',height:'100%',marginLeft: '6%'}}
        >
            <Swiper
                modules={[Autoplay,Navigation, Pagination]}
                speed={1300}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    // パラメータを設定
                    prevEl: "#button_prev",
                    nextEl: "#button_next"
                }}
                pagination={{
                    el: "#pagination",
                    clickable:true
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                style={{
                    height:'100%',
                    width:'100%'
                }}
            >
                <Item >
                    <ImageBox className='image' url={"/image.jpeg"}/> 
                    <ButtomBox className="buttonbox" >READ MORE</ButtomBox>
                </Item>
                <Item >
                    <ImageBox className='image' url={"/image.jpeg"}/> 
                    <ButtomBox className="buttonbox" >READ MORE</ButtomBox>
                </Item>
                <Item >
                    <ImageBox className='image' url={"/image.jpeg"}/> 
                    <ButtomBox className="buttonbox" >READ MORE</ButtomBox>
                </Item>
                <Item >
                    <ImageBox className='image' url={"/image.jpeg"}/> 
                    <ButtomBox className="buttonbox" >READ MORE</ButtomBox>
                </Item>
            </Swiper>

            <div id="button_prev" className="swiper-button-prev"/>
            <div id="button_next" className="swiper-button-next"/>
            <div id="pagination" className="swiper-pagination" style={{marginBottom:' 3%'}}/>
        </div>
  );
};