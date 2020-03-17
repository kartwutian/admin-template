import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

// import style from './style.less';

@withRouter
class SiderMenu extends Component {
  handleMenuClick = ({ key }) => {
    const { history } = this.props;

    if (key === '/project') {
      history.push(key);
    }
  };

  render() {
    const { collapsed, location } = this.props;

    return (
      <Menu
        defaultSelectedKeys={['/project']}
        selectedKeys={[location.pathname]}
        // defaultOpenKeys={['exchangemgr']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={this.handleMenuClick}
      >
        <Menu.Item key="/project">
          <MenuFoldOutlined />
          {/* <Link to="/project">首页</Link> */}
          <span>首页</span>
        </Menu.Item>
        <SubMenu
          key="form"
          title={
            <span>
              <span>表单页</span>
            </span>
          }
        >
          <Menu.Item key="/project/form/basic">
            <Link to="/project/form/basic">基础表单</Link>
          </Menu.Item>
          <Menu.Item key="/project/form/step">
            <Link to="/project/form/step">分步表单</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default SiderMenu;
