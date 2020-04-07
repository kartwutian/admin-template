module.exports = {
  pages: [
    // pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
    {
      path: 'pages/Home/index', // 生成的页面路径
      //   template: 'list', // 配置生成相关页面使用的模板文件，没有则用默认模板文件
      route: '/project', // 使用的前端路由
      name: '首页',
    },
    {
      path: 'pages/Login/index',
      route: '/login',
      name: '登录',
      isInLayout: false, // 标记不包括layout
    },
    {
      route: '/form', // 每一批path,代表不生成页面
      name: '表单页',
    },
    {
      path: 'pages/Form/Basic',
      route: '/form/basic',
      template: 'list',
      name: 'basic',
      authority: ['user'], // 用于权限控制，菜单和路由
    },
    {
      path: 'pages/Form/Step',
      route: '/form/step',
      template: 'list',
      name: 'step',
      authority: 'admin', // 用于权限控制，菜单和路由
    },
    {
      path: 'pages/Maps/index',
      route: '/maps',
      name: '地图',
      isHideInMenus: true, // 代表在菜单栏隐藏菜单
    },
    // {
    //   path: 'pages/Test/Demo',
    //   template: 'list'
    // }
  ],
};
