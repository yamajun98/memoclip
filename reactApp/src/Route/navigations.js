
export const navigations = [
  { name: 'Logo', path: '/', type: 'logo', image: `${process.env.PUBLIC_URL}/logo.png`},
  {type: 'profile'},
  {
    name: 'Myppage',
    icon: 'person',
    path: '/mypage',
    notlogin: 'true',
  },
  {
    name: 'Search',
    icon: 'search',
    path: '/search',
  },
  {
    name: 'Post',
    icon: 'articleoutlinedicon',
    path:'/article/create/',
    notlogin: 'true',
    // badge: { value: '30+', color: 'secondary' },
    // children: [
    //   { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
    //   { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
    //   { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
    //   { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
    //   { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
    //   { name: 'Form', path: '/material/form', iconText: 'F' },
    //   { name: 'Icons', path: '/material/icons', iconText: 'I' },
    //   { name: 'Menu', path: '/material/menu', iconText: 'M' },
    //   { name: 'Progress', path: '/material/progress', iconText: 'P' },
    //   { name: 'Radio', path: '/material/radio', iconText: 'R' },
    //   { name: 'Switch', path: '/material/switch', iconText: 'S' },
    //   { name: 'Slider', path: '/material/slider', iconText: 'S' },
    //   { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
    //   { name: 'Table', path: '/material/table', iconText: 'T' },
    // ],
  },
  {
    name: 'Chat',
    icon: 'chat',
    path: '/chat',
    notlogin: 'true',
  },
  {
    name: 'Setting',
    icon: 'settings',
    path: '/setting',
  },
];
