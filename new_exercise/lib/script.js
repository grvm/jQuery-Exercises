$(document).ready(
function(){
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
		type : 'GET',
		dataType : 'json',
		complete : function(data){
									data = $.parseJSON(data.responseText);
									productDisplay.displayData(data);
								}
});
		$("#product-toggle").on('change',
		function(){
			if($(this).val() == 1){
				$('.product[data-out-of-stock]').show();
			}else{
				$('.product[data-out-of-stock]').hide();
			}
		});

});


function showFilter(prod, arg1, arg2){
	$(prod+'['+arg1+'=true]['+arg2+'=true]').length ? $(prod+'['+arg1+'=true]['+arg2+'=true]').show() : ( $(prod+'['+arg2+'=true]').length ? '' : $(prod+'['+arg1+'=true]').show() );
}

function hideFilter(prod, arg1, arg2){
	$(prod+'['+arg1+'=true]['+arg2+'=true]').length ? $(prod+'['+arg1+'=true]['+arg2+'=true]').show() : ($(prod+'['+arg1+'=true]').length ? $(prod+'['+arg1+'=true]').show() : ( ($(prod+'['+arg2+'=true]').length ? $(prod+'['+arg2+'=true]').show() : $(prod).show() ) ) );
}

   /*
    *  WA: Define functions under a namespace using module patter.
    *    http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
    *    Defining functions an variables in global namespace is a bad practice.
    */
var productDisplay = (function(){

	return{
		displayData : function(data){
			var pageHTML = '';
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
				var prodHTML = "<div class='product' "+(!parseInt(product[4]) ? 'data-in-stock' : 'data-out-of-stock')+" data-color='"+product[2]+"'  data-brand='"+product[3].replace(' ','')+"'>" +
												"<div id='image'><img src='images/"+product[1]+"' /></div></div>";

				/*
				 * WA: Always try to append elements to DOM outside of a loop
				 *    See http://jqfundamentals.com/#chapter-9
				 *    and if really interested, http://paulirish.com/2009/perf/
				 */
				pageHTML += prodHTML;
				uniqueColors.push(product[2]);
				uniqueBrands.push(product[3]);
			});
			uniqueBrands = $.unique($.unique(uniqueBrands));
			uniqueColors = $.unique($.unique(uniqueColors));
			$(pageHTML).appendTo($('body'));

			/*
			 * WA: Following adds repetetive brands and color selectors to DOM.
			 *     A filter with same name is present twice in the DOM!
			 */
			$.each(uniqueBrands,
			function(index,value){
				$('.brand').append('<input type="checkbox" onclick="productDisplay.brandFilter(this, \''+value.replace(' ','').toUpperCase()+'\');" />'+value+'<br />')
			});

			$.each(uniqueColors,
			function(index,value){
				$('.color').append('<input type="checkbox" onclick="productDisplay.colorFilter(this, \''+value+'\');" />'+value+'<br />')
			});
		},

		/*
		 * WA: Do not use .bind, .live etcetera. Start using .on
		 *   See http://www.elijahmanor.com/2012/02/differences-between-jquery-bind-vs-live.html#tldr
		 */

		colorFilter : function(element,color){
			var prod = ($("#product-toggle").val() == 1) ? '.product' : '.product[data-in-stock]';
			/*
			 * WA: Avoid writing invalid HTML at any cost.
			 *  cDisp bDisp are invalid HTML attributes.
			 */
			if($(element).is(':checked')){
				$(prod).not('[data-color='+color+']').hide();
				$(prod+'[data-color='+color+']').attr('data-cDisp',true);
				/*
				 * WA: Following line is repeated in brandFilter() also.
				 * DRYup this code in a separate function.
				 */
				showFilter(prod, 'data-cDisp', 'data-bDisp');
			}else{
				$(prod+'[data-color='+color+']').hide();
				$(prod+'[data-color='+color+']').removeAttr('data-cDisp');
				/*
				 * WA: Following line is repeated in brandFilter() also.
				 * DRYup this code in a separate function.
				 */
				hideFilter(prod, 'data-cDisp', 'data-bDisp');
			}
		},

		brandFilter : function(element,brand){
			var prod = ($("#product-toggle").val() == 1) ? '.product' : '.product[data-in-stock]';
			if($(element).is(':checked')){
				$(prod).not('[data-brand='+brand+']').hide();
				$(prod+'[data-brand='+brand+']').attr('data-bDisp',true);
				showFilter(prod, 'data-bDisp', 'data-cDisp');
			}else{
				$(prod+'[data-brand='+brand+']').hide();
				$(prod+'[data-brand='+brand+']').removeAttr('data-bDisp');
				hideFilter(prod, 'data-bDisp', 'data-cDisp');
			}
		}
	};
})();






