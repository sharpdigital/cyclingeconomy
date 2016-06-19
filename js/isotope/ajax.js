var $ = jQuery;

if ( $().swiper ) { 
	
	function run_swiper(slider){
		var $this = slider;
					
		var perview = parseInt($this.data('perview'));
		var container_w = $this.parent().outerWidth();
		if (container_w < 480) {perview = 1;}
		else if (container_w < 768) {if (perview>2) perview = 2;}
		else if (container_w < 1024) {if(perview>3) perview = 3;}

		var swiper_args = {
			mode		: 'horizontal',
			loop		: $this.data('loop'),
			speed		: $this.data('speed'),
			mousewheelControl	: $this.data('mousewheel'),
			keyboardControl		: $this.data('keyboard'),
			calculateHeight		: true, // please do not delele this line
			grabCursor	: true,
			autoplayDisableOnInteraction	: false,
			paginationClickable	: true,
			paginationAsRange	: true,
			paginationElement	: 'a',
			touchRatio			: 0.5,
			simulateTouch		: $this.data('touch'),
			slidesPerView		: perview,
			moveStartThreshold	: 50,
			}
		if ( $this.data('auto') ) {
			swiper_args['autoplay'] = parseInt($this.data('auto-time'));
			}
		if ( $this.data('pager') ) {
			swiper_args['pagination'] = $this.data('pagination-selector');
			}
		if ( $this.data('free')) {
			swiper_args['freeMode'] = true;
			swiper_args['freeModeFluid'] = true;
			}
			/* wooslider */
		if ($this.hasClass('k2t-single-product-thumbnail-carousel')) {
			swiper_args['slidesPerView'] = 3;
		}
		
			/* 3D SLIDER */
		if ( $this.hasClass('k2t-3d-slider') ) {
			swiper_args['centeredSlides'] = true;
			swiper_args['tdFlow'] =  {
					rotate : -20,
					stretch :0,
					depth: 100,
					modifier : 2,
					shadows : true
				}
			
			}
		
		/* AWESOME SLIDER */
		if ( $this.hasClass('k2t-awesome-slider') ) {
			swiper_args['centeredSlides'] = true;
			swiper_args['slidesPerView'] = 'auto';				
			}
		
		swiper_args['onSwiperCreated'] = function(swiper){
				
				/* NAVIGATION */
				$this.find('.k2t-swiper-navi').find('.prev').on('click', function(e){
					e.preventDefault()
					swiper.swipePrev()
					});
				$this.find('.k2t-swiper-navi').find('.next').on('click', function(e){
					e.preventDefault()
					swiper.swipeNext()
					});
				
				
				/* -------------- WOOCOMMERCE -------------- */
				/* product thumb navigation */
				if ($this.hasClass('k2t-single-product-slider')) {
					$this.parent().find('.k2t-single-product-thumbnail-carousel').find('.swiper-slide').on('click',function(e){
						e.preventDefault();
						swiper.swipeTo($(this).data('navi')-1);
					   });
				}
				
				/* slide to center */
				if ($this.hasClass('k2t-single-product-thumbnail-carousel')) {
					$this.find('.swiper-slide').on('click',function(e){				
						e.preventDefault(); 
						swiper.swipeTo($(this).data('navi')-2);
																	});
					} // if 
				
				
		} // onInit

		var swiper_slider = $this.find('.swiper-container').swiper(swiper_args); // swiper-container
		
	} // run_swiper
													
}	// if swiper

// Load detail single portfolio by ajax and enable popup
function k2t_load_single_project(popup_id, project_id){
	var $ = jQuery;
	$.ajax({
		type: "GET",
		url: ajax_object.ajaxurl,
		dataType: 'html',
		data: ({ action: 'k2t_load_single_project_ajax', id: project_id}),
		success: function(data){
			$('#'+popup_id+' .surface').html( data );
			run_swiper($('#portfolio_'+project_id));
			$(window).resize(function(){
				run_swiper($('#portfolio_'+project_id));
			}); // resize
		}			
	});
}

