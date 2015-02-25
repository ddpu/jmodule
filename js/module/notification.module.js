(function($) {
    'use strict';

    $.module({
        init: function() {
            this.em.on('page:ready', this.ready);
        },
        ready: function() {
            // new Notification('Testing');
        }
    });
})(jQuery);
