function getRandomInt() {
  min = Math.ceil(1);
  max = Math.floor(5);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor() {
  var num = getRandomInt()
  if (num === 1) {
    return 'pink lighten-3'
  } else if (num === 2){
    return 'purple accent-2'
  } else if (num === 3) {
    return 'indigo accent-1'
  } else if (num === 4) {
    return 'green accent-4'
  }
};

function randomPhrase() {
  var num = getRandomInt()
  if (num === 1) {
    return "Your song was added. Let's party!"
  } else if (num === 2){
    return "Woohoo! Song added!"
  } else if (num === 3) {
    return 'Nice taste in music! Song added.'
  } else if (num === 4) {
    return 'Achievement unlocked! Just kidding. Your song was still added though!'
  }
};

$(document).on("ready", function(){

  $('.song-in-queue')
    .on('mouseenter', function(){ $(this).addClass('blue-grey darken-4') })
    .on('mouseleave', function() { $(this).removeClass('blue-grey darken-4') });

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
    };
  });



});
