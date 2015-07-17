$(function() {
	var $foundedQuests = $('.founded-quests'),
		$btnSearch = $('.btn-search'),
		$inputSearch = $('.input-search');

	$btnSearch.click(onButtonSearchClick);

	function onButtonSearchClick(evt) {
		search($inputSearch.val());
	}

	function search(query) {
		function cb(html) {
			$foundedQuests.html(html);
		}

		function eb() {

		}

		$.get('/quest/search', { query: query }).then(cb, eb);
	}
});