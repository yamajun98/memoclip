import { Hidden, Switch } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { themeShadows } from '../../../Theme/themeColors';
import useSettings from '../../../../Setteing/useSettings';
import { sidenavCompactWidth, sideNavWidth } from '../../../Theme/constant';
import { convertHexToRGB } from '../../../Theme/utils';
import React from 'react';
// import Brand from '../../Brand';
import Sidenav from './Sidenav';
import '../content/Main.css'
/*
  サイドバーの要素
*/

const SidebarNavRoot = styled(Box)(({ theme, width, primaryBg, bgImgURL }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  border: 'solid 1px #000',
  zIndex: 111,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  transition: 'all 250ms ease-in-out',
  backgroundImage: `linear-gradient(to bottom, rgba(${primaryBg}, 0.96), rgba(${primaryBg}, 0.96)), url(${bgImgURL})`,
  '&:hover': {
    width: sideNavWidth,
    '& .sidenavHoverShow': {
      display: 'block',
    },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': {
        display: 'block',
      },
      '& .nav-bullet-text': {
        display: 'none',
      },
    },
  },
}));

const NavListBox = styled(Box)(() => ({
  height: '93%',
  width:'100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  zIndex: '2',
}));

const MainSidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const leftSidebar = settings.leftSidebar;
  const { mode, bgImgURL } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return sidenavCompactWidth;
      default:
        return sideNavWidth;
    }
  };
  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  return (
    <SidebarNavRoot bgImgURL={bgImgURL} primaryBg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Sidenav />
      </NavListBox>
      <div class="sample"></div>
    </SidebarNavRoot>
  );
};

export default React.memo(MainSidenav);
