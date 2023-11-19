import { ThemeProvider, useTheme } from '@mui/material';
import useSettings from '../../../Setteing/useSettings';

/*
  サイドバー専用のテーマ設定
*/
const SidenavTheme = ({ children }) => {
  const theme = useTheme();
  const { settings } = useSettings();
  const sidenavTheme = settings.themes[settings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
};

export default SidenavTheme;
