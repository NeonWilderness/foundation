/*! foundation2day - Twoday adapted version of Foundation 5 from Zurb, concatinated and minified with PrePros */
//@prepros-prepend foundation.topbar.js
//@prepros-prepend foundation.tooltip.js
//@prepros-prepend foundation.tab.js
//@prepros-prepend foundation.slider.js
//@prepros-prepend foundation.reveal.js
//@prepros-prepend foundation.orbit.js
//@prepros-prepend foundation.offcanvas.js
//@prepros-prepend foundation.magellan.js
//@prepros-prepend foundation.joyride.js
//@prepros-prepend foundation.interchange.js
//@prepros-prepend foundation.equalizer.js
//@prepros-prepend foundation.dropdown.js
//@prepros-prepend foundation.clearing.js
//@prepros-prepend foundation.alert.js
//@prepros-prepend foundation.accordion.js
//@prepros-prepend foundation.abide.js
//@prepros-prepend foundation.js
// Generate Foundation data-attributes out of Twoday-compatible HTML markup
// Syntax: <elementtag id="someid" class="someclass" title="data-text=sometext | data-class=someclass | data-id=dataid">      will be transformed to
//         <elementtag id="someid" class="someclass" data-text="sometext" data-class="someclass" data-id="dataid">
;(function($) { "use strict";

    $.fn.foundation2day = function(){
        var $foundationTags = this,
            foundation2dayObj = {
                version: "0.1",
                defaults: {
                    'validateDataAttribs': true, // true=Validates correct usage of data-Attributes passed through the elements title-Attribute
                    'initFoundation5': {} // Initialization parameters for Foundation 5
                },
                dataAttribs : { // Lists all available data-Attribs; true=this attrib has a parameter literal; false=no param
                    'data-options':true,
                    'data-interchange':true,
                    'data-magellan-expedition':true,
                    'data-magellan-arrival':true,
                    'data-magellan-destination':true,
                    'data-orbit':false,
                    'data-orbit-slide-number':true,
                    'data-clearing':false,
                    'data-slider':false,
                    'data-abide':false,
                    'data-dropdown':true,
                    'data-dropdown-content':true,
                    'data-reveal':false,
                    'data-reveal-id':true,
                    'data-reveal-ajax':true,
                    'data-alert':false,
                    'data-tooltip':false,
                    'data-joyride':false,
                    'data-id':true,
                    'data-text':true,
                    'data-class':true,
                    'data-button':true,
                    'data-accordion':false,
                    'data-tab':false,
                    'data-equalizer':false,
                    'data-equalizer-watch':false
                },
                init: function(useroptions){
//----------------- Take over user options
                    var options = $.extend( {}, foundation2dayObj.defaults, useroptions || {} ),
                        dataAttribs = [], parts = [], attrib = "", self;
//----------------- For each of the tags that carry a title with a "data-" content...
                    $foundationTags.each( function(){
//--------------------- Establish default values for each video (may be overwritten by class settings)
                        self = $(this);
//--------------------- Split multiple data-Attribs, if any
                        dataAttribs = (self.attr("title") || "").split("|");
//--------------------- Now remove the title-Attrib
                        self.removeAttr("title");
//--------------------- Process each data-Attrib
                        $.each( dataAttribs, function(){
//------------------------- Isolate data-attrib and parameter literal, if any
                            parts = $.trim(this).split("=");
                            attrib = parts[0].toLowerCase();
//------------------------- Validate data-Attrib and existence of a required parameter
                            if (foundation2dayObj.validateDataAttribs){
                                if (typeof(foundation2dayObj.dataAttribs[attrib])==="undefined"){
                                    alert('Syntaxfehler: "'+attrib+'" ist kein bekanntes data-Attribut in Foundation5!');
                                    return;
                                } else {
                                    if (foundation2dayObj.dataAttribs[attrib] && parts.length<2){
                                        alert('Syntaxfehler: "'+attrib+'" benötigt einen Parameter der Form '+attrib+'=Optionstext !');
                                        return;
                                    }
                                }
                            }
//------------------------- Injects the extracted data-attrib to its HTML-tag
                            self.attr(attrib, parts.length>1 ? parts[1] : "");
                        });
                    });
                    $(document).foundation(options.initFoundation5);
//----------------- Enable jQuery chaining
                    return $foundationTags;
                }
            };
        return {
            init: foundation2dayObj.init
        };
    };
})(jQuery);