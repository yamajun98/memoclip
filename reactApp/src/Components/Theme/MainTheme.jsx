import { CssBaseline, ThemeProvider } from '@mui/material';
import useSettings from '../../Setteing/useSettings';

/*
  プロバイダー
    全体の設定
    {
      settingsのThemeにsettings.activeThemeを追加
    }
*/
const MainTheme = ({ children }) => {
  const { settings } = useSettings();

  let activeTheme = { ...settings.themes[settings.activeTheme] };

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
        {children}
    </ThemeProvider>
  );
};

export default MainTheme;
