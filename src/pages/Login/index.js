import React, { Component, createRef } from 'react';
import { observer, inject } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import cssModules from 'react-css-modules';
import { message, Form, Input, Button, Checkbox } from 'antd';
import loginUtil from 'utils/login';
import { appHistory } from 'layout/Root/index';
import styles from './index.less';

@withRouter
@inject('globalStore')
@inject('modelLogin')
@observer
@cssModules(styles)
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.store = props.modelLogin;
    this.globalStore = props.globalStore;
    this.formRef = createRef();
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({
      username: 'Bamboo',
      password: '123456',
      remember: true,
    });
  }

  componentWillUnmount() {
    const { destory } = this.store;
    destory && destory();
  }

  handleSubmit = async (values) => {
    const { login } = this.props.modelLogin;
    const { updateRoutes } = this.globalStore;
    const res = await login({
      phone: values.username,
      captcha: values.password,
    });
    console.log('res ', res);
    const { remember } = values;
    if (remember) {
      loginUtil.saveUserInfo(res.data);
    }
    updateRoutes();
    message.success('登录成功');
    appHistory.push('/');
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { loading } = this.store;
    return (
      <div styleName="page">
        <div styleName="content">
          <div styleName="top">
            <div styleName="header">
              <Link to="/">
                <img
                  styleName="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  alt="logo"
                />
                <span styleName="title">基于 Ant Design</span>
              </Link>
            </div>
            <div styleName="desc">万博通用后台管理系统模板</div>
          </div>
          <div styleName="login">
            <Form
              name="basic"
              ref={this.formRef}
              onFinish={this.handleSubmit}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="账号"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入账号名',
                  },
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
                    message: '请输入密码',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading.login}
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                >
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
