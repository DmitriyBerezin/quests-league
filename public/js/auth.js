$(function() {
	var $formLogin = $('.form-login'),
		$formSignup = $('.form-signup');

	$formLogin.validate({
		errorElement: 'div'
	});

	$formSignup.validate({
		errorElement: 'div',
		rules: {
			password: {
				minlength: 6
			},
			passwordConfirmation : {
				minlength: 6,
				equalTo: '#sigupPassword'
			}
		}
	});
});