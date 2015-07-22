$(function() {
	var $formSeach = $('.form-search'),
		$foundedQuests = $('.founded-quests'),
		$btnSearch = $('.btn-search'),
		$inputSearch = $('.input-search'),
		$preloader = $('.search-preloader'),
		query,
		options,
		quests = [];

	// Process search form
	options = {
		beforeSubmit: onSeachFormBeforeSubmit,
		success: onSeachFormSuccess,
		error: onSeachFormError
	};
	$formSeach.ajaxForm(options);

	// Initial search
	query = getUrlParameter('q');
	if (query) {
		$inputSearch.val(query);
		$formSeach.submit();
	}

	function onSeachFormBeforeSubmit() {
		$preloader.show();
		$foundedQuests.html('');
	}

	function onSeachFormSuccess(data) {
		var query = $inputSearch.val();

		history.pushState({ q: query }, 'test', '?q=' + query);
		$foundedQuests.html(tmplQuestsList(data));
		$inputSearch.focus();
		$preloader.hide();
	}

	function onSeachFormError(err) {
		$preloader.hide();
	}

	// TODO: move to utils module
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});