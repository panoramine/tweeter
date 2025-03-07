/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // hide error messages
  $("#error-empty").hide();
  $("#error-too-long").hide();

  // hide textarea 
  $(".tweet-form").hide();

  // show tweet form when clicking "write a new tweet" arrow
  // focus on textarea
  $(".arrow").on("click", function() {
    $(".tweet-form").slideDown();
    $("#tweet-text").focus();
  })

  // function that generates the DOM structure for a tweet, given a tweet object 
  const createTweetElement = function(datas) {

    //XSS logic
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $safeText = escape(datas["content"]["text"]);
     
    const $tweet = $(`
    <article class="tweet">
      <header>
        <section>
          <div>
            <img src=${datas["user"]["avatars"]} alt="avatar">
            <p>
              ${datas["user"]["name"]}
            </p>
          </div>
          <article>
            ${datas["user"]["handle"]}
          </article>
        </section>
      </header>
      <section>
        <p>
          ${$safeText}
        </p>
      </section>
      <footer>
        <p>
          ${timeago.format(datas["created_at"])}
        </p>
        <div>
          <i class="fa-solid fa-flag fa-2xs" ></i>
          <i class="fa-solid fa-retweet fa-2xs"></i>
          <i class="fa-solid fa-heart fa-2xs"></i>
        </div>
      </footer>
    </article>
    `);
  
    return $tweet;
  };
  
  //function responsible for taking in an array of tweet objects and appending each one to the html
  const renderTweets = function(tweets) {
    $(".tweet-container").empty();

    tweets.forEach((tweet) => {
      const $tweetHolder = createTweetElement(tweet);

      $(".tweet-container").append($tweetHolder);
    });
  };


  
  $("form").submit(function(event) {
    //prevent redirect from POST request
    event.preventDefault();

    //check tweet validation and show appropriate error message
    if ($(this).serialize().length <= 5) {
      if ($("#error-empty").is(":hidden") && $("#error-too-long").is(":hidden")) {
        $("#error-empty").slideDown();
      }

      if (!$("#error-too-long").is(":hidden")) {
        $("#error-too-long").slideUp();
        $("#error-empty").slideDown();
      }
    }
    else if ($('#tweet-text').val().length > 140) {
      if ($("#error-empty").is(":hidden") && $("#error-too-long").is(":hidden")) {
        $("#error-too-long").slideDown();
      }

      if (!$("#error-empty").is(":hidden")) {
        $("#error-empty").slideUp();
        $("#error-too-long").slideDown();
      }
    }
    else {
      if (!$("#error-empty").is(":hidden")) {

        $("#error-empty").slideUp();
      }

      if (!$("#error-too-long").is(":hidden")) {

        $("#error-too-long").slideUp();
      }

      //form submission with jQuery
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
      })
      .then(() => {
        $("#tweet-text").val("");
        $(".counter").val("140");
        loadTweets();
      });
    }
  });

  //function use jQuery to make request to /tweets and receive the array of tweets as JSON
  const loadTweets = function() {

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets"
    })
    .then((result) => {
      const reversedResult = result.reverse();

      renderTweets(reversedResult);
    });
  };
  
  loadTweets();
});







