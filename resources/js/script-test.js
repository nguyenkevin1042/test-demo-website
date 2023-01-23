function toAccountPage(){
	location.href='index.html';
}

// 3. DISCOUNT -COUNTDOWN TIMER
function countdownTimer(expiredDate){
	var countDownDate = new Date(expiredDate).getTime();
	var x = setInterval(function () {
		// Get today's date and time
  		var now = new Date().getTime();
  		var distance = countDownDate - now;

  		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		document.getElementById("days-countdown").innerHTML = days;
		document.getElementById("hours-countdown").innerHTML = hours;
		document.getElementById("minutes-countdown").innerHTML = minutes;
		document.getElementById("seconds-countdown").innerHTML = seconds;

		if (distance < 0) {
    		clearInterval(x);
    		document.getElementById("days-countdown").innerHTML = 0;
			document.getElementById("hours-countdown").innerHTML = 0;
			document.getElementById("minutes-countdown").innerHTML = 0;
			document.getElementById("seconds-countdown").innerHTML = 0;
  		}
	},1000);
}

// CAROUSEL SWIPE
 function carouselSwipeType(selector){
 	var myCarousel = document.querySelector(selector);
	var carousel = new bootstrap.Carousel(myCarousel,{
		interval:false,
		touch:true
	})
 }


$(function(){
	$("#navbar-btn").blur(function (event){
		var screenWidth = window.innerWidth;
		if(screenWidth < 991){
			$("#header-menu").collapse('hide');
		}
	});
});


(function (global) {
	travelDream = {};

	/*JSON DATA*/
	var data = "resources/data/data.json";
	var featuresJson = "resources/data/features.json";
	var reviewsJson = "resources/data/clients-reviews.json";
	var blogsJson = "resources/data/blogs.json";
	/*HOME PAGE SNIPPETS*/
	var homepageHTML = "snippets/homepage.html";
	var featureItemHtml = "snippets/featureItemHtml.html";
	var reviewItemsHtml = "snippets/reviewItemsHtml.html";
	var blogItemsHtml = "snippets/blogItemsHtml.html";

	/*Another functions*/
	/*shorthand for innerHTML*/
	var insertHtml = function (selector, html){
		document.querySelector(selector)
		.innerHTML = html;
	};

	/* show loading image in a specific selector*/
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='resources/img/loading.gif'></div>";
		insertHtml(selector,html);
	};
	/*Insert properties from json url*/
	var insertProperty = function (string, propName,propValue){
		var propToReplace = "{{"+propName+"}}";
		string = string.replace(
			new RegExp(propToReplace, "g"), propValue);
		return string;
	}

	/*End another functions*/

	/*Show homepage DEFAULT*/
	document.addEventListener("DOMContentLoaded", function (event) {
		showLoading("#main-content");

		$ajaxUtils.sendGetRequest(
			homepageHTML,
			function(responseText){
				insertHtml("#main-content",responseText)
			},
			false);

		$ajaxUtils.sendGetRequest(
			reviewsJson,
			buildAndShowReviewsView);

	});


	//BUILD AND SHOW REVIEWS
	function buildAndShowReviewsView(reviewsJson){
		$ajaxUtils.sendGetRequest(
			reviewItemsHtml,
			function (reviewItemsHtml) {
 				var finalHtml ="";

 				for(var i=0;i<3;i++){
 					finalHtml += "<div class='carousel-item";
 					if (i==0) {
 						finalHtml+=" active'>";
 					} else{
 						finalHtml+=" '>";
 					}

 					finalHtml += "<div class='row w-100'>";

 					

 					for( var j=0;j<reviewsJson.length;j++){
 						var html = reviewItemsHtml;
 						html = insertProperty(html, "client_name",reviewsJson[j].client_name);
			    		html = insertProperty(html, "city",reviewsJson[j].client_address.city);
			    		html = insertProperty(html, "country",reviewsJson[j].client_address.country);
			    		html = insertProperty(html, "review",reviewsJson[j].review);
			    		html = insertProperty(html, "profile_picture",reviewsJson[j].profile_picture);
 						finalHtml += html;
 					}

 					finalHtml += "</div>";/*End .row*/
 					finalHtml += "</div>"; /*End .carousel-item*/
 				}

			    insertHtml("#main-content", finalHtml);
			},
		false);
	}

	

	


	global.travelDream = travelDream;
})(window)	