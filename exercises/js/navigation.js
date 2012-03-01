$(document).ready( function(){
	$('#nav li').hover(
		function(){
			$(this).find('ul').show();
		},
		function(){
			$(this).find('ul').hide();
		}
	);
});