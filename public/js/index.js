$(function() {
	var $modalCompany = $('#modalCompany'),
		$listCompany = $('#listCompany'),
		$formCompany = $('.form-company'),
		$modalTag = $('#modalTag'),
		$listTag = $('#listTag'),
		$formTag = $('.form-tag'),
		$formQuest = $('.form-quest');

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


	$formCompany.validate();
	$formCompany.ajaxForm({
		dataType: 'json',
		success: onFormCompanySuccess,
		error: onFormCompanyError
	});

	function onFormCompanySuccess(data, statusText, xhr) {
		$modalCompany.modal('hide');
		$('<option selected>').val(data.id).html(data.name).appendTo($listCompany);
		$listCompany.selectpicker('refresh');
	}

	function onFormCompanyError(error) {
		console.log(error.responseJSON);
	}

	$modalCompany.on('show.bs.modal', function(evt) {
		$formCompany.clearForm();
	});


	$formTag.validate();
	$formTag.ajaxForm({
		dataType: 'json',
		success: onFormTagSuccess,
		error: onFormTagError
	});

	function onFormTagSuccess(data, statusText, xhr) {
		$modalTag.modal('hide');
		$('<option selected>').val(data.id).html(data.name).appendTo($listTag);
		$listTag.selectpicker('refresh');
	}

	function onFormTagError(error) {
		console.log(error.responseJSON);
	}

	$modalTag.on('show.bs.modal', function(evt) {
		$formTag.clearForm();
	});
});