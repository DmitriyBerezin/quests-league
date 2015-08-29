$(function() {
	var $verifyLink = $('.verify-link'),
		$modalVerify = $('#modalVerify'),
		$listCity = $('select[name="cityID"]'),
		cities = [],
		currCityID;

	$verifyLink.click(onVerifyLinkClick);
	$listCity.change(onListCityChange);

	currCityID = App.geo.getCurrentCity();
	if (currCityID) {
		selectCity(currCityID);
	}
	else {
		$listCity.find('option[value]').each(function(index, item) {
			var $item = $(item);

			cities.push({
				id: item.value,
				lat: $item.data('lat'),
				lng: $item.data('lng')
			});
		});

		App.geo.getClosestCity(cities, function(cityID) {
			currCityID = cityID;
			selectCity(currCityID);
		});
	}

	function onVerifyLinkClick(evt) {
		function cb() {
			$modalVerify.modal('show');
		}

		function eb(err) {
			console.log(err);
		}

		$.getJSON('/auth/verify-start').then(cb, eb);
	}

	function onListCityChange(evt) {
		var $target = $(evt.target)
			cityID = $target.val(),
			cityName = $target.find('option:selected').text();

		App.geo.setCurrentCity(cityID);

		window.location.reload();
	}

	function selectCity(cityID) {
		$listCity.val(cityID).selectpicker('refresh');
	}
});