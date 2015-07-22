$(function() {
	var $formSeach = $('.form-search'),
		$listView = $('.founded-quests-list'),
		$mapView = $('.founded-quests-map'),
		$btnSearch = $('.btn-search'),
		$inputSearch = $('.input-search'),
		$preloader = $('.search-preloader'),
		$viewSwitch = $('.display-mode-list li'),
		query,
		view = 'list',
		options,
		quests = [];

	// Process search form
	options = {
		beforeSubmit: onSeachFormBeforeSubmit,
		success: onSeachFormSuccess,
		error: onSeachFormError
	};
	$formSeach.ajaxForm(options);

	$viewSwitch.click(onViewSwitchClick);

	// Initial search
	query = getUrlParameter('q');
	if (query) {
		$inputSearch.val(query);
		$formSeach.submit();
	}
	view = getUrlParameter('v');
	if (view === 'map') {
		$viewSwitch.removeClass('active');
		$('.display-mode-list .map').addClass('active');

		$listView.hide();
		$mapView.show();
	}
	else {
		$mapView.hide();
		$listView.show();
	}

	function onSeachFormBeforeSubmit() {
		$preloader.show();
		$listView.html('');
	}

	function onSeachFormSuccess(data) {
		var query = $inputSearch.val();

		quests = data;
		history.pushState({ q: query, v: view }, 'test', '?q=' + query + '&v=' + view);

		$listView.html(tmplQuestsList({ quests: quests }));
		$inputSearch.focus();
		$preloader.hide();

		App.map.init('quests-map');
		App.map.render(quests);
	}

	function onSeachFormError(err) {
		quests = [];

		$preloader.hide();
	}

	function onViewSwitchClick(evt) {
		var $target = $(evt.currentTarget);

		if ($target.hasClass('active')) {
			return;
		}

		if ($target.hasClass('map')) {
			view = 'map';
			history.pushState({ q: query, v: view }, 'map-view', '?q=' + query + '&v=' + view);
		}

		$viewSwitch.removeClass('active');
		$target.addClass('active');

		$mapView.toggle();
		$listView.toggle();

		evt.preventDefault();
	}

	// TODO: move to utils module
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});