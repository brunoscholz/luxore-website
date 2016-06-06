/*
 *
 * Original popup magic from: http://jqueryfordesigners.com/coda-popup-bubbles.1.html
 *
 */
var btcdonate = function(options) {

  if (!options) {
    options = {};
  }

  var qr = {
    fill:   options.fill   || "#f7931a",
    radius: options.radius || 0.3
  };

  // Wrap all links containing href="bitcoin:..." so that we can operate on them
  $("a[href^=bitcoin],a[data-btcaddress]")
    .addClass("btcdonate-trigger")
    .wrap('<span class="btcdonate"></span>');

  // Append the bubble and attach the hide/show effects for it
  $('.btcdonate').each(function () {

    // Options
    var distance       = 10;
    var time           = 250;
    var hideDelay      = 500;
    var hideDelayTimer = null;

    // Tracker
    var beingShown = false;
    var shown      = false;

    var trigger = $('.btcdonate-trigger', this).get(0);
    var address = $(trigger).attr("data-btcaddress") || $(trigger).attr("href");
    if (address.indexOf("bitcoin:")) {
      address = "bitcoin:" + address;
    }

    var $qr = $('<div class="btcdonate-qr"></div>')
      .qrcode({
        size: 256,
        fill: qr.fill,
        radius: qr.radius,
        text: address.replace("bitcoin:", ""),
        render: "image"
      });

    var $bubble = $('<div class="btcdonate-bubble"></div>')
      .css("opacity", 0)
      .append($qr)
      .append('<div class="btcdonate-address">' + address.replace("bitcoin:", "").replace(/\?.*/, "") + '</div>');

    //$(this).append($bubble);
    $('.qrcode').append($qr);

  });
};