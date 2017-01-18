/* 
 * Gr8Dev 2017
 * Fullbleed And Fit plugin
 * Eugeny Nosenko 
 * info@gr8dev.com 
*/


(function ($) {
  
    var params = {
                           'beforeResize': function (image) {
   
                           },
                           'onComplete': function (image) {
   
                           }
                                
  
                       }; 
    var methods = {
        init: function (options) {
            //INIT
            console.log(options);
            params = $.extend(
                       {
                           'beforeResize': function (image) {
   
                           },
                           'onComplete': function (image) {
   
                           }
                                
  
                       }
               , options);
            element = this;
        },
        fit: function () {
            var element = this;
           
            methods.getImageSize(element, function (width, height) {
                console.log($(element ).attr("class"), width + ":" + height);
              
                methods.resizeImgFit($(element).parent(), element,width, height);
                
                  $( window ).resize(function() {
                       console.log("Resize",$(element ).attr("id"), width + ":" + height);
                    methods.resizeImgFit($(element).parent(), element,width, height);
                  });
                
            });
            
            
          

        },
        fullbleed: function (obj ) {
            var element = this;
            methods.getImageSize(element, function (width, height) {
                console.log($(element ).attr("id"),width + ":" + height);

                methods.resizeImg($(element).parent(),element, width, height);
                
               $( window ).resize(function() {
                    console.log("Resize",$(element ).attr("id"), width + ":" + height);
                    methods.resizeImg($(element).parent(), element,width, height);
               });
                
            });
        },
        getImageSize: function (img, callback) {
            img = $(img);
            params.beforeResize(img);
            var wait = setInterval(function () {
                var w = img.width(),
                        h = img.height();

                if (w && h) {
                    done(w, h);
                }
            }, 0);

            var onLoad;
            img.on('load', onLoad = function () {
                done(img.width(), img.height());
            });


            var isDone = false;
            function done() {
                if (isDone) {
                    return;
                }
                isDone = true;

                clearInterval(wait);
                img.off('load', onLoad);

                callback.apply(this, arguments);
                params.onComplete(img);
            }
        },
        full_bleed: function (boxWidth, boxHeight, imgWidth, imgHeight)
        {
            // Calculate new height and width
            var initW = imgWidth;
            var initH = imgHeight;
            var ratio = initH / initW;

            imgWidth = boxWidth;
            imgHeight = boxWidth * ratio;

            if (imgHeight < boxHeight) {
                imgHeight = boxHeight;
                imgWidth = imgHeight / ratio;

            }

            //  Return new size
            return {
                width: imgWidth,
                height: imgHeight
            };

        },
        resizeImg: function (container, element, imgWidth, imgHeight) {
            var size = methods.full_bleed($(container).width(), $(container).height(), imgWidth, imgHeight);
            $(element).width(size.width);
            $(element).height(size.height);

                   console.log("FullBleed",size, $(container).width(), $(container).height(), imgWidth, imgHeight);
        },
        fitImg:function (max_width, max_height, img_width, img_height) {

            if (max_width > img_width && max_height > img_height) {
                return {
                    width: img_width,
                    height: img_height,
                    left: 0,
                    top: 0
                }
            }


            scale_width = max_width / img_width;
            scale_height = max_height / img_height;

            scale = Math.min(scale_width, scale_height);

            width = img_width * scale;  // 608
            height = img_height * scale;  // 550

            left = (max_width - width) / 2; // 52
            top = (max_height - height) / 2;  // 0


            return {
                width: width,
                height: height,
                left: left,
                top: top
            }
        },
                resizeImgFit: function (container, element, imgWidth, imgHeight) {
                    var size = methods.fitImg($(container).width(), $(container).height(), imgWidth, imgHeight);
                    $(element).width(size.width);
                    $(element).height(size.height);
                    $(element).css("left", size.left);
                    $(element).css("top", size.top);
                    console.log(size, $(container).width(), $(container).height(), imgWidth, imgHeight);
                }



    };

    $.fn.resizeImage = function (method) {
       
        // логика вызова метода
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует ');
        }
    };

})(jQuery);
