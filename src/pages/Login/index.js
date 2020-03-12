import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import cssModules from 'react-css-modules';
import { message, Form, Input, Button, Checkbox } from 'antd';
import loginUtil from 'util/login';

import styles from './style.less';

@withRouter
@inject('modelLogin')
@observer
@cssModules(styles)
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.store = this.props.modelLogin;
  }

  handleSubmit = async values => {
    const { login } = this.props.modelLogin;
    const res = await login({
      phone: values.username,
      captcha: values.password
    });
    if (res.code === 0) {
      console.log('res ', res);
      const { remember } = values;
      if (remember) {
        loginUtil.saveUserInfo(res.data);
      }
      message.success('登录成功');
      window.location.href = '/';
    } else if (res.code === 10200002) {
      message.error('验证码错误！');
    }
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 16
      }
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16
      }
    };

    return (
      <div styleName="container">
        <div styleName="content">
          <div styleName="top">
            <div styleName="header">
              <Link to="/">
                <img
                  className={styles.logo}
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  alt="logo"
                />
                <span styleName="title">Ant Design</span>
              </Link>
            </div>
            <div styleName="desc">
              Ant Design 是西湖区最具影响力的 Web 设计规范
            </div>
          </div>
          <div styleName="login">
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true
              }}
              onFinish={this.handleSubmit}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入账号名'
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入密码'
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button block type="primary" htmlType="submit">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
