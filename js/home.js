var Home = {
	bind: function() {

        Home.navegation();

        // Adiciona a class fixed para o header
        $(window).on('scroll', function(){
            if ($(window).scrollTop() >= 200) {
                $('.sd-header').addClass('fixed');
           	}else {
                $('.sd-header').removeClass('fixed');
            }
            
            Home.navegation();
        });

        //Scroll page
        $('#sd-vertical-nav a, .menu a[href*="#"]:not([href="#"]').on('click', function(event){
            event.preventDefault();
            MAIN.pagescroll($(this.hash));
        });

        // Inicia o caoursel na home
        $("#home_steps").tabs({show: 'fade', hide: 'fade'}).tabs("rotate", 10000, true).tabs("hover", true, true);
    },

	/*
	 * @função para navegação vertical
	 */
	navegation: function(){
		var contentSections = $('.sd-section'),
            navigationItems = $('#sd-vertical-nav a');

		contentSections.each(function(){
	        var _self = $(this), 
	        	activeSection = $('#sd-vertical-nav a[href="#'+_self.attr('id')+'"]').data('number') - 1;
	        if ( ( _self.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( _self.offset().top + _self.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
	            navigationItems.eq(activeSection).addClass('is-selected').parents('#sd-vertical-nav');
                navigationItems.eq(activeSection).parents('#sd-vertical-nav').addClass('color-index-' + activeSection);
	        }else {
	            navigationItems.eq(activeSection).removeClass('is-selected');
                navigationItems.eq(activeSection).parents('#sd-vertical-nav').removeClass('color-index-' + activeSection);
   
	        }
	    });
	},

	/*
	 * inicia todas as funções
	 */
	init: function(){
	  	this.bind();
	}
};

$(function(){
	if(isDesktop) {
    	Home.init();
    }

});
