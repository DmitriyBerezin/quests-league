(function ($) {

	$.fn.infiniteScroll = function (getPage, options) {
		var applied = [];

		if (typeof(getPage) != 'function') {
			throw('Переменная функции получения страницы не определена или не содержит ссылку на функцию.');
		}

		if (applied.indexOf(applied) > -1) {
			return;
		}

		applied.push(applied);

		return this.each(function () {
			var listElem = $(this),
				page = 1,
				await = false,
				listHeight,
				bottomLine;

			var opts = $.extend({}, $.fn.infiniteScroll.defaults, options);
			var scrolledElem = $(opts.scrolledElemSelector);

			var onScroll = function () {
				var pageLimitCondition = opts.totalPages > 0 ?  page < opts.totalPages :  true;

				if (listElem.closest(scrolledElem).length == 0  || listElem.closest(document).length == 0
					|| !pageLimitCondition) {
					scrolledElem.unbind('scroll', onScroll);
					return;
				}

				if (!bottomLine) {
					listHeight = listElem.height();
					bottomLine = listHeight + listElem.offset().top;

					if (typeof(scrolledElem.get(0).documentElement) == 'undefined')
						bottomLine -= scrolledElem.offset().top;
				}

				var clientHeight = typeof(scrolledElem.get(0).documentElement) != 'undefined'
					? scrolledElem.get(0).documentElement.clientHeight
					: scrolledElem.get(0).clientHeight;

				var positionCondition = scrolledElem.scrollTop() + clientHeight > bottomLine - opts.bottomOffset;

				if (positionCondition && !await) {
					await = true;

					var throbber = null;
					var onFetchStart = function (html, elementName) {
						if (typeof(elementName) != 'string')  elementName = 'div';

						if (typeof(html) == 'string')  try {
							throbber = document.createElement(elementName);
							$(throbber).append(html);
							listElem.append(throbber);
						} catch (e) {
							console.log('e: ', e);
							throbber = document.createElement('div');
							$(throbber).append('Загрузка...');
							listElem.append(throbber);
						}
					}

					var onFetchComplete = function (html, stopScroll, onAfterHtmlAppend) {
						if (throbber != null) {
							$(throbber).remove();
							throbber = null;
						}
						if (stopScroll) {
							scrolledElem.unbind('scroll', onScroll);
						}

						if (typeof(html) == 'string')  try {
							listElem.append(html);

							if (arguments.length > 2 && typeof(onAfterHtmlAppend) == 'function') {
								onAfterHtmlAppend()
							}
						}
						catch (e) {throw(e)}

						bottomLine -= listHeight;
						listHeight = listElem.height();
						bottomLine += listHeight;
						await = false;

						if (!stopScroll)
							onScroll();
					}

					getPage(++page, onFetchStart, onFetchComplete);
				}
			}
			scrolledElem.bind('scroll', onScroll);

			if (opts.totalPages > 1)
				onScroll();
		});

		return this;
	};

	/*
	 * scrolledElemSelector - Элемент, прокручивая который мы перемещаемся по контенту
	 * bottomOffset - отступ, домотав до которого начинается загрузка следующей страницы
	 * totalPages - количество страниц, по которым возможна прокрутка, 0 - бесконечность
	 * */
	$.fn.infiniteScroll.defaults = {
		scrolledElemSelector : document,
		bottomOffset         : 100,
		totalPages           : 0
	}

}(jQuery));
