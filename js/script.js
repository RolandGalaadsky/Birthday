$(document).ready(function (){
	/*Add People on People-snippet*/
	var addHuman = function () {
		console.log("fsad");
		var name = $("input").val();
		if (name !== "") {
			$("ol").append("<li class='human'>"+name+"<a class='remove'><span class='fa fa-times'></span></a></li>")
		}	
	};
	$("input").on("keypress", function(key){
		if (key.which == 13) {
			addHuman();
		}
		
	});
	$(document).on("click", "#addPeople", function(){
		addHuman();
	});
	$(document).on("click", ".remove", function(){
		$(this).parent().remove()
	});	
	/*End add People */

	/*Add Meal*/
	$(document).on("click", "#addFood", function(){
		console.log('fasdfa');
		$("tbody").append("<tr><tr>");
		var lastTr = $("tbody > tr:last-of-type");
		lastTr.append("<th></th>");
		for(var cell=0; cell < 4; cell++) {
			lastTr.append("<td></td>")
		};
	});
});

(function (global) {
	var br = {};
	var foodurl = "snippets/food-snippet.html";
	var peopleurl = "snippets/people-snippet.html";

	var insertHtml = function (selector, html) {
		var targetElem = $(selector);
		targetElem.html(html);
	};
	
	var showLoading = function (selector) {
		var html = "<div class='text-center'><img src='images/ajax-loader.gif'></img></div>";
		insertHtml(selector, html);
	};

	var loadNeedHtml = function (url) {
		return function () {
			showLoading("#main");
			$ajaxUtils.sendGetRequest (url, function(html) {
				insertHtml("#main", html);
			}, false);
		};
	}
	br.loadPeople = loadNeedHtml(peopleurl);
	br.loadFood = loadNeedHtml(foodurl);
	global.$br = br;
	document.addEventListener("DOMContentLoaded", function(event){
		showLoading("#main-content");
		br.loadPeople();
	});
})(window);

