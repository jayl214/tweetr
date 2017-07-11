$(document).ready(function(){
  $('.existing-tweet').find('.timestamp-footer img').hide();
  $('.existing-tweet').on('mouseenter',function(){
    $(this).addClass("hover");
    $(this).find('.timestamp-footer img').show();
  });
  $('.existing-tweet').on('mouseleave',function(){
    $(this).removeClass("hover");
    $(this).find('.timestamp-footer img').hide();
  });
});