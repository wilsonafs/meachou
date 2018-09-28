// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

;(function($){
    $.extend( $.ui.tabs.prototype, {
        rotation: null,
        rotationDelay: null,
        continuing: null,
        rotate: function( ms, continuing ) {
            var self = this,
                o = this.options;

            if((ms > 1 || self.rotationDelay === null) && ms !== undefined){//only set rotationDelay if this is the first time through or if not immediately moving on from an unpause
                self.rotationDelay = ms;
            }

            if(continuing !== undefined){
                self.continuing = continuing;
            }

            var rotate = self._rotate || ( self._rotate = function( e ) {
                clearTimeout( self.rotation );
                self.rotation = setTimeout(function() {
                    var t = o.active;
                    self.option( "active",  ++t < self.anchors.length ? t : 0 );
                }, ms );

                if ( e ) {
                    e.stopPropagation();
                }
            });

            var stop = self._unrotate || ( self._unrotate = !continuing
                ? function(e) {
                    if (e.clientX) { // in case of a true click
                        self.rotate(null);
                    }
                }
                : function( e ) {
                    t = o.active;
                    rotate();
                });

            // start rotation
            if ( ms ) {
                this.element.bind( "tabsactivate", rotate );
                this.anchors.bind( o.event + ".tabs", $.proxy(self.unpause, self) );
                rotate();
            // stop rotation
            } else {
                clearTimeout( self.rotation );
                this.element.unbind( "tabsactivate", rotate );
                this.anchors.unbind( o.event + ".tabs", $.proxy(self.pause, self) );
                delete this._rotate;
                delete this._unrotate;
            }

            //rotate immediately and then have normal rotation delay
            if(ms === 1){
                //set ms back to what it was originally set to
                ms = self.rotationDelay;
            }

            return this;
        },
        pause: function() {
            var self = this,
                o = this.options;

            self.rotate(0);
        },
        unpause: function(){
            var self = this,
                o = this.options;

            self.rotate(1, self.continuing);
        }
    });
})(jQuery);

;(function($) {
    $.extend( $.ui.tabs.prototype, {
        hover: function(hoverOn, hoverOff) {
            var self = this;
            if(hoverOn) {
                self.element.hover(
                    function() {
                        $(this).tabs("pause");
                    },
                    function() {
                        if(hoverOff) $(this).tabs("unpause");
                    }
                );
            }
        }
    });
})(jQuery);