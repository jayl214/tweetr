/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//create element example

// $('#box').append(
//   $('<div/>')
//     .attr("id", "newDiv1")
//     .addClass("newDiv purple bloated")
//     .append("<span/>")
//       .text("hello world")
// );

$(document).ready(function(){

  function dateDiff(date1, date2){
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

//build structure of individual tweet
  function createTweetELement(userObj){
    $('.tweet-field').prepend(

      $('<section/>').addClass("existing-tweet")

        .prepend($('<footer/>').addClass("timestamp-footer").text( dateDiff(userObj.created_at, new Date() ) + " days ago")
          .append($('<img/>').attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/1308-200.png" ))
          .append($('<img/>').attr("src", "https://image.freepik.com/free-icon/retweet_318-11148.jpg" ))
          .append($('<img/>').attr("src", "http://simpleicon.com/wp-content/uploads/flag.png" ))
        )

        .prepend($('<article/>').addClass("tweet").text(userObj.content.text))

        .prepend($('<header/>').addClass("user-header")
          .append($('<img/>').attr("src", userObj.user.avatars.small))
          .append($('<h2/>').text(userObj.user.name))
          .append($('<span/>').text(userObj.user.handle))
        )


    );

  };

  function buildAllTweets(database){
    for (i in database){
      createTweetELement(database[i]);
    };
  };

//get all tweets from db and render
  function renderDatabase(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (database) {
        buildAllTweets(database);
        $('.existing-tweet').find('.timestamp-footer img').hide();
          $('.existing-tweet').on('mouseenter',function(){
            $(this).addClass("hover");
            $(this).find('.timestamp-footer img').show();
          });
          $('.existing-tweet').on('mouseleave',function(){
            $(this).removeClass("hover");
            $(this).find('.timestamp-footer img').hide();
          });
      }
    });
  };

//just render the newest tweet
  function renderLatestTweet(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (database) {
        createTweetELement(database[database.length-1]);
        $('.existing-tweet').find('.timestamp-footer img').hide();
          $('.existing-tweet').on('mouseenter',function(){
            $(this).addClass("hover");
            $(this).find('.timestamp-footer img').show();
          });
          $('.existing-tweet').on('mouseleave',function(){
            $(this).removeClass("hover");
            $(this).find('.timestamp-footer img').hide();
          });
      }
    });
  };


//submit tweets to db
  $('.new-tweet').on('click', 'button', function () {
    if ( $('.new-tweet').find('textarea').val().length <= 0 ){
      $('.error-message').text('Tweet is not present!');
      $('.error-message').show();
    } else if( $('.new-tweet span').hasClass("overflow") ){
      $('.error-message').text('Tweet is too long!');
      $('.error-message').show();
    }else {
      $('.error-message').hide();
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $('.new-tweet').find('textarea').serialize(),
        success: function (morePostsHtml) {
        renderLatestTweet();
        }
      });
    };
  });

  $('.error-message').hide();
  renderDatabase();

});
