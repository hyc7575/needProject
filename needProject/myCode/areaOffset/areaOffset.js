(function($) {
	$.fn.areaOffset = function() {
		$(this).on('mousemove',function(e) {
			console.log('x = '+ (e.pageX-$(this).offset().left));
			console.log('y = '+ (e.pageY-$(this).offset().top));
		});
	}
})($);