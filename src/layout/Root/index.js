import React, { Fragment, lazy, Suspense, Component } from 'react';
import Loading from 'components/Loading';
import { hot } from 'react-hot-loader';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'mobx-react';
import App from 'layout/App/index';
import store from '@/store/index';
import { ConfigProvider } from 'antd';
import loginUtil from 'utils/login';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import 'stylesheet/cantd.less';
import 'stylesheet/app.less';
import 'stylesheet/animate.css';

export const appHistory = createHashHistory();

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
    return (
      <Provider {...store}>
        <ConfigProvider locale={zh_CN}>
          <Router history={appHistory}>
            <Fragment>
              <Switch>
                <Route
                  exact
                  path="/login"
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
                <Route
                  exact
                  path="/maps"
                  render={props => {
                    const Temp = lazy(() => import('pages/Maps'));
                    return (
                      <Suspense fallback={<Loading />}>
                        <div className="animated faster fadeInRight">
                          <Temp {...props} />
                        </div>
                      </Suspense>
                    );
                  }}
                />

                {loginUtil.isLogin() ? (
                  <App>
                    <Switch>
                      <Route
                        exact
                        path="/project"
                        render={props => {
                          const Temp = lazy(() => import('pages/Home'));
                          return (
                            <Suspense fallback={<Loading />}>
                              <div className="animated faster fadeInRight">
                                <Temp {...props} />
                              </div>
                            </Suspense>
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/form/basic"
                        render={props => {
                          const Temp = lazy(() => import('pages/Form/Basic'));
                          return (
                            <Suspense fallback={<Loading />}>
                              <div className="animated faster fadeInRight">
                                <Temp {...props} />
                              </div>
                            </Suspense>
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/form/step"
                        render={props => {
                          const Temp = lazy(() => import('pages/Form/Step'));
                          return (
                            <Suspense fallback={<Loading />}>
                              <div className="animated faster fadeInRight">
                                <Temp {...props} />
                              </div>
                            </Suspense>
                          );
                        }}
                      />
                      <Redirect to="/project" />
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
