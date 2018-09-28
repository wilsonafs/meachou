isDesktop = false;
var mq = window.matchMedia( "(min-width: 1019px)" );
if (mq.matches) {
    isDesktop = true;
} else {
    isDesktop = false;
};
var MAIN = {
    bind: function() {
        
        var menu = $('.sd-header .menu'), 
            header = $('.sd-header'),
            navtrigger = $('#b'),
            mob = $('.mob');

            if(!isDesktop){
              MAIN.nav(menu, navtrigger, mob);  
            }        
            
            $('.sd-scroll-down').on('click', function(event){
                event.preventDefault();
                MAIN.pagescroll($(this.hash));
            });

            if(isDesktop){
                // addclass active no menu
                $(".sd-header .menu a").addClass(function(){return this.href === window.location.href ? "active" : "" ;});
            }     
         
    },

    /*
     * @função para menu mobile
     */
    nav: function(menu, navtrigger, mob) {
        var menuVisivel = false;
        
        if(menu.hasClass("on")) {
            menuVisivel = true;
        } else {
            menuVisivel = false;
        };
        
        navtrigger.on('click', function(){
            if(menuVisivel) {       
                menu.toggleClass("on");
                navtrigger.toggleClass("on")
                mob.toggleClass("on");
                menuVisivel = false;
            } else {
                menu.toggleClass("on");
                navtrigger.toggleClass("on");
                mob.toggleClass("on");
                menuVisivel = true;
            }
        });
            
    },

    /**
     * @função scroll para navegação vertical
     */
    pagescroll: function(target){
        $('body,html').animate(
            {'scrollTop':target.offset().top},
            600
        );
    },

    /**
     * @função para carregar imagem mobile caso tenha o data format como atributo
     */
    lazy: function(){
        var lazy = $('.lazy');
        lazy.each(function() {
            var i = $(this).data('img'),
                f = $(this).data('format');

                if(isDesktop){
                     $(this).attr('src', i+f)
                }else {
                     $(this).attr('src', i+'-mob'+f)
                }
        });

    },

    /**
     * @função para identificar com o dispositivo e mudar a url do botão
     */
    seturl: function(){
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            }
        };

        var bt = $('a[rel="app-download"]');
        
        bt.each(function(){
            _self = $(this);
            if (isMobile.Android()){
                //_self.attr('href','https://play.google.com/store/apps/details?id=com.superdigital');
                _self.attr('href','https://web.superdigital.com.br/cadastro');
            }
            else if(isMobile.iOS()){
                //_self.attr('href','https://itunes.apple.com/app/contasuper/id583136272?mt=8');
                _self.attr('href','https://web.superdigital.com.br/cadastro');
            }else {
                _self.attr('href','https://web.superdigital.com.br/cadastro');
            }
        });

    },

    init: function(){
        this.bind();
        this.lazy();
        this.seturl();
    }
};


$(function() {
    MAIN.init();
});

/* esconde o menu original, e o faz aparecer quando o scroll rolar (função atualmente não usada)*/
function trocarMenu(){
	$('header.sd-header').hide();
	var offset = $('#assinaturas').offset().top;
	$(document).on('scroll', function () {
	    console.log(offset+' / '+ $(window).scrollTop());
	    if (offset <= $(window).scrollTop()) {
	        $('header.sd-header').show();
	    } else {
	        $('header.sd-header').hide();
	    }
	});
}
/* esconde e mostra o footer */
jQuery(document).ready(function($){
        $('.btn-show-number').click(function(){
            var toOpen = $(this).data('target');

            var teste = $('.numbers').find('[data-name="'+toOpen+'"]');
            console.log(teste);
            if( $(teste).hasClass('sd-number-show') ){
                $(teste).removeClass('sd-number-show');
            } else{
                $('.numbers').find('.sd-number-hide').removeClass('sd-number-show');
                $(teste).addClass('sd-number-show');
            }
            
        });
        
        $('#tarifa-conta').on('click', function(event){
            event.preventDefault();
            $('body').css('overflow','hidden');
            $('#pop-tarifa-conta').show();
        });
        $('#tarifa-zero').on('click', function(event){
            event.preventDefault();
            $('body').css('overflow','hidden');
            $('#pop-tarifa-zero').show();
        });
        $('.btn-fechar').on('click', function(event){
            event.preventDefault();
            $('body').css('overflow','auto');
            $('.popup').hide();
        });
    });