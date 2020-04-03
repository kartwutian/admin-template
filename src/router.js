/* eslint-disable quotes */
const router = [
  {
    route: '/',
    children: [],
    meta: {
      path: 'pages/Home/index',
      route: '/',
      name: '根路径',
    },
  },
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
    },
  },
  {
    route: '/form',
    children: [
      {
        route: '/form/baisc',
        children: [],
        meta: {
          path: 'pages/Form/Basic',
          route: '/form/baisc',
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
    meta: {},
  },
  {
    route: '/maps',
    children: [],
    meta: {
      path: 'pages/Maps/index',
      route: '/maps',
      name: '地图',
    },
  },
];

export default router;
