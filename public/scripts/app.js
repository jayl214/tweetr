/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function(){


  function timeSince(date) {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  };

//build structure of individual tweet
  function createTweetELement(userObj){
    $('.tweet-field').prepend(

      $('<section/>').addClass("existing-tweet")

        .prepend($('<footer/>').addClass("timestamp-footer").text(timeSince(userObj.created_at))
          .append($('<img/>').attr("src", "https://d30y9cdsu7xlg0.cloudfront.net/png/1308-200.png" ).addClass("like").data("tweet_ID", userObj._id))
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
          $(this).find('.timestamp-footer img').show();
        });
        $('.existing-tweet').on('mouseleave',function(){
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
          $(this).find('.timestamp-footer img').show();
        });
        $('.existing-tweet').on('mouseleave',function(){
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
        success: function () {
        renderLatestTweet();
        }
      });
    };
  });


  $('.tweet-field').on('click', '.like', function () {
    let id = $( event.target ).data("tweet_ID").toString();
    console.log(id);
    // $(event.target).toggleClass('liked');
    $.ajax({
        url: `/tweets/${id}`,
        type: 'POST',
      });

    $.ajax({
      url: `/tweets/${id}`,
      method: 'GET',
      success: function (userObj) {
        let objOfUser = JSON.stringify(userObj);
        console.log(typeof userObj);
        console.log(userObj[0].like_counter);
      }
    });
  });

  $('.error-message').hide();
  renderDatabase();

});
