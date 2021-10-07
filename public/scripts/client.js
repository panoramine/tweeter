/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(datas) {
      
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
          ${datas["content"]["text"]}
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
 
    tweets.reverse().forEach((tweet) => {
      $tweetHolder = createTweetElement(tweet);
  
      $(".tweet-container").append($tweetHolder);
  
    });
  
  };



  $("form").submit(function(event) {
    event.preventDefault();
    
    if ($(this).serialize().length <= 5) {
      alert("Cannot post empy message");

    }
    else if ($(this).serialize().length > 205) {
      alert("Message is too long");

    } 
    else {
      $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
      })
      $("#tweet-test").val("");
    }
  });

  const loadTweets = function() {

    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets"
    })
    .then((result) => {
      console.log(result)
      renderTweets(result)
    })
  }
  loadTweets()
});







