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
	let jsonData = $("#json-data").text();
	// Преобразуем строку в объект
	try {
		var plansData = JSON.parse(jsonData);
	} catch (e) {
		$("#output").html("Ошибка при обработке данных!");
		console.error("Ошибка парсинга JSON: ", e);
	}

	function updatePrices() {
		const val = document.getElementById('slider-range').noUiSlider.get();//Получаем значение слайдера
		const tarifType = $('input[name="tariffs-type"]:checked').val();//Получаем тип плана
		const tarifSale = $('input[name="tariffs-type"]:checked').data('sale');//Получаем скидку

		$.each(plansData.plans, function(index, plan) { // проходимся по всем планам
			const price = tarifType === 'yearly' // если оплата за месяц
			? plan.monthly[val] * (100 - tarifSale) / 100 // берем тарифы на год
			: plan.monthly[val]; //иначе, берем тарифы на месяц
			
		  $(plan.tariff_id).find('.js-tariff-item-price-val').text(price); // заменяем цены
		});
	  }

	$('.js-slider-range').each(function(indx, element){
		var slider = document.getElementById($(element).attr('id'));
		var arbitraryValuesForSlider = slider.getAttribute('data-step').split(', ');

		var format = {
			to: function(value) {
				return arbitraryValuesForSlider[Math.round(value)];
			},
			from: function (value) {
				return arbitraryValuesForSlider.indexOf(value);
			}
		};

		noUiSlider.create(slider, {
			start: arbitraryValuesForSlider[0],
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

			updatePrices();
		});
	});
	
	//Изменение типа тарифа
	$('.js-tariffs-type-check').on('change', function() {
		updatePrices();
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
