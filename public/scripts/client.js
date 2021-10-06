/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const createTweetElement = function(data) {
    
  const $tweet = $(`
  <article class="tweet>
    <header>
      <section>
        <div>
          <img src=${data["user"]["avatars"]} alt="avatar">
          <p>
            ${data["user"]["name"]}
          </p>
        </div>
        <article>
          ${data["user"]["handle"]}
        </article>
      </section>
    </header>
    <section>
      <p>
        ${data["content"]["text"]}
      </p>
    </section>
    <footer>
      <p>
        ${timeago.format(data["created_at"])}
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


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
    },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

// const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);