/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import L from 'leaflet';
import '@supermap/iclient-leaflet/dist/iclient-leaflet.min.js';
import {
  // DOMAIN,
  originResult,
  scaleToResolution,
} from './config.map.js';

function getCRS(epsgCodeStr, bounds, resolutions) {
  return L.Proj.CRS(epsgCodeStr, {
    bounds: L.bounds([bounds.left, bounds.bottom], [bounds.right, bounds.top]),
    resolutions,
    origin: [bounds.left, bounds.top],
  });
}

let visableResolution = [];

export default {
  /**
   *
   * @param id 地图挂载点
   * @returns {*} 地图实例
   */
  mapInit(id) {
    let map;

    function loadMap() {
      let mapcrs = L.CRS.EPSG3857;
      let maxZoom = 22;
      let zoom = 0;

      if (originResult.prjCoordSys) {
        let resolution;
        if (originResult.prjCoordSys.coordUnit) {
          resolution = scaleToResolution(
            originResult.scale,
            96,
            originResult.prjCoordSys.coordUnit,
          );
        }

        if (visableResolution.length && resolution) {
          let temp;
          for (let j = 0; j < visableResolution.length; j++) {
            if (j == 0) {
              temp = Math.abs(resolution - visableResolution[j]);
            }
            if (temp > Math.abs(resolution - visableResolution[j])) {
              temp = Math.abs(resolution - visableResolution[j]);
              zoom = j;
            }
          }
        }

        if (visableResolution.length === 0) {
          visableResolution = [
            0.23886718750000002,
            0.11943359375000001,
            0.059716796875000006,
            0.029858398437500003,
            0.014929199218750001,
            0.007464599609375001,
            0.0037322998046875003,
            0.0018661499023437502,
            0.0009330749511718751,
            0.00046653747558593754,
            0.00023326873779296877,
            0.00011663436889648439,
            0.00005831718444824219,
            0.000029158592224121096,
            0.000014579296112060548,
            0.000007289648056030274,
            0.000003644824028015137,
            0.0000018224120140075685,
            9.112060070037843e-7,
            4.5560300350189213e-7,
            2.2780150175094607e-7,
            1.1390075087547303e-7,
          ];
        }

        if (
          originResult.prjCoordSys.epsgCode == '4326' ||
          originResult.prjCoordSys.type == 'PCS_EARTH_LONGITUDE_LATITUDE'
        ) {
          if (visableResolution.length > 0) {
            mapcrs = getCRS(
              'EPSG:4326',
              originResult.bounds,
              visableResolution,
            );
          } else {
            mapcrs = getCRS('EPSG:4326', originResult.bounds);
          }
        } else if (originResult.prjCoordSys.type == 'PCS_NON_EARTH') {
          mapcrs = L.CRS.NonEarthCRS({
            bounds: L.bounds(
              [originResult.bounds.left, originResult.bounds.bottom],
              [originResult.bounds.right, originResult.bounds.top],
            ),
            origin: L.point(originResult.bounds.left, originResult.bounds.top),
          });
        } else if (visableResolution.length > 0) {
          mapcrs = getCRS('EPSG:3857', originResult.bounds, visableResolution);
        } else {
          mapcrs = getCRS('EPSG:3857', originResult.bounds);
        }
      }

      if (visableResolution.length > 0) {
        maxZoom = visableResolution.length - 1;
      }

      map = L.map(id, {
        // crs: L.CRS.EPSG3857
        center: mapcrs.unproject(
          L.point(
            (originResult.bounds.left + originResult.bounds.right) / 2,
            (originResult.bounds.bottom + originResult.bounds.top) / 2,
          ),
        ),
        maxZoom,
        zoom: 8,
        crs: mapcrs,
      });
    }

    loadMap();
    return map;
  },
};
