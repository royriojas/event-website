/**
 * @author Roy Riojas
 */
(function ($) {
  $( function () {
    var sections = $('.tab-content > li').hide(),
    current = $(),
    $win = $(window),
    $body = $('body'),
    $html = $('html'),
    isIe = $html.hasClass('ie'),
    showMethod = isIe ? 'show' : 'fadeIn';
    
    isIe && $('.tab-header').boxShadow(5, 5, 5, '#000000');
    
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
      
      sections.hide().filter(':eq(' + index + ')')[showMethod]().triggerHandler('showing');
    });
    var first = true;
    $('.tab-content > li.locationMap').bind('showing', function (e) {
     if (!first) return;
      $this = $(this).find('div.map');
      var content = '<iframe width="390" height="440" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps/ms?hl=en&amp;ie=UTF8&amp;oe=UTF8&amp;msa=0&amp;msid=200426585356206263489.0004a2f4eb5b3436c2c1d&amp;ll=-12.097967,-77.048899&amp;spn=0,0&amp;t=h&amp;iwloc=0004a2f4eb63c2a879a31&amp;output=embed"></iframe>';
      $this.html(content);
      first = false;
    });
    // iterates over all tab widgets, changing the current tab as necessary.
    $win.bind( 'hashchange', function(e) {
      var currentSection = e.getState('current') || 'home';
      var validAction = /\bhome\b|\bevento\b|\bpanelistas\b|\bagenda\b|\bubicacion\b/i.test(currentSection);
      currentSection = validAction ? currentSection : 'home'
      lis.filter('[data-hash=' + currentSection + ']').triggerHandler('selected');
      $body.removeClass('home evento panelistas agenda ubicacion').addClass(currentSection);
    })

    $win.triggerHandler('hashchange');
    var $gallery = $('.gallery').hide();
    $win.bind('load', function () {
      $gallery.fadeIn().nivoSlider({ pauseTime : 4000 });
    });
    
    $html.removeClass('not-ready');
  });
    
})(jQuery)
