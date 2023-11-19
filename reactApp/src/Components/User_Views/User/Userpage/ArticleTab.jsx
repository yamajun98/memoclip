import React,{useState} from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types'; 
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ArticleConnect from '../Util/articleConnect';

  const ItemBox = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    fontFamily: 'Arial Black',
    fontWeight: 'bold',
    '&:hover':{
      opacity: 1,
    }, 
    '&.Mui-selected': {
      color: '#fff',
      fontFamily: 'Arial Black',
      fontWeight: 'bold',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));


  const TabsBox = styled(Tabs)(({ num }) => ({
    textColor:"primary",
    ariaLabel:"ant example",
    '&.ant':{
      '&::before':{
        borderRadius: '20px 20px 0px 0px',
        content: '""',
        width: 'calc(100%)',
        height: '100%',
        position: 'absolute',
        zIndex: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        transition:' all 0.5s'
      }

    }
  }));


  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style= {{height:"auto"}}
        {...other}
      >
        {value === index && (
        <div>
          <Box p={3} style={{padding:"0px"}}>
            <Typography component={'div'}>{children} </Typography>
          </Box>
        </div>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  function ArticleTab(){
    const [num,setNum] = useState(0);
    const handleChange = (event, newValue) => {
      setNum(newValue);
    };

  return(
    <>
      <div id="article">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'relative' }}>
            <TabsBox
            className="ant"
            value={num}
            onChange={handleChange}
            variant="fullWidth"
            TabIndicatorProps={{
              style: { display: 'none' }
            }}
            num={num}
            >
                <ItemBox label="記事一覧" {...a11yProps(0)}   />
            </TabsBox>
        </Box>
        {/* 記事表示 */}
        <TabPanel value={num} index={0}>
           <ArticleConnect num={num}/>
        </TabPanel>
      </div>
    </>
  )
}

export default ArticleTab;