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
const casesSlider = new Swiper('.js-cases-slider',
{
	loop:true,
	navigation: {
		nextEl: '.js-cases-slider-next',
		prevEl: '.js-cases-slider-prev',
	},
});

// range-slider
if($('.js-slider-range').length){
	$('.js-slider-range').each(function(indx, element){
		
		var slider = document.getElementById($(element).attr('id'));
		var minRange = parseFloat(slider.getAttribute('data-min'));
		var maxRange = parseFloat(slider.getAttribute('data-max'));
		var start = parseFloat(slider.getAttribute('data-cur-min'));
		var finish = parseFloat(slider.getAttribute('data-cur-max'));
		// var idMinElem = $(element).closest('.js-range').find('.js-slider-range-min').attr('id');
		// var idMaxElem = $(element).closest('.js-range').find('.js-slider-range-max').attr('id');
		
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

		// var snapValues = [
		// 	document.getElementById(idMinElem),
		// 	document.getElementById(idMaxElem)
		// ];

		// var initRange = false;

		// slider.noUiSlider.on('update', function (values, handle) {
		// 	snapValues[handle].value = values[handle];

		// 	if(initRange == false){
		// 		if(handle == 1){
		// 		initRange = true;
		// 		}
		// 	}else{
		// 		$('.js-slider-range-min').trigger("change");
		// 		$('.js-slider-range-max').trigger("change");
		// 	}
		// });

		// snapValues.forEach(function (input, handle) {
		// 	input.addEventListener('change', function () {
		// 		var valItem = this.value;
		// 		var minValItem = parseFloat(snapValues[0].value);
		// 		var maxValItem = parseFloat(snapValues[1].value);

		// 		if(handle == 0){
		// 			if((valItem < minRange) || (valItem > maxRange) || (valItem >= maxValItem)){
		// 				valItem = minRange;
		// 			}
		// 		}else{
		// 			if((valItem < minRange) || (valItem > maxRange) || (valItem <= minValItem)){
		// 				valItem = maxRange;
		// 			}
		// 		}
		// 		slider.noUiSlider.setHandle(handle, valItem);
		// 	});
		// });
	});


	// Проверка полей на ввод цифор
	$('.js-slider-range-min').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}
	});

	$('.js-slider-range-max').on("change keyup input click", function() {
		if (this.value.match(/[^0-9. ]/g)) {
			this.value = this.value.replace(/[^0-9. ]/g, '');
		}
	});
}
