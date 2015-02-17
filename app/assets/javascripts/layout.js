function shrinkHeader(){
  var shrinkHere = 100;
  var yAxis = $(window).scrollTop();
  if (yAxis >= shrinkHere) {
    $('.site-title').addClass('smaller');
  } else {
    if ($('.site-title').hasClass('smaller')){
      $('.site-title').removeClass('smaller');
    }
  }
}

$(function(){
  $(window).scroll(shrinkHeader());
});