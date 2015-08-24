$(function() {
	var $verifyLink = $('.verify-link'),
		$modalVerify = $('#modalVerify'),
		$listCity = $('select[name="cityID"]');

	$verifyLink.click(onVerifyLinkClick);
	$listCity.change(onListCityChange);

	function onVerifyLinkClick(evt) {
		function cb() {
			$modalVerify.modal('show');
		}

		function eb(err) {
			console.log(err);
		}

		$.getJSON('/auth/verify-start').then(cb, eb);
	}

	function onCitySuccess(city) {
		console.log(city)
	}

	function onListCityChange(evt) {
		var cityID = $(evt.target).val();

		App.geo.setCity(cityID);
	}
});