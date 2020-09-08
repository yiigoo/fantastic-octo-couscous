$(function(){
	FastClick.attach(document.body);
	var nav = $("#global-nav");
	$("#global-header-dir").on("click",function(){
		$(this).hide()
		$("#global-header-closed").show();
		nav.find(".bg").show();
		nav.find(".wrap").slideDown();
	})
	$("#global-header-closed,#global-nav .bg").on("click",function(){
		$("#global-header-dir").show();
		$(this).hide();
		$("#global-header-closed").hide();
		nav.find(".bg").hide();
		nav.find(".wrap").slideUp();
	})

	// 二级收缩
	$("#global-nav li>a").on( "click" , function(){
		var icon = $(this).find(".icon")
		if ( icon.hasClass("icon-plus-active") ) {
			icon.removeClass("icon-plus-active")
			$(this).next().slideUp();
		} else {
			$("#global-nav .icon-plus").removeClass("icon-plus-active")
			icon.addClass("icon-plus-active")
			$("#global-nav .sub").hide()
			$(this).next().slideDown();
			
		}
	})
})