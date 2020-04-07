/* eslint-disable no-shadow */

module.exports = (pages) => {
  const routeMap = pages.reduce((result, next) => {
    result[next.route] = next;
    return result;
  }, {});
  const routes = Object.keys(routeMap);

  const parsePath = (path) => {
    const metaArr = path.split('/').slice(1);
    const curRoute = metaArr.reduce((result, next) => {
      const routePath = result.route ? `${result.route}/${next}` : `/${next}`;
      const curMeta = routeMap[routePath] || {};
      const meta = {
        route: routePath,
        routes: [],
        ...curMeta,
      };
      if (result.routes) {
        result.routes = [{ ...meta }];
      } else {
        result = { ...meta };
      }
      return result;
    }, {});
    return curRoute;
  };

  const combineRoutes = (pRoutes) => {
    const routes = [];
    pRoutes.forEach((item) => {
      const curRoute = routes.find((r) => r.route === item.route);
      // console.log(curRoute);
      if (!curRoute) {
        routes.push(item);
      } else {
        curRoute.routes = [...curRoute.routes, ...item.routes];
      }
    });
    routes.forEach((item) => {
      item.routes = combineRoutes(item.routes);
    });
    return routes;
  };

  const plainRoutes = routes.map((item) => parsePath(item)); // 展平的所有路由

  const allRoutes = combineRoutes(plainRoutes);

  return allRoutes;
};
