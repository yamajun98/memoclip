export const navigations = [
  { name: 'Logo', type: 'logo', image: `${process.env.PUBLIC_URL}/logo.png`},
  {type: 'profile'},
  {
    name: 'User',
    icon: 'person',
    path: '/admin/user',
  },
  {
    name: 'Tag',
    icon: 'search',
    path: '/admin/Tag',
  },
  {
    name: 'Article',
    icon: 'articleoutlinedicon',
    path:'/admin/article/',
  },
  {
    name: 'Chat',
    icon: 'chat',
    path: '/admin/chat',
  },
  {
    name: 'Setting',
    icon: 'settings',
    path: '/admin/setting',
  },
];