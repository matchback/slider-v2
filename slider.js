jQuery(document).ready(function($) {
	$('.content-slider').each(function() {
		// declare variables/objects
		const slider = $(this);
		const arrows = $(this).find('.arrow');
		const ul = $(this).find('ul');
		const slides = ul.children();
		const dots = $(this).find('.dots div');
		
		let autoswipe = false;
		let interval = $(this).attr('data-interval');
		
		// determines whether or not the slider
		// should trigger itself, based on the data-autoswipe
		// attribute.
		let shouldAutoSwipe = function() {
			let autoswipeAttr = slider.attr('data-autoswipe');
			return typeof autoswipeAttr !== typeof undefined && autoswipeAttr !== false
		}
		
		// based on the current element at index $i, set the
		// order of the elements after it to a negative number, pushing them to the front of the list
		let setOrder = function($i) {
			slides.css('order', '').filter(`:nth-child(n +${$i + 	1})`).css('order', -1);
		}
		
		let delayAutoSwipe = function() {
			setTimeout(function() {
				slider.attr('data-autoswipe', '');
			}, 3000)
		}
		
		// set up autoswipe
		if (shouldAutoSwipe()) {
			if (!interval) {
				interval = 3000;
			}
			setInterval(function() {
				if (shouldAutoSwipe()) {
					arrows.filter('.right').click();
				}
			}, interval)
		}
		
		// cancel the autoswipe effect when hovered over
		slider.hover(function() {
			slider.removeAttr('data-autoswipe');
		}, function() {
			setTimeout(function() {
				slider.attr('data-autoswipe', '');
			}, 3000)
		})
		
		// handles swipes (on mobile/tablets)
		slider.on('swiperight', function() {
			arrows.filter('.left').click();
			slider.removeAttr('data-autoswipe');
			delayAutoSwipe();
		})
		
		slider.on('swipeleft', function() {
			arrows.filter('.right').click();
			slider.removeAttr('data-autoswipe');
			delayAutoSwipe();
		})
		
		// handles dot clicks
		dots.click(function() {
			let clickCtrl = function(i) {
				if (i > 0) {
					arrows.filter('.left').click();
					setTimeout(function() {
						clickCtrl(i - 1);
					}, 510)
				} else if ( i < 0) {
					arrows.filter('.right').click();
					setTimeout(function() {
						clickCtrl(i + 1);
					}, 510)
				}
			}
			
			let index = $(this).index();
			let currentSlideIndex = parseInt(slider.attr('data-active-slide'));
			
			let dif = currentSlideIndex - index;
			clickCtrl(dif);
			
		})
		
		// handles arrow clicks
		arrows.click(function() {
			let currentSlideIndex = parseInt(slider.attr('data-active-slide'));
			const currentSlide = slides.filter(`:nth-child(${currentSlideIndex + 1})`);
			
			const length = parseInt(slider.attr('data-length'));
			const animationType = slider.attr('data-animation');
			const perView = parseInt(slider.attr('data-view'));
			
			let newSlideIndex = 0;
			
			if ($(this).hasClass('left')) {
				if (currentSlideIndex > 0) {
					newSlideIndex = currentSlideIndex - 1;
				} else {
					newSlideIndex = length - 1;
				}
			} else {
				if (currentSlideIndex < length - 1) {
					newSlideIndex = currentSlideIndex + 1;
				} else {
					newSlideIndex = 0;
				}
			}
			
			const nextSlide = slides.filter(`:nth-child(${newSlideIndex + 1})`);
			
			if (animationType === 'fade') {
				currentSlide.removeClass('fadeIn').addClass('fadeOut');
				setTimeout(function() {
					slides.css('order', '').filter(`:nth-child(n +${newSlideIndex + 1})`).css('order', -1);
					nextSlide.removeClass('fadeOut').addClass('fadeIn');
					currentSlide.removeClass(fadeOut);
				}, 500)
			} else if (animationType === 'slide') {
				if ($(this).hasClass('right')) {
					ul.addClass('slideLeft' + perView);
					
					setTimeout(function() {
						ul.removeClass('slideLeft' + perView);
						setOrder(newSlideIndex);
					}, 500)
				} else {
					setOrder(newSlideIndex);
					ul.addClass('slideRight' + perView);
					setTimeout(function() {
						ul.removeClass('slideRight' + perView);
					}, 500)
				}
			} else {
				setOrder(newSlideIndex);
			}
			slider.attr('data-active-slide', newSlideIndex);
			dots.removeAttr('class').filter(`:nth-child(${newSlideIndex + 1})`).addClass('active');
		})
	})
})