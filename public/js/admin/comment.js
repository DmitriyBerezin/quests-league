$(function() {
	var $formComment = $('.form-comment'),
		btnRemove = $('.btn-remove'),
		commentID = $('input[name="id"]').val();

	$formComment.ajaxForm({
		dataType: 'json',
		success: onFormCommentSuccess,
		error: onFormCommentError
	});
	btnRemove.click(onBtnRemoveClick);

	function onFormCommentSuccess() {
		var msg = 'Спасибо! Теперь этот отзыв будет виден всем пользователям портала';
		$formComment.append(tmplAlert({ msg: msg, className: 'alert-success' }));
	}

	function onFormCommentError(res) {
		var error = 'Произошла ошибка: ' + res.responseJSON.message;
		$formComment.append(tmplAlert({ msg: error, className: 'alert-danger' }));
	}

	function onBtnRemoveClick(evt) {
		function onCommentRemovedSuccess() {
			var msg = 'Комментарий удален. Для его восстановления, свяжитесь с программистами портала.';
			$formComment.append(tmplAlert({ msg: msg, className: 'alert-success' }));
		}

		function onCommentRemovedError(res) {
			var error = 'Произошла ошибка: ' + res.responseJSON.message;
			$formComment.append(tmplAlert({ msg: error, className: 'alert-danger' }));
		}

		if (!confirm('Удалить комментарий?')) {
			return false;
		}

		var	options = {
				url: '/comment',
				type: 'DELETE',
				data: {
					id: commentID
				},
				success: onCommentRemovedSuccess,
				error: onCommentRemovedError
			};

		$.ajax(options);
	}
});