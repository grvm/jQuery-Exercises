$(document).ready(
function(){
	var modules = $('div.module');
	modules.hide();
	var ul = $('<ul class="tabs">').insertBefore(modules.first());
	modules.each(
	function(){
		$('<li>'+$(this).find('h2').text()+'</li>')
		.bind('click',
		function(){
			$(this).siblings().removeClass('current').end().addClass('current');
			modules.hide().eq($(this).index()).show().end();
		})
		.appendTo(ul);
	});
	ul.children().first().click();
});