$(function() {
	var $modalCompany = $('#modalCompany'),
		$listCompany = $('#listCompany'),
		$formCompany = $('.form-company'),
		$errCompany = $('.alert-company-error'),
		$modalTag = $('#modalTag'),
		$listTag = $('#listTag'),
		$formTag = $('.form-tag'),
		$errTag = $('.alert-tag-error'),
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
	// $formQuest.data('validator').settings.ignore = '';
	$formQuest.ajaxForm({
		dataType: 'json',
		success: onFormQuestSuccess,
		error: onFormQuestError
	});

	function onFormQuestSuccess(data, statusText, xhr) {
		window.location = '/admin/quest/list'
	}

	function onFormQuestError(error) {
		// $errCompany.html(error.responseJSON.message).show();
	}


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
		$errCompany.html(error.responseJSON.message).show();
	}

	$modalCompany.on('show.bs.modal', function(evt) {
		$formCompany.clearForm();
		$errCompany.hide();
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
		$errTag.html(error.responseJSON.message).show();
	}

	$modalTag.on('show.bs.modal', function(evt) {
		$formTag.clearForm();
		$errTag.hide();
	});
});