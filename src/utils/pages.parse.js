const { pages } = require('../pages');

// const appMenus = [];
const routeMap = pages.reduce((result, next) => {
  result[next.route] = next;
  return result;
}, {});
const routes = Object.keys(routeMap);

const parsePath = (path, menus) => {
  const metaArr = path.split('/').slice(1);
  if (metaArr.length) {
    for (let i = 0; i < metaArr.length; i++) {
      const meta = {
        route: `/${metaArr.slice(0, i + 1).join('/')}`,
        children: [],
      };
      console.log(meta);
    }
  }

  for (let index = 0; index < menus.length; index++) {
    const curMenu = menus[index];
    console.log(curMenu);
  }
};

routes.forEach(item => {
  parsePath(item);
});
