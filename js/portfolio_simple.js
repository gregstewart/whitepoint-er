/**
 * @author gregstewart
 */
PortfolioViewer = {
	selected_image : '',
	selected_subnav_image : 'covers',
	init: function() {
		Event.observe('retouched','click',function(){PortfolioViewer.toggleMainImage('retouched');},false);
		Event.observe('original','click',function(){PortfolioViewer.toggleMainImage('original');},false);
		Event.observe('covers','click',function(){PortfolioViewer.go('covers');},false);
		Event.observe('fashion_studio','click',function(){PortfolioViewer.go('fashion_studio');},false);
		Event.observe('fashion_location','click',function(){PortfolioViewer.go('fashion_location');},false);
		Event.observe('beauty','click',function(){PortfolioViewer.go('beauty');},false);
		Event.observe('food','click',function(){PortfolioViewer.go('food');},false);
		Event.observe('other','click',function(){PortfolioViewer.go('other');},false);
	},
	
	toggleMainImage: function(state)
	{
		var main_image = $('main_image').immediateDescendants();
		var re = new RegExp('U');
		var str = main_image[0].id;
		
		if (str.match(re) && state == 'retouched') {
			str = str.replace(re,'');
		} else if (!str.match(re) && state == 'original') {
			str = str + 'U';
		}
		
		main_image[0].src = 'images/pages/' + str + '.jpg';
		main_image[0].id = str;
		main_image[0].alt = str;
	},
	
	go: function(section)
	{
		return true;
	}
}