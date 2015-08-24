var App = App || {};

App.geo = (function($, geo, module) {
	var CITY_COOKIE = 'city';

	var _cache = null,
		_cityID = null,
		_geolocationEnabled = ('geolocation' in navigator);

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

	function findClosestCity(cities, lat, lng) {
		var res,
			d;

		for (var i = 0; i < cities.length; ++i) {
			d = latlngDistance(lat, lng, cities[i].lat, cities[i].lng);
			if (!res || res < d) {
				res = d;
			}
		}

		return res.id;
	}

	function getClosestCity(cities, onSuccess) {
		if (_cityID) {
			return onSuccess(_cityID);
		}

		_cityID = docCookies.getItem(CITY_COOKIE);
		if (_cityID) {
			return onSuccess(_cityID);
		}

		getCoords(function(lat, lng) {
			setCity(findClosestCity(cities, lat, lng));
			return onSuccess(_cityID);
		});
	}

	function setCity(cityID) {
		_cityID = cityID;

		docCookies.setItem(CITY_COOKIE, _cityID);
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
	module.setCity = setCity;
	module.getCoords = getCoords;

	return module;
}(jQuery, geoip2, App.geo || {}));