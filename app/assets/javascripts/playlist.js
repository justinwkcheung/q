

$(document).on("ready", function(){
  $('.song-in-queue')
    .on('mouseenter', function(){ $(this).addClass('blue-grey lighten-5') })
    .on('mouseleave', function() { $(this).removeClass('blue-grey lighten-5') });

  $('.upvote').on('click', function() {
    if ($(this).hasClass("clicked"))  {
      $(this).removeClass("clicked btn-flat blue darken-4")
      $(this).addClass("blue lighten-2 btn")
    } else {
      $(this).addClass("clicked btn-flat darken-4")
      $(this).removeClass("lighten-2 btn")
      $(this).siblings('button').removeClass('clicked btn-flat darken-4').addClass('red lighten-2 btn')
    };
  });
  $('.downvote').on('click', function() {
    if ($(this).hasClass("clicked"))  {
      $(this).removeClass("clicked btn-flat red darken-4")
      $(this).addClass("red lighten-2 btn")
    } else {
      $(this).addClass("clicked btn-flat red darken-4")
      $(this).removeClass("lighten-2 btn")
      $(this).siblings('button').removeClass('clicked btn-flat darken-4').addClass('blue lighten-2 btn')
      // $(this).sibling('button')addClass('blue darken-4 btn')

    };
  });
});
