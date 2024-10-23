import {$, Fancybox, Swiper, noUiSlider, wNumb} from './common';

// Табуляция
if ($('.js-tabs-page').length) {
	$('.js-tabs-page-list').each(function(){
		$(this).find('.js-tabs-page-item:first').addClass("active");
	});

	$('.js-tabs-page-content').each(function(){
		$(this).find('.js-tabs-page-content-item:first').fadeIn();
	});

	$('.js-tabs-page-item').on('click',function(e) {
		e.preventDefault();
		var $parent = $(this).closest('.js-tabs-page');

		$parent.find('.js-tabs-page-content-item').hide();
		$parent.find('.js-tabs-page-item').removeClass('active');

		$(this).addClass("active");
		$parent.find('#' + $(this).attr('data-item')).fadeIn();
	});
}

// Слайдер кейсов
if($('.js-cases-slider').length){
	const casesSlider = new Swiper('.js-cases-slider',
	{
		loop:true,
		navigation: {
			nextEl: '.js-cases-slider-next',
			prevEl: '.js-cases-slider-prev',
		},
	});
}

// Слайдер статей
if($('.js-articles-slider').length){
	const articlesSlider = new Swiper('.js-articles-slider',
	{
		// loop:true,
		slidesPerView: 1.16,
		spaceBetween: 26,
		navigation: {
			nextEl: '.js-articles-slider-next',
			prevEl: '.js-articles-slider-prev',
		},
	});
}

// range-slider
if($('.js-slider-range').length){
	$('.js-slider-range').each(function(indx, element){
		var slider = document.getElementById($(element).attr('id'));
		var minRange = parseFloat(slider.getAttribute('data-min'));
		var maxRange = parseFloat(slider.getAttribute('data-max'));
		var start = parseFloat(slider.getAttribute('data-cur-min'));
		var finish = parseFloat(slider.getAttribute('data-cur-max'));
		
		noUiSlider.create(slider, {
			start: [start, finish],
			// step: 5,
			connect: true,
			tooltips: [
				wNumb({decimals: 0, thousand: ' '}),
				wNumb({decimals: 0, thousand: ' '})
			],
			range: {
				'min': minRange,
				'max': maxRange
			},
		});
	});
}
