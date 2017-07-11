$(document).ready(function(){
  $('.new-tweet').on('keyup', 'textarea',function(){
    let tweet = $(this).val();
    let charLeft = 140 - tweet.length ;
    $('.new-tweet span').text(charLeft);
      if (charLeft < 0){
        $('.new-tweet span').addClass("overflow");
      } else{
        $('.new-tweet span').removeClass("overflow");
    };
  });
});