import React from 'react';
import loadable from 'react-loadable';
import Loading from 'component/Loading';
import { hot } from 'react-hot-loader';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Provider } from 'mobx-react';
import App from 'layout/App';
import store from 'store';
import { ConfigProvider } from 'antd';
import loginUtil from 'util/login';
import zh_CN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import Home from 'pages/Home';

import 'stylesheet/cantd.less';
import 'stylesheet/app.less';

function getComponentAsync(loader) {
  return loadable({
    loader: () => loader,
    loading: Loading,
    timeout: 10000
  });
}

export const appHistory = createHashHistory();

const Root = () => (
  <Provider {...store}>
    <ConfigProvider locale={zh_CN}>
      <Router history={appHistory}>
        <React.Fragment>
          <Switch>
            <Route
              exact
              path="/login"
              component={getComponentAsync(
                import(/* webpackChunkName: "Login" */ 'pages/Login')
              )}
            />
            <Route
              exact
              path="/maps"
              component={getComponentAsync(
                import(/* webpackChunkName: "Login" */ 'pages/Maps')
              )}
            />
            {loginUtil.isLogin() ? (
              <App>
                <Switch>
                  <Route exact path="/project" component={Home} />
                  <Redirect to="/project" />
                </Switch>
              </App>
            ) : (
              <Route component={getComponentAsync(import('pages/Login'))} />
            )}
          </Switch>
        </React.Fragment>
      </Router>
    </ConfigProvider>
  </Provider>
);

export default hot(module)(Root);
