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
		slidesPerView: 1,
		spaceBetween: 26,
		navigation: {
			nextEl: '.js-articles-slider-next',
			prevEl: '.js-articles-slider-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 1.16,
			}
		}
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
		
		// noUiSlider.create(slider, {
		// 	start: [start, finish],
		// 	// step: [2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000],
			
		// 	// pips: {
		// 	// 	mode: 'positions',
		// 	// 	values: [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000, 5000000],
		// 	// 	density: 4
		// 	// },
		// 	connect: true,
		// 	tooltips: [
		// 		wNumb({decimals: 0, thousand: ' '}),
		// 		wNumb({decimals: 0, thousand: ' '})
		// 	],
		// 	range: {
		// 		'min': minRange,
		// 		'max': maxRange
		// 	},
		// });

		var arbitraryValuesForSlider = ['1 000', '2 000', '5 000', '10 000', '20 000', '50 000', '100 000', '200 000', '500 000', '1 000 000', '5 000 000'];

		var format = {
			to: function(value) {
				return arbitraryValuesForSlider[Math.round(value)];
			},
			from: function (value) {
				return arbitraryValuesForSlider.indexOf(value);
			}
		};

		noUiSlider.create(slider, {
			start: '1 000',
			range: { min: 0, max: arbitraryValuesForSlider.length - 1 },
			step: 1,
			tooltips: true,
			connect: [true, false],
			format: format,
			pips: { mode: 'steps', format: format, density: 50 },
		});

		//Очищаем все вспомогательные точки
		slider.querySelectorAll('.noUi-value').forEach(function(elem, index){
			elem.previousElementSibling.setAttribute('data-val', elem.innerHTML);
			elem.previousElementSibling.setAttribute('data-id', index);
		});

		//Выделяем активные вспомогательные точки
		slider.noUiSlider.on('update', function (values, handle) {
			var dataValue = values[handle];
			var curElem = slider.querySelector('.noUi-marker[data-val="' + dataValue + '"]');
			var curElemId = curElem.getAttribute('data-id');

			slider.querySelectorAll('.noUi-marker').forEach(function(elem, index){
				elem.classList.remove('active');
			});

			for (let index = 0; index < curElemId; index++) {
				slider.querySelector('.noUi-marker[data-id="' + index + '"]').classList.add('active');
			}
		});
	});
}

if($('.js-open-menu').length){
	//Открыть мобильное меню
	$('.js-open-menu').on('click', function(){
		$('.js-main-menu').addClass('open');
	});

	//Закрыть мобильное меню
	$('.js-close-menu').on('click', function(){
		$('.js-main-menu').removeClass('open');
	});
}
