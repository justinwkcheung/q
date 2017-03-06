

$(document).on("turbolinks:load", function(){
  $('.song-in-queue')
    .on('mouseenter', function(){ $(this).addClass('blue-grey darken-4') })
    .on('mouseleave', function() { $(this).removeClass('blue-grey darken-4') });
});
