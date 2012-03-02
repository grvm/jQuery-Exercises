var selectModuleDiv =	$('div.module')

var myListThirdItem = $('myList > li').eq(2);

var addClassToForm = function(){
	$('input[name=q]').parent().attr('class', 'new');
							//OR
	$('input[name=q]').parent().addClass('new');
}

var addCurrentClassToNext = function(){
	$('#myList li.current').removeClass();
}

var specialsTraverseToSubmitButton = $('#specials input[type=submit]')

var addClassCurrentAndDisabled = function(){
	$('#slideshow li').first().addClass('current').end().not(':first').addClass('disabled');
}

var addFiveNewItems = $.each(['one','two','three','four','five'],function(index,name){
	 $('#myList').append('<li id="'+(index+1)+'">'+name+'</li>');
});

var insertAfterLastDivModule = function(){
	$('<div class="module">123123123123123</div>').insertAfter('div.module:last');
	$('img:first').appendTo($('div.module:last'));
}













