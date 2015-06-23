$(function() {
	var $formCompany = $('.form-company'),
		$formQuest = $('.form-quest');

	$formCompany.validate({
		errorElement: 'div',
		errorClass: 'error'
	});
	$formCompany.ajaxForm({
		success: onFormCompanySuccess,
		error: onFormCompanyError
	});

	$formQuest.validate({
		errorElement: 'div',
		errorClass: 'error',
		errorPlacement: function (error, element) {
			if (element.hasClass('selectpicker')) {
				element.next('.bootstrap-select').after(error);
			}
			else {
				element.after(error);
			}
		}
	});
	// http://stackoverflow.com/questions/21018970/bootstrap-select-plugin-not-work-with-jquery-validation
	$formQuest.data('validator').settings.ignore = '';



	$('.btn-company-create').click(onConpanyCreateClick);

	function onFormCompanySuccess(responseText, statusText, xhr) {

	}

	function onFormCompanyError(error) {

	}
});