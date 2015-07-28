$(function() {
	var $formLogin = $('.form-login'),
		$formSignup = $('.form-signup'),
		options;

	options = {
		errorElement: 'div'
	};
	$formLogin.validate(options);
	$formSignup.validate(options);
});