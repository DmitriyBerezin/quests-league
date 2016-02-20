$(function() {
	// UI Components
	var EntitiesListEditor = (function() {
		function EntitiesListEditor(container, modal, tmplFn, getActionUrl, multiSelect, onItemSelected) {
			// dom elements
			this.$container = $(container);
			this.$allList = this.$container.find('.all-list');
			this.$selectedList = this.$container.find('.horizontal-list');
			this.$modal = $(modal);
			this.$form;

			// options
			this.tmplFn = tmplFn;
			this.getActionUrl = getActionUrl;
			this.multiSelect = multiSelect;
			this.onItemSelected = onItemSelected;
		}

		EntitiesListEditor.prototype = {
			init: function() {
				this.$selectedList.delegate('li a', 'click', onItemClick.bind(this));
				this.$selectedList.delegate('.remove-icon', 'click', onRemoveIconClick.bind(this));
				this.$container.find('.create-item-link').click(onCreateItemClick.bind(this));
				this.$allList.on('changed.bs.select', onAllListChanged.bind(this));
			}
		};

		function onItemClick(evt) {
			var id = $(evt.target).closest('li').data('id');

			evt.preventDefault();

			getData.call(this, id);
		}

		function onCreateItemClick(evt) {
			evt.preventDefault();

			getData.call(this);
		}

		function getData(id) {
			var url = this.getActionUrl;

			if (id) {
				url = '/' + currLang + url + '/' + id;
			}

			$.getJSON(url).then(onGetSuccess.bind(this), onGetError.bind(this));
		}

		function onGetSuccess(data) {
			data.currLang = currLang;
			this.$modal.find('.modal-content').html(this.tmplFn(data));
			this.$modal.modal('show');

			this.$modal.find('.selectpicker').selectpicker('refresh').change();;

			this.$form = this.$modal.find('form');
			this.$form.validate();
			this.$form.ajaxForm({
				dataType: 'json',
				success: onPutSuccess.bind(this),
				error: onPutError.bind(this),
				beforeSubmit: beforeSubmit
			});
		}

		function onPutSuccess(data) {
			var $itemSlected = this.$container.find('li[data-id="' + data.id + '"]'),
				$itemAll = this.$container.find('option[value="' + data.id + '"]'),
				html;

			if ($itemSlected.length > 0) {
				$itemSlected.find('a').html(data.name);
			}
			else {
				appendItem(data.id, data.name, this.$selectedList);
				if (!this.multiSelect) {
					this.$container.find('.alert').hide();
				}
			}

			if ($itemAll.length > 0) {
				$itemAll.html(data.name);
			}
			else {
				html = $('<option>').val(data.id).html(data.name);
				this.$allList.append(html);
			}
			this.$allList.selectpicker('refresh').change();

			this.$modal.modal('hide');
		}

		function onGetError(res) {

		}

		function onPutError(res) {

		}

		function onRemoveIconClick(evt) {
			$(evt.target).closest('li').remove();

			if (!this.multiSelect && this.$selectedList.find('li').length === 0) {
				this.$container.find('.alert').show();
			}
			this.$allList.val('').selectpicker('refresh').change();
		}

		function appendItem(id, name, $selectedList) {
			var $item = $('<li>'),
				name = name || 'Нет перевода',
				className = name ? null : 'not-translated';

			$item.attr('data-id', id)
				.append($('<a>').attr('href', '#').addClass(className).text(name))
				.append($('<span>').addClass('remove-icon').text('x'));
			$selectedList.append($item);
		}

		function onAllListChanged(evt) {
			var $option = this.$allList.find('option:selected'),
				id = $option.val(),
				name = $option.text(),
				$itemSlected = this.$container.find('li[data-id="' + id + '"]'),
				html;

			if ($itemSlected.length === 0) {
				appendItem(id, name, this.$selectedList);
				if (!this.multiSelect) {
					this.$container.find('.alert').hide();
				}

				if (typeof this.onItemSelected === 'function') {
					this.onItemSelected({ id: id, name: name });
				}
			}
		}

		return EntitiesListEditor;
	}())


	// module code after components block
	var $fileInput = $('.fileinput-button'),
		$warnFiles = $('.alert-files'),
		$imgsContainer = $('.imgs-container'),
		$errorFile = $('.alert-file-upload-err'),
		$removeQuest = $('.remove-quest'),
		$id = $('input[name="id"]'),
		$langPicker = $('.lang-picker'),

		currLang = $langPicker.val();

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
	new EntitiesListEditor('.company-container', '#modalCompany', tmplCompanyEditor, '/admin/company', false).init();
	new EntitiesListEditor('.tags-container', '#modalTag', tmplTagEditor, '/admin/tag', true).init();
	new EntitiesListEditor('.country-container', '#modalCountry', tmplCountryEditor, '/admin/country', false, onCountryChanged).init();
	new EntitiesListEditor('.city-container', '#modalCity', tmplCityEditor, '/admin/city', false, onCityChanged).init();
	new EntitiesListEditor('.stations-container', '#modalStation', tmplStationEditor, '/admin/station', true).init();


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

	function onCountryChanged(data) {
		function onSuccess(cities) {
			var $listCity = $('.city-container').find('select.all-list'),
				$selectedList = $('.city-container').find('.horizontal-list'),
				name;

			$selectedList.empty();
			$listCity.empty();
			$('<option>').appendTo($listCity);
			cities.forEach(function(city) {
				name = city.name || 'Нет перевода';
				$('<option>').val(city.id).html(name).appendTo($listCity);
			});
			$listCity.selectpicker('refresh');
			$listCity.change();
		}

		function onError(err) {

		}

		$.getJSON('/' + currLang + '/admin/cities', { countryID: data.id }).then(onSuccess, onError);
	}

	function onCityChanged(data) {
		function onSuccess(stations) {
			var $listStation = $('.stations-container').find('select.all-list'),
				$selectedList = $('.stations-container').find('.horizontal-list'),
				name;

			$selectedList.empty();
			$listStation.empty();
			$('<option>').appendTo($listStation);
			stations.forEach(function(station) {
				$('<option>').val(station.id).html(station.name).appendTo($listStation);
			});
			$listStation.selectpicker('refresh');
		}

		function onError(err) {

		}

		$.getJSON('/' + currLang + '/admin/stations', { cityID: data.id }).then(onSuccess, onError);
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

		currLang = lang;

		location.replace(location.origin + path);
	}
});
