/* eslint-disable eqeqeq */
export const DOMAIN = 'http://61.174.254.92:8090';

export const originResult = {
  viewBounds: {
    top: 30.309516798039095,
    left: 119.92485449596062,
    bottom: 30.00200803896026,
    leftBottom: { x: 119.92485449596062, y: 30.00200803896026 },
    right: 120.23236325503946,
    rightTop: { x: 120.23236325503946, y: 30.309516798039095 },
  },
  viewer: {
    leftTop: { x: 0, y: 0 },
    top: 0,
    left: 0,
    bottom: 256,
    rightBottom: { x: 256, y: 256 },
    width: 256,
    right: 256,
    height: 256,
  },
  distanceUnit: 'METER',
  minVisibleTextSize: 0.1,
  coordUnit: 'DEGREE',
  scale: 1.97867172174097e-6,
  description: '',
  paintBackground: true,
  maxVisibleTextSize: 1000,
  maxVisibleVertex: 3600000,
  clipRegionEnabled: false,
  antialias: false,
  textOrientationFixed: false,
  angle: 0,
  prjCoordSys: {
    distanceUnit: 'METER',
    projectionParam: null,
    epsgCode: 4490,
    coordUnit: 'DEGREE',
    name: 'GCS_China_2000',
    projection: null,
    type: 'PCS_EARTH_LONGITUDE_LATITUDE',
    coordSystem: {
      datum: {
        name: 'D_China_2000',
        type: 'DATUM_CHINA_2000',
        spheroid: {
          flatten: 0.00335281068118232,
          name: 'CGCS2000',
          axis: 6378137,
          type: 'SPHEROID_CHINA_2000',
        },
      },
      unit: 'DEGREE',
      spatialRefType: 'SPATIALREF_EARTH_LONGITUDE_LATITUDE',
      name: 'GCS_China_2000',
      type: 'GCS_CHINA_2000',
      primeMeridian: {
        longitudeValue: 0,
        name: 'Greenwich',
        type: 'PRIMEMERIDIAN_GREENWICH',
      },
    },
  },
  minScale: 0,
  markerAngleFixed: false,
  overlapDisplayedOptions: {
    allowPointWithTextDisplay: true,
    horizontalOverlappedSpaceSize: 0,
    allowPointOverlap: true,
    allowThemeGraduatedSymbolOverlap: false,
    verticalOverlappedSpaceSize: 0,
    allowTextOverlap: false,
    allowThemeGraphOverlap: false,
    allowTextAndPointOverlap: true,
  },
  visibleScales: [],
  dpi: 96,
  visibleScalesEnabled: false,
  customEntireBoundsEnabled: false,
  clipRegion: {
    center: null,
    parts: null,
    style: null,
    prjCoordSys: null,
    id: 0,
    type: 'REGION',
    partTopo: null,
    points: null,
  },
  maxScale: 1.0e12,
  customParams: '',
  center: { x: 120.07860887550004, y: 30.155762418499677 },
  dynamicPrjCoordSyses: [
    {
      distanceUnit: null,
      projectionParam: null,
      epsgCode: 0,
      coordUnit: null,
      name: null,
      projection: null,
      type: 'PCS_ALL',
      coordSystem: null,
    },
  ],
  colorMode: 'DEFAULT',
  textAngleFixed: false,
  overlapDisplayed: false,
  userToken: { userID: '' },
  cacheEnabled: true,
  dynamicProjection: false,
  autoAvoidEffectEnabled: true,
  customEntireBounds: null,
  name: 'xzjx@xzjx',
  bounds: {
    top: 30.565101958999644,
    left: 119.43172806400004,
    bottom: 29.74642287799971,
    leftBottom: { x: 119.43172806400004, y: 29.74642287799971 },
    right: 120.72548968700006,
    rightTop: { x: 120.72548968700006, y: 30.565101958999644 },
  },
  backgroundStyle: {
    fillGradientOffsetRatioX: 0,
    markerSize: 2.4,
    fillForeColor: { red: 255, green: 255, blue: 255, alpha: 255 },
    fillGradientOffsetRatioY: 0,
    markerWidth: 0,
    markerAngle: 0,
    fillSymbolID: 0,
    lineColor: { red: 0, green: 0, blue: 0, alpha: 255 },
    markerSymbolID: 0,
    lineWidth: 0.1,
    markerHeight: 0,
    fillOpaqueRate: 100,
    fillBackOpaque: true,
    fillBackColor: { red: 255, green: 255, blue: 255, alpha: 255 },
    fillGradientMode: 'NONE',
    lineSymbolID: 0,
    fillGradientAngle: 0,
  },
};

export function getMeterPerMapUnit(mapUnit) {
  const earchRadiusInMeters = 6378137; // 6371000;
  let meterPerMapUnit;
  if (mapUnit == 'METER') {
    meterPerMapUnit = 1;
  } else if (mapUnit == 'DEGREE') {
    // 每度表示多少米。
    meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
  } else if (mapUnit == 'KILOMETER') {
    meterPerMapUnit = 1.0e-3;
  } else if (mapUnit == 'INCH') {
    meterPerMapUnit = 1 / 2.5399999918e-2;
  } else if (mapUnit == 'FOOT') {
    meterPerMapUnit = 0.3048;
  }
  return meterPerMapUnit;
}

export function scaleToResolution(scale, dpi, mapUnit) {
  const inchPerMeter = 1 / 0.0254;
  const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  let resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
  resolution = 1 / resolution;
  return resolution;
}

function getName(url) {
  const index = url.lastIndexOf('/');
  return url.slice(index + 1);
}

function getUrlMeta(url) {
  const layerName = getName(url);
  const type = layerName.indexOf('@') >= 0 ? layerName.split('@')[1] : 'base';
  return {
    layer: layerName,
    url: `${DOMAIN}${url}`,
    type,
  };
}

/**
 * 统一处理urls
 * @param {*} allUrls url数组
 */
function fetchUrls(allUrls) {
  return allUrls.map(item => {
    const metaUrlData = getUrlMeta(item.url);
    return {
      ...metaUrlData,
      name: item.name,
      subName: item.subName || '',
      init: metaUrlData.type === 'base' || metaUrlData.type === 'xzjx',
      initOpacity: item.initOpacity !== undefined ? item.initOpacity : 1,
    };
  });
}

const allUrls = [
  {
    name: '中国地图',
    url: '/iserver/services/map-wb_china/rest/maps/China_zjbdos',
  },

  // {
  //   name: '浙江天地图',
  //   subName: '标注图',
  //   url: '/iserver/services/map-wmts-ZJEMAP2D/rest/maps/ZJEMAP_2D',
  // },
  // {
  //   name: '浙江天地图',
  //   subName: '底图',
  //   url: '/iserver/services/map-wmts-ZJEMAPANNO2D/rest/maps/ZJEMAPANNO_2D',
  // },

  {
    name: '行政界线',
    url: '/iserver/services/map-xzjx/rest/maps/xzjx@xzjx',
    initOpacity: 0.5,
  },

  {
    name: '建成区分区',
    subName: '滨江区',
    url: '/iserver/services/map-jcqfq/rest/maps/binjiangqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '富阳区',
    url: '/iserver/services/map-jcqfq/rest/maps/fuyangqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '拱墅区',
    url: '/iserver/services/map-jcqfq/rest/maps/gongshuqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '江干区',
    url: '/iserver/services/map-jcqfq/rest/maps/jiangganqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '上城区',
    url: '/iserver/services/map-jcqfq/rest/maps/shangchengqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '西湖区',
    url: '/iserver/services/map-jcqfq/rest/maps/xihuqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '下城区',
    url: '/iserver/services/map-jcqfq/rest/maps/xiachengqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '萧山区',
    url: '/iserver/services/map-jcqfq/rest/maps/xiaoshanqu@jcqfq',
  },
  {
    name: '建成区分区',
    subName: '余杭区',
    url: '/iserver/services/map-jcqfq/rest/maps/yuhangqu@jcqfq',
  },

  {
    name: '传统公园',
    subName: '滨江区',
    url: '/iserver/services/map-ctgy/rest/maps/binjiangqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '公园范围',
    url: '/iserver/services/map-ctgy/rest/maps/gyfw@ctgy',
  },
  {
    name: '传统公园',
    subName: '拱墅区',
    url: '/iserver/services/map-ctgy/rest/maps/gongshuqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '江干区',
    url: '/iserver/services/map-ctgy/rest/maps/jiangganqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '上城区',
    url: '/iserver/services/map-ctgy/rest/maps/shangchengqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '西湖区',
    url: '/iserver/services/map-ctgy/rest/maps/xihuqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '下城区',
    url: '/iserver/services/map-ctgy/rest/maps/xiachengqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '萧山区',
    url: '/iserver/services/map-ctgy/rest/maps/xiaoshanqu@ctgy',
  },
  {
    name: '传统公园',
    subName: '余杭区',
    url: '/iserver/services/map-ctgy/rest/maps/yuhangqu@ctgy',
  },

  {
    name: '绿地现状',
    subName: '滨江区',
    url: '/iserver/services/map-ldxz/rest/maps/binjiangqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '富阳区',
    url: '/iserver/services/map-ldxz/rest/maps/fuyangqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '拱墅区',
    url: '/iserver/services/map-ldxz/rest/maps/gongshuqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '江干区',
    url: '/iserver/services/map-ldxz/rest/maps/jiangganqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '上城区',
    url: '/iserver/services/map-ldxz/rest/maps/shangchengqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '西湖区',
    url: '/iserver/services/map-ldxz/rest/maps/xihuqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '下城区',
    url: '/iserver/services/map-ldxz/rest/maps/xiachengqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '萧山区',
    url: '/iserver/services/map-ldxz/rest/maps/xiaoshanqu@ldxz',
  },
  {
    name: '绿地现状',
    subName: '余杭区',
    url: '/iserver/services/map-ldxz/rest/maps/yuhangqu@ldxz',
  },

  {
    name: '抽样小区',
    url: '/iserver/services/map-cyxq/rest/maps/xyxq@cyxq',
  },

  {
    name: '公园绿地',
    subName: '滨江区',
    url: '/iserver/services/map-gyld/rest/maps/binjiangqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '富阳区',
    url: '/iserver/services/map-gyld/rest/maps/fuyangqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '拱墅区',
    url: '/iserver/services/map-gyld/rest/maps/gongshuqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '江干区',
    url: '/iserver/services/map-gyld/rest/maps/jiangganqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '上城区',
    url: '/iserver/services/map-gyld/rest/maps/shangchengqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '西湖区',
    url: '/iserver/services/map-gyld/rest/maps/xihuqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '下城区',
    url: '/iserver/services/map-gyld/rest/maps/xiachengqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '萧山区',
    url: '/iserver/services/map-gyld/rest/maps/xiaoshanqu@gyld',
  },
  {
    name: '公园绿地',
    subName: '余杭区',
    url: '/iserver/services/map-gyld/rest/maps/yuhangqu@gyld',
  },

  {
    name: '古树名木',
    subName: '拱墅区',
    url: '/iserver/services/map-gsmm/rest/maps/gongshuqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '江干区',
    url: '/iserver/services/map-gsmm/rest/maps/jiangganqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '景区',
    url: '/iserver/services/map-gsmm/rest/maps/jingqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '上城区',
    url: '/iserver/services/map-gsmm/rest/maps/shangchengqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '西湖区',
    url: '/iserver/services/map-gsmm/rest/maps/xihuqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '下城区',
    url: '/iserver/services/map-gsmm/rest/maps/xiachengqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '萧山区',
    url: '/iserver/services/map-gsmm/rest/maps/xiaoshanqu@gsmm',
  },
  {
    name: '古树名木',
    subName: '余杭区',
    url: '/iserver/services/map-gsmm/rest/maps/yuhangqu@gsmm',
  },

  {
    name: '行道树',
    subName: '滨江区',
    url: '/iserver/services/map-xds/rest/maps/binjiangqu@xds',
  },
  {
    name: '行道树',
    subName: '富阳区',
    url: '/iserver/services/map-xds/rest/maps/fuyangqu@xds',
  },
  {
    name: '行道树',
    subName: '拱墅区',
    url: '/iserver/services/map-xds/rest/maps/gongshuqu@xds',
  },
  {
    name: '行道树',
    subName: '江干区',
    url: '/iserver/services/map-xds/rest/maps/jiangganqu@xds',
  },
  {
    name: '行道树',
    subName: '上城区',
    url: '/iserver/services/map-xds/rest/maps/shangchengqu@xds',
  },
  {
    name: '行道树',
    subName: '未来科技城',
    url: '/iserver/services/map-xds/rest/maps/weilaikejicheng@xds',
  },
  {
    name: '行道树',
    subName: '西湖区',
    url: '/iserver/services/map-xds/rest/maps/xihuqu@xds',
  },
  {
    name: '行道树',
    subName: '下城区',
    url: '/iserver/services/map-xds/rest/maps/xiachengqu@xds',
  },
  {
    name: '行道树',
    subName: '萧山区',
    url: '/iserver/services/map-xds/rest/maps/xiaoshanqu@xds',
  },
  {
    name: '行道树',
    subName: '余杭区',
    url: '/iserver/services/map-xds/rest/maps/yuhangqu@xds',
  },

  {
    name: '绿化覆盖',
    subName: '滨江区',
    url: '/iserver/services/map-lhfg/rest/maps/binjiangqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '富阳区',
    url: '/iserver/services/map-lhfg/rest/maps/fuyangqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '拱墅区',
    url: '/iserver/services/map-lhfg/rest/maps/gongshuqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '江干区',
    url: '/iserver/services/map-lhfg/rest/maps/jiangganqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '上城区',
    url: '/iserver/services/map-lhfg/rest/maps/shangchengqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '西湖区',
    url: '/iserver/services/map-lhfg/rest/maps/xihuqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '下城区',
    url: '/iserver/services/map-lhfg/rest/maps/xiachengqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '萧山区',
    url: '/iserver/services/map-lhfg/rest/maps/xiaoshanqu@lhfg',
  },
  {
    name: '绿化覆盖',
    subName: '余杭区',
    url: '/iserver/services/map-lhfg/rest/maps/yuhangqu@lhfg',
  },

  {
    name: '公园POI',
    subName: '滨江区',
    url: '/iserver/services/map-gyPOI/rest/maps/binjiangqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '富阳区',
    url: '/iserver/services/map-gyPOI/rest/maps/fuyangqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '拱墅区',
    url: '/iserver/services/map-gyPOI/rest/maps/gongshuqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '江干区',
    url: '/iserver/services/map-gyPOI/rest/maps/jiangganqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '上城区',
    url: '/iserver/services/map-gyPOI/rest/maps/shangchengqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '西湖区',
    url: '/iserver/services/map-gyPOI/rest/maps/xihuqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '下城区',
    url: '/iserver/services/map-gyPOI/rest/maps/xiachengqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '萧山区',
    url: '/iserver/services/map-gyPOI/rest/maps/xiaoshanqu@gyPOI',
  },
  {
    name: '公园POI',
    subName: '余杭区',
    url: '/iserver/services/map-gyPOI/rest/maps/yuhangqu@gyPOI',
  },

  {
    name: '立体绿化',
    subName: '滨江区',
    url: '/iserver/services/map-ltlh/rest/maps/binjiangqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '富阳区',
    url: '/iserver/services/map-ltlh/rest/maps/fuyangqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '拱墅区',
    url: '/iserver/services/map-ltlh/rest/maps/gongshuqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '江干区',
    url: '/iserver/services/map-ltlh/rest/maps/jiangganqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '上城区',
    url: '/iserver/services/map-ltlh/rest/maps/shangchengqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '西湖区',
    url: '/iserver/services/map-ltlh/rest/maps/xihuqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '下城区',
    url: '/iserver/services/map-ltlh/rest/maps/xiachengqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '萧山区',
    url: '/iserver/services/map-ltlh/rest/maps/xiaoshanqu@ltlh',
  },
  {
    name: '立体绿化',
    subName: '余杭区',
    url: '/iserver/services/map-ltlh/rest/maps/yuhangqu@ltlh',
  },
];

const DATA_TYPE_TO_URL = fetchUrls(allUrls);

console.log(DATA_TYPE_TO_URL);

export const REST_LAYERS = DATA_TYPE_TO_URL;

// [
//   {
//     layer: DATA_TYPE_TO_URL.China_zjbdos.name,
//     name: '中国地图',
//     subName: '拱墅区',
//     url: DATA_TYPE_TO_URL.China_zjbdos.url,
//     type: 'base',
//     init: true,
//   },
// ]
