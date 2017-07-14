$(document).ready(function(){
  $('.new-tweet').hide();
  $('#nav-bar .compose-toggle').on('click', function(){
    $('.new-tweet').slideToggle();
    $('.new-tweet textarea').focus();
  });

});