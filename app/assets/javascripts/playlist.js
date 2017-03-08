

$(document).on("ready", function(){
  $('.song-in-queue')
    .on('mouseenter', function(){ $(this).addClass('blue-grey lighten-5') })
    .on('mouseleave', function() { $(this).removeClass('blue-grey lighten-5') });
});
