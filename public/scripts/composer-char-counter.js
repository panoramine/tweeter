$(document).ready(function() {

  $("#tweet-text").on('input propertychange',  function() {

    let txtContent = $('#tweet-text').val();
    let strCount = (140 - txtContent.length);  

    $(".counter").val(strCount);

    if (strCount < 0) {
      return $(".counter").addClass("danger");
    } else {
      $(".counter").removeClass("danger");
    }
  });
});
