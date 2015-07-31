$(function() {
	var $formComment = $('.form-comment'),
		$addCommentBlock = $('.add-comment-block'),
		$writeCommentBlock = $('.form-comment-block'),
		$btnAddComment = $('.btn-add-comment'),
		$alertCommentSuccess = $('.alert-comment-success'),
		$loginLink = $('.login-link'),
		$comment = $('textarea[name="comment"]'),
		$reviews = $('#reviews');


	$formComment.ajaxForm({
		dataType: 'json',
		success: onFormCommentSuccess,
		error: onFormCommentError
	});

	$btnAddComment.click(onBtnAddCommentClick);

	$loginLink.attr('href', $loginLink.attr('href') + window.location.pathname);

	function onFormCommentSuccess(comment) {
		$alertCommentSuccess.show();
		$writeCommentBlock.hide();

		$reviews.append(tmplComment({ comment: comment }));
	}

	function onFormCommentError(res) {
		var error = 'Отзыв не был добавлен: ' + res.responseJSON.message;

		$alertCommentSuccess.hide();
		$formComment.append(tmplErrorAlert({ msg: error }));
	}

	function onBtnAddCommentClick(evt) {
		$addCommentBlock.hide();
		$writeCommentBlock.show();
		$comment.focus();
	}
});