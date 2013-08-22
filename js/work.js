;(function($, window, document) {

var $projectTitle = $('.project-title'),
    $royalSlider = $('.royal-slider'),
    slider;

fadeProjectTitleInAndOut()

slider = $royalSlider.royalSlider({
  randomizeSlides: true,
  keyboardNavEnabled: true,
  visibleNearby: {
    enabled: true,
    centerArea: 0.,
    center: true,
    breakpoint: 650,
    breakpointCenterArea: 0.64,
    navigateByCenterClick: true
  }
}).data('royalSlider');

slider.ev.on('rsAfterSlideChange', function() {
  if (slider.currSlideId === 0) {
    fadeProjectTitleInAndOut()
  }
});

function fadeProjectTitleInAndOut() {
  $projectTitle.fadeIn(500);

  setTimeout(function() {
    $projectTitle.fadeOut(500);
  }, 4000);
};

})(jQuery, window, document, undefined);