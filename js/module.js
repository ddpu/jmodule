(function($) {
    'use strict';

    var Event = {
        on: function(events, callback, context, once) {
            return this._map(events, function(event) {
                this.events[event] || (this.events[event] = []);

                this.events[event].push({
                    once: once === true,
                    context: context,
                    callback: callback
                });
            });
        },
        one: function(events, callback, context) {
            return this.on.call(this, events, callback, context, true);
        },
        off: function(events, callback, context) {
            var conditions = {callback: callback, context: context};

            return this.map(events, function(event) {
                if (this.events[event]) {
                    this.events[event].slice().map(function(params, i) {
                        for (var key in conditions) {
                            if (conditions[key] && params[key] !== conditions[key]) {
                                return;
                            }
                        }

                        this.events[event].splice(i, 1);
                    }, this);
                }
            });
        },
        fire: function(events) {
            var args = Array.prototype.slice.call(arguments, 1), offset;

            console.log('trigger:', events);

            return this._map(events, function(event) {
                if (this.events[event]) {
                    offset = 0;

                    this.events[event].slice().map(function(params, i) {
                        params.callback.apply(params.context || this, args);
                        params.once === false || this.events[event].splice(i - offset++, 1);
                    }, this);
                }
            });
        },
        _map: function(events, callback) {
            if ($.isFunction(callback)) {
                String(events).split(/\s+/).map(callback, this);
            }

            return this;
        },
        extend: function(obj, params) {
            return $.extend(params || {}, this, obj, {events: {}}).one('init', function() {
                if ($.isFunction(this.init)) {
                    this.init();
                }
            });
        }
    };

    // Aliases
    Event.bind = Event.on;
    Event.once = Event.one;
    Event.unbind = Event.off;
    Event.trigger = Event.fire;

    // Module
    var _ = {
        global: Event.extend(),
        module: function(obj) {
            return Event.extend(obj, {em: this.global}).fire('init');
        }
    };

    // jQuery Module
    $.module = _.module.bind(_);
})(jQuery);
