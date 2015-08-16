var App = App || {};

App.geo = (function($, geo, module) {
	var CITY_COOKIE = 'city';

	var _cache = null,
		_cities = [],
		_city = null,
		_geolocationEnabled = ('geolocation' in navigator);

	function init(cities) {
		_cities = cities;
		_city = docCookies.getItem(CITY_COOKIE);
	}

	function getDataInfoByIP(onSuccess, onError) {
		if (_cache) {
			return onSuccess(_cache);
		}

		if (!geo) {
			throw new Error('The geoip2 service is not defined');
		}

		geo.city(function(data) {
			_cache = data;
			return onSuccess(data);
		}, onError);
	}

	function getCoords(onSuccess) {
		if (_geolocationEnabled) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					return onSuccess(position.coords.latitude, position.coords.longitude);
				},
				function(error) {
					getDataInfoByIP(function(data) {
						return onSuccess(data.location.latitude, data.location.longitude);
					});
				}
			);
		}
		else {
			getDataInfoByIP(function(data) {
				return onSuccess(data.location.latitude, data.location.longitude);
			});
		}
	}

	function findClosestCity(lat, lng) {
		var res,
			d;

		for (var i = 0; i < _cities.length; ++i) {
			d = latlngDistance(lat, lng, _cities[i].lat, _cities[i].lng);
			if (!res || res < d) {
				res = d;
			}
		}

		return res;
	}

	function getClosestCity(onSuccess) {
		if (_city) {
			return onSuccess(_city);
		}

		getCoords(function(lat, lng) {
			return onSuccess(findClosestCity(lat, lng));
		});
	}

	function onError(error) {
		console.log(error);
	}

	function latlngDistance(lat1, lng1, lat2, lng2) {
		// радиус Земли
		R = 6372795;
     
		// перевод коордитат в радианы
		lat1 *= Math.PI / 180;
		lat2 *= Math.PI / 180;
		long1 *= Math.PI / 180;
		long2 *= Math.PI / 180;
		     
		// вычисление косинусов и синусов широт и разницы долгот
		cl1 = Math.cos(lat1);
		cl2 = Math.cos(lat2);
		sl1 = Math.sin(lat1);
		sl2 = Math.sin(lat2);
		delta = long2 - long1;
		cdelta = Math.cos(delta);
		sdelta = Math.sin(delta);
		     
		// вычисления длины большого круга
		y = Math.sqrt(Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2));
		x = sl1 * sl2 + cl1 * cl2 * cdelta;
		ad = Math.atan2(y, x);

		// расстояние между двумя координатами в метрах
		dist = ad * R;
		 
		return dist;
	}

	module.getClosestCity = getClosestCity;
	module.getCoords = getCoords;

	return module;
}(jQuery, geoip2, App.geo || {}));