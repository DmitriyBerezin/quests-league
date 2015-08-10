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

$(function() {
	var $formChangePassword = $('.form-change-password');

	$formChangePassword.validate({
		errorElement: 'div',
		rules: {
			newPassword: {
				minlength: 6
			},
			newPasswordConfirm : {
				minlength: 6,
				equalTo: '#txtNewPassword'
			}
		}
	});
	$formChangePassword.ajaxForm({
		dataType: 'json',
		success: onFormChangePasswordSuccess,
		error: onFormChangePasswordError
	});

	function onFormChangePasswordSuccess() {
		var msg = 'Ваш пароль был изменен. \r\n\t<a href="/">Продолжить работу с системой</a>';
		$formChangePassword.append(tmplAlert({ msg: msg, className: 'alert-success' }));
	}

	function onFormChangePasswordError(res) {
		var error = 'Произошла ошибка: ' + res.responseJSON.message;
		$formChangePassword.append(tmplAlert({ msg: error, className: 'alert-danger' }));
	}
});