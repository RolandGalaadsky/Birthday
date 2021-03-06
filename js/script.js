var allSum = function() {
	var allInputs = $("tbody tr").children("td:nth-of-type(4)").children("input");
	var allMoney = 0;
	for(var numOfRow in allInputs) {
		var value = parseFloat(allInputs[numOfRow]["value"] || "0");
		allMoney += value;
	}
	$("h3 span").html(allMoney);
};

$(document).ready(function (){

	/*Add People on People-snippet*/
	var addHuman = function () {
		console.log("fsad");
		var name = $("input").val();
		if (name !== "") {
			$("ol").append("<li class='human'>"+name+"<a class='remove'><span class='fa fa-times'></span></a></li>")
		}	
	};
	$(document).on("keypress", "input", function(key){
		if (key.which == 13) {
			addHuman();
		}
		
	});
	$(document).on("click", "#addPeople", function(){
		addHuman();
	});
	/*remove people*/
	$(document).on("click", ".remove", function(){
		var father = $(this).parent()
		if (father.is("td")) {
			father = father.parent();
		}
		father.remove();
		changeIndexes();
	});	
	/*end remove people*/
	/*End add People */

	/*Add Meal*/
	var changeIndexes = function () {	
		$(".thname").each(function(numOfRow, th){
			$(th).html(numOfRow+1);
		})
	};

	$(document).on("click", "#addFood", function(){
		
		$("tbody").append("<tr><tr>");
		var lastTr = $("tbody > tr:last-of-type");
		lastTr.append("<th scope='row' class='thname'></th>");
		for(var cell=0; cell < 4; cell++) {
			lastTr.append("<td><input></input></td>");
		};
		lastTr.append("<td><a class='remove'><span class='fa fa-times'></span></a></td>");
		changeIndexes();
	});


	
	var changePrice = function(selector) {
		var priceForOne = selector.children("td:nth-of-type(2)").children("input").val();
		var count = selector.children("td:nth-of-type(3)").children("input").val();
		var sum = selector.children("td:nth-of-type(4)").children("input");
		sum.val(priceForOne*count);
		allSum();
	};

	$(document).on("blur", "tr", function(){
		changePrice($(this));
	});
	$(document).on("keypress", "tr", function(key){
		if (key.which == 13) {
			changePrice($(this));
		}
		
	});

	/*End add Meal*/
});

(function (global) {
	var br = {};
	var foodurl = "snippets/food-snippet.html";
	var peopleurl = "snippets/people-snippet.html";

	var insertHtml = function (selector, html) {
		var targetElem = $(selector);
		targetElem.html(html);
		allSum();
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

