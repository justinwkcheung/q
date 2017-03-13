// $(function() {
//
// var regExp = /\d+/
// var playlistId = parseInt(regExp.exec(window.location.pathname)[0])
//
//    var counter = 0;
//
//    $('body').delegate(".suggest_song1","click", function() {
//      counter = 0;
//      counter += 1;
//      if (counter === 1) {
//        var nextSongId = setTimeout(function(){parseInt($('.song-in-queue').attr('data-deezer-id'))},10000);
//        var nextSongRecord = setTimeout(function(){parseInt($('.song-in-queue').attr('data-suggested-song-id'))},10000);
//        console.log(nextSongId);
//        console.log(nextSongRecord);
//        console.log(counter);
//        setTimeout(function(){DZ.player.playTracks([nextSongId])}, 3000);
//        setTimeout(function(){DZ.Event.subscribe('track_end', function(){
//          console.log("Track has ended");
//          $.ajax({
//            url: '/playlists/' + playlistId + '/update_song?song_id=' + nextSongRecord,
//            method: 'get',
//          }).done(function(data){
//            DZ.player.playTracks([data['song_id']]);
//            nextSongRecord = data['song_record'];
//            })
//          })}
//        , 3000)
//      }
//    })
// })
