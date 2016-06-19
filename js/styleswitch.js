function sunrisetheme_theme_option_reset_CLICK(){
    jQuery('input:radio[name="flx-select-footer-choice"][value="f_dark"]').prop('checked', true);  
    
    sunrisetheme_footer_CHANGE('f_dark');    
    
    return false;
}

jQuery(document).ready(function($) {     
	sunrisetheme_style_switch_INIT();
	jQuery('.choose-color a.oran').addClass('active');
	jQuery('input:radio[name="flx-select-footer-choice"][value="f_dark"]').prop('checked', true);
	jQuery('input:radio[name="flx-select-style-choice"][value="light"]').prop('checked', true);
});

function sunrisetheme_style_switch_INIT(){   
	
	// Color Change
	jQuery("a.oran" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/orange.css");
		return false;
	});
		
	jQuery("a.cyan" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/cyan.css");
		return false;
	});
		
	jQuery("a.pink" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/pink.css");
		return false;
	});
		
	jQuery("a.green" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/green.css");
		return false;
	});
		
	jQuery("a.red" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/red.css");
		return false;
	});
	
	jQuery("a.gray" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/gray.css");
		return false;
	});
	
	jQuery("a.purple" ).on('click',function(){
		jQuery("#theme-colors-css" ).attr("href", site_url + "/assets/css/skin/purple.css");
		return false;
	});
		
	jQuery('.choose-color a').on('click',function(e){
		e.preventDefault();
		jQuery(this).parent().parent().find('a').removeClass('active');
		jQuery(this).addClass('active');
	});
	
	jQuery("#flx-select-dark-style").on('click',function(){
		jQuery("#theme-template-css" ).attr("href", site_url + "/assets/css/skin/dark.css");
		jQuery('.flx-select-footer').hide();
	});
	
	jQuery("#flx-select-light-style" ).on('click',function(){
		jQuery("#theme-template-css" ).attr("href", "");
		jQuery('.flx-select-footer').show();
	});

	jQuery("#flx-select-footer-light").on('click',function(){
		sunrisetheme_footer_CHANGE('f_light');
	});

	jQuery("#flx-select-footer-dark").on('click',function(){
		sunrisetheme_footer_CHANGE('f_dark');
	});
	
	jQuery(window).load(function($) {	
		// Switcher Layout
		jQuery('#theme-option').animate({
			left: '-275px'
		});
			
		jQuery('.open-close-button').on('click',function(e){
			e.preventDefault();
			var div = jQuery('#theme-option');
			if (div.css('left') === '-275px') {
				jQuery('#theme-option').animate({
					left: '0px'
				}); 
			} else {
				jQuery('#theme-option').animate({
					left: '-275px'
				});
			}
		});
	});
		
	// Reset
	jQuery('a.reset').on('click',function(e){
		jQuery('.color.oran').trigger('click');
		jQuery('#flx-select-light-style').trigger('click');
		jQuery('.theme-opt-wrapper select[name=layout]').val('f_dark');	
	});				    
}

function sunrisetheme_footer_CHANGE(val){
	if('f_light' == val){
		jQuery('body').addClass('light-footer');
	}else{
		jQuery('body').removeClass('light-footer');		
	}
}