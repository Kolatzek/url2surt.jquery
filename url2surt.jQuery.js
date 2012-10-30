/*!
 * jQuery plugin url2surt - a URL to SURT/SURT-prefix converter
 * Original author: Robert Kolatzek
 * Licensed under the MIT license
 */

(function($) {

    var settings = {
        /* id of form/div to append surt input element to */
        destitationId: 'surts', 
        /* id of input element with url to convert into a surt */
        sourceId: 'url', 
        /* class name of a new span with the surt */
        surtClass: 'surts', 
        /* convert to SURT prefix? */
        asSurtPrefix: false,
        /* string with message: "on click this will be removed */
        clickToDelteStr: 'Click to delte',
        /* value of name attribute for hidden input elements with created surt (will be an array! -> name="surt[]") */
        inputName: 'surt'
    };
    var methods = {
        init: function(options) {
            return this.each(function() {
                var opt = $.extend({}, settings, options);
                $(this).bind('click.url2surt', opt, methods.convert);
            });
        },
        destroy: function( ) {
            return this.each(function() {
                $(window).unbind('.url2surt');
            });
        },
        convert: function(event) {
            var settings = $.extend({}, event.data);
            var urlStr = $('#' + settings.sourceId).val();
            urlStr = urlStr.replace(/\/\//g, '/');
            var parts = urlStr.split('/');
            var surtParts = new Array();
            if (parts.length > 1) {
                if (parts[0].match(/(http|https|ftp):/gi)) {
                    surtParts[0] = parts[0] + '/';
                }
                var domainParts = parts[1].split(".");
                if (domainParts.length > 1) {
                    domainParts.reverse();
                    surtParts[1] = ('(' + domainParts.join(',') + ',)').replace(/\*\./gi,'');
                }
                else {
                    surtParts[1] = '(' + parts[1] + ',';
                }
                //console.log(parts);
                if (parts.length > 2) {
                    var pathParts = new Array();
                    var i = 2;
                    while (i < parts.length) {
                        pathParts[pathParts.length] = parts[i];
                        i++;
                    }
                    surtParts[2] = pathParts.join('/');
                }
            }
            var surt = surtParts.join('/');
            if(urlStr.match(/\/\/([^\/]+)\/$/gi) !== null){
                surt = surt+'/';
            }
            if(settings.asSurtPrefix && !surt.match(/[^\/]\/$/g) && !surt.match(/\)$/g)){
                surt = surt.replace(/\/([^\/]+)$/, '/');
            }
            else if(settings.asSurtPrefix && surt.match(/\)$/g)){
                surt = surt.replace(/\)$/, '');
            }
            $('#'+settings.destitationId).append('<br/><span class="'+settings.surtClass+'" title="'+settings.clickToDelteStr+'"><input name="'+settings.inputName+'[]" type="hidden" value="'+surt+'">'+surt+'</span>');
            $('.'+settings.surtClass).click(function(){$(this).remove();});
        }
    };

    $.fn.url2surt = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.url2surt');
        }
    }
})(jQuery);