$(document).on("ready", function(){

  $('.modal').modal({
    startingTop: '20%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
  });

  $('.guestlist').on('click', function(event) {
    var playlistId = parseInt($(this).parents('.hosted-playlist').attr('playlist-id'))
    event.preventDefault()
    $.ajax({
       url:'/playlists/' + playlistId + '/guestlist',
       method:'GET',
    }).done(function(data) {
      console.log(data);
      $('.guest-list-container ol').html('');
      data.forEach(function(guest){
        var li = $('<li>').attr('class','guest');
        var span = $('<span>').html(guest[0] + ' ' + guest[1]);
        var guestdiv = $(li).append(span);
        $('.guest-list-container ol').append(guestdiv);
      })
      // $('.guest-list-container').fadeIn("slow",function(){})
    });

  })
  // $('#close').on('click',function(event){
  //   $('.guest-list-container').fadeOut('fast',function(){})
  // })
});
