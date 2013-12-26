$(document).ready(function(){
	// fix gradient for IE9 
	$('.top-bar-nav > li, ul.level2').addClass('gradient');
	//
	$(document).click(function(){
		$('#main_Nav > li').removeClass('selected');
	});
	$('#main_Nav > li').each(function(){
		var self = $(this);
		
		if(self.find('ul').length>0){
			var decorArrow = $(document.createElement('div'));
			decorArrow.addClass('decor-arrow');
			self.find('>a').append(decorArrow);
		}
		
		self.click(function (e){
			$('#main_Nav > li').removeClass('selected');
			self.addClass('selected');
			setupLevel2($(this).find('ul.level2'));
			e.stopPropagation();
		});

		self.hover(function (){
			$('#main_Nav > li').removeClass('selected');
			self.addClass('selected');
			setupLevel2($(this).find('ul.level2'));
		},function(){

		});
	});


	$('ul.level2').each(function(){	
		var childs = $(this).find('> li');
		if(childs.length>3) {
			for(var i=0; i< childs.length; i++){
				if((i+1)%3 == 0) {
					$(childs[i]).css('background-image','none').after('<br/>');
				}
			}
		}
		$(this).click(function (e) {
			e.stopPropagation();
		});
	});
	$('ul.level3 > li > a > span').before('<span> &gt; </span>');
	$('ul.level4 > li > a > span').before('<span> &bull; </span>');
});

function getViewWidth() {
	return $(window).width();
}

function setupLevel2(element) {
	if(!element.length>0){
		return
	}

	var maxHeight = 0;
	var childs = $(element.find(' > li'));
	var hasLevel3 = false;
	childs.each(function(){
		if($(this).height()>maxHeight){
			maxHeight = $(this).height();
		}
		if($(this).find(' > ul.level3 ').length>0 && !hasLevel3)
		{
			hasLevel3 = true;
		}
	});

	
	

	


	if(!hasLevel3){
		$(element).find('br').remove();
		$(element).find(' > li').css('display','block').css('background-image','none');
		$(childs[0]).find(' >a ').css('border-radius','8px 8px 0px 0px');
		$(childs[childs.length-1]).find(' >a ').css('border-radius','0px 0px 8px 8px');
		if(childs.length==1){
			$(childs[0]).find(' >a ').css('border-radius','8px');
		}
		/*var mod = childs.length%3;

		if(mod==0){

			$(childs[childs.length-3]).find(' > a ').css('border-bottom-left-radius','8px');
			$(childs[childs.length-1]).find(' > a ').css('border-bottom-right-radius','8px');
		}else if(mod==1){

			$(childs[childs.length-1]).find(' > a ').css('border-bottom-left-radius','8px');
		}else if(mod==2){

			$(childs[childs.length-2]).find(' > a ').css('border-bottom-left-radius','0px 0px 0px 8px');
		}*/
	}else {

		$(childs[2]).find('a').css('border-radius','0px 8px 0px 0px');
		

		childs.each(function(){
			$(this).css('height',maxHeight);
		});

		//normalize width of li

		if(childs.length>3) {
			var maxRightMostWidth = 0;

			for(var i=2; i< childs.length; i+=3){
				if($(childs[i]).width()>maxRightMostWidth){
					maxRightMostWidth = $(childs[i]).width();
				}
			}

			for(var i=2; i< childs.length; i+=3){
				$(childs[i]).css('width',maxRightMostWidth);
			}

			var maxMiddleWidth = 0;

			for(var i=1; i< childs.length; i+=3){
				if($(childs[i]).width()>maxMiddleWidth){
					maxMiddleWidth = $(childs[i]).width();
				}
			}

			for(var i=1; i< childs.length; i+=3){
				$(childs[i]).css('width',maxMiddleWidth);
			}

			var maxLeftMostWidth = 0;

			for(var i=0; i< childs.length; i+=3){
				if($(childs[i]).width()>maxMiddleWidth){
					maxLeftMostWidth = $(childs[i]).width();
				}
			}

			for(var i=0; i< childs.length; i+=3){
				$(childs[i]).css('width',maxLeftMostWidth);
			}

			$(element.find(' > li.last > a')).css('border-radius','0');

		}

		if(childs.length<=1) {
			$(element.find(' > li.last > a')).css('border-radius','8px');
		}
	}

	// calculate position to align the submenu to its parent selector when appropriate

	var marginLeft = $(element).parent().position().left;

	if(marginLeft+$(element).outerWidth()<$('#main_Nav').width()){
		$(element).css('margin-left',marginLeft);
	}

}