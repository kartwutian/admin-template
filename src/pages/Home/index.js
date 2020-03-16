import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cssModules from 'react-css-modules';
import styles from './index.less';
import { Card } from 'antd';

@inject('modelHome')
@observer
@cssModules(styles)
class HomePage extends Component {
  render() {
    return (
      <div>
        <Card title="home">
          <div>123</div>
          <div>123</div>
          <div>123</div>
          <div>123</div>
        </Card>
      </div>
    );
  }
}

export default HomePage;
