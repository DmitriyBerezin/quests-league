var App = App || {};

App.map = (function($, module) {
	var container,
		map;

	function init(elem) {
		container = elem;
	}

	function render(quests) {
		var coords,
			center,
			placemark;

		coords = quests.map(function(quest) {
			return [quest.lat, quest.lng];
		});
		center = getLatLngCenter(coords);

		ymaps.ready(function() {
			if (!map) {
				map = new ymaps.Map(container, {
					center: center,
					zoom: 13
				});
			}
			map.setCenter(center);

			map.geoObjects.removeAll();
			for (var i = 0; i < quests.length; ++i) {
				placemark = new ymaps.Placemark([quests[i].lat, quests[i].lng], {
					balloonContentBody: '<a href="/quest/' + quests[i].id + '">' + quests[i].name + '</a>',
					hintContent: quests[i].name
				});
				map.geoObjects.add(placemark);
			}
		});
	}

	function rad2degr(rad) {
		return rad * 180 / Math.PI;
	}

	function degr2rad(degr) {
		return degr * Math.PI / 180;
	}

	// http://stackoverflow.com/questions/6671183/calculate-the-center-point-of-multiple-latitude-longitude-coordinate-pairs
	function getLatLngCenter(latLngInDegr) {
		var sumX = 0,
			sumY = 0,
			sumZ = 0,
			lat,
			lng,
			LATIDX = 0,
			LNGIDX = 1;

		for (var i = 0; i < latLngInDegr.length; i++) {
			lat = degr2rad(latLngInDegr[i][LATIDX]);
			lng = degr2rad(latLngInDegr[i][LNGIDX]);
			// sum of cartesian coordinates
			sumX += Math.cos(lat) * Math.cos(lng);
			sumY += Math.cos(lat) * Math.sin(lng);
			sumZ += Math.sin(lat);
		}

		var avgX = sumX / latLngInDegr.length;
		var avgY = sumY / latLngInDegr.length;
		var avgZ = sumZ / latLngInDegr.length;

		// convert average x, y, z coordinate to latitude and longtitude
		lng = Math.atan2(avgY, avgX);
		var hyp = Math.sqrt(avgX * avgX + avgY * avgY);
		lat = Math.atan2(avgZ, hyp);

		return ([rad2degr(lat), rad2degr(lng)]);
	}

	module.init = init;
	module.render = render;

	return module;
}(jQuery, App.map || {}));