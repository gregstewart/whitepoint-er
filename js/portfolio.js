/**
 * @author gregstewart
 */
PortfolioViewer = {
	selected_image : '',
	selected_subnav_image : 'covers',
	init: function() {
		Event.observe('retouched','click',function(){PortfolioViewer.toggleMainImage('retouched');},false);
		Event.observe('original','click',function(){PortfolioViewer.toggleMainImage('original');},false);
		Event.observe('covers','click',function(){PortfolioViewer.imageLoader('covers');},false);
		Event.observe('fashion_studio','click',function(){PortfolioViewer.imageLoader('fashion_studio');},false);
		Event.observe('fashion_location','click',function(){PortfolioViewer.imageLoader('fashion_location');},false);
		Event.observe('beauty','click',function(){PortfolioViewer.imageLoader('beauty');},false);
		Event.observe('food','click',function(){PortfolioViewer.imageLoader('food');},false);
		Event.observe('other','click',function(){PortfolioViewer.imageLoader('other');},false);
		
		PortfolioViewer.imageLoader('covers');
		PortfolioViewer.imagePreLoader();
	},
	
	imagePreLoader: function ()
	{
		var i = 0;
		var j = 0;
		var main_re = new RegExp('S','g');
		var imageObj = new Image();
		var arNav = new Array ('fashion_studio','fashion_location','beauty','food','other')
		
		for (i=0; i<arNav.length; i++)
		{
			var set = PortfolioViewer.arrayLoader(arNav[i]);
			for (j=0; j<set.length; j++)
			{
				imageObj.src='images/pages/' + set[i] + '.jpg'; //thumb
				imageObj.src='images/pages/' + set[i] + 'O.jpg'; //thumb hover
				imageObj.src='images/pages/' + set[i].replace(main_re,'M') + '.jpg'; //main
				imageObj.src='images/pages/' + set[i].replace(main_re,'M') + 'U.jpg'; //main
				//console.log('Image ' + set[i] + ' loaded');
			}
		}
	},
	
	imageLoader: function(set)
	{
		var arImages = PortfolioViewer.arrayLoader(set);
		var main_re = new RegExp('S','g');
		var str = arImages[0].replace(main_re,'M');
		
		$('image_list').update();
		$('main_image').update();
		PortfolioViewer.loadImages(arImages);
		if (PortfolioViewer.selected_subnav_image != set)
			PortfolioViewer.updateSubNav(set);
	},
	
	arrayLoader: function (name)
	{
		switch (name)
		{
			case 'covers': 
				return new Array ('S201','S202','S203','S204','S205');
			case 'fashion_studio': 
				return new Array ('S301','S302','S303','S304','S305');
			case 'fashion_location': 
				return new Array ('S401','S402','S403','S404','S405');
			case 'beauty': 
				return new Array ('S501','S502','S503','S504','S505');
			case 'food': 
				return new Array ('S601','S602','S603','S604','S605');
			case 'other': 
				return new Array ('S701','S702','S703','S704','S705');
		}
	},
	
	loadImages: function(arImages) {
		
		var str = '<img id="{image_id}" src="images/pages/{image}.jpg" alt="{image}" class="image_border"/>';
		var img = '';
		var img_re = new RegExp('{image}','g');
		var img_id_re = new RegExp('{image_id}');
		var i = arImages.length-1;
		
		// thumb images
		do
		{
			if (i != 0) {
				img = arImages[i] + 'O';
			} else {
				img = arImages[i];
			}
			tmpy_str = str.replace(img_re, img);
			tmpy_str = tmpy_str.replace(img_id_re, arImages[i]);
			
			new Insertion.Top('image_list',tmpy_str + '<br />');
			$(arImages[i]).addClassName('cursor_hand');
			
			Event.observe(arImages[i],'mouseover',this.highlight.bindAsEventListener(arImages[i]),false);
			Event.observe(arImages[i],'mouseout',this.fade.bindAsEventListener(arImages[i]),false);
			Event.observe(arImages[i],'click',this.loadMainImage.bindAsEventListener(arImages[i]),false);
			
			i = i-1;
		} while (0<=i)
		
		PortfolioViewer.selected_image = img;
		PortfolioViewer.displayMainImage(tmpy_str);
		return;
	},
	
	loadMainImage: function() 
	{
		var id = this.toString()
		PortfolioViewer.fadeCurrentlySelectedImage();
		PortfolioViewer.selected_image = id;
		var main_image = $('main_image').immediateDescendants();
		var main_re = new RegExp('S','g');
		var str = id.replace(main_re,'M');
		main_image[0].src = 'images/pages/' + str + '.jpg';
		main_image[0].id = str;
		main_image[0].alt = str;
							
	},
	
	displayMainImage: function(str) 
	{
		// main image
		var main_re = new RegExp('S','g');
		str = str.replace(main_re,'M');
		new Insertion.Top('main_image',str + '<br />');
		return;
	},
	
	fadeCurrentlySelectedImage: function()
	
	{
		$(PortfolioViewer.selected_image).src = 'images/pages/' + PortfolioViewer.selected_image + 'O.jpg';
		return;
	},
	
	highlight: function()
	{
		var id = this.toString()
		$(id).src = 'images/pages/' + id + '.jpg';
	},
	
	fade: function()
	{
		var id = this.toString()
		if (id != PortfolioViewer.selected_image)
			$(id).src = 'images/pages/' + id + 'O.jpg';
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
	
	updateSubNav: function(selectedImage)
	{
		$(PortfolioViewer.selected_subnav_image).src="images/sub_nav/" + PortfolioViewer.selected_subnav_image + 'O.gif'; 
		$(selectedImage).src="images/sub_nav/" + selectedImage + '.gif'; 
		PortfolioViewer.selected_subnav_image = selectedImage;
	}
}