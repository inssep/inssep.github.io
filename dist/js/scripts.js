(function($){
	jQuery.fn.zoomImg = function(){
		var $this = $(this),
			imgZoom = document.createElement('div'),
			container = document.createElement('div'),
			containerInner = document.createElement('div'),
			close = document.createElement('i'),
			overlay = document.createElement('div'),
			loadGif = document.createElement('span');

		imgZoom.className = 'zoom-img';
		container.className = 'zoom-img__container';
		containerInner.className = 'zoom-img__inner';
		close.className = 'zoom-img__close';
		overlay.className = 'zoom-img__overlay';
		loadGif.className = 'zoom-img__load';

		containerInner.appendChild(close);
		container.appendChild(containerInner);
		container.appendChild(loadGif);
		imgZoom.appendChild(overlay);
		imgZoom.appendChild(container);

		overlay.style.display = 'none';
		container.style.display = 'none';
		close.style.display = 'none';

		document.body.appendChild(imgZoom);

		for(var i = 0; i < $this.length; i++){
			$this[i].label = 0;
		}

		$this.on('click', function(event) {
			event.preventDefault();

			var linkAttr = this.getAttribute('href'),
				imgBig = document.createElement('img'),
				thisImg,
				windowHeight = document.documentElement.offsetHeight,
				windowWidth = document.documentElement.offsetWidth,
				imgHeight,
				imgWidth,
				topIndent = document.body.scrollTop || document.documentElement.scrollTop;

			imgBig.setAttribute('src', linkAttr);

			container.style.top = topIndent + 20 + 'px';
			container.style.height = windowHeight - 20 + 'px';
			overlay.style.display = 'block';
			container.style.display = 'block';
			loadGif.style.display = 'block';

			if (this.label == 0) {
				var imgLoad = setInterval(function(){
					if (imgBig.complete) {
						containerInner.appendChild(imgBig);
						close.style.display = 'block';
						calcImgSize();
						loadGif.style.display = 'none';
						clearInterval(imgLoad);
					}
				}, 500);
				this.label = 1;
			} else {
				calcImgSize();
				loadGif.style.display = 'none';
				close.style.display = 'block';
			};

			function calcImgSize() {
				for (var i = 1; i < containerInner.children.length; i++) {
					if(containerInner.children[i].getAttribute('src') == linkAttr) {
						thisImg = containerInner.children[i];
						break;
					}
				};

				thisImg.style.display = 'block';

				imgHeight = thisImg.offsetHeight;
				imgWidth = thisImg.offsetWidth;

				calcImgWidth = Math.round((windowWidth * 80 / 100));
				calcImgHeight = Math.round((windowHeight * 80 / 100));

				newImgWidth = Math.round(imgWidth * calcImgHeight / imgHeight);
				newImgHeight = Math.round(imgHeight * calcImgWidth / imgWidth);

				if (imgHeight >= windowHeight && imgWidth >= windowWidth) {
					if (newImgWidth <= windowWidth - 30) {
						thisImg.style.height = calcImgHeight + 'px';
						thisImg.style.width = newImgWidth + 'px';
					} else {
						thisImg.style.width = calcImgWidth + 'px';
						thisImg.style.height = newImgWidth + 'px';
					};
				} else if (imgHeight >= windowHeight - 30) {
					if (newImgWidth <= windowWidth - 30) {
						thisImg.style.height = calcImgHeight + 'px';
						thisImg.style.width = newImgWidth + 'px';
					} else {
						thisImg.style.width = calcImgWidth + 'px';
						thisImg.style.height = newImgWidth + 'px';
					};
				} else if (imgWidth >= windowWidth - 30) {
					thisImg.style.width = calcImgWidth + 'px';
					thisImg.style.height = newImgWidth + 'px';
				};
				thisImg.style.opacity = 1;
			}
		});

		$(close).on('click', function() {
			for (var i = 0; i < containerInner.children.length; i++) {
				containerInner.children[i].removeAttribute('style');
				containerInner.children[i].style.display = 'none';
			};
			container.style.display = 'none';
			overlay.style.display = 'none';
		});

	};
})(jQuery);

(function($){
	jQuery.fn.leafSlide = function(options){
		options = $.extend({
			sliderName: 'slide',
			pagination: false
		}, options);

		var $this = $(this),
			 slider = $this.children(),
			 sliderList = slider[0],
			 sliderListPos = 0,

			 sliderItem = sliderList.children,
			 sliderItemCount = sliderItem.length,

			 navItem = slider[2].children,
			 navItemDisabled = options.sliderName + '__nav-item_disabled';

		$(sliderList).css('width', sliderItemCount * 100 + '%');
		$(sliderItem).css('width', 100 / sliderItemCount + '%');

		if (options.pagination) {
			var pagination = slider[1],
				 paginationItem = null,
				 paginationItemCurrent = options.sliderName + '__pagination-item_current',
				 paginationItemPos = 0,
				 paginationInner = '<span class="' + options.sliderName + '__pagination-item ' + options.sliderName + '__pagination-item_current"></span> ';

			for (var i = 1; i < sliderItemCount; i++) {
				paginationInner += '<span class="' + options.sliderName + '__pagination-item"></span> ';
			};
			pagination.innerHTML = paginationInner;
			paginationItem = pagination.children;
		};

		navItem[0].label = 0;
		navItem[1].label = 1;

		$(navItem).on('click', function(event) {
			event.preventDefault();

			if (this.label == 1 && sliderListPos > - (sliderItemCount -1) * 100) {
				$(sliderList).css('left', (sliderListPos += - 100) + '%');
				$(paginationItem).removeClass(paginationItemCurrent);
				paginationItemPos ++;
				$(paginationItem[paginationItemPos]).addClass(paginationItemCurrent);

			} else if (this.label == 0 && sliderListPos < 0) {
				$(sliderList).css('left', (sliderListPos += + 100) + '%');
				$(paginationItem).removeClass(paginationItemCurrent);
				paginationItemPos --;
				$(paginationItem[paginationItemPos]).addClass(paginationItemCurrent);
			};

			if (sliderListPos == 0) {
				$(navItem[0]).addClass(navItemDisabled);

			} else if (sliderListPos == - (sliderItemCount -1) * 100) {
				$(navItem[1]).addClass(navItemDisabled);

			} else {
				$(navItem[0]).removeClass(navItemDisabled);
				$(navItem[1]).removeClass(navItemDisabled);
			};
		});
	};
})(jQuery);



jQuery(document).ready(function($) {
	(function(){
		var switcher = document.querySelector('.js-main-menu__switcher'),
			classValueOpen = 'main-menu_open';

		switcher.onclick = function() {
			if (!switcher.label) {
				this.parentNode.className += ' ' + classValueOpen;
				switcher.label = true;
			} else {
				var classValue = this.parentNode.className;

				this.parentNode.className = classValue.slice(0, classValue.indexOf(' ' + classValueOpen));;
				switcher.label = false;
			};
		}
	})();

	(function(){
		var popup = document.querySelector('.js-description'),
			pupupClose = document.querySelector('.js-description__close');

		popup.style.display = "block";

		pupupClose.onclick = function() {
			popup.style.display = "none";
		}
	})();

	$('.js-slider').leafSlide({
		sliderName: 'slider',
		pagination: true
	});

	$('.js-notebook-link').zoomImg();
});