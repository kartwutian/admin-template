/* eslint-disable */

const router = [
  {
    route: '/project',
    children: [],
    meta: {
      path: 'pages/Home/index',
      route: '/project',
      name: '首页',
    },
  },
  {
    route: '/login',
    children: [],
    meta: {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isInLayout: false,
    },
  },
  {
    route: '/form',
    children: [
      {
        route: '/form/basic',
        children: [],
        meta: {
          path: 'pages/Form/Basic',
          route: '/form/basic',
          template: 'list',
          name: 'basic',
        },
      },
      {
        route: '/form/step',
        children: [],
        meta: {
          path: 'pages/Form/Step',
          route: '/form/step',
          template: 'list',
          name: 'step',
        },
      },
    ],
    meta: {
      route: '/form',
      name: '表单页',
    },
  },
  {
    route: '/maps',
    children: [],
    meta: {
      path: 'pages/Maps/index',
      route: '/maps',
      name: '地图',
      roles: 'admin',
    },
  },
];

export default router;
