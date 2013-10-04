(function($) {
  var methods = {
    init: function(options) {
      var o = $.extend({
        button      : '.btn-success'
        fileControl : ':file',
        postUrl     : 'index.php?p=testimonialInsert'
        formData    : {},
        controlEvent: 'click'
      }, options);

      return this.each(function() {
        $(document).on(o.controlEvent, o.button, function(e) {
          var reader  = new FileReader()
            , image   = $(document).find(fileControl);

          reader.readAsDataURL(image[0].files[0]);
          reader.onloadend = function(e) {
            sendToPhp(e.target.result, o.formData);
          };
        });
      });
    },

    sendRequest: function(o, result, formData) {
      formData['data'] = result;

      $.ajax({
        url: o.postUrl,
        type: 'POST',
        data: JSON.stringify(formData),
        processData: false,
        contentType: false
      });
    }
  };

  $.fn.fileUpload = function(method) {
    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method) return methods.init.apply(this, arguments);
    else $.error('Method ' +  method + ' does not exist on jQuery.fileUpload');
  }
})(jQuery);
