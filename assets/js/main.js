/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right'
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		if (!browser.mobile
		&&	$header.hasClass('alt')
		&&	$banner.length > 0) {

			$window.on('load', function() {

				$banner.scrollex({
					bottom:		$header.outerHeight(),
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt reveal'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			});

		}

		$("#ler").click(function(){
				window.location.href='#main';
		});
})(jQuery);

jQuery(document).ready(function($){
	var itemInfoWrapper = $('.cd-single-item');

	itemInfoWrapper.each(function(){
		var container = $(this),
			// create slider pagination
			sliderPagination = createSliderPagination(container);

		//update slider navigation visibility
		updateNavigation(container, container.find('.cd-slider li').eq(0));


			//enlarge slider images

				itemInfoWrapper.removeClass('cd-slider-active');
				container.addClass('cd-slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					$('body,html').animate({'scrollTop':container.offset().top}, 200);
				});

		

		container.find('.cd-close').on('click', function(){
			//shrink slider images
			container.removeClass('cd-slider-active');
		});

		//update visible slide
		container.find('.cd-next').on('click', function(){
			nextSlide(container, sliderPagination);
		});

		container.find('.cd-prev').on('click', function(){
			prevSlide(container, sliderPagination);
		});

		container.find('.cd-slider').on('swipeleft', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':last-child') && bool) {nextSlide(container, sliderPagination);}
		});

		container.find('.cd-slider').on('swiperight', function(){
			var wrapper = $(this),
				bool = enableSwipe(container);
			if(!wrapper.find('.selected').is(':first-child') && bool) {prevSlide(container, sliderPagination);}
		});

		sliderPagination.on('click', function(){
			var selectedDot = $(this);
			if(!selectedDot.hasClass('selected')) {
				var selectedPosition = selectedDot.index(),
					activePosition = container.find('.cd-slider .selected').index();
				if( activePosition < selectedPosition) {
					nextSlide(container, sliderPagination, selectedPosition);
				} else {
					prevSlide(container, sliderPagination, selectedPosition);
				}
			}
		});
	});

	//keyboard slider navigation
	$(document).keyup(function(event){
		if(event.which=='37' && $('.cd-slider-active').length > 0 && !$('.cd-slider-active .cd-slider .selected').is(':first-child')) {
			prevSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
		} else if( event.which=='39' && $('.cd-slider-active').length && !$('.cd-slider-active .cd-slider .selected').is(':last-child')) {
			nextSlide($('.cd-slider-active'), $('.cd-slider-active').find('.cd-slider-pagination li'));
		} else if(event.which=='27') {
			itemInfoWrapper.removeClass('cd-slider-active');
		}
	});

	function createSliderPagination($container){
		var wrapper = $('<ul class="cd-slider-pagination"></ul>').insertAfter($container.find('.cd-slider-navigation'));
		$container.find('.cd-slider li').each(function(index){
			var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
				dot = $('<a href="#0"></a>').appendTo(dotWrapper);
			dotWrapper.appendTo(wrapper);
			dot.text(index+1);
		});
		return wrapper.children('li');
	}

	function nextSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.cd-slider .selected'),
			navigationDot = $container.find('.cd-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() + 1;
		visibleSlide.removeClass('selected');
		$container.find('.cd-slider li').eq($n).addClass('selected').prevAll().addClass('move-left');
		navigationDot.removeClass('selected')
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.cd-slider li').eq($n));
	}

	function prevSlide($container, $pagination, $n){
		var visibleSlide = $container.find('.cd-slider .selected'),
			navigationDot = $container.find('.cd-slider-pagination .selected');
		if(typeof $n === 'undefined') $n = visibleSlide.index() - 1;
		visibleSlide.removeClass('selected')
		$container.find('.cd-slider li').eq($n).addClass('selected').removeClass('move-left').nextAll().removeClass('move-left');
		navigationDot.removeClass('selected');
		$pagination.eq($n).addClass('selected');
		updateNavigation($container, $container.find('.cd-slider li').eq($n));
	}

	function updateNavigation($container, $active) {
		$container.find('.cd-prev').toggleClass('inactive', $active.is(':first-child'));
		$container.find('.cd-next').toggleClass('inactive', $active.is(':last-child'));
	}

	function enableSwipe($container) {
		var mq = window.getComputedStyle(document.querySelector('.cd-slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
		return ( mq=='mobile' || $container.hasClass('cd-slider-active'));
	}
});
