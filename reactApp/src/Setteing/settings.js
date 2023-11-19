import { themes } from '../Components/Theme/initThemes';

// UPDATE BELOW CODE
// DOC http://demos.ui-lib.com/matx-react-doc/layout.html

// Main画面周りの設定
//全体のテーマをまとめている。
export const MainSettings = {
  activeLayout: 'main', // layout1, layout2
  activeTheme: 'blue', // View all valid theme colors inside MatxTheme/themeColors.js
  perfectScrollbar: false,

  themes: themes,

  // layout1Settings
  leftSidebar: {
    show: true,
    mode: 'full', // full, close, compact, mobile,
    theme: 'slateDark1', // View all valid theme colors inside MatxTheme/themeColors.js
    // bgImgURL: '/assets/images/sidebar/sidebar-bg-dark.jpg',
    bgImgURL: '/image/userIcon.jpeg',
  },
  topbar: {
    show: true,
    fixed: true,
    theme: 'whiteBlue', // View all valid theme colors inside MatxTheme/themeColors.js
  }, // open Layout1/Layout1Settings.js

  secondarySidebar: {
    show: true,
    open: false,
    theme: 'slateDark2', // View all valid theme colors inside MatxTheme/themeColors.js
  },
  // Footer options
  footer: {
    show: true,
    fixed: false,
    theme: 'slateDark2', // View all valid theme colors inside MatxTheme/themeColors.js
  },

};
