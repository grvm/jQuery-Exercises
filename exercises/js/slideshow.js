$(document).ready(
function(){
	$('#slideshow li').not(':first').hide();
},
setInterval(
	function(){
		$('#slideshow li').hide();
		var current = $('#slideshow .current');
		var next = current.next().length ? current.next() : $('#slideshow li:first');
		current.fadeOut('slow').removeClass('current');
		next.fadeIn('slow').addClass('current');
		$('#slideNav li').css('background', 'white').eq(next.index()).css('background', 'red');
	},
	3000)
);