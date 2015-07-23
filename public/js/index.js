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
		quests = [],
		pushState = true;


	App.map.init('quests-map');

	// Process search form
	options = {
		beforeSubmit: onSeachFormBeforeSubmit,
		success: onSeachFormSuccess,
		error: onSeachFormError
	};
	$formSeach.ajaxForm(options);

	window.onpopstate = onPopState;
	$viewSwitch.click(onViewSwitchClick);

	applyQueryParams();

	function onSeachFormBeforeSubmit() {
		$preloader.show();
		$listView.html('');
	}

	function onSeachFormSuccess(data) {
		query = $inputSearch.val();

		quests = data;
		if (pushState) {
			history.pushState({ q: query, v: view }, 'test', '?q=' + query + '&v=' + view);
		}
		pushState = true;

		$listView.html(tmplQuestsList({ quests: quests }));
		$inputSearch.focus();
		$preloader.hide();

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

		view = $target.hasClass('map') ? 'map' : 'list';
		history.pushState({ q: query, v: view }, 'map-view', '?q=' + query + '&v=' + view);

		$viewSwitch.removeClass('active');
		$target.addClass('active');

		$mapView.toggle();
		$listView.toggle();

		evt.preventDefault();
	}

	function applyQueryParams() {
		// Initial search
		query = getUrlParameter('q');
		$inputSearch.val(query);
		if (query) {
			$formSeach.submit();
		}

		// Init view
		$viewSwitch.removeClass('active');
		view = getUrlParameter('v');
		if (view === 'map') {
			$('.display-mode-list .map').addClass('active');

			$listView.hide();
			$mapView.show();
		}
		else {
			$('.display-mode-list .list').addClass('active');

			$mapView.hide();
			$listView.show();
		}
	}

	function onPopState(evt) {
		pushState = false;
		applyQueryParams();
	}

	// TODO: move to utils module
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});