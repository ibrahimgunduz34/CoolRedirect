;(function($){
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
            var overlayDiv = $('<div>', {'class' : 'cool_redirect_overlay'}).appendTo('body');
            var textDiv = $('<div>', {'class':'cool_redirect_text'}).appendTo(overlayDiv);
            $(textDiv).html(this.options.loadingText);
            return overlayDiv;
        },

        _animateWindow : function(callback) {
            var divObject = this._createDiv();
            $(divObject).animate({opacity:0.9}, 750, callback);
        }

    }

    $.CoolRedirect.defaults = {
        loadingText : 'Loading. Please wait...' 
    }

    $.fn.extend({ coolRedirect : function(options) {
        var opt = $.extend({}, $.CoolRedirect.defaults, options);
        return this.each(function() {
            new $.CoolRedirect(this, opt);
        });
    }});
})(window.jQuery);
