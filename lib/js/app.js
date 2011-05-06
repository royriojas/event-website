/**
 * @author Roy Riojas
 */
(function ($) {
  $( function () {
    var sections = $('.tab-content > li').hide();
    var current = $();
    var lis = $('.tab-header li').each(function (i, ele) {
      $(this).attr('data-index', i);
    }).hover( function () {
      $(this).addClass('hover');
    }, function () {
      $(this).removeClass('hover');
    }).click(function () {
      var $this = $(this);
      if (current.length == 0) {
        current = $this;
      }
      
      if (current[0] != $(this)[0]) {
        current.removeClass('selected');
      }
      $this.addClass('selected');
      var index = $this.attr('data-index');
      sections.hide().filter(':eq(' + index + ')').show().triggerHandler('showing');
      current = $this;
      return false;
    });
    
    lis.filter(':first').triggerHandler('click');

    var isIe = $('html').hasClass('ie');
    isIe && $('.tab-header').boxShadow(5, 5, 5, '#000000');
  });
})(jQuery)
