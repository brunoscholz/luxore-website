var modalapp = angular.module('uimodal', [
  'ui.router'
]);

modalapp.factory('modal', function () {
  var modal = {};
  var element = null;

  function retrieveScale (btn) {
    var btnRadius = btn.width()/2,
      left = btn.offset().left + btnRadius,
      top = btn.offset().top + btnRadius - $(window).scrollTop(),
      scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

    // console.log($(window).height());
    // console.log('rad: ' + btnRadius + ', left: ' + left + ', top: ' + top + ', scale: ' + scale);

    btn.css('position', 'fixed').velocity({
      top: top - btnRadius,
      left: left - btnRadius,
      translateX: 0,
    }, 0);

    return scale;
  }

  function scaleValue ( topValue, leftValue, radiusValue, windowW, windowH) {
    var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
      maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
    return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
  }

  function animateLayer (layer, scaleVal, bool) {
    layer.velocity({ scale: scaleVal }, 400, function(){
      $('body').toggleClass('overflow-hidden', bool);
      if (bool) {
        $('.cd-modal-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
      }
      else {
        layer.removeClass('is-visible').removeAttr( 'style' );
        element.removeClass('to-circle');
      }
    });
  }

  modal.open = function (el) {
    element = el;
    var actionBtn = el;
    var scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));
    console.log(actionBtn);
    console.log(scaleValue);
    actionBtn.addClass('to-circle');
    actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
    });

    if(actionBtn.parents('.no-csstransitions').length > 0 ) {
      animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
    }
  };

  modal.close = function () {
    var section = $('.cd-modal-section');
    section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      animateLayer($('.cd-modal-bg'), 1, false);
    });

    //if browser doesn't support transitions...
    if(section.parents('.no-csstransitions').length > 0 ) {
      animateLayer($('.cd-modal-bg'), 1, false);
    }
  };

  modal.updateLayer = function () {
    var layer = $('.cd-modal-bg'),
      layerRadius = layer.width()/2,
      layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
      layerLeft = layer.siblings('.btn').offset().left + layerRadius,
      scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());
    
    layer.velocity({
      top: layerTop - layerRadius,
      left: layerLeft - layerRadius,
      scale: scale,
    }, 0);
  };

  return modal;
});

modalapp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  /*$stateProvider

  $urlRouterProvider.otherwise('/');*/
});