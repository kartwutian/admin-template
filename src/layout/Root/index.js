/* eslint-disable */

import React, { Fragment, lazy, Suspense, Component } from 'react';
import Loading from 'components/Loading';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'mobx-react';
import App from 'layout/App/index';
import store from '@/store/index';
import { ConfigProvider } from 'antd';
import Exception from 'components/Exception/index.js';
import loginUtil from 'utils/login';
import auth from 'utils/auth';
import router from '@/_router';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import 'stylesheet/cantd.less';
import 'stylesheet/app.less';
import 'stylesheet/animate.css';

export const appHistory = createHashHistory();

const routerOut = router.filter(item => item.meta.isInLayout === false);
const routerInner = router.filter(item => item.meta.isInLayout !== false);

// /**
//  * 模拟延时加载组件
//  * @param {} value
//  * @param {*} ms
//  */
// function slowImport(value, ms = 1000) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(value), ms);
//   });
// }

const renderRouter = routes => {
  const children = [];

  function renderRoutes(arr) {
    arr.forEach(route => {
      if (!route.meta.path) {
        children.push(null);
      } else {
        const curRoute = (
          <Route
            key={route.route}
            exact
            path={route.route}
            render={props => {
              let isAuth = true;
              if (route.meta.roles) {
                isAuth = auth(route.meta.roles);
              }
              const Temp = lazy(() => import(`../../${route.meta.path}`)); // 有变量的情况不能使用别名
              return isAuth ? (
                <Suspense fallback={<Loading />}>
                  <div className="animated faster fadeInRight">
                    <Temp {...props} />
                  </div>
                </Suspense>
              ) : (
                <Exception type="403"></Exception>
              );
            }}
          />
        );
        children.push(curRoute);
      }

      console.log(route.children.length);
      if (route.children.length) {
        renderRoutes(route.children);
      }
    });
  }
  renderRoutes(routes);
  console.log(children);
  return children;
};

class Root extends Component {
  // state = {
  //   isError: false,
  // };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { isError: true };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  render() {
    console.log(renderRouter(routerInner));
    return (
      <Provider {...store}>
        <ConfigProvider locale={zh_CN}>
          <Router history={appHistory}>
            <Fragment>
              <Switch>
                {renderRouter(routerOut)}
                {loginUtil.isLogin() ? (
                  <App>
                    <Switch>
                      {renderRouter(routerInner)}
                      <Route
                        render={props => {
                          return <Exception type="404" />;
                        }}
                      />
                    </Switch>
                  </App>
                ) : (
                  <Route
                    render={props => {
                      const Temp = lazy(() => import('pages/Login'));
                      return (
                        <Suspense fallback={<Loading />}>
                          <div className="animated faster fadeInRight">
                            <Temp {...props} />
                          </div>
                        </Suspense>
                      );
                    }}
                  />
                )}
              </Switch>
            </Fragment>
          </Router>
        </ConfigProvider>
      </Provider>
    );
  }
}

export default hot(module)(Root);
