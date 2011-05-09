/**
 * @author Roy Riojas
 */
(function ($) {
  $( function () {
    var sections = $('.tab-content > li').hide();
    var current = $();
    var lis = $('.tab-header li').each(function (i, ele) {
      var $this = $(this);
      $this.attr('data-index', i);
    }).hover( function () {
      $(this).addClass('hover');
    }, function () {
      $(this).removeClass('hover');
    }).click(function () {
      var $this = $(this);
      var hash = $this.attr('data-hash');
      var state = {
        current : hash
      }
      $.bbq.pushState(state);
      return false;
    }).bind('selected', function (e) {
      var $this = $(this);
      if (current.length == 0) {
        current = $this;
      }
      if (current[0] != $(this)[0]) {
        current.removeClass('selected');
      }
      $this.addClass('selected');
      current = $this;
      
      var index = $this.attr('data-index');
      sections.hide().filter(':eq(' + index + ')').fadeIn().triggerHandler('showing');
    });
    
    var $win = $(window);  // Bind an event to window.onhashchange that, when the history state changes,
    var $body = $('body');
    var $html = $('html');
    //lis.filter(':first').triggerHandler('click');
    var isIe = $html.hasClass('ie');
    isIe && $('.tab-header').boxShadow(5, 5, 5, '#000000');
    
    // iterates over all tab widgets, changing the current tab as necessary.
    $win.bind( 'hashchange', function(e) {
      var current = e.getState('current') || 'home';
      var validAction = /\bhome\b|\bevento\b|\bpanelistas\b|agenda\b|\bubicacion\b/gi.test(current);
      current = validAction ? current : 'home'
      lis.filter('[data-hash=' + current + ']').triggerHandler('selected');
      $body.removeClass('home evento panelistas agenda ubicacion').addClass(current);
    })

    $win.triggerHandler('hashchange');
    $html.removeClass('not-ready');
  });
    
})(jQuery)
