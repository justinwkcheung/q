$('document').ready(function(){

  App.app = App.cable.subscriptions.create('AppChannel', {

    connected: function(){
      console.log("connected");
    },

    disconnected: function(){
      console.log("disconnected");
    },

    received: function(data) {
      var userId = parseInt($('.delete_user_id').text());
      var regExp = /\d+/;
      var playlist_id = parseInt(regExp.exec(window.location.pathname)[0]);

      if (data[0].id === playlist_id) {
        console.log('we in private/public');
        if (data[0].public === true) {  //public
          $('#make-public').html('Public');
          $('.que').find('.btn').addClass('hidden');
          $('.add-search-container').addClass('hidden');
          $('#make-public').toggleClass('active');
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
        console.log('we are in restarting');
        var nextSong = data[0][data[0].length - 1].song_id;
        var nextRecord = data[0][data[0].length - 1].id;
          setTimeout(function(){DZ.player.playTracks([nextSong])}, 4000);
          $.ajax({
            url: '/playlists/' + playlist_id + '/update_song_playing?song_id=' + nextRecord,
            method: 'get',
          });
          setTimeout(function(){DZ.Event.subscribe('track_end', function(){
            $.ajax({
              url: '/playlists/' + playlist_id + '/update_song?song_id=' + nextRecord,
              method: 'get',
            }).done(function(data){
              DZ.player.playTracks([data['song_id']]);
              nextSongRecord = data['song_record'];
              $.ajax({
                url: '/playlists/' + playlist_id + '/playlist_broadcast',
                method: 'get',
              })
              })
            })},4000);
      }}

        $('.song-list').html('');
        var timeOut = 50;

            console.log(data);
            console.log(data[3]);

        data[0].forEach(function(song) {
          if (song.status === "played") {
            var divContainer = $('<div>').attr('class', 'song-in-queue played').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', song.id);
            console.log(divContainer);
          }
          else if (song.status === "playing") {
            var divContainer = $('<div>').attr('class', 'song-in-queue playing').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', song.id);
            console.log(divContainer);
          } else if (song.status === "que") {
            var divContainer = $('<div>').attr('class', 'song-in-queue que').attr('data-playlist-id', playlist_id).attr('data-suggested-song-id', song.id).attr('data-deezer-id',song.song_id);
            console.log(divContainer);
            var span = $('<span>').attr('class',"buttons");
            var buttonUp = $('<button>').attr('type',"button").attr('name','button').attr('class','upvote btn waves-effect waves-light blue lighten-2');
            var buttonDown = $('<button>').attr('type',"button").attr('name','button').attr('class','downvote btn waves-effect waves-light red lighten-2');

            data[3].forEach(function(vote) {
              if ((vote.suggestedsong_id === song.id) && (vote.user_id === userId)){
                if (vote.status === "up"){
                  $(buttonUp).addClass('highlight');
                }
                else {
                  $(buttonDown).addClass('highlight');
                }
                }
              }
            )


            var iconUp = $('<i>').attr('class','material-icons').html('thumb_up');
            var upButton = $(buttonUp).append(iconUp);

            var iconDown = $('<i>').attr('class','material-icons').html('thumb_down');
            var downButton = $(buttonDown).append(iconDown);
          }
        var spanHeart = $('<span>').attr('class','heart');
        var iconHeart = $('<i>').attr('class','fa fa-heart').attr('style','font-size:12px');
        var netVote = $('<span>').attr('class','netvote').attr('id',song.id).html(song.net_vote);

        var heart = $(spanHeart).append(netVote).append(" ").append(iconHeart);
        var votes = $(span).append(upButton).append(" ").append(downButton);
        var div_replace = $(divContainer).html(song.name + ' - ' + song.artist + ' | Added By: ' + song.user_name);

        if (data[2] === userId) {
          $(div_replace).append('<a rel="nofollow" data-method="delete" href="/playlists/' + playlist_id + '/suggestedsongs/' + song.id + '">Delete</a>').append(votes).append(heart);
        }
        else {
          $(div_replace).append(votes).append(heart);
        }


        $(div_replace).appendTo('.song-list');

      })

    }


})

  }

)
