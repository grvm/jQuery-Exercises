$(document).ready(
function(){
	var store;
	$.ajax({
		url : 'lib/product_data.json',
		complete : function(data){
									storeData(data.responseText);
								}
});

});
function storeData(json){
	store = $.parseJSON(json);
	displayData(store);
}

function displayData(data){
	var uniqueColors = [];
	var uniqueBrands = [];
	$.each(data,
	function(){
		var product = $(this)
		var prodHTML = "<div class='product' "+(!parseInt(product[4]) ? 'in-stock' : 'out-of-stock')+" color='"+product[2]+"'  brand='"+product[3].replace(' ','')+"'>" +
										"<div id='image'><img src='images/"+product[1]+"' /></div>";
		$(prodHTML).appendTo($('body'));
		uniqueColors.push(product[2]);
		uniqueBrands.push(product[3]);
	});
	uniqueBrands = $.unique($.unique(uniqueBrands));
	uniqueColors = $.unique($.unique(uniqueColors));

	$.each(uniqueBrands,
	function(index,value){
		$('.brand').append('<input type="checkbox" onclick="brandFilter(this, \''+value.replace(' ','').toUpperCase()+'\');" />'+value+'<br />')
	});

	$.each(uniqueColors,
	function(index,value){
		$('.color').append('<input type="checkbox" onclick="colorFilter(this, \''+value+'\');" />'+value+'<br />')
	});
}

$("#product-toggle").bind('change',
function(){
	if($(this).val() == 1){
		$('.product[out-of-stock]').show();
	}else{
		$('.product[out-of-stock]').hide();
	}
});

function colorFilter(element,color){
	var prod = ($("#product-toggle").val() == 1) ? '.product' : '.product[in-stock]';
	if($(element).is(':checked')){
		$(prod).not('[color='+color+']').hide();
		$(prod+'[color='+color+']').attr('cDisp',true);
		$(prod+'[cDisp=true][bDisp=true]').length ? $(prod+'[cDisp=true][bDisp=true]').show() : ( $(prod+'[bDisp=true]').length ? '' : $(prod+'[cDisp=true]').show() );
	}else{
		$(prod+'[color='+color+']').hide();
		$(prod+'[color='+color+']').removeAttr('cDisp');
		$(prod+'[bDisp=true][cDisp=true]').length ? $(prod+'[bDisp=true][cDisp=true]').show() : ($(prod+'[cDisp=true]').length ? $(prod+'[cDisp=true]').show() : ( ($(prod+'[bDisp=true]').length ? $(prod+'[bDisp=true]').show() : $(prod).show() ) ) );
	}
}

function brandFilter(element,brand){
	var prod = ($("#product-toggle").val() == 1) ? '.product' : '.product[in-stock]';
	if($(element).is(':checked')){
		$(prod).not('[brand='+brand+']').hide();
		$(prod+'[brand='+brand+']').attr('bDisp',true);
		$(prod+'[cDisp=true][bDisp=true]').length ? $(prod+'[cDisp=true][bDisp=true]').show() : ( $(prod+'[cDisp=true]').length ? '' : $(prod+'[bDisp=true]').show() );
	}else{
		$(prod+'[brand='+brand+']').hide();
		$(prod+'[brand='+brand+']').removeAttr('bDisp');
		$(prod+'[bDisp=true][cDisp=true]').length ? $(prod+'[bDisp=true][cDisp=true]').show() : ($(prod+'[bDisp=true]').length ? $(prod+'[bDisp=true]').show() : ( ($(prod+'[cDisp=true]').length ? $(prod+'[cDisp=true]').show() : $(prod).show() ) ) );
	}
}





