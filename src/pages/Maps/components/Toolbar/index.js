import React from 'react';
import cssModules from 'react-css-modules';
import { Menu, Dropdown, Button, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';

@cssModules(styles)
class Toolbar extends React.Component {
  handleCheckedChange = (layerType, checked) => {
    const { onToolbarLayerTypesChange } = this.props;
    onToolbarLayerTypesChange && onToolbarLayerTypesChange(layerType, checked);
  };

  render() {
    const { layerTypesMap } = this.props;
    const layerTypes = Object.keys(layerTypesMap);
    const menu = (
      <Menu>
        {layerTypes.map(layerType => (
          <Menu.Item key={layerType}>
            <Checkbox
              onChange={e => {
                const { checked } = e.target;
                this.handleCheckedChange(layerType, checked);
              }}
              checked={layerTypesMap[layerType].checked}
            >
              {layerTypesMap[layerType].name}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <div styleName="toolbar__wrapper">
        <Dropdown overlay={menu}>
          <Button>
            图层选择 <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default Toolbar;
