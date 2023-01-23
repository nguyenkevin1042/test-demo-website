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
			featuresJson,
			buildAndShowFeatureView);

		$ajaxUtils.sendGetRequest(
			reviewsJson,
			buildAndShowReviewsView);

		$ajaxUtils.sendGetRequest(
			blogsJson,
			buildAndShowBlogsView);

	});


	//BUILD AND SHOW FEATURE
	function buildAndShowFeatureView(featuresJson){
		$ajaxUtils.sendGetRequest(
			featureItemHtml,
			function (featureItemHtml) {
 				var finalHtml = "";
 				for( var i=0;i<featuresJson.length;i++){
 					var html = featureItemHtml;
 					html = insertProperty(html, "id",featuresJson[i].id);
 					html = insertProperty(html, "tour_name",featuresJson[i].tour_name);
			    	html = insertProperty(html, "tour_description",featuresJson[i].tour_description);
			    	html = insertProperty(html, "imgage_src",featuresJson[i].image_src);
			    	html = insertProperty(html, "tour_price",featuresJson[i].tour_price);
 					finalHtml+=html;
 				}
 				
			    insertHtml("#tours", finalHtml);
			},
		false);
	}

	//BUILD AND SHOW REVIEWS
	function buildAndShowReviewsView(reviewsJson){
		$ajaxUtils.sendGetRequest(
			reviewItemsHtml,
			function (reviewItemsHtml) {
 				var finalHtml ="";
				var numberOfCarousel =3;
 				var limit=3;
 				var endCarousel=numberOfCarousel*limit;
 				
 				for(var i=0;i<reviewsJson.length;i+=limit){
 					if (i == endCarousel){
 						break;
 					} else{

	 					finalHtml += "<div class='carousel-item";
	 					if (i==0) {
	 						finalHtml+=" active'>";
	 					} else{
	 						finalHtml+=" '>";
	 					}


	 					finalHtml += "<div class='row w-100'>";

	 					var currentLimit = i+limit;
	 					var end =currentLimit;
	 					
	 					if(currentLimit > reviewsJson.length){
	 						end = reviewsJson.length;
	 					} 

	 					for( var j=i;j<end;j++){
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
 				}

			    insertHtml("#reviews", finalHtml);
			},
		false);
	}

	//BUILD AND SHOW BLOGS
	function buildAndShowBlogsView(blogsJson){
		$ajaxUtils.sendGetRequest(
			blogItemsHtml,
			function (blogItemsHtml) {
				var finalHtml ="";
				var numberOfCarousel =3;
 				var limit=3;
 				var endCarousel=numberOfCarousel*limit;
 				
 				for(var i=0;i<blogsJson.length;i+=limit){
 					if (i == endCarousel){
 						break;
 					} else {
 						finalHtml += "<div class='carousel-item";
	 					if (i==0) {
	 						finalHtml+=" active'>";
	 					} else{
	 						finalHtml+=" '>";
	 					}

	 					finalHtml += "<div class='row w-100'>";

	 					var currentLimit = i+limit;
	 					var end =currentLimit;
	 					
	 					if(currentLimit > blogsJson.length){
	 						end = blogsJson.length;
	 					} 

	 					for( var j=i;j<end;j++){
	 						var html = blogItemsHtml;
	 						html = insertProperty(html, "blog_title",blogsJson[j].blog_title);
				    		html = insertProperty(html, "blog_time",blogsJson[j].blog_time);
				    		html = insertProperty(html, "blog_text",blogsJson[j].blog_text);
				    		html = insertProperty(html, "blog_img",blogsJson[j].blog_img);
	 						finalHtml += html;
	 					}

	 					finalHtml += "</div>";/*End .row*/
	 					finalHtml += "</div>"; /*End .carousel-item*/
	 				}
	 			}

 					
			    insertHtml("#blogs", finalHtml);
			},
		false);
	}




	// carouselSwipeType("#carouselIndicatorsReviews");
	countdownTimer("Mar 11, 2023");

	


	global.travelDream = travelDream;
})(window)	