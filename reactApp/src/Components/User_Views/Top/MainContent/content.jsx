import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Swiper from '../slider'; 
import Section from './section'

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

export default function Content(props) {
  return(
      <> 
        <StyledGrid xs={12} lg={12}>
          <Swiper/>
        </StyledGrid>
        <Grid xs={12} lg={12} >
            <StyledItem>
              <StyledTitle>
                <StyledTitleH1> LATEST</StyledTitleH1>
              </StyledTitle>
            </StyledItem>
        </Grid>
        <Section name='latest'/>
        <Grid xs={12} lg={12} >
          <StyledItem>
              <StyledTitle>
                <StyledTitleH1> FAVORITE ARTICLE</StyledTitleH1>
              </StyledTitle>
            </StyledItem>
        </Grid>
        <Section name='favorite' />
      </>
  )
}