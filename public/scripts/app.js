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
  let exampleUser = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function dateDiff(date1, date2){
    var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }


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

  function renderTweets(tweet){
    for (i in tweet){
      createTweetELement(tweet[i]);
    };
  };

//get tweets from db and render
  function renderDatabase(){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      success: function (TTR) {
        renderTweets(TTR);
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
        renderDatabase();
        }
      });
    };
  });

  $('.error-message').hide();
  renderDatabase();

});
