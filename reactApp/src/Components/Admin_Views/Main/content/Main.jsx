import { ThemeProvider, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import  MatxSuspense  from '../../../../Setteing/option/Suspense';
import useSettings from '../../../../Setteing/useSettings';
import { sidenavCompactWidth, sideNavWidth } from '../../../Theme/constant';
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import SidenavTheme from '../sidenav/SidenavTheme';
import MainSidenav from '../sidenav/MainSidenav';
import Topbar from './MainTopbar';
import {ArticlePostProvider} from '../../../../provider/ArticlePostProvide';
import {UserpageProvider} from '../../../../provider/UserpageProvide';
import {MypageProvider} from '../../../../provider/MypageProvide';


// 全体のコンポーネント
const MainRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor:'white',
}));

const LayoutContainer = styled(Box)(({ width }) => ({
  height: '100vh',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: width,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
})); 

const Layout1 = () => {
  const { settings, updateSettings } = useSettings();
  const theme = useTheme();
  
  const { leftSidebar,topbar, secondarySidebar } = settings;
  const topbarTheme = settings.themes[topbar.theme];

  const { mode: sidenavMode, show: showSidenav } = leftSidebar;
  

  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

 const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return sideNavWidth;

      case 'compact':
        return sidenavCompactWidth;

      default:
        return '0px';
    }
  };

  const sidenavWidth = getSidenavWidth();
 

  // 画面の幅が変わった時
  useEffect(() => {
    let { settings } = ref.current;
    let sidebarMode = settings.leftSidebar.mode;
    if (settings.leftSidebar.show) {
      let mode = isMdScreen ? 'close' : sidebarMode;
      updateSettings({ leftSidebar: { mode } } );
    }

  }, [isMdScreen]);

  return (
    <MainRoot className={layoutClasses}> 
      <MypageProvider>
      {/* サイドバー */}
      {showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <MainSidenav />
        </SidenavTheme>
      )}  

      {/* メインコンテンツ */}
      <LayoutContainer width={sidenavWidth}>

        {/* ヘッダー */}
        {topbar.show && topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <Topbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}


        {/* 真ん中 */}
          <ContentBox>
            {topbar.show && !topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Topbar />
              </ThemeProvider>
            )}

            <Box style={{overflow:'auto'}}flexGrow={1} position="relative" className="scroll">
              <MatxSuspense>
                <ArticlePostProvider>
                  <UserpageProvider>
                     <Outlet /> 
                    {/* まとめる必要あり */}
                  </UserpageProvider>
                </ArticlePostProvider>
                {/* <div style={{heigth:"1000px"}}></div> */}
              </MatxSuspense>
            </Box>
           
            {settings.footer.show && !settings.footer.fixed && <Footer />} 
          </ContentBox>

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>
      </MypageProvider>
    </MainRoot>
  );
};

export default React.memo(Layout1);
