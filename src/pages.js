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
    },
    {
      path: 'pages/Form/Basic',
      route: '/form/baisc',
      template: 'list',
      name: 'basic',
    },
    {
      path: 'pages/Form/Step',
      route: '/form/step',
      template: 'list',
      name: 'step',
    },
    {
      path: 'pages/Maps/index',
      route: '/maps',
      name: '地图',
    },
    // {
    //   path: 'pages/Test/Demo',
    //   template: 'list'
    // }
  ],
};
