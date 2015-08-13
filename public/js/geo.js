var App = App || {};

App.geo = (function($, geo, module) {
	var CITY_COOKIE = 'city';

	var cache_city = null;

	function init() {
		cache_city = docCookies.getItem(CITY_COOKIE);
	}

	function getCity(onSuccess, onError) {
		function onSuccessInner(data) {
			cache_city = data.city.names['ru'];
			setCity(cache_city);

			return onSuccess(cache_city);
		}

		if (cache_city) {
			return onSuccess(cache_city);
		}

		if (geo) {
			return getCityFromMaxMind(onSuccessInner, onError);
		}

		return getCityFromOurServer(onSuccessInner, onError);
	}

	function getCityFromMaxMind(onSuccess, onError) {
		return geo.city(onSuccess, onError);
	}

	// https://github.com/bluesmoon/node-geoip
	function getCityFromOurServer(onSuccess, onError) {
		return onError('This method has not implemented yet');
	}

	function setCity(city) {
		cache_city = city;

		docCookies.setItem(CITY_COOKIE, city, Infinity);
	}


	init();

	module.getCity = getCity;
	module.setCity = setCity;

	return module;
}(jQuery, geoip2, App.geo || {}));