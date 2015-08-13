$(function() {
	var $verifyLink = $('.verify-link'),
		$modalVerify = $('#modalVerify');

	$verifyLink.click(onVerifyLinkClick);

	function onVerifyLinkClick(evt) {
		function cb() {
			$modalVerify.modal('show');
		}

		function eb(err) {
			console.log(err);
		}

		$.getJSON('/auth/verify-start').then(cb, eb);
	}

	App.geo.getCity(onCitySuccess, onCityError);

	function onCitySuccess(city) {
		console.log(city)
	}

	function onCityError(error) {
		console.log(error);
	}
});