import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cssModules from 'react-css-modules';
import styles from './style.less';
import {} from 'antd';

@inject('modelLogin')
@observer
@cssModules(styles)
class HomePage extends Component {
  // 声明一个叫 "count" 的 state 变量

  render() {
    return (
      <div>
        <p>You clicked1 times</p>
      </div>
    );
  }
}

export default HomePage;
