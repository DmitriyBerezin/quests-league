$(function() {
	var $fileInput = $('.fileinput-button'),
		$warnFiles = $('.alert-files'),
		$imgsContainer = $('.imgs-container'),
		$errorFile = $('.alert-file-upload-text'),
		$id = $('input[name="id"]');

	$('input[type="file"]').fileupload({
		done: function(evt, data) {
			var url = data.result.url;
			$('<a data-gallery>')
				.attr('href', url)
				.append($('<img alt="Quest image" class="quest-img">').attr('src', url))
				.appendTo($imgsContainer);

		},
		fail: function(evt, data) {
			$errorFile
				.text(data.errorThrown)
				.parent().show();
		}
	});

	toggleFileInput();
	formQuest();
	formCompany();
	formTag();


	function toggleFileInput() {
		if ($id.val()) {
			$warnFiles.hide();
			$fileInput.show();
		}
		else {
			$warnFiles.show();
			$fileInput.hide();
		}
	}

	function formQuest() {
		var $formQuest = $('.form-quest'),
			$errQuest = $('.alert-quest-error'),
			$successQuest = $('.alert-quest-success');

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
		$formQuest.ajaxForm({
			dataType: 'json',
			success: onFormQuestSuccess,
			error: onFormQuestError,
			beforeSubmit: beforeSubmit
		});

		function onFormQuestSuccess(data, statusText, xhr) {
			window.location = '/admin/quest/' + data.questID;
		}

		function onFormQuestError(error) {
			$errQuest.html(error.responseJSON.message).show();
			$formQuest.find('button[type="submit"]').attr('disabled', false);
		}
	}

	function formCompany() {
		var $modalCompany = $('#modalCompany'),
			$listCompany = $('#listCompany'),
			$formCompany = $('.form-company'),
			$errCompany = $('.alert-company-error');

		$formCompany.validate();
		$formCompany.ajaxForm({
			dataType: 'json',
			success: onFormCompanySuccess,
			error: onFormCompanyError,
			beforeSubmit: beforeSubmit
		});

		function onFormCompanySuccess(data, statusText, xhr) {
			$modalCompany.modal('hide');
			$('<option selected>').val(data.id).html(data.name).appendTo($listCompany);
			$listCompany.selectpicker('refresh');
			$formCompany.find('button[type="submit"]').attr('disabled', false);
		}

		function onFormCompanyError(error) {
			$errCompany.html(error.responseJSON.message).show();
			$formCompany.find('button[type="submit"]').attr('disabled', false);
		}

		$modalCompany.on('show.bs.modal', function(evt) {
			$formCompany.clearForm();
			$errCompany.hide();
		});
	}

	function formTag() {
		var $modalTag = $('#modalTag'),
			$listTag = $('#listTag'),
			$formTag = $('.form-tag'),
			$errTag = $('.alert-tag-error');

		$formTag.validate();
		$formTag.ajaxForm({
			dataType: 'json',
			success: onFormTagSuccess,
			error: onFormTagError,
			beforeSubmit
		});

		function onFormTagSuccess(data, statusText, xhr) {
			$modalTag.modal('hide');
			$('<option selected>').val(data.id).html(data.name).appendTo($listTag);
			$listTag.selectpicker('refresh');
			$formTag.find('button[type="submit"]').attr('disabled', false);
		}

		function onFormTagError(error) {
			$errTag.html(error.responseJSON.message).show();
			$formTag.find('button[type="submit"]').attr('disabled', false);
		}

		$modalTag.on('show.bs.modal', function(evt) {
			$formTag.clearForm();
			$errTag.hide();
		});
	}

	function beforeSubmit(arr, $form, options) {
		$form.find('button[type="submit"]').prop('disabled', true);
	}
});