import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cssModules from 'react-css-modules';
import styles from './index.less';
import L from 'leaflet';
import '@supermap/iclient-leaflet/dist/iclient-leaflet.min.js';
import {} from 'antd';

@inject('modelMaps')
@observer
@cssModules(styles)
class MapsPage extends Component {
  componentDidMount() {
    const url =
      'https://iserver.supermap.io/iserver/services/map-world/rest/maps/World';
    const map = L.map('map', {
      crs: L.CRS.EPSG4326,
      center: [0, 0],
      maxZoom: 18,
      zoom: 1
    });
    L.supermap.tiledMapLayer(url).addTo(map);
  }

  render() {
    return (
      <div>
        <div id="map" style={{ width: 400, height: 400 }} />
      </div>
    );
  }
}

export default MapsPage;
