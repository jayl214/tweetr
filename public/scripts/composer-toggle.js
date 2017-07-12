$(document).ready(function(){
  $('.new-tweet').hide();
  $('#nav-bar .compose-toggle').on('mouseenter', function(){
    $(this).addClass("hover");
  });
  $('#nav-bar .compose-toggle').on('mouseleave', function(){
    $(this).removeClass("hover");
  });
  $('#nav-bar .compose-toggle').on('click', function(){
    $('.new-tweet').slideToggle();
  });
});