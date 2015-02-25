(function(root, $) {
    'use strict';

    $.module({
        init: function() {
            $(root).on('load', $.proxy(this.ready, this));
            $(root).on('click', $.proxy(this.close, this));
        },
        ready: function() {
            return this.em.trigger('page:ready');
        },
        close: function() {
            return this.em.trigger('page:close');
        }
    });
})(window, jQuery);
