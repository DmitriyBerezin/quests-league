$(function() {
	var $formComment = $('.form-comment'),
		$addCommentBlock = $('.add-comment-block'),
		$writeCommentBlock = $('.form-comment-block'),
		$btnAddComment = $('.btn-add-comment'),
		$btnCancelComment = $('.btn-cancel-comment'),
		$loginLink = $('.login-link'),
		$comment = $('textarea[name="comment"]'),
		$userComment = $('.user-comment'),
		$otherComments = $('.other-comments'),
		$noComments = $('.panel-no-comments'),
		questID = $('input:hidden[name="id"]').val();


	$formComment.ajaxForm({
		dataType: 'json',
		success: onFormCommentSuccess,
		error: onFormCommentError
	});

	$btnAddComment.click(onBtnAddCommentClick);
	$btnCancelComment.click(onBtnCancelCommentClick);
	$('.tab-content').delegate('.user-comment-edit', 'click', onUserCommentEditClick);
	$('.tab-content').delegate('.user-comment-remove', 'click', onUserCommentRemoveClick);

	$loginLink.attr('href', $loginLink.attr('href') + window.location.pathname);

	function onFormCommentSuccess(comment) {
		$writeCommentBlock.hide();
		$noComments.hide();

		$userComment.html(tmplEditableComment({ comment: comment })).show();
	}

	function onFormCommentError(res) {
		var error = 'Отзыв не был добавлен: ' + res.responseJSON.message;

		$formComment.append(tmplErrorAlert({ msg: error }));
	}

	function onBtnAddCommentClick(evt) {
		$addCommentBlock.hide();
		$writeCommentBlock.show();
		$formComment.attr('action', '/comment');
		$formComment.find('input[name="id"]').val('');
		$comment.val('').focus();
	}

	function onBtnCancelCommentClick(evt) {
		$writeCommentBlock.hide();
		$userComment.show();
	}

	function onUserCommentEditClick(evt) {
		var commentID = $(evt.target).data('comment-id');

		$userComment.hide();
		$writeCommentBlock.show();
		$formComment.attr('action', '/comment/' + commentID);
		$formComment.find('input[name="id"]').val(commentID);

		$comment.val($userComment.find('.comment-text').text()).focus();
	}

	function onUserCommentRemoveClick(evt) {
		function onCommentRemovedSuccess() {
			$userComment.hide();
			$addCommentBlock.show();

			if ($otherComments.find('.comment').length === 0) {
				$noComments.show();
			}
		}

		if (!confirm('Удалить Ваш комментарий?')) {
			return false;
		}

		var commentID = $(evt.target).data('comment-id'),
			options = {
				url: '/comment',
				type: 'DELETE',
				data: {
					id: commentID,
					questID: questID
				},
				success: onCommentRemovedSuccess
			};

		$.ajax(options);
	}
});