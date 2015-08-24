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
			},
			email: {
				remote: {
					url: '/auth/email/check',
					type: 'post'
				}
			}
		},
		messages: {
			email: {
				remote: 'Указанный email уже используется.'
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

$(function() {
	var $formForgotPassword = $('.form-forgot-password');

	$formForgotPassword.validate({
		errorElement: 'div'
	});
	$formForgotPassword.ajaxForm({
		dataType: 'json',
		success: onFormForgotPasswordSuccess,
		error: onFormForgotPasswordError
	});

	function onFormForgotPasswordSuccess() {
		var msg = 'На указанный Вами адрес была выслана инструкция по восстановлению пароля';
		$formForgotPassword.append(tmplAlert({ msg: msg, className: 'alert-info' }));
	}

	function onFormForgotPasswordError(res) {
		var error = 'Произошла ошибка: ' + res.responseJSON.message;
		$formForgotPassword.append(tmplAlert({ msg: error, className: 'alert-danger' }));
	}
});

$(function() {
	var $formResetPassword = $('.form-reset-password'),
		$token = $('input[name="token"]');

	$token.val(getUrlParameter('token'));

	$formResetPassword.validate({
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
	$formResetPassword.ajaxForm({
		dataType: 'json',
		success: onFormResetPasswordSuccess,
		error: onFormResetPasswordError
	});

	function onFormResetPasswordSuccess() {
		var msg = 'Ваш пароль был изменен. \r\n\t<a href="/">Продолжить работу с системой</a>';
		$formResetPassword.append(tmplAlert({ msg: msg, className: 'alert-success' }));
	}

	function onFormResetPasswordError(res) {
		var error = 'Произошла ошибка: ' + res.responseJSON.message;
		$formResetPassword.append(tmplAlert({ msg: error, className: 'alert-danger' }));
	}

	// TODO: move to utils module
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});