$(document).ready(
function(){
	var store;
  /*
   *WA: Specify data type in ajax request. That will
   *    make storeData function unnecessary. Something
   *    like following will be much better.
   *
   * $.ajax({
   *   url: 'json/product_data.json',
   *   type: 'GET',
   *   dataType: "json",
   *   success: function(data){
   *    ...
   *   });
   */
	$.ajax({
		url : 'lib/product_data.json',
		complete : function(data){
									storeData(data.responseText);
								}
});

});

   /*
    *  WA: Define functions under a namespace using module patter.
    *    http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
    *    Defining functions an variables in global namespace is a bad practice.
    */

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
    /*
     * WA: Move logic in different functions.
     *    Following generates invalid HTML. brand,
     *    out-of-stock are invalid HTML attributes.
     *    Use data-* attributes instead.
     */
		var prodHTML = "<div class='product' "+(!parseInt(product[4]) ? 'in-stock' : 'out-of-stock')+" color='"+product[2]+"'  brand='"+product[3].replace(' ','')+"'>" +
										"<div id='image'><img src='images/"+product[1]+"' /></div>";

    /*
     * WA: Always try to append elements to DOM outside of a loop
     *    See http://jqfundamentals.com/#chapter-9
     *    and if really interested, http://paulirish.com/2009/perf/
     */
		$(prodHTML).appendTo($('body'));
		uniqueColors.push(product[2]);
		uniqueBrands.push(product[3]);
	});
	uniqueBrands = $.unique($.unique(uniqueBrands));
	uniqueColors = $.unique($.unique(uniqueColors));

  /*
   * WA: Following adds repetetive brands and color selectors to DOM.
   *     A filter with same name is present twice in the DOM!
   */
	$.each(uniqueBrands,
	function(index,value){
		$('.brand').append('<input type="checkbox" onclick="brandFilter(this, \''+value.replace(' ','').toUpperCase()+'\');" />'+value+'<br />')
	});

	$.each(uniqueColors,
	function(index,value){
		$('.color').append('<input type="checkbox" onclick="colorFilter(this, \''+value+'\');" />'+value+'<br />')
	});
}

/*
 * WA: Do not use .bind, .live etcetera. Start using .on
 *   See http://www.elijahmanor.com/2012/02/differences-between-jquery-bind-vs-live.html#tldr
 */
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
  /*
   * WA: Avoid writing invalid HTML at any cost.
   *  cDisp bDisp are invalid HTML attributes.
   */
	if($(element).is(':checked')){
		$(prod).not('[color='+color+']').hide();
		$(prod+'[color='+color+']').attr('cDisp',true);
    /*
     * WA: Following line is repeated in brandFilter() also.
     * DRYup this code in a separate function.
     */
		$(prod+'[cDisp=true][bDisp=true]').length ? $(prod+'[cDisp=true][bDisp=true]').show() : ( $(prod+'[bDisp=true]').length ? '' : $(prod+'[cDisp=true]').show() );
	}else{
		$(prod+'[color='+color+']').hide();
		$(prod+'[color='+color+']').removeAttr('cDisp');
    /*
     * WA: Following line is repeated in brandFilter() also.
     * DRYup this code in a separate function.
     */
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





