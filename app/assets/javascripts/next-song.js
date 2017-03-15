  //
  //  setTimeout(function(){DZ.player.playTracks([<%= @next_song_id %>])}, 3000);
  //  setTimeout(function(){DZ.Event.subscribe('track_end', function(){
  //    console.log("Track has ended");
  //    $.ajax({
  //      url: '/playlists/<%=params[:id]%>/update_song?song_id=' + nextSongRecord,
  //      method: 'get',
  //    }).done(function(data){
  //      DZ.player.playTracks([data['song_id']]);
  //      nextSongRecord = data['song_record'];
  //      })
  //    })}
  //  , 3000)
