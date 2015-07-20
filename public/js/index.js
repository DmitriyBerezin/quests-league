$(function() {
	var $formSeach = $('.form-search'),
		$foundedQuests = $('.founded-quests'),
		$btnSearch = $('.btn-search'),
		$inputSearch = $('.input-search'),
		query,
		options;

	// Process search form
	options = {
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

	function onSeachFormSuccess(data) {
		var query = $inputSearch.val();

		history.pushState({ q: query }, 'test', '?q=' + query);
		$foundedQuests.html(data);
		$inputSearch.focus();
	}

	function onSeachFormError(err) {

	}

	// TODO: move to utils module
	function getUrlParameter(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
});