$(function() {
	var $fileInput = $('.fileinput-button'),
		$warnFiles = $('.alert-files'),
		$imgsContainer = $('.imgs-container'),
		$errorFile = $('.alert-file-upload-err'),
		$removeQuest = $('.remove-quest'),
		$id = $('input[name="id"]'),
		$langPicker = $('.lang-picker');

	$('input[type="file"]').fileupload({
		done: function(evt, data) {
			var url = data.result.url;
			$('<a data-gallery>')
				.attr('href', url)
				.append($('<img alt="Quest image" class="quest-img">').attr('src', url))
				.appendTo($imgsContainer);

		},
		fail: function(evt, data) {
			$errorFile.append(tmplAlert({ msg: data.errorThrown, className: 'alert-danger' }));
		}
	});

	$removeQuest.click(onRemoveQuestClick);
	$langPicker.change(onLangPickerChange);

	toggleFileInput();
	formQuest();
	// formCompany();
	horizontalList('.company-container', '#modalCompany', tmplCompanyEditor, '/admin/company', false);
	formTag();
	formCountry();
	formCity();
	formStation();


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
		if ($formQuest.length > 0) {
			$formQuest.data('validator').settings.ignore = '';
		}
		$formQuest.ajaxForm({
			dataType: 'json',
			success: onFormQuestSuccess,
			error: onFormQuestError,
			beforeSubmit: beforeSubmit
		});

		function onFormQuestSuccess(data, statusText, xhr) {
			window.location = '/admin/quest/' + data.questID;
		}

		function onFormQuestError(res) {
			var error = res.responseJSON.message;
			$formQuest.append(tmplAlert({ msg: error, className: 'alert-danger' }));
			$formQuest.find('button[type="submit"]').attr('disabled', false);
		}
	}

	function horizontalList(container, modal, tmplFn, getActionUrl, multiSelect) {
		var $container = $(container),
			$allList = $container.find('.all-list'),
			$selectedList = $container.find('.horizontal-list'),
			$modal = $(modal),
			$form;

		$selectedList.delegate('li a', 'click', onItemClick);
		$selectedList.delegate('.remove-icon', 'click', onRemoveIconClick);
		$('.create-item-link').click(onCreateItemClick);
		$allList.on('changed.bs.select', onAllListChanged);

		function onItemClick(evt) {
			var id = $(evt.target).closest('li').data('id');

			evt.preventDefault();
			$.getJSON(getActionUrl + '/' + id).then(onGetSuccess, onGetError);
		}

		function onCreateItemClick(evt) {
			evt.preventDefault();
			$.getJSON(getActionUrl).then(onGetSuccess, onGetError);
		}

		function onGetSuccess(data) {
			$modal.find('.modal-content').html(tmplFn(data));
			$modal.modal('show');

			$form = $modal.find('form');
			$form.validate();
			$form.ajaxForm({
				dataType: 'json',
				success: onPutSuccess,
				error: onPutError,
				beforeSubmit: beforeSubmit
			});
		}

		function onPutSuccess(data) {
			var $itemSlected = $container.find('li[data-id="' + data.id + '"]'),
				$itemAll = $container.find('option[value="' + data.id + '"]'),
				html;

			if ($itemSlected.length > 0) {
				$itemSlected.find('a').html(data.name);
			}
			else {
				appendItem(data.id, data.name);
				if (!multiSelect) {
					$container.find('.alert').hide();
				}
			}

			if ($itemAll.length > 0) {
				$itemAll.html(data.name);
			}
			else {
				html = $('<option>').val(data.id).html(data.name);
				$allList.append(html);
			}
			$allList.selectpicker('refresh').change();

			$modal.modal('hide');
		}

		function onGetError(res) {

		}

		function onPutError(res) {

		}

		function onRemoveIconClick(evt) {
			$(evt.target).closest('li').remove();

			if (!multiSelect && $selectedList.find('li').length === 0) {
				$container.find('.alert').show();
			}
			$allList.val('').selectpicker('refresh').change();
		}

		function appendItem(id, name) {
			var $item = $('<li>'),
				name = name || 'Нет перевода',
				className = name ? null : 'not-translated';

			$item.data('id', id)
				.append($('<a>').attr('href', '#').addClass(className).text(name))
				.append($('<span>').addClass('remove-icon').text('x'));
			$selectedList.append($item);
		}

		function onAllListChanged(evt) {
			var $option = $allList.find('option:selected'),
				id = $option.val(),
				name = $option.text(),
				$itemSlected = $container.find('li[data-id="' + id + '"]'),
				html;

			if ($itemSlected.length === 0) {
				appendItem(id, name);
				if (!multiSelect) {
					$container.find('.alert').hide();
				}
			}
		}
	}

	function modalForm($modal, $list, $form, onChange) {
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

		function onError(res) {
			var error = res.responseJSON.message;
			$form.find('.modal-body').prepend(tmplAlert({ msg: error, className: 'alert-danger' }));
			$form.find('button[type="submit"]').attr('disabled', false);
		}

		$modal.on('show.bs.modal', function(evt) {
			$form.clearForm();
		});

		if (typeof onChange === 'function') {
			$list.on('change', onChange);
		}
	}

	function formCompany() {
		var $modalCompany = $('#modalCompany'),
			$listCompany = $('#listCompany'),
			$formCompany = $('.form-company');

		modalForm($modalCompany, $listCompany, $formCompany);
	}

	function formTag() {
		var $modalTag = $('#modalTag'),
			$listTag = $('#listTag'),
			$formTag = $('.form-tag');

		modalForm($modalTag, $listTag, $formTag);
	}

	function formCountry() {
		var $modalCountry = $('#modalCountry'),
			$listCountry = $('#listCountry'),
			$listCity = $('#listCity'),
			$formCountry = $('.form-country');

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
			$listCity.change();
		}

		function onError(err) {

		}

		modalForm($modalCountry, $listCountry, $formCountry, onCountryChange);
	}

	function formCity() {
		var $modalCity = $('#modalCity'),
			$listCity = $('#listCity'),
			$listStation = $('#listStation'),
			$formCity = $('.form-city');

		function onCityChange(evt) {
			var cityID = $(evt.target).val();

			$.getJSON('/admin/stations', { cityID: cityID }).then(onSuccess, onError);
			$('input:hidden[name="cityID"]').val(cityID);
		}

		function onSuccess(stations) {
			$listStation.empty();
			stations.forEach(function(station) {
				$('<option>').val(station.id).html(station.name).appendTo($listStation);
			});
			$listStation.selectpicker('refresh');
		}

		function onError(err) {

		}

		modalForm($modalCity, $listCity, $formCity, onCityChange);
	}

	function formStation() {
		var $modalStation = $('#modalStation'),
			$listStation = $('#listStation'),
			$formStation = $('.form-station');

		modalForm($modalStation, $listStation, $formStation);
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


	$(document).delegate('.company-edit', 'click', onCompanyEditClick);

	function onCompanyEditClick(evt) {
		function onCompanyEditSuccess(data) {
			$companyBlock.find('.company-name').html(data.name);
			$companyBlock.data('name', data.name);
			$companyBlock.data('site', data.site);
			$modalCompany.modal('hide');
		}

		function onCompanyEditError(res) {
			var error = 'Произошла ошибка: ' + res.responseJSON.message;
			$formCompany.find('.modal-body').prepend(tmplAlert({ msg: error, className: 'alert-danger' }));
			$formCompany.find('button').attr('disabled', false);
		}

		function onCompanyRemoveSuccess() {
			$modalCompany.modal('hide');
			$('.company-block[data-id="' + company.id + '"]').remove();
		}

		function onBtnCompanyRemoveClick(evt) {
			var companyID = $formCompany.find('input[name="id"]').val();

			if (confirm('Вы точно хотите удалить компанию?')) {
				$.ajax({
					type: 'DELETE',
					url: '/admin/company',
					data: {
						id: companyID
					},
					complete: onCompanyRemoveSuccess,
					error: onCompanyEditError
				});
			}
		}

		var $companyBlock = $(evt.target).closest('.company-block'),
			company = {
				id: $companyBlock.data('id'),
				name: $companyBlock.data('name'),
				site: $companyBlock.data('site')
			},

			$modalCompany,
			$formCompany;

		$('#modalCompany').remove();
		$modalCompany = $(tmplCompanyModal({ company: company })).appendTo('body');
		$modalCompany.modal('show');
		$formCompany = $modalCompany.find('.form-company');
		$formCompany.validate();
		$formCompany.ajaxForm({
			dataType: 'json',
			success: onCompanyEditSuccess,
			error: onCompanyEditError,
			beforeSubmit: beforeSubmit
		});
		$('.btn-company-remove').click(onBtnCompanyRemoveClick);
	}

	function onLangPickerChange(evt) {
		var path = location.pathname,
			langRegex = /^\/[a-z]{2}\//i,
			lang = $langPicker.val();

		if (path.search(langRegex) > -1) {
			path = path.replace(langRegex, '/' + lang + '/');
		}
		else {
			path = '/' + lang + path;
		}

		location.replace(location.origin + path);
	}
});