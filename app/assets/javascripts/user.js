$(document).on("ready", function(){

  $('.modal').modal({
    startingTop: '20%',
      endingTop: '10%',
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      },
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
        var guestDelete = $('<button>').html("Remove Guest").addClass('btn-flat').addClass('guest-delete')
        var guestdiv = $(li).append(span).append(guestDelete);
        $('.guest-list-container ol').append(guestdiv);
        $('.guest-delete').on('click', function() {
          console.log('deleting guest');
        });
      })
      // $('.guest-list-container').fadeIn("slow",function(){})
    });

  })

  // $(document).on('click', '.guest-delete', (function() { //the regular way of .guest-delete on click doesn't work but this does
  //   console.log('deleting guest');
  // }));
  // $('#close').on('click',function(event){
  //   $('.guest-list-container').fadeOut('fast',function(){})
  // })
});
