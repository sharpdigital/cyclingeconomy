/**
 * Custom script for Velo.
 *
 * @package Velo
 * @author  SunriseTheme
 * @link	http://www.sunrisetheme.com
 */
 
(function($) {
	"use strict";

	$(function() {

		var mainParams = {"offcanvas_turnon":"1","sticky_menu":""};

		/*  [ Detecting Mobile Devices ]
		- - - - - - - - - - - - - - - - - - - - */
		var isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
			},
			Desktop: function() {
				return window.innerWidth <= 960;
			},
			any: function() {
				return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Desktop() );
			}
		}

		/*  [ Add poroduct shortcode title ]
		- - - - - - - - - - - - - - - - - - - - */
		if ( $( '.product-heading' ).length ) {
			$( '.product-heading' ).addClass( 'isotope-selector product' );
			$( '.product-heading' ).prependTo( $( ".products" ) );
		}

		/*  [ Sticky menu trigger ]
		- - - - - - - - - - - - - - - - - - - - */
		if ( mainParams.vertical_menu == '0' ) {
			if ( mainParams.sticky_menu == 'sticky_top' ) {
				var nav = $(".k2t-header-top");
				var waypoint_offset = 20;
			} else if ( mainParams.sticky_menu == 'sticky_mid' ) {
				var nav = $(".k2t-header-mid");
				var waypoint_offset = 50;
			} else if ( mainParams.sticky_menu == 'sticky_bot' ) {
				var nav = $(".k2t-header-bot");
				var waypoint_offset = 30;
			}
			if ( mainParams.sticky_menu == 'sticky_top' || mainParams.sticky_menu == 'sticky_mid' || mainParams.sticky_menu == 'sticky_bot' ) {
				var container = $( '.k2t-header' );
				var top_spacing = 0;
				container.waypoint({
					handler: function (event, direction) {
						if ( direction == 'down' ) {
							container.css({
								'height': nav.outerHeight()
							});
							nav.stop().addClass('sticky').css('top', - nav.outerHeight() ).animate({
								'top': top_spacing
							});
							$('body').addClass('header-sticky');
						} else {
							container.css({
								'height': 'auto'
							});
							nav.stop().removeClass('sticky').css('top', nav.outerHeight() + waypoint_offset).animate({
								'top': ''
							});
							$('body').removeClass('header-sticky');
						}
					},
					offset: function () {
						return - nav.outerHeight() - waypoint_offset;
					}
				});
			}
		}

		/*  [ Vertical header ]
		- - - - - - - - - - - - - - - - - - - - */
		$('#showPushMenu').on('click', function() {
			if ( mainParams.vertical_menu == '1' ){
				$('body').toggleClass('vertical-close');
			}
			return false;
		});

		/*  [ Custom RTL Menu ]
		- - - - - - - - - - - - - - - - - - - - */
		if ( ! isMobile.any() ) {
			$( '.sub-menu li' ).on( 'hover', function () {
				var sub_menu = $( this ).find( ' > .sub-menu' );
				if ( sub_menu.length ) {
					if ( sub_menu.outerWidth() > ( $( window ).outerWidth() - sub_menu.offset().left ) ) {
						$( this ).addClass( 'menu-rtl' );
					}
				}
			});
		}

		/*  [ Back to top ]
		- - - - - - - - - - - - - - - - - - - - */
		$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('.k2t-btt').fadeIn('slow');
			} else {
				$('.k2t-btt').fadeOut('slow');
			}
		});
		$( '.k2t-btt' ).on( 'click', function () {
			$("html, body").animate({
				scrollTop: 0
			}, 500);
			return false;
		});

		/*  [ Scroll to Next Section ]
		- - - - - - - - - - - - - - - - - - - - */

		if ( $( '.k2t-scrolldown' ).length ) {
			$( '.k2t-scrolldown' ).on( 'click', function() {
				var nextSection = $(this).closest('.vc_row').next('.vc_row');
				$("html, body").animate({
					scrollTop: nextSection.offset().top
				}, 500);
				return false;
			});
		}


		/*  [ Offcanvas Sidebar ]
		- - - - - - - - - - - - - - - - - - - - */
		$( '.open-sidebar' ).on( 'click', function() {
			if ( mainParams.offcanvas_turnon == '1' ){
				$( 'body' ).toggleClass( 'offcanvas-open' );
				$( '.offcanvas-sidebar' ).toggleClass( 'is-open' );
				$(this).toggleClass( 'close-sidebar' );
			}
			return false;
		});

		$( '.k2t-container' ).on( 'click', function(e) {
			if ($(e.target).hasClass( 'open-sidebar' ) || $(e.target).closest( '.open-sidebar' ).length > 0 ) {
				return;
			}
			$( 'body' ).removeClass( 'offcanvas-open' );
			$( '.offcanvas-sidebar' ).removeClass( 'is-open' );
			$( '.open-sidebar' ).removeClass( 'close-sidebar' );
			//return false;
		});

		$( '.offcanvas-sidebar .widget ul > li.menu-item-has-children' ).on( 'click', function(e) {
			if ( $(this).find( 'ul' ) ) {
				if ( $(this).find( 'ul' ).css( 'opacity' ) == '0' ) {
					$(this).addClass( 'canvas_active' );
				} else {
					$(this).removeClass( 'canvas_active' );
				}
			}
			//return false;
		});

		/*  [ Search Box ]
		- - - - - - - - - - - - - - - - - - - - */
		$( '.search-box.style-1 i' ).on('click',function(e) {
			e.stopPropagation();
			var search_form = $( '.k2t-searchbox' );
			search_form.addClass( 'active' );
			search_form.on('click',function(e) {
				if ( $(e.target).attr('class') == 'searchsubmit' || $(e.target).attr('id') == 's') {
					return;
				} else {
					search_form.removeClass( 'active' );
				}
			});
			//return false;
		});
		$( '.k2t-header-m .search-box i' ).on('click',function(e) {
			e.stopPropagation();
			var search_form = $( '.k2t-searchbox' );
			search_form.addClass( 'active' );
			search_form.on('click',function(e) {
				if ( $(e.target).attr('id') == 'searchsubmit' || $(e.target).attr('class') == 's') {
					return;
				} else {
					search_form.removeClass( 'active' );
				}
			});
			//return false;
		});

		/*  [ Ajax login ]
		- - - - - - - - - - - - - - - - - - - - */
		$( '.not-a-member-handle' ).html( 'Register' );

		/*  [ VC Alert close ]
		- - - - - - - - - - - - - - - - - - - - */
		$( '.wpb_alert .close' ).on( 'click', function(){
			var parent = $(this).parent();
			parent.css({"opacity":"0", "height":"0", "padding":"0", "margin":"0"});
			//return false;
		});

		/*  [ Menu Responsive ]
		- - - - - - - - - - - - - - - - - - - - */
		jQuery('.mobile-menu-toggle').on('click',function(e) {
	        jQuery('body').toggleClass('enable-mobile-menu');
			jQuery('body').removeClass('scroll-mobile-menu');
	    });


		/*  [ Remove p empty tag of page builder ]
		- - - - - - - - - - - - - - - - - - - - */
		$('p').each(function() {
			var $this = $(this);
			if($this.html().replace(/\s|&nbsp;/g, '').length == 0) {
				$this.remove();
			}
			//return false;
		});

		// Isotope
		if ( $().masonry && $().isotope && $().imagesLoaded ) {
			
			$( '.k2t-isotope-wrapper' ).each( function() {

				var $this = $(this);
				var $container = $this.find('.k2t-isotope-container');
				
				// initialize Isotope + Masonry after all images have loaded  
				$this.imagesLoaded( function() {

					$container.addClass('loaded').find('.isotope-selector').find('.article-inner');
					var isotope_args = {
						itemSelector: '.isotope-selector',
						transitionDuration	: '.55s',
						masonry: {
							gutter	: '.gutter-sizer',
							//columnWidth: 
						},
					};
					if ($this.hasClass('isotope-velo')) {
						isotope_args['layoutMode'] = 'fitRows';
					}
					if ($this.hasClass('isotope-no-padding')) {
						delete isotope_args.masonry.gutter; //true
					}
					if ($this.hasClass('isotope-free')) {
						isotope_args.masonry['columnWidth'] = '.width-1';
					}
					var $velo = $container.isotope(isotope_args);
					
					// animation
					var animation = $velo.data('animation');
					if (animation = true) {
						$container.find('.isotope-selector').find('.article-inner').each(function(){
							var $this=$(this);
							$this.parent().one('inview', function(event, isInView, visiblePartX, visiblePartY) {
								if (isInView) {
									$this.addClass('run_animation');
								} // inview						  
							});// bind
						}); // each
							
					} // endif animation
					
					// filter items when filter link is clicked
					$this.find('.cd-dropdown').find('span').on('click',function(){
						if ( $(this).parent().parent().parent().hasClass('cd-active') ){
                            var selector = $(this).attr('class');
                            $container.isotope({
                                filter: selector,
                            });
                        }
					});
					
				}); // imagesLoaded
				//return false;
			}); // each .k2t-isotope-wrapper
		} // if isotope

		/*  [ Performs a smooth page scroll to an anchor ]
		- - - - - - - - - - - - - - - - - - - - */
		$('.scroll').on('click',function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash),
				headerH = $('.k2t-header').outerHeight();

				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top - 170 + "px"
					}, 1200);
					return false;
			   }
		   }
		  // return false;
		});

		var $logoImg = $('.k2t-logo img');
		if ( $logoImg.css( 'min-height' ) == '1px' ) {
			$logoImg.attr( 'src', $logoImg.attr( 'src' ).replace( 'logo.png', 'logo@2x.png' ) );
		}


		/*-------------------------------Custom Page---------------------------*/
		$( ".wc-tabs-wrapper" ).tabs();
		$(".product-img").owlCarousel({
			margin: 0,
			items: 1,
            callbacks: true,
            URLhashListener: true,
          	startPosition: 'URLHash',
            dots: true,
            nav: true,
           	navText : ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
		});
		$(".nav").owlCarousel({ 
			margin: 10,
			items: 4,
            loop: true,
            dots: false,
            nav: true,
           	navText : ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],

		});
		$('.nav a').on('click', function(event){
		    var $this = $(this);
		    $this.addClass('clicked');
			$(this).parent().siblings().children('a').removeClass('clicked');
		});
	    $(function() {
			var owl = $(".relate-item");
			owl.owlCarousel({
				margin: 30,
				items: 4,
				responsive:{
			        1199:{
			            items:4,
			        },
			        979:{
			            items:4,
			        },
			        768:{
			            items:2,
			        },
			        479:{
			            items:1,
			        },
			        0:{
			            items: 1,
			        },
			    }, 
				nav 			: false,
				loop: false,
				dots 			: true,
				navText 			: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
			});
		});
		$(document).ready(function() {
			$(".k2t-thumb-gallery").owlCarousel({
				dots: false,
				nav: true,
				smartSpeed: 300,
				loop: true,
				navText: [
					"<i class=\"fa fa-chevron-left\"></i>",
					"<i class=\"fa fa-chevron-right\"></i>"
				],
				items: 1,
			});
		});
		$(document).ready(function() {
			$(".k2t-thumb-gallery-masonry").owlCarousel({
				dots: false,
				nav: true,
				smartSpeed: 300,
				loop: true,
				navText: [
					"<i class=\"fa fa-chevron-left\"></i>",
					"<i class=\"fa fa-chevron-right\"></i>"
				],
				items: 1,
			});
		});
		$(".k2t-related-posts").owlCarousel({
            loop: false,
            margin: 30,
            items: 2,
            responsive:{
                0:{
                    items:1,
                },
                600:{
                    items:2,
                    nav:false
                },
            },
            navText: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
            nav: true,
            dots: false,
        });
		
		$(function() {
			$( "#accordion-style1" ).accordion();
		});
		$(function() {
			$( "#accordion-style2" ).accordion();
		});
		$( "#wpb_toggle1" ).on('click',function() {
		  $( "#wpb_toggle_content1" ).toggle( "blind", 500 );
		});
		$( "#wpb_toggle2" ).on('click',function() {
		  $( "#wpb_toggle_content2" ).toggle( "blind", 500 );
		});
		$( "#wpb_toggle3" ).on('click',function() {
		  $( "#wpb_toggle_content3" ).toggle( "blind", 500 );
		});
		$( "#wpb_toggle4" ).on('click',function() {
		  $( "#wpb_toggle_content4" ).toggle( "blind", 500 );
		});
		$( "#wpb_toggle5" ).on('click',function() {
		  $( "#wpb_toggle_content5" ).toggle( "blind", 500 );
		});

		$.stellar({
			horizontalScrolling: false,
			verticalOffset: 40
		});
		$( ".k2t-accordion" ).accordion();

		/******************************************
			-	PREPARE PLACEHOLDER FOR SLIDER	-
		******************************************/

		var setREVStartSize=function(){
			try{var e=new Object,i=jQuery(window).width(),t=9999,r=0,n=0,l=0,f=0,s=0,h=0;
				e.c = jQuery('#rev_slider_3_1');
				e.gridwidth = [1600];
				e.gridheight = [800];
						
				e.sliderLayout = "fullwidth";
				if(e.responsiveLevels&&(jQuery.each(e.responsiveLevels,function(e,f){f>i&&(t=r=f,l=e),i>f&&f>r&&(r=f,n=e)}),t>r&&(l=n)),f=e.gridheight[l]||e.gridheight[0]||e.gridheight,s=e.gridwidth[l]||e.gridwidth[0]||e.gridwidth,h=i/s,h=h>1?1:h,f=Math.round(h*f),"fullscreen"==e.sliderLayout){var u=(e.c.width(),jQuery(window).height());if(void 0!=e.fullScreenOffsetContainer){var c=e.fullScreenOffsetContainer.split(",");jQuery.each(c,function(e,i){u=jQuery(i).length>0?u-jQuery(i).outerHeight(!0):u}),e.fullScreenOffset.split("%").length>1&&void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0?u-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0&&(u-=parseInt(e.fullScreenOffset,0))}f=u}else void 0!=e.minHeight&&f<e.minHeight&&(f=e.minHeight);e.c.closest(".rev_slider_wrapper").css({height:f})
			}catch(d){console.log("Failure at Presize of Slider:"+d)}
		};
					
			
		setREVStartSize();

		var tpj=jQuery;
		tpj.noConflict();
		var revapi3;
		tpj(document).ready(function() {
			if(tpj("#rev_slider_3_1").revolution == undefined){
				revslider_showDoubleJqueryError("#rev_slider_3_1");
			}else{
				revapi3 = tpj("#rev_slider_3_1").show().revolution({
					sliderType:"standard",
					jsFileLocation:"revolution/js/",
					sliderLayout:"fullwidth",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
						onHoverStop:"on",
						touch:{
							touchenabled:"on",
							swipe_threshold: 75,
							swipe_min_touches: 1,
							swipe_direction: "horizontal",
							drag_block_vertical: false
						}
						,
						arrows: {
							style:"",
							enable:true,
							hide_onmobile:false,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"left",
								v_align:"center",
								h_offset:20,
								v_offset:0
							},
							right: {
								h_align:"right",
								v_align:"center",
								h_offset:20,
								v_offset:0
							}
						}
						,
						bullets: {
							enable:false,
							hide_onmobile:false,
							style:"hesperiden",
							hide_onleave:false,
							direction:"horizontal",
							h_align:"center",
							v_align:"bottom",
							h_offset:0,
							v_offset:20,
							space:5,
							tmp:''
						}
					},
					gridwidth:1600,
					gridheight:800,
					lazyType:"all",
					parallax: {
						type:"mouse",
						origo:"enterpoint",
						speed:400,
						levels:[2,4,6,15,25,30,35,40,45,50],
						disable_onmobile:"on"
					},
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					startWithSlide:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:"off",
					}
				});
			}
		});	/*ready*/
		
		$(".owl-carousel-index").owlCarousel({
			loop: false,
			margin: 30,
			slideSpeed : 300,
			paginationSpeed : 400,
			items: 3,
		    nav: false,
		    dots: true,
			responsive:{
		        1199:{
		            items:3,
		        },
		        979:{
		            items:3,
		        },
		        768:{
		            items:2,
		        },
		        479:{
		            items:1,
		        },
		        0:{
		            items: 1,
		        },
		    },
		    navText: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
		});

		$("#carousel1").owlCarousel({
			loop: true,
			margin: 20,
			items: 3,
			panigation: true,
			responsive:{
		        1199:{
		            items:3,
		        },
		        979:{
		            items:3,
		        },
		        768:{
		            items:1,
		        },
		        479:{
		            items:1,
		        },
		        0:{
		            items: 1,
		        },
		    }, 
		    navText: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
		    nav: true,
		    dots: true,
		});

		$("#HhogNTmDac").owlCarousel({
			items 					: 1,
			itemsDesktop      		: [1199,1],
			itemsDesktopSmall		: [979,1],
			itemsTablet       		: [768,1],
			itemsMobile       		: [479,1],
			navigationText 			: ["<i class=\"fa fa-chevron-left\"></i>", "<i class=\"fa fa-chevron-right\"></i>"],
			slideSpeed 				: 1000, singleItem: true,navigation: false,pagination: false,
		});
		var sync1 = $(".product-img");
		var sync2 = $("#nav");
		
		var flag = false;
		
		var slides = sync1.owlCarousel({
			items:1,
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:6000,
			autoplayHoverPause:false,
			nav: false,
			dots: true
		});
		var thumbs = sync2.owlCarousel({
	        items:4,
			loop:false,
			margin:10,
			autoplay:false,
			nav: false,
			dots: false
		}).on('click', '.owl-item', function(e) {
	        e.preventDefault();	
	        sync1.trigger('to.owl.carousel', [$(e.target).parents('.owl-item').index(), 300, true]);
		}).on('change.owl.carousel', function(e) {
            if (e.namespace && e.property.name === 'position' && !flag) {
            console.log('...');
	    }
		}).data('owl.carousel');
		
		$('#nav a').each(function(index){
			$(this).on('click', function(e){
				e.preventDefault(); 
			    $(this).addClass('clicked');
				$(this).parent().siblings().children('a').removeClass('clicked');
			});
		});


			/******************************************
				-	PREPARE PLACEHOLDER FOR SLIDER HOME 3	-
			******************************************/

			var setREVStartSize=function(){
				try{var e=new Object,i=jQuery(window).width(),t=9999,r=0,n=0,l=0,f=0,s=0,h=0;
					e.c = jQuery('#rev_slider_6_1');
					e.gridwidth = [1600];
					e.gridheight = [800];
							
					e.sliderLayout = "fullwidth";
					if(e.responsiveLevels&&(jQuery.each(e.responsiveLevels,function(e,f){f>i&&(t=r=f,l=e),i>f&&f>r&&(r=f,n=e)}),t>r&&(l=n)),f=e.gridheight[l]||e.gridheight[0]||e.gridheight,s=e.gridwidth[l]||e.gridwidth[0]||e.gridwidth,h=i/s,h=h>1?1:h,f=Math.round(h*f),"fullscreen"==e.sliderLayout){var u=(e.c.width(),jQuery(window).height());if(void 0!=e.fullScreenOffsetContainer){var c=e.fullScreenOffsetContainer.split(",");if (c) jQuery.each(c,function(e,i){u=jQuery(i).length>0?u-jQuery(i).outerHeight(!0):u}),e.fullScreenOffset.split("%").length>1&&void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0?u-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0&&(u-=parseInt(e.fullScreenOffset,0))}f=u}else void 0!=e.minHeight&&f<e.minHeight&&(f=e.minHeight);e.c.closest(".rev_slider_wrapper").css({height:f})
				}catch(d){console.log("Failure at Presize of Slider:"+d)}
			};
						
				
			setREVStartSize();
			function revslider_showDoubleJqueryError(sliderID) {
					var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
					errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
					errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
					errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
					errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>"
						jQuery(sliderID).show().html(errorMessage);
				}
			var tpj=jQuery;
			tpj.noConflict();
			var revapi6;
			tpj(document).ready(function() {
				if(tpj("#rev_slider_6_1").revolution == undefined){
					revslider_showDoubleJqueryError("#rev_slider_6_1");
				}else{
					revapi6 = tpj("#rev_slider_6_1").show().revolution({
						sliderType:"standard",
						jsFileLocation:"http://dev.sunrisetheme.com/velo/wp-content/plugins/revslider/public/assets/js/",
						sliderLayout:"fullwidth",
						dottedOverlay:"none",
						delay:9000,
						navigation: {
							keyboardNavigation:"off",
							keyboard_direction: "horizontal",
							mouseScrollNavigation:"off",
							onHoverStop:"on",
							touch:{
								touchenabled:"on",
								swipe_threshold: 75,
								swipe_min_touches: 1,
								swipe_direction: "horizontal",
								drag_block_vertical: false
							}
							,
							arrows: {
								style:"",
								enable:true,
								hide_onmobile:false,
								hide_onleave:false,
								tmp:'',
								left: {
									h_align:"left",
									v_align:"center",
									h_offset:20,
									v_offset:0
								},
								right: {
									h_align:"right",
									v_align:"center",
									h_offset:20,
									v_offset:0
								}
							}
							,
							bullets: {
								enable:true,
								hide_onmobile:false,
								style:"hesperiden",
								hide_onleave:false,
								direction:"horizontal",
								h_align:"center",
								v_align:"bottom",
								h_offset:0,
								v_offset:20,
								space:5,
								tmp:''
							}
						},
						gridwidth:1600,
						gridheight:800,
						lazyType:"all",
						parallax: {
							type:"mouse",
							origo:"enterpoint",
							speed:400,
							levels:[5,15,20,20,25,30,35,40,45,50],
							disable_onmobile:"on"
						},
						shadow:0,
						spinner:"spinner0",
						stopLoop:"off",
						stopAfterLoops:-1,
						stopAtSlide:-1,
						shuffle:"off",
						autoHeight:"off",
						hideThumbsOnMobile:"off",
						hideSliderAtLimit:0,
						hideCaptionAtLimit:0,
						hideAllCaptionAtLilmit:0,
						startWithSlide:0,
						debugMode:false,
						fallbacks: {
							simplifyAll:"off",
							nextSlideOnWindowFocus:"off",
							disableFocusListener:false,
						}
					});
				}
			});	/*ready*/
		

	});

	$(window).load(function() {

		/*  [ Page loader effect ]
		- - - - - - - - - - - - - - - - - - - - */
		$( '#loader' ).delay(600).fadeOut();
		$( '#loader-wrapper' ).delay(600).fadeOut( 'slow' );
		setTimeout(function(){
			$( '#loader-wrapper' ).remove();
		}, 800);

		
		/*  [ Menu One Page ]
		- - - - - - - - - - - - - - - - - - - - */
		var headerH = $(".k2t-header-mid").height();
		var adminbar = $("#wpadminbar").height();
		if (!adminbar) adminbar = 0;
		function i() {
			var e = "";
			var t = "";
			$(".k2t-header .k2t-menu > li").each(function(e) {
				var n = $(this).find("a").attr("href");
				var r = $(this).find("a").attr("data-target");
				if ($(r).length > 0 && $(r).position().top - headerH <= $(document).scrollTop()) {
					t = r
				}
			});
		}
		function set_current_menu_for_scroll(){
			var menu_arr = [];
			var i =  0;
			$(".k2t-header .k2t-menu > li").each(function(e) {
				var n = $(this).find("a").attr("href");
				if (n.charAt(0) == "#" && n.length > 2) {
					menu_arr[i] = n.substr(1, n.length - 1);
					i++;
				}
			});
			if (menu_arr.length > 0){
				jQuery.each( menu_arr, function(){
					var offset = $("#" + this).offset();
					var posY = offset.top - $(window).scrollTop();
					var posX = offset.left - $(window).scrollLeft(); 
					if(posY > 0){
						var new_active = "#" + this;
						if( jQuery(".k2t-header .k2t-menu > li.active > a").attr("href") == new_active  )
						{}else{
							jQuery(".k2t-header .k2t-menu > li.active").removeClass("active");
							jQuery("[href=#" + this + "]").parent("li").addClass("active");
						}
						return false;
					}
				});
			}
		}
		var n = 1e3;
		var r = "#" + $(".k2t-content").attr("id");
		$("body").on("click", ".k2t-header .k2t-menu > li > a", function() {
			var e = $(this).attr("href");
			var i = $(this).attr("data-target");

			$(".k2t-header .k2t-menu > li").each(function(){
				$(this).removeClass("active");
			});
			$(this).parent("li").addClass("active");
			if (e.charAt(0) == "#") {
				i = e
			}
			if ($(i).length > 0) {
				if (e == r) {
					$("html,body").animate({
						scrollTop: 0
					}, n, "easeInOutQuart")
				} else {
					$("html,body").animate({
						scrollTop: $(i).offset().top - headerH - adminbar
					}, n, "easeInOutQuart")
				}
				return false
			}
		//return false;
		});
		
		i();
		$(window).scroll(function() {
			i();
			set_current_menu_for_scroll();
		})
		
		/*  [ Blog masonry trigger ]
		- - - - - - - - - - - - - - - - - - - -*/
		/* if ( mainParams.blog_style == 'masonry' ) {
			var container = document.querySelector('.b-masonry .masonry-layout');
			var msnry = new Masonry( container, {
				itemSelector: '.hentry',
				columnWidth: container.querySelector('.velo-sizer'),
				gutter: 0
			});
		} */
		/*  [ Woocommerce CheckOut Labels ]
		- - - - - - - - - - - - - - - - - - - - */
		/*
		var val;
		var placeholderInput = [$("#commentform :input"), $("#commentform textarea"), $(".woocommerce-billing-fields :input"), $(".woocommerce-shipping-fields :input")];
		for ( val in placeholderInput ) {
			if ( val.length > 0 ) { 
				val.each(function(index, elem) {
					var eId = $(elem).attr("id");
					var label = null;
					if ( eId && (label = $(elem).parents("form").find("label[for="+eId+"]")).length == 1 ) {
					    $(elem).attr("placeholder", $(label).text());
					    $(label).remove();
					}
				});
			}
		} */

		/* Set cookie for change product layout
		- - - - - - - - - - - - - - - - - - - - */
		
		jQuery('.pageviewitem').not('.active').on('click',function () {
			if (jQuery.cookie('product-view') != '') {
				jQuery.cookie('product-view', jQuery(this).attr('data-view'));
				document.location.reload();
			}
		});



		/*  [ Revolution Slider Dot Line ]
		- - - - - - - - - - - - - - - - - - - - */
		var revoLine = $('.rev_slider.fullwidthabanner ul li');
		if ( revoLine.length ) {
			$( "<div class='dot-line'></div>" ).insertBefore( ".rev_slider.fullwidthabanner > ul > li > div:last-child" );
		}

		
		/* Subscribe Form Placeholder
		- - - - - - - - - - - - - - - - - - - -  */
		var subForm = $('.widgetGuts.shortcode form');
		if ( subForm.length ) {
			subForm.removeAttr('id');
			subForm.addClass("frm-subscriptionFront");
			$(".frm-subscriptionFront .text").attr("placeholder", "Your Email");
			$(".frm-subscriptionFront .text").removeAttr('id');

		}
		//return false;
		
	});
})(jQuery);