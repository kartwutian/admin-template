/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cssModules from 'react-css-modules';
import styles from './index.less';
import L from 'leaflet';
import '@supermap/iclient-leaflet/dist/iclient-leaflet.min.js';
import {} from 'antd';
import iServer from './iServer';
import { REST_LAYERS } from './config.map';
import Toolbar from './components/Toolbar/index';

@inject('modelMaps')
@observer
@cssModules(styles)
class MapsPage extends Component {
  constructor(props) {
    super(props);
    this.store = props.modelMaps;
    this.map = {}; // leaflet 地图
    this.layers = {}; // 所有leaflet图层
  }

  componentDidMount() {
    this.init();
  }

  afterMapInit = () => {
    this.layers = this.initRestLayer(REST_LAYERS);
    this.initLayerTypes();
  };

  beforeMapInit = () => {};

  initLayerTypes = () => {
    const { commit } = this.store;
    const layerTypesMap = REST_LAYERS.reduce((result, next) => {
      if (result[next.type]) {
        result[next.type].name = next.name;
        result[next.type].checked =
          next.type === 'base' || next.type === 'xzjx';
        result[next.type].layers.push(next);
      } else {
        result[next.type] = {
          name: next.name,
          checked: next.type === 'base' || next.type === 'xzjx',
          layers: [next],
        };
      }
      return result;
    }, {});

    commit({
      layerTypesMap,
    });
    console.log(Object.keys(this.store.layerTypesMap));
  };

  initRestLayer = layers => {
    const restLayers = {};
    // console.log(SuperMap.ServerType.IPORTAL)
    layers.forEach((item, index) => {
      restLayers[item.layer] = L.supermap.tiledMapLayer(
        item.url,
        {
          $$item: item,
          $$type: item.type, // 约定的图层名字，用于透传，约定以$$做前缀
          $$name: item.name,
          transparent: true,
          cacheEnabled: true,
          tileSize: 256,
          // serverType: SuperMap.ServerType.IPORTAL, // TODO iPortal
        },
        { maxResolution: 'auto' },
      );
      restLayers[item.layer].setOpacity(item.initOpacity);

      if (item.init) {
        restLayers[item.layer].addTo(this.map);
        restLayers[item.layer].setZIndex(index);
      }
    });
    return restLayers;
  };

  init() {
    this.beforeMapInit();
    this.map = iServer.mapInit('map'); // 地图对象挂载到this上，用this.map调用
    console.log(this.map);
    this.afterMapInit();
  }

  onToolbarLayerTypesChange = (layerType, checked) => {
    const { layerTypesChange } = this.store;
    this.renderLayers(layerType, checked);
    layerTypesChange(layerType, checked);
    this.setState({}); // 手动触发视图更新
  };

  renderLayers = (layerType, checked) => {
    const { layerTypesMap } = this.store;
    const isRemove = !checked;
    if (isRemove) {
      layerTypesMap[layerType].layers.forEach(item => {
        this.map.removeLayer(this.layers[item.layer]);
      });
    } else {
      layerTypesMap[layerType].layers.forEach(item => {
        // 保证图层的层级
        let zIndex = 0;
        while (item.layer !== REST_LAYERS[zIndex].layer) {
          zIndex += 1;
        }
        this.layers[item.layer].addTo(this.map);
        this.layers[item.layer].setOpacity(item.initOpacity);
        this.layers[item.layer].setZIndex(zIndex);
      });
    }
  };

  render() {
    const { layerTypesMap } = this.store;
    const mapHeight = window.innerHeight;
    return (
      <div>
        <Toolbar
          layerTypesMap={layerTypesMap}
          onToolbarLayerTypesChange={this.onToolbarLayerTypesChange}
        />
        <div id="map" style={{ width: '100%', height: mapHeight }} />
      </div>
    );
  }
}

export default MapsPage;
