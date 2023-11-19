import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { useLocation,Link } from "react-router-dom";
import Content from './Drawer/content';

  const StyledButton = styled('button')(() => ({
      width:"21%",
      height:"100%",
      border: 'solid 0px',
      backgroundColor: 'white',
      borderBottom:'solid 1px',
      fontFamily: 'impact',
      fontSize: 'large',
      '&:hover':{
        backgroundColor: '#e5e5e5',
      }
    }));

  const ContentBox = styled('div')(({ theme }) => ({
      marginTop:"15px",
      width:"100%",
    }));  

export default function Buttongroup(props) {

  const [state, setState] = React.useState({left: false});
  const [value,setValue] = React.useState('')
  const url = useLocation()

  const toggleDrawer = (anchor,open,value,num) => (event) => {
    //数が0なら表示させない
    if(num != 0){
      // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      //   return;
      // }
      setState({ ...state, [anchor]: open });//drawOpen
      setValue(value);//draw先に渡すため
    }
  };

  return (
    <ContentBox>
            <StyledButton>
              <div>POSTS</div>
              <div>{props.article?.length}</div>
            </StyledButton>

        {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <StyledButton onClick={toggleDrawer(anchor,true,'follower',props.follower?.length)}>
                <div>FOLLOWER</div> 
                <div>{props.follower?.length}</div>                 
              </StyledButton>

              <StyledButton onClick={toggleDrawer(anchor, true,'follow',props.follow?.length)}>
                  <div>FOLLOW</div>
                  <div>{props.follow?.length}</div>
              </StyledButton>

              {url.pathname == "/mypage" ? 
                  <StyledButton onClick={toggleDrawer(anchor, true,'favorite',props.favorite?.length)}>
                    <div>FAVORITES</div>
                    <div>{props.favorite?.length}</div>
                  </StyledButton> 
                :
                <></>
              }
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                hideBackdrop={true}
                onClose={toggleDrawer(anchor, false)}
              >
                <Content
                  anchor={anchor}
                  toggleDrawer={toggleDrawer(anchor, false,'')}
                  value= {value}
                />
              </Drawer>
          </React.Fragment>    
        ))} 
    </ContentBox> 
  );
}