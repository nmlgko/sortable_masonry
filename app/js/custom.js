$(document).ready(function() {

	$('#menu-opener').click(function() {
		$('#mobile-nav').slideToggle();
	});

	$('#search-opener').click(function(){
		$(this).children().toggleClass('icon-search icon-cancel'), 
		$(this).siblings('.form-holder').fadeToggle();
	});

	$('#mobile-nav .with-dropmenu').click(function(){
		console.log(1);
		$(this).children('.dropmenu').slideDown();
		$(this).siblings().children('.dropmenu').slideUp();
	});

	$('.grid').masonry({
	  columnWidth: '.grid__sizer',
		gutter: '.gutter-sizer',
		itemSelector: '.grid__item',
		percentPosition: true
	});
	
});

// плавный скролл страницы вверх
$(function() {
    $.fn.scrollToTop = function() {
        $(this).hide();
        if ($(window).scrollTop() >= "150") $(this).fadeIn("slow")
            var scrollDiv = $(this);
            $(window).scroll(function() {
                if ($(window).scrollTop() <= "150") $(scrollDiv).fadeOut("slow")
                else $(scrollDiv).fadeIn("slow")
            });
        $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow")
        })
    }
});
$(function() {
    $("#move-up").scrollToTop();
});

function newAnchor(){
	$('a[href^="#"]').click(function(e){
		e.preventDefault();
		var id  = $(this).attr("href"),
				headerHeight = $(".fixed-head").outerHeight(),
				top = $(id).offset().top;
				$("body,html").animate({scrollTop: top - headerHeight}, 1000);
        $(this).parent().addClass("active").siblings().removeClass("active");
        $(".header-nav").hide();   
    });
}