/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $("#error-empty").hide();
  $("#error-too-long").hide();

  const createTweetElement = function(datas) {

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
  
  const renderTweets = function(tweets) {
    $(".tweet-container").empty();

    tweets.forEach((tweet) => {
      const $tweetHolder = createTweetElement(tweet);

      $(".tweet-container").append($tweetHolder);
    });
  };



  $("form").submit(function(event) {
    event.preventDefault();

    if ($(this).serialize().length <= 5) {
      if ($("#error-empty").is(":hidden") && $("#error-too-long").is(":hidden")) {
        $("#error-empty").slideDown("slow");
      }

      if (!$("#error-too-long").is(":hidden")) {
        $("#error-too-long").slideUp("slow");
        $("#error-empty").slideDown("slow");
      }
    }
    else if ($(this).serialize().length > 205) {
      if ($("#error-empty").is(":hidden") && $("#error-too-long").is(":hidden")) {
        $("#error-too-long").slideDown("slow");
      }

      if (!$("#error-empty").is(":hidden")) {
        $("#error-empty").slideUp("slow");
        $("#error-too-long").slideDown("slow");
      }
    }
    else {
      if (!$("#error-empty").is(":hidden")) {

        $("#error-empty").slideUp("slow");
      }

      if (!$("#error-too-long").is(":hidden")) {

        $("#error-too-long").slideUp("slow");
      }

      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: $(this).serialize(),
      })
      .then(() => {
        $("#tweet-text").val("");
        loadTweets();
      });
    }
  });

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







