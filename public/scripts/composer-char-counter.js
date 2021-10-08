$(document).ready(function() {

  //max character counter logic
  $("#tweet-text").on('input propertychange',  function() {

    let txtContent = $('#tweet-text').val();
    let strCount = (140 - txtContent.length);  

    $(".counter").val(strCount);

    //change color of counter on screen
    if (strCount < 0) {
      return $(".counter").addClass("danger");
    } else {
      $(".counter").removeClass("danger");
    }
  });
});
