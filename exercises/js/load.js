//$(document).ready(function() {
     //$.ajax({
         //url: "data/specials.json",
         //complete: function(data) {
             //callback(data.responseText);
         //}
     //});
 //});
//
 //function callback(x){
	//console.log($.parseJSON(x)['monday']);
 //}

$(document).ready(function() {
	$('select[name=day]').bind('change', function(){
		ajaxSpecials($(this).val());
	});
});

 function ajaxSpecials(day) {
     $.ajax({
         url: "data/specials.json",
         complete: function(data) {
             callback(data.responseText,day);
         }
     });
 }

 function callback(data,day){
	var json = $.parseJSON(data)[day];
	$('#ajaxSpecials').html("<div style='color:"+json.color+"'><h3>"+json.title+"</h3><img src='"+json.image+"' /><br /><span>"+json.text+"</span></div>");
 }