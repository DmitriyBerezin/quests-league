$(function() {
	var $fileInput = $('.fileinput-button'),
		$warnFiles = $('.alert-files'),
		$imgsContainer = $('.imgs-container'),
		$errorFile = $('.alert-file-upload-text'),
		$removeQuest = $('.remove-quest'),
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

	$removeQuest.click(onRemoveQuestClick);

	toggleFileInput();
	formQuest();
	formCompany();
	formTag();
	formCountry();
	formCity();


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

	function modalForm($modal, $list, $form, $err, onChange) {
		$form.validate();
		$form.ajaxForm({
			dataType: 'json',
			success: onSuccess,
			error: onError,
			beforeSubmit: beforeSubmit
		});

		function onSuccess(data, statusText, xhr) {
			$modal.modal('hide');
			$('<option selected>').val(data.id).html(data.name).appendTo($list);
			$list.selectpicker('refresh');
			$list.change();
			$form.find('button[type="submit"]').attr('disabled', false);
		}

		function onError(error) {
			$err.html(error.responseJSON.message).show();
			$form.find('button[type="submit"]').attr('disabled', false);
		}

		$modal.on('show.bs.modal', function(evt) {
			$form.clearForm();
			$err.hide();
		});

		if (typeof onChange === 'function') {
			$list.on('change', onChange);
		}
	}

	function formCompany() {
		var $modalCompany = $('#modalCompany'),
			$listCompany = $('#listCompany'),
			$formCompany = $('.form-company'),
			$errCompany = $('.alert-company-error');

		modalForm($modalCompany, $listCompany, $formCompany, $errCompany);
	}

	function formTag() {
		var $modalTag = $('#modalTag'),
			$listTag = $('#listTag'),
			$formTag = $('.form-tag'),
			$errTag = $('.alert-tag-error');

		modalForm($modalTag, $listTag, $formTag, $errTag);
	}

	function formCountry() {
		var $modalCountry = $('#modalCountry'),
			$listCountry = $('#listCountry'),
			$listCity = $('#listCity'),
			$formCountry = $('.form-country'),
			$errCountry = $('.alert-country-error');

		function onCountryChange(evt) {
			var countryID = $(evt.target).val();

			$.getJSON('/admin/cities', { countryID: countryID }).then(onSuccess, onError);
			$('input:hidden[name="countryID"]').val(countryID);
		}

		function onSuccess(cities) {
			$listCity.empty();
			cities.forEach(function(city) {
				$('<option>').val(city.id).html(city.name).appendTo($listCity);
			});
			$listCity.selectpicker('refresh');
		}

		function onError(err) {

		}

		modalForm($modalCountry, $listCountry, $formCountry, $errCountry, onCountryChange);
	}

	function formCity() {
		var $modalCity = $('#modalCity'),
			$listCity = $('#listCity'),
			$formCity = $('.form-city'),
			$errCity = $('.alert-city-error');

		modalForm($modalCity, $listCity, $formCity, $errCity);
	}

	function beforeSubmit(arr, $form, options) {
		$form.find('button[type="submit"]').prop('disabled', true);
	}

	function onRemoveQuestClick(evt) {
		function onQuestRemoveSuccess() {
			window.location.href = '/admin/quest/list';
		}

		function onQuestRemoveError(res) {
			var error = 'Квест не удален: ' + res.responseJSON.message;

			$(tmplAlert({ msg: error, className: 'alert-danger' })).appendTo('.form-quest').show();
		}

		if (confirm('Вы чтоно хотите удалить квест?')) {
			$.ajax({
				url: '/admin/quest',
				type: 'DELETE',
				data: {
					id: $id.val()
				},
				success: onQuestRemoveSuccess,
				error: onQuestRemoveError
			});
		}

		evt.preventDefault();
	}
});