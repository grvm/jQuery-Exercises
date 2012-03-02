$(document).ready( function(){
	$('input[name=q]').val($('label[for=q]').text()).addClass('hint');
	$('label[for=q]').hide();
	$('input[name=q]').bind('focus',
	function(){
		if( $(this).val() == $('label[for=q]').text() ){
			$(this).removeClass('hint').val('');
		}
	});
	$('input[name=q]').bind('blur',
	function(){
		if($.trim($(this).val()) == ''){
			$(this).val($('label[for=q]').text()).addClass('hint');
		}
	});
});