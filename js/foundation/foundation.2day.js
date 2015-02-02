/*! foundation2day - Twoday adapted version of Foundation 5 from Zurb, concatinated and minified with PrePros */
//@prepros-prepend foundation.js
//@prepros-prepend foundation.abide.js
//@prepros-prepend foundation.accordion.js
//@prepros-prepend foundation.alert.js
//@prepros-prepend foundation.clearing.js
//@prepros-prepend foundation.dropdown.js
//@prepros-prepend foundation.equalizer.js
//@prepros-prepend foundation.interchange.js
//@prepros-prepend foundation.joyride.js
//@prepros-prepend foundation.magellan.js
//@prepros-prepend foundation.offcanvas.js
//@prepros-prepend foundation.orbit.js
//@prepros-prepend foundation.reveal.js
//@prepros-prepend foundation.slider.js
//@prepros-prepend foundation.tab.js
//@prepros-prepend foundation.tooltip.js
//@prepros-prepend foundation.topbar.js
// Generate Foundation data-attributes out of Twoday-compatible HTML markup (extracted from title-string)
// Syntax: <elementtag title="data-someattr | data-text=sometext | data-class=someclass | data-id=someid | data-!placeholder=text">  will be transformed to
//         <elementtag data-someattr data-text="sometext" data-class="someclass" data-id="someid" placeholder="text">
;(function($) { "use strict";

    $.fn.foundation2day = function(){
        var $foundationTags = this,
            foundation2dayObj = {
                version: "0.3",
                defaults: {
                    validateDataAttribs: true, // true=Validates correct usage of data-Attributes passed through the elements title-Attribute
                    initFoundation5: {}        // Initialization parameters for Foundation 5
                },
                dataAttribs : { // Lists all available data-Attribs; true=this attrib has a parameter literal; false=no param
                    'data-abide':false,
                    'data-abide-validator':true,
                    'data-accordion':false,
                    'data-alert':false,
                    'data-button':true,
                    'data-caption':true,
                    'data-class':true,
                    'data-clearing':false,
                    'data-dropdown':true,
                    'data-dropdown-content':false,
                    'data-equalizer':false,
                    'data-equalizer-watch':false,
                    'data-equalto':true,
                    'data-id':true,
                    'data-index':true,
                    'data-interchange':true,
                    'data-joyride':false,
                    'data-magellan-arrival':true,
                    'data-magellan-destination':true,
                    'data-magellan-expedition':true,
                    'data-offcanvas':false,
                    'data-oneof':false,
                    'data-options':true,
                    'data-orbit':false,
                    'data-orbit-link':true,
                    'data-orbit-slide':true,
                    'data-orbit-slide-number':true,
                    'data-prev-text':true,
                    'data-reveal':false,
                    'data-reveal-ajax':true,
                    'data-reveal-id':true,
                    'data-search':false,
                    'data-selector':true,
                    'data-slider':false,
                    'data-tab':false,
                    'data-text':true,
                    'data-tooltip':false,
                    'data-topbar':false,
                    //special attributes
                    'data-bind':true, // enables integration of knockout js MVVM
                    'data-opacity':true, // holds color opacity of minicolors spinedit field
                    'data-!aria-haspopup':true, // tooltip accessibility parameter
                    'data-!placeholder':true, // holds the placeholder-text for input form fields
                    'data-!title':true, // holds the tooltip-text
                    'data-!value':true // holds the value in select options
                },
                init: function(useroptions){
                    //merge user options
                    var options = $.extend( {}, foundation2dayObj.defaults, useroptions || {} ),
                        dataAttribs = [], parts = [], attrib = "", err = "Syntaxfehler: ", self;
                    //for each tag carrying a title with a "data-"-attr ...
                    $foundationTags.each( function(){
                        //for the current element
                        self = $(this);
                        //split multiple data-Attribs, if any
                        dataAttribs = (self.attr("title") || "").split("|");
                        //Now remove the title-Attrib
                        self.removeAttr("title");
                        //Process each data-Attrib
                        $.each( dataAttribs, function(){
                        //Isolate data-attrib and parameter literal, if any
                            parts = $.trim(this).split("=");
                            attrib = parts[0].toLowerCase();
                            //Validate data-Attrib and existence of a potentially required parameter
                            if (options.validateDataAttribs){
                                if (typeof foundation2dayObj.dataAttribs[attrib] === "undefined"){
                                    console.error(err+attrib+' ist kein bekanntes data-Attribut in Foundation5!');
                                    return true;
                                } else {
                                    if (foundation2dayObj.dataAttribs[attrib] && parts.length<2){
                                        console.error(err+attrib+' erwartet einen Parameter der Form '+attrib+'=param !');
                                        return true;
                                    }
                                }
                            }
                            //shapes special attributes (eliminates "data-!"-qualifier)
                            attrib = (attrib.match(/data-!(.*)/) || ["",attrib])[1];
                            //Injects the extracted data-attrib into its HTML-tag
                            self.attr(attrib, parts.length>1 ? parts[1] : "");
                        });
                    });
                    $(document).foundation(options.initFoundation5);
                    //Enable jQuery chaining
                    return $foundationTags;
                }
            };
        return {
            init: foundation2dayObj.init
        };
    };
})(jQuery);