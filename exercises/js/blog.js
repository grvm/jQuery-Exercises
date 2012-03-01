$(document).ready( $('#blog h3').click( function(){
	$(this).next()
		.slideDown('slow')
	.end()
	.parent().siblings()
		.find('.excerpt')
		.slideUp('fast');
	return false;
})
);