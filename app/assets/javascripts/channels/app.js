$('document').ready(function(){

  App.app = App.cable.subscriptions.create('AppChannel', {

    connected: function(){
      console.log("connected");
    },

    disconnected: function(){
      console.log("disconnected");
    },

    received: function(data) {
      var regExp = /\d+/;
      var playlist_id = parseInt(regExp.exec(window.location.pathname)[0]);

      if (data[0].id === playlist_id) {
        if (data[0].public === true) {  //public
          $('#make-public').html('Public');
          $('.que').find('.btn').addClass('hidden');
          $('.add-search-container').addClass('hidden');
          $('#make-public').toggleClass('active');;
        }
        else if (data[0].public === false) {  //private
          $('#make-public').html('Private');
          $('.que').find('.btn').removeClass('hidden');
          $('.add-search-container').removeClass('hidden');
          $('#make-public').toggleClass('active');
        }
    }

      if (data[0][0].playlist_id === playlist_id) {
      if (data[1] === "restart") {
        var nextSong = data[0][data[0].length - 1].song_id;
        var nextRecord = data[0][data[0].length - 1].id;
          setTimeout(function(){DZ.player.playTracks([nextSong])}, 3000);
          setTimeout(function(){DZ.Event.subscribe('track_end', function(){
            console.log("Track has ended");
            $.ajax({
              url: '/playlists/' + playlist_id + '/update_song?song_id=' + nextRecord,
              method: 'get',
            }).done(function(data){
              nextRecord = data['song_record'];
              nextSong = data['song_id'];
              DZ.player.playTracks([nextSong]);
              })
            })}
          , 3000)
      }

        $('.song-list').html('');
        data[0].forEach(function(data) {

          if (data.played) {
            var divContainer = $('<div>').attr('class', 'song-in-queue played').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', data.id);
          }
          else {
            var divContainer = $('<div>').attr('class', 'song-in-queue que').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', data.id).attr('data-deezer-id',data.song_id);
            var span = $('<span>').attr('class',"buttons")
            var buttonUp = $('<button>').attr('type',"button").attr('name','button').attr('class','upvote btn waves-effect waves-light blue lighten-2')
            var iconUp = $('<i>').attr('class','material-icons').html('thumb_up')
            var upButton = $(buttonUp).append(iconUp)
            var buttonDown = $('<button>').attr('type',"button").attr('name','button').attr('class','downvote btn waves-effect waves-light red lighten-2')
            var iconDown = $('<i>').attr('class','material-icons').html('thumb_down')
            var downButton = $(buttonDown).append(iconDown)
          }
        var spanHeart = $('<span>').attr('class','heart')
        var iconHeart = $('<i>').attr('class','fa fa-heart').attr('style','font-size:12px')
        var netVote = $('<span>').attr('class','netvote').attr('id',data.id).html(data.net_vote)

        var heart = $(spanHeart).append(netVote).append(" ").append(iconHeart)
        var votes = $(span).append(upButton).append(" ").append(downButton)
        var div_replace = $(divContainer).html(data.name + ' - ' + data.artist + ' | Added By: ' + data.user_name)

        if (data[2] === parseInt($('.delete_user_id').text())){
          $(div_replace).append('<a rel="nofollow" data-method="delete" href="/playlists/' + playlist_id + '/suggestedsongs/' + data.id + '">Delete</a>').append(votes).append(heart);
        } else {
          $(div_replace).append(votes).append(heart);
        }

        $('.song-list').append(div_replace);
          })

          $('.que').first().addClass('playing');
          $('.que').first().find('.btn').addClass('hidden').removeClass('que');

      }

    }
    })
  }
)
