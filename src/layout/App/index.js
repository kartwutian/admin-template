import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import cssModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';
import {
  Layout,
  Menu,
  Dropdown,
  /* Avatar, */ Tooltip,
  PageHeader,
} from 'antd';
import {
  MenuFoldOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import SiderMenu from 'layout/SiderMenu/index';
import loginUtil from 'utils/login';
import styles from './style.less';

const { Header, Sider, Content } = Layout;

@withRouter
@inject('globalStore')
@observer
@cssModules(styles, {
  allowMultiple: true,
})
class App extends Component {
  constructor(props) {
    super(props);
    this.globalStore = props.globalStore;
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {}

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      loginUtil.logout();
      this.props.history.push('/login');
    }
  };

  getBreadData = () => {
    const { pathname } = this.props.location;
    const { router } = this.globalStore;
    const curPathArr = pathname.split('/').slice(1);
    console.log(curPathArr);
    let curRouter = router;
    const breads = [];
    curPathArr.reduce((prefix, next) => {
      prefix = `${prefix}/${next}`;
      console.log(prefix);
      const curItem = curRouter.find((item) => item.route === prefix);
      console.log(curItem);
      if (curItem) {
        breads.push(curItem);
        curRouter = curItem.routes;
      }
      return prefix;
    }, '');
    return breads;
  };

  renderSubHeader = () => {
    const sourceData = this.getBreadData();
    const routes =
      sourceData.length > 1
        ? sourceData.map((item) => ({
            path: item.route,
            breadcrumbName: item.name,
          }))
        : [];
    const curRoute = sourceData[sourceData.length - 1];

    return sourceData.length && curRoute.hasBread ? (
      <PageHeader
        ghost={false}
        title={curRoute && curRoute.name}
        breadcrumb={{ routes }}
        subTitle={curRoute.subTitle || ''}
      />
    ) : null;
  };

  render() {
    const { collapsed } = this.state;

    const userInfo = loginUtil.getUserInfo() || {};

    this.renderSubHeader();
    const menu = (
      <Menu
        className="user-menu"
        selectedKeys={[]}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="userCenter">
          <Link to="/">
            <UserAddOutlined />
            个人中心
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="userinfo">
          <Link to="/">
            <SettingOutlined />
            个人设置
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Sider trigger={null} collapsible width={256} collapsed={collapsed}>
          <div styleName="logo">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt="logo"
            />
            <h1>{collapsed ? '' : 'Ant Design Pro'}</h1>
          </div>
          <SiderMenu collapsed={collapsed} />
        </Sider>
        <Layout styleName="app">
          <Header styleName="app-header">
            {collapsed ? (
              <MenuUnfoldOutlined
                styleName="icon-menu-trigger"
                onClick={this.toggle}
              />
            ) : (
              <MenuFoldOutlined
                styleName="icon-menu-trigger"
                onClick={this.toggle}
              />
            )}

            <div styleName="right">
              <Tooltip title="使用文档">
                <a
                  target="_blank"
                  href="https://ywinvesttest.zjbdos.com/static-resource/wb-uni-pro/"
                  rel="noopener noreferrer"
                  styleName="action"
                  title="使用文档"
                >
                  <QuestionCircleOutlined />
                </a>
              </Tooltip>
              <Dropdown overlay={menu}>
                <span styleName="action account">
                  {/* <Avatar
                    size="small"
                    styleName="avatar"
                    // src={userInfo.avatar}
                    // src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt="avatar"
                  /> */}
                  <span styleName="avatar">{userInfo.name}</span>
                </span>
              </Dropdown>
            </div>
          </Header>
          <div>
            {/* <Tabs type="editable-card" hideAdd animated size="small">
              <Tabs.TabPane tab="标签1" closable />
              <Tabs.TabPane tab="标签2" closable />
              <Tabs.TabPane tab="标签3" closable />
            </Tabs> */}
          </div>
          <div>
            {this.renderSubHeader()}
            <Content>{this.props.children}</Content>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default App;
