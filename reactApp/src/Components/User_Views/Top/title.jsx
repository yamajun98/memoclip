import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './CSS/circle.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const StyledBox = styled('div')(({url}) => ({
        '&.main':{
            margin: '3% 0 3% 10%',
            width:'80%',
        },
        '&.Righttriangle':{
            width: 0,
            height: 0,
            marginLeft:'auto',
            borderLeft: '70px solid transparent',
            borderRight: '0px solid transparent',
            borderTop:' 70px solid black',
            position: 'relative',
            zIndex: '1',
            top: '31px',
        },
        '&.Leftriangle':{
            width: 0,
            height: 0,
            borderLeft: '0px solid transparent',
            borderRight: '70px solid transparent',
            borderBottom:' 70px solid black',
            position: 'relative',
            zIndex: '1',
            bottom: '25px',
        },
        '@media(max-width: 1200px)':{
            '&.Righttriangle':{
                width: 0,
                height: 0,
                marginLeft:'auto',
                borderLeft: '50px solid transparent',
                borderRight: '0px solid transparent',
                borderTop:' 50px solid black',
                position: 'relative',
                zIndex: '1',
                top: '31px',
            },
            '&.Leftriangle':{
                width: 0,
                height: 0,
                borderLeft: '0px solid transparent',
                borderRight: '50px solid transparent',
                borderBottom:' 50px solid black',
                position: 'relative',
                zIndex: '1',
                bottom: '25px',
            }
        },
        '@media(max-width: 500px)':{
            '&.Righttriangle':{
                width: 0,
                height: 0,
                marginLeft:'auto',
                borderLeft: '30px solid transparent',
                borderRight: '0px solid transparent',
                borderTop:' 30px solid black',
                position: 'relative',
                zIndex: '1',
                top: '1px',
            },
            '&.Leftriangle':{
                width: 0,
                height: 0,
                borderLeft: '0px solid transparent',
                borderRight: '30px solid transparent',
                borderBottom:' 30px solid black',
                position: 'relative',
                zIndex: '1',
                bottom: '5px',
            }
        },
    }));
const ImageminiBox = styled('div')(({url}) => ({
    '&.left':{
        fontSize: '1.5vw',
        fontFamily: 'serif',
        fontWeight: '600',
        letterSpacing: '0.2em',
        position: 'relative',
        zIndex:' 1',
        top: '-39px',
        textAlign: 'initial',
        '@media(max-width: 1600px)':{
            fontSize: '1vw',
            top: '-19px',
        },
        '@media(max-width: 1200px)':{
            fontSize: '0.5vw',
        },
    '@media(max-width: 500px)':{
            fontSize: '0.5vw',
            top: '-29px',
        }  
    },
    '&.right':{
        fontSize: '1.5vw',
        fontFamily: 'serif',
        fontWeight: '600',
        letterSpacing: '0.2em',
        position: 'relative',
        zIndex:' 1',
        top: '45px',
        textAlign: 'end',
        '@media(max-width: 1600px)':{
            fontSize: '1vw',
            top: '45px',
        },
        '@media(max-width: 1200px)':{
            fontSize: '0.5vw',
            top: '25px',
        },
    '@media(max-width: 500px)':{
            fontSize: '0.5vw',
            top: '25px',
        }  
    }


}));
const ImageBox = styled('span')(({url}) => ({
    fontSize: '6.5vw',
    fontFamily: '"Arial Black"',
    fontWeight: '600',
    letterSpacing: '0.2em',
    '@media(max-width: 1600px)':{
        fontSize: '6vw',
    },
    '@media(max-width: 1200px)':{
        fontSize: '5vw',
    },
   '@media(max-width: 500px)':{
        fontSize: '4.5vw',
    }
}));

const Btnripple = styled('div')(({url}) => ({

}));

function Index(){ 
   return(
    <>  
    <StyledBox className='main'>
        <StyledBox className='Righttriangle'></StyledBox> 
        <ImageminiBox className='left'>Give shape to infotmation</ImageminiBox> 
            <ImageBox>MEMO.CLIPS</ImageBox>
        <ImageminiBox className='right'>Using shape as infotmation</ImageminiBox> 
        <StyledBox className='Leftriangle'></StyledBox>      
    </StyledBox>

    </>

    ) 
}

 export default Index;
