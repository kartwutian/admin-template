/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
let map;
let layer;
let options;
let lat;
let lon;
const url = 'http://61.174.254.92:8090/iserver/services/map-wmts-ZJEMAP2D/rest/maps/ZJEMAP_2D';

function init() {
    loadMap();
}

function loadMap() {
			const originResult = { viewBounds: { top: 30.558279966239198, left: 118.85196703456113, bottom: 27.748934035361444, leftBottom: { x: 118.85196703456113, y: 27.748934035361444 }, right: 121.66131296543888, rightTop: { x: 121.66131296543888, y: 30.558279966239198 } }, viewer: { leftTop: { x: 0, y: 0 }, top: 0, left: 0, bottom: 256, rightBottom: { x: 256, y: 256 }, width: 256, right: 256, height: 256 }, distanceUnit: 'DEGREE', minVisibleTextSize: 0, coordUnit: 'DEGREE', scale: 2.292036692881353E-7, description: '', paintBackground: false, maxVisibleTextSize: 0, maxVisibleVertex: 0, clipRegionEnabled: false, antialias: false, textOrientationFixed: false, angle: 0, prjCoordSys: { distanceUnit: 'METER', projectionParam: null, epsgCode: 4490, coordUnit: 'DEGREE', name: 'China Geodetic Coordinate System 2000', projection: null, type: 'PCS_EARTH_LONGITUDE_LATITUDE', coordSystem: { datum: { name: 'China 2000', type: 'DATUM_USER_DEFINED', spheroid: { flatten: 0.003352810681182319, name: 'CGCS2000', axis: 6378137, type: 'SPHEROID_USER_DEFINED' } }, unit: 'DEGREE', spatialRefType: 'SPATIALREF_EARTH_LONGITUDE_LATITUDE', name: 'China Geodetic Coordinate System 2000', type: 'GCS_CHINA_2000', primeMeridian: { longitudeValue: 0, name: 'Greenwich', type: 'PRIMEMERIDIAN_GREENWICH' } } }, minScale: 0, markerAngleFixed: false, overlapDisplayedOptions: null, visibleScales: [2.292036692881353E-7, 4.584073385762696E-7, 9.168146771525432E-7, 1.8336293543050831E-6, 3.6672587086101603E-6, 7.334517417220345E-6, 1.466903483444065E-5, 2.9338069668881337E-5, 5.867613933776251E-5, 1.173522786755253E-4, 2.3470455735105034E-4, 4.694091147021017E-4, 9.388182294041992E-4, 0.0018776364588084051], dpi: 96, visibleScalesEnabled: true, customEntireBoundsEnabled: false, clipRegion: null, maxScale: 0, customParams: '', center: { x: 120.25664, y: 29.15360700080032 }, dynamicPrjCoordSyses: [{ distanceUnit: 'METER', projectionParam: null, epsgCode: 4490, coordUnit: 'DEGREE', name: 'China Geodetic Coordinate System 2000', projection: null, type: 'PCS_EARTH_LONGITUDE_LATITUDE', coordSystem: { datum: { name: 'China 2000', type: 'DATUM_USER_DEFINED', spheroid: { flatten: 0.003352810681182319, name: 'CGCS2000', axis: 6378137, type: 'SPHEROID_USER_DEFINED' } }, unit: 'DEGREE', spatialRefType: 'SPATIALREF_EARTH_LONGITUDE_LATITUDE', name: 'China Geodetic Coordinate System 2000', type: 'GCS_CHINA_2000', primeMeridian: { longitudeValue: 0, name: 'Greenwich', type: 'PRIMEMERIDIAN_GREENWICH' } } }], colorMode: null, textAngleFixed: false, overlapDisplayed: false, userToken: { userID: '' }, cacheEnabled: true, dynamicProjection: false, autoAvoidEffectEnabled: true, customEntireBounds: null, name: 'ZJEMAP_2D', bounds: { top: 31.60853400084267, left: 117.55337000000002, bottom: 26.698680000757967, leftBottom: { x: 117.55337000000002, y: 26.698680000757967 }, right: 122.95990999999998, rightTop: { x: 122.95990999999998, y: 31.60853400084267 } }, backgroundStyle: { fillGradientOffsetRatioX: 0, markerSize: 0, fillForeColor: { red: 255, green: 0, blue: 0, alpha: 255 }, fillGradientOffsetRatioY: 0, markerWidth: 0, markerAngle: 0, fillSymbolID: 0, lineColor: { red: 0, green: 0, blue: 0, alpha: 255 }, markerSymbolID: 0, lineWidth: 0.01, markerHeight: 0, fillOpaqueRate: 100, fillBackOpaque: false, fillBackColor: { red: 255, green: 255, blue: 255, alpha: 255 }, fillGradientMode: 'NONE', lineSymbolID: 0, fillGradientAngle: 0 } };
			const visableResolution = [0.010974005814301328, 0.005487002907150675, 0.002743501453575326, 0.0013717507267876651, 6.858753633938338E-4, 3.4293768169691574E-4, 1.7146884084845836E-4, 8.573442042422907E-5, 4.286721021211465E-5, 2.1433605106057278E-5, 1.0716802553028649E-5, 5.358401276514313E-6, 2.679200638257168E-6, 1.3396003191285792E-6];
			let mapcrs = L.CRS.EPSG3857;
			options = {};
			// 初始化时修改成22级，和计算scales数组时保持一致
			options.maxZoom = 22;
			options.minZoom = 0;
			let maxZoom = 22;
			let zoom = 0;
			if (originResult.overlapDisplayed) {
				options.overlapDisplayed = originResult.overlapDisplayed;
			}

			if (originResult.prjCoordSys) {
				let resolution;
				if (originResult.prjCoordSys.coordUnit) {
					resolution = scaleToResolution(originResult.scale, 96, originResult.prjCoordSys.coordUnit);
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

				if (originResult.prjCoordSys.epsgCode == '4326' || originResult.prjCoordSys.type == 'PCS_EARTH_LONGITUDE_LATITUDE') {
						lon = (originResult.bounds.left + originResult.bounds.right) / 2;
						lat = (originResult.bounds.bottom + originResult.bounds.top) / 2;
						if (visableResolution.length > 0) {
							mapcrs = getCRS('EPSG:4326', originResult.bounds, visableResolution);
						} else {
							mapcrs = getCRS('EPSG:4326', originResult.bounds);
						}
					} else if (originResult.prjCoordSys.type == 'PCS_NON_EARTH') {
						mapcrs = L.CRS.NonEarthCRS({
							bounds: L.bounds([originResult.bounds.left, originResult.bounds.bottom], [originResult.bounds.right, originResult.bounds.top]),
							origin: L.point(originResult.bounds.left, originResult.bounds.top)
						});
					} else if (visableResolution.length > 0) {
							mapcrs = getCRS('EPSG:3857', originResult.bounds, visableResolution);
						} else {
							mapcrs = getCRS('EPSG:3857', originResult.bounds);
						}
			}

			if (visableResolution.length > 0) {
				maxZoom = visableResolution.length - 1;
				options.maxZoom = visableResolution.length - 1;
			}


			map = L.map('map', {
				// crs: L.CRS.EPSG3857
				center: mapcrs.unproject(L.point((originResult.bounds.left + originResult.bounds.right) / 2, (originResult.bounds.bottom + originResult.bounds.top) / 2)),
		        maxZoom,
		        zoom,
				crs: mapcrs,
			});

  const layerUrl = url;
  console.log(options)
			layer = L.supermap.tiledMapLayer(layerUrl, {maxZoom: 13, minZoom: 0});
			layer.addTo(map);
        }

		function getCRS(epsgCodeStr, bounds, resolutions) {
			return L.Proj.CRS(epsgCodeStr, {
				bounds: L.bounds([bounds.left, bounds.bottom], [bounds.right, bounds.top]),
				resolutions,
				origin: [bounds.left, bounds.top]
			 });
		}

    	function scaleToResolution(scale, dpi, mapUnit) {
        	const inchPerMeter = 1 / 0.0254;
      	  	const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
      	 	let resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
        	resolution = 1 / resolution;
        	return resolution;
   		 }

		function getMeterPerMapUnit(mapUnit) {
        	const earchRadiusInMeters = 6378137;// 6371000;
        	let meterPerMapUnit;
        	if (mapUnit == 'METER') {
            	meterPerMapUnit = 1;
       		} else if (mapUnit == 'DEGREE') {
            	// 每度表示多少米。
            	meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        	} else if (mapUnit == 'KILOMETER') {
            	meterPerMapUnit = 1.0E-3;
        	} else if (mapUnit == 'INCH') {
            	meterPerMapUnit = 1 / 2.5399999918E-2;
        	} else if (mapUnit == 'FOOT') {
            	meterPerMapUnit = 0.3048;
        	}
        	return meterPerMapUnit;
    	}
