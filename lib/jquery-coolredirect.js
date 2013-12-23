(function($){
    $.CoolRedirect = function(object, options) {
        this.object = object;
        this.options = options;
        this._init();
    }

    $.CoolRedirect.prototype = {
        _init : function() {
            this._bindEvent();
        },

        _bindEvent : function() {
            var obj = this;
            $(this.object).click(function(){
                var url = $(this).attr('href');
                obj._animateWindow(function() {
                    window.location = url;
                });
                return false;
            });    
        },

        _createDiv : function() {
            var overlayDiv = $('<div>', {'class' : this.options.htmClassOverlay}).appendTo('body');
            var textDiv = $('<div>', {'class' : this.options.htmClassText}).appendTo(overlayDiv);
            $(textDiv).html(this.options.loadingText);
            return overlayDiv;
        },

        _animateWindow : function(callback) {
            var divObject = this._createDiv();
            $(divObject).animate({opacity:0.9}, 750, callback);
        }

    }

    $.CoolRedirect.defaults = {
        htmlClassOverlay : 'cool_redirect_overlay',
        htmlClassText : 'cool_redirect_text',
        loadingText : 'Loading. Please wait...' 
    }

    $.fn.extend({ coolRedirect : function(options) {
        var opt = $.extend({}, $.CoolRedirect.defaults, options);
        return this.each(function() {
            new $.CoolRedirect(this, opt);
        });
    }});
})(window.jQuery);
