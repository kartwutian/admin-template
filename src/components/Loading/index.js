import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import { Spin, Card } from 'antd';
import styles from './index.less';

@cssModules(styles)
class Loading extends Component {
  render() {
    return (
      <Card>
        <div styleName="loading__wrap">
          <Spin size="large" tip="Loading..." />
        </div>
      </Card>
    );
  }
}

export default Loading;
